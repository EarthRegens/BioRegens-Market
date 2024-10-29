"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useContractReads } from 'wagmi'
import { erc721ABI } from '@/lib/abi'
import { useState, useEffect } from "react"

const CONTRACT_ADDRESS = '0x985A62f7fC6f5eB2656Fb86092b88f7546e02C1B' as const

interface NftCardProps {
  tokenId: number
  imageUrl: string | null
  isLoading?: boolean
}

function NftCard({ tokenId, imageUrl, isLoading }: NftCardProps) {
  const [imgError, setImgError] = useState(false)
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(imageUrl)

  useEffect(() => {
    console.log(`[NftCard ${tokenId}] imageUrl prop changed:`, imageUrl)
    console.log(`[NftCard ${tokenId}] currentImageUrl state:`, currentImageUrl)
    setCurrentImageUrl(imageUrl)
  }, [imageUrl, tokenId])

  const handleImageError = () => {
    console.error(`[NftCard ${tokenId}] Image error with URL:`, currentImageUrl)
    
    if (!currentImageUrl) {
      console.log(`[NftCard ${tokenId}] No URL to retry`)
      return
    }
    
    if (currentImageUrl.includes('ipfs.io')) {
      const newUrl = currentImageUrl.replace('ipfs.io', 'cloudflare-ipfs.com')
      console.log(`[NftCard ${tokenId}] Trying cloudflare URL:`, newUrl)
      setCurrentImageUrl(newUrl)
    } else if (currentImageUrl.includes('cloudflare-ipfs.com')) {
      const newUrl = currentImageUrl.replace('cloudflare-ipfs.com', 'nftstorage.link')
      console.log(`[NftCard ${tokenId}] Trying nftstorage URL:`, newUrl)
      setCurrentImageUrl(newUrl)
    } else {
      console.error(`[NftCard ${tokenId}] All fallbacks failed`)
      setImgError(true)
    }
  }

  console.log(`[NftCard ${tokenId}] Rendering with:`, {
    isLoading,
    imgError,
    currentImageUrl,
    originalImageUrl: imageUrl
  })

  return (
    <Card className="group overflow-hidden transition-all hover:ring-2 hover:ring-primary/50">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : imgError || !currentImageUrl ? (
            <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
              {imgError ? `Failed to load image #${tokenId}` : 'No image available'}
            </div>
          ) : (
            <Image
              src={currentImageUrl}
              alt={`NFT #${tokenId}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              loading="lazy"
              onError={handleImageError}
              onLoad={() => console.log(`[NftCard ${tokenId}] Image loaded successfully`)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function NftGallery() {
  const [nfts, setNfts] = useState<Array<{ tokenId: number; imageUrl: string | null }>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('[NftGallery] NFTs state updated:', nfts)
  }, [nfts])

  const { data: totalSupply } = useContractReads({
    contracts: [
      {
        address: CONTRACT_ADDRESS,
        abi: erc721ABI,
        functionName: 'totalSupply',
      } as const
    ]
  })

  useEffect(() => {
    async function fetchNFTs() {
      if (!totalSupply?.[0]?.result) {
        console.log('[NftGallery] No total supply yet')
        return
      }

      const supply = Number(totalSupply[0].result)
      console.log('[NftGallery] Total supply:', supply)
      
      const initialNfts = Array.from({ length: supply }, (_, i) => ({
        tokenId: i + 1,
        imageUrl: null
      }))
      console.log('[NftGallery] Initializing with:', initialNfts)
      setNfts(initialNfts)
      
      const tokenIds = Array.from({ length: supply }, (_, i) => i + 1)
      console.log('[NftGallery] Token IDs to fetch:', tokenIds)

      const batchSize = 3
      for (let i = 0; i < tokenIds.length; i += batchSize) {
        const batch = tokenIds.slice(i, i + batchSize)
        console.log(`[NftGallery] Processing batch ${i/batchSize + 1}:`, batch)

        try {
          await Promise.all(
            batch.map(async (tokenId) => {
              try {
                console.log(`[NftGallery] Fetching NFT #${tokenId}`)
                const response = await fetch(`/api/nft/${tokenId}`)
                
                if (!response.ok) {
                  throw new Error(`Error fetching NFT #${tokenId}: ${response.statusText}`)
                }
                
                const data = await response.json()
                console.log(`[NftGallery] NFT #${tokenId} data:`, data)
                
                setNfts(prev => {
                  const newNfts = [...prev]
                  console.log(`[NftGallery] Updating NFT #${tokenId} in state:`, {
                    before: newNfts[tokenId - 1],
                    after: { tokenId, imageUrl: data.image || null }
                  })
                  newNfts[tokenId - 1] = {
                    tokenId,
                    imageUrl: data.image || null
                  }
                  return newNfts
                })
              } catch (error) {
                console.error(`[NftGallery] Error processing NFT #${tokenId}:`, error)
              }
            })
          )

          if (i + batchSize < tokenIds.length) {
            console.log(`[NftGallery] Waiting before next batch...`)
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        } catch (error) {
          console.error(`[NftGallery] Batch error:`, error)
        }
      }

      console.log('[NftGallery] All batches processed')
      setIsLoading(false)
    }

    fetchNFTs()
  }, [totalSupply])

  console.log('[NftGallery] Rendering with:', {
    isLoading,
    nftsCount: nfts.length,
    nfts
  })

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 font-jakarta">
        NFT Collection ({nfts.length} NFTs)
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <NftCard
              key={`loading-${i}`}
              tokenId={i + 1}
              imageUrl={null}
              isLoading={true}
            />
          ))
        ) : (
          nfts.map((nft) => (
            <NftCard
              key={`nft-${nft.tokenId}`}
              tokenId={nft.tokenId}
              imageUrl={nft.imageUrl}
              isLoading={false}
            />
          ))
        )}
      </div>
    </section>
  )
} 