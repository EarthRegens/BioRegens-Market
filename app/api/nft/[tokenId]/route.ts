import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'

const CONTRACT_ADDRESS = '0x985A62f7fC6f5eB2656Fb86092b88f7546e02C1B'

const client = createPublicClient({
  chain: sepolia,
  transport: http()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { tokenId: string } }
) {
  const tokenId = params.tokenId

  try {
    console.log(`Fetching metadata for token ID: ${tokenId}`)
    
    // Get tokenURI from the contract
    const tokenUri = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: [{
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function'
      }],
      functionName: 'tokenURI',
      args: [BigInt(tokenId)]
    })

    console.log(`Token URI for #${tokenId}:`, tokenUri)

    // Handle different IPFS URI formats
    let formattedUri = tokenUri
    if (tokenUri.startsWith('ipfs://')) {
      formattedUri = `https://ipfs.io/ipfs/${tokenUri.slice(7)}`
    }

    console.log(`Formatted URI for #${tokenId}:`, formattedUri)

    // Fetch metadata with retry logic
    const response = await fetchWithRetry(formattedUri)
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`)
    }
    
    const metadata = await response.json()
    console.log(`Metadata for #${tokenId}:`, metadata)

    // Format IPFS image URL if needed
    if (metadata.image) {
      if (metadata.image.startsWith('ipfs://')) {
        metadata.image = `https://ipfs.io/ipfs/${metadata.image.slice(7)}`
      }
      console.log(`Formatted image URL for #${tokenId}:`, metadata.image)
    }

    return NextResponse.json(metadata)
  } catch (error: any) {
    console.error(`Error fetching NFT #${tokenId} metadata:`, error)
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch metadata' }, 
      { status: 500 }
    )
  }
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, { next: { revalidate: 3600 } })
      if (response.ok) return response
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
  throw new Error(`Failed to fetch after ${retries} retries`)
} 