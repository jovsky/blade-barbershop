import { CurrencyUtils, Service } from '@barbers-blade/core'
import Image from 'next/image'

export interface ServiceItemProps {
  service: Service
  onClick?: (service: Service) => void
}

export default function ServiceItem(props: ServiceItemProps) {
  return (
    <div
      className={`
                flex rounded-xl overflow-hidden bg-zinc-800 
                ${props.onClick && 'cursor-pointer'} select-none
            `}
      onClick={() => props.onClick?.(props.service)}
    >
      <Image src={props.service.imageURL} width={150} height={150} alt={props.service.name} className="object-cover" />
      <div className="flex flex-col p-5 gap-2">
        <span className="text-xl font-black">{props.service.name}</span>
        <span className="text-xs text-zinc-400 flex-1">{props.service.description}</span>
        <span className="text-lg font-bold">{CurrencyUtils.formatCurrency(props.service.price)}</span>
      </div>
    </div>
  )
}
