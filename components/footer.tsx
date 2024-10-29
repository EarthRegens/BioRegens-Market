import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full h-[152px] bg-gray-100">
      <div className="mx-auto w-[960px] h-[152px] max-w-[960px]">
        <div className="flex flex-col gap-4 p-6">
          {/* Top line with links */}
          <div className="w-[920px] h-[24px] flex justify-between">
            {[
              'Terms of Service',
              'Privacy Policy',
              'Risk Disclosure',
              'FAQ'
            ].map((text) => (
              <Link 
                key={text}
                href={`/${text.toLowerCase().replace(/\s+/g, '-')}`}
                className="w-[160px] h-[24px] font-jakarta text-base leading-6 text-center text-gray-600 hover:text-gray-900"
              >
                {text}
              </Link>
            ))}
          </div>
          
          {/* Bottom line with copyright */}
          <div className="w-[920px] h-[24px] font-jakarta text-base leading-6 text-center text-gray-500">
            © 2023 Green Bonds
          </div>
        </div>
      </div>
    </footer>
  )
}
