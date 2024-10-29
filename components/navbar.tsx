import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full h-[65px] px-10 py-5 bg-white border-b border-gray-200">
      <Link href="/" className="text-2xl font-bold pl-10">
        🌿 Biota
      </Link>
      <div className="flex items-center">
        <div className="flex items-center w-[192px] h-10 gap-9 mr-8">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-jakarta text-sm font-medium leading-[21px]">Home</Link>
          <Link href="/invest" className="text-gray-600 hover:text-gray-900 font-jakarta text-sm font-medium leading-[21px]">Invest</Link>
          <Link href="/learn" className="text-gray-600 hover:text-gray-900 font-jakarta text-sm font-medium leading-[21px]">Learn</Link>
        </div>
        <Button 
          variant="default" 
          className="bg-[#388FE5] hover:bg-[#3080D0] text-white rounded-xl h-10 px-4 min-w-[84px] max-w-[480px] w-[133px] mr-8"
        >
          Create a listing
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}
