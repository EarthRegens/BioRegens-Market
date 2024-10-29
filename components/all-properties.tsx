import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PropertyProps {
  title: string
  description: string
  color: string
}

function PropertyCard({ title, description, color }: PropertyProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className={`h-40 mb-4 rounded-md ${color}`} />
        <h3 className="font-semibold mb-2">{title}</h3>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">{description}</p>
      </CardFooter>
    </Card>
  )
}

export default function AllProperties() {
  const properties = [
    { title: 'Property #2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta lacus porta...', color: 'bg-green-500' },
    { title: 'Property #2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta lacus porta...', color: 'bg-green-500' },
    { title: 'Property #2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta lacus porta...', color: 'bg-green-500' },
    { title: 'Property #2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta lacus porta...', color: 'bg-green-500' },
    { title: 'Property #2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta lacus porta...', color: 'bg-green-500' },
    { title: 'Property #2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta lacus porta...', color: 'bg-green-500' },
    { title: 'Property #2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta lacus porta...', color: 'bg-green-500' },
  ]

  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">All Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        <Button variant="outline">&lt;</Button>
        {[1, 2, 3, 4, 5].map((page) => (
          <Button key={page} variant={page === 1 ? 'default' : 'outline'}>{page}</Button>
        ))}
        <Button variant="outline">&gt;</Button>
      </div>
    </section>
  )
}
