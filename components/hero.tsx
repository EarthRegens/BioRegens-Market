import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative w-[928px] h-[344px] rounded-tl-xl overflow-hidden">
        <Image
          src="/forest-waterfall.jpg"
          alt="Lush green forest with a waterfall"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/40" />
        <div className="relative z-10 h-full flex flex-col justify-center text-white pl-[51px] pr-4">
          <h1 className="font-jakarta text-5xl font-extrabold leading-[60px] tracking-[-2px] text-left mb-2">
            Welcome to Biota
          </h1>
          <p className="font-jakarta text-base font-bold leading-6 text-left max-w-2xl mb-8">
            Invest in a sustainable future. Find and invest in green bonds that support renewable energy, sustainable water, and more.
          </p>
          <div className="flex w-full max-w-md mb-8" suppressHydrationWarning>
            <Input 
              type="text" 
              placeholder="Search properties" 
              className="rounded-r-none bg-[#F0F2F5] border-none text-gray-800"
            />
            <Button className="rounded-l-none bg-[#F0F2F5] text-gray-800 hover:bg-[#E1E3E6]">Search</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Live nature cam', 'Sustainable', 'Biodiversity Monitoring', 'High ESG Rate', 'Native people work', 'WELL Certification', 'Responsible Investment'].map((tag) => (
              <span key={tag} className="bg-[#F0F2F5] text-gray-800 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
