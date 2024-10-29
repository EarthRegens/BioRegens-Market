import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import FeaturedListings from '@/components/featured-listings'
import AllProperties from '@/components/all-properties'
import Footer from '@/components/footer'
import { NftGallery } from '@/components/nft-gallery'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <NftGallery />
        <FeaturedListings />
        <AllProperties />
      </main>
      <Footer />
    </div>
  )
}
