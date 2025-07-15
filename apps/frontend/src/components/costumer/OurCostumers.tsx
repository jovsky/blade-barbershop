import { LayoutGrid } from '../ui/layout-grid'
import CostumerItem from './CostumerItem'
import Title from '@/components/shared/Title'
import useCostumers from '@/data/hooks/useCostumers'

const classes = ['md:col-span-2', 'col-span-1', 'col-span-1', 'md:col-span-2']

export default function OurCostumers() {
  const { costumers } = useCostumers()

  const cards = costumers.map((cliente, i) => {
    return {
      id: cliente.id,
      content: <CostumerItem name={cliente.name} testimony={cliente.testimony} />,
      className: classes[i % classes.length]!,
      thumbnail: cliente.imagemURL,
    }
  })

  return (
    <div className="container flex flex-col items-center gap-16">
      <Title
        tag="Customers"
        primary="Who's the Boss Here"
        secondary="Our customers are the bosses! Here, they call the shots, change their minds, and still leave with rockstar style!"
      />
      <div className="h-[900px] w-full">
        <LayoutGrid cards={cards} />
      </div>
    </div>
  )
}
