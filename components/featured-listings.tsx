import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface ListingProps {
  title: string
  features: string[]
  description: string
}

function ListingCard({ title, features, description }: ListingProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="bg-gray-200 h-40 mb-4 rounded-md" />
        <h3 className="font-semibold mb-2">{title}</h3>
        {features.map((feature, index) => (
          <p key={index} className="text-sm text-gray-600">🌿 {feature}</p>
        ))}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">{description}</p>
      </CardFooter>
    </Card>
  )
}

export default function FeaturedListings() {
  const listings = [
    { title: 'Property #1', features: ['Sustainable Materials', 'Sustainable Materials'], description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta lacus porta...' },
    { title: 'Property #1', features: ['Sustainable Materials', 'Sustainable Materials'], description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta lacus porta...' },
    { title: 'Property #1', features: ['Sustainable Materials', 'Sustainable Materials'], description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta lacus porta...' },
    { title: 'Property #1', features: ['Sustainable Materials', 'Sustainable Materials'], description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta lacus porta...' },
  ]

  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Featured listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.map((listing, index) => (
          <ListingCard key={index} {...listing} />
        ))}
      </div>
    </section>
  )
}
