import { useProfessionals } from '@barbers-blade/ui'
import { Professional } from '@barbers-blade/core'
import Image from 'next/image'

export interface ProfessionalInputProps {
  professional: Professional | null
  onProfessionalChange: (professional: Professional) => void
}

const ProfessionalOption = (props: { professional: Professional; onClick: (p: Professional) => void; isSelected?: boolean }) => {
  return (
    <div
      className={`
                flex flex-col items-center cursor-pointer select-none rounded-lg border w-[150px] h-[180px]
                ${props.isSelected ? 'border-green-400' : 'border-zinc-700'} overflow-hidden
            `}
      onClick={() => props.onClick(props.professional)}
    >
      <Image src={props.professional.imageURL} alt={props.professional.name} width={150} height={150} />
      <div
        className={`
                    py-2 w-full h-full text-center text-xs
                    ${props.isSelected ? 'text-black bg-green-400 font-semibold' : 'text-zinc-400 font-light bg-zinc-900 '}
                `}
      >
        {props.professional.name}
      </div>
    </div>
  )
}

export default function ProfessionalInput(props: ProfessionalInputProps) {
  const { professionals } = useProfessionals()

  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">Available Barbers</span>
      <div className="grid grid-cols-2 md:grid-cols-3 self-start gap-5">
        {professionals.map((professional) => (
          <ProfessionalOption
            key={professional.id}
            professional={professional}
            onClick={props.onProfessionalChange}
            isSelected={professional.id === props.professional?.id}
          />
        ))}
      </div>
    </div>
  )
}
