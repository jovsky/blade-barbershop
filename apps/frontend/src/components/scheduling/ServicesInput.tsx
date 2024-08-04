import { useServices } from '@barbers-blade/ui'
import { Service } from '@barba/core'
import Image from 'next/image'

export interface ServicesInputProps {
  services: Service[]
  onServicesChange: (services: Service[]) => void
}

function ServiceOption(props: { service: Service; onClick: (s: Service) => void; isSelected?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer select-none border rounded-lg overflow-hidden 
            ${props.isSelected ? 'border-green-400' : 'border-zinc-700'}`}
      onClick={() => props.onClick(props.service)}
    >
      <Image src={props.service.imageURL} alt={props.service.name} width={150} height={120} />
      <div
        className={`
                    py-2 w-full h-full text-center text-xs
                    ${props.isSelected ? 'text-black bg-green-400 font-semibold' : 'text-zinc-400 font-light bg-zinc-900 '}
                `}
      >
        {props.service.name}
      </div>
    </div>
  )
}

export default function ServicesInput(props: ServicesInputProps) {
  const { onServicesChange } = props
  const { services } = useServices()

  function changeSelectedService(service: Service) {
    const selectedService = props.services.find((s) => s.id === service.id)
    onServicesChange(selectedService ? props.services.filter((s) => s.id !== service.id) : [...props.services, service])
  }

  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">Available Services</span>
      <div className="grid grid-cols-3 self-start gap-5">
        {services.map((service) => (
          <ServiceOption
            key={service.id}
            service={service}
            onClick={changeSelectedService}
            isSelected={props.services.some((s) => s.id === service.id)}
          />
        ))}
      </div>
    </div>
  )
}
