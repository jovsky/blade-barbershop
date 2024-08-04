import { IconCalendar } from '@tabler/icons-react'
import { Loader2 } from 'lucide-react'
import { FC, useState } from 'react'
import useScheduling from '@/data/hooks/useScheduling'
import { useRouter } from 'next/navigation'
import { CurrencyUtils, DateUtils } from '@barba/core'

export default function Summary() {
  const [loading, setLoading] = useState(false)
  const { dateTime, professional, services, totalPrice, totalDuration, schedule } = useScheduling()

  const router = useRouter()

  async function finishScheduling() {
    try {
      setLoading(true)
      await schedule()
      router.push('/scheduling/success')
    } finally {
      setLoading(false)
    }
  }

  const SelectedService: FC<{ serviceName: string; number: number }> = ({ serviceName, number }) => {
    return (
      <div className="flex items-center  bg-zinc-700 rounded-md">
        <span className="flex justify-center items-center text-xs text-zinc-400 px-3 bg-black/25 w-5 py-1.5">{number}</span>
        <span className="text-sm font-light text-zinc-300 px-2">{serviceName}</span>
      </div>
    )
  }

  function finishAllowed() {
    if (!professional) return false
    if (!services.length) return false
    return dateTime && dateTime.getHours() >= 8 && dateTime.getHours() <= 21
  }

  return (
    <div className="flex flex-col bg-zinc-950 rounded-lg w-96 lg:w-80">
      <div className="flex gap-2 p-4 border-b border-zinc-800">
        <div className="flex justify-center items-center bg-zinc-800 h-9 w-9 rounded-full">
          <IconCalendar stroke={1} size={20} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-zinc-300 leading-6">Scheduling Summary</span>
          <span className="text-xs text-zinc-400 leading-3">It will be a pleasure to have you here!</span>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-6 border-b border-zinc-800">
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase text-zinc-400">Barber</span>
          <span className="text-sm text-white">{professional ? professional.name : 'Não selecionado'}</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase text-zinc-400">Services</span>
          <span className="flex gap-2 flex-wrap text-sm text-white">
            {services.length
              ? services.map((service, i) => <SelectedService key={i} serviceName={service.name} number={i + 1} />)
              : 'Not selected'}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase text-zinc-400">Duration</span>
          <span className="text-sm text-white">{totalDuration()}</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase text-zinc-400">Date and Time</span>
          <span className="text-sm text-white">{dateTime && DateUtils.toDateTimeLocaleString(dateTime)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center border-b border-zinc-800 p-5">
        <span className="text-xs uppercase text-zinc-400">Total Value</span>
        <span className=" text-yellow-400 font-semibold">{CurrencyUtils.formatCurrency(totalPrice())}</span>
      </div>
      <div className="p-5">
        <button
          className={`flex justify-center items-center text-sm font-semibold ${finishAllowed() ? 'bg-yellow-400' : 'bg-zinc-600'} text-zinc-900 w-full py-3 rounded-lg`}
          disabled={!finishAllowed()}
          onClick={finishScheduling}
        >
          {loading && dateTime ? <Loader2 className="animate-spin" size={32} /> : 'Send Scheduling'}
        </button>
      </div>
    </div>
  )
}
