import Image from 'next/image'
import Link from 'next/link'

export default function SuccessfulScheduling() {
  return (
    <>
      <Image src="/scheduling.png" width={400} height={400} alt="Successfully Scheduled" />
      <h2 className="text-3xl font-black">Yeeaaahhh! You have been scheduled!</h2>
      <h3 className="text-zinc-400 text-lg font-thin w-96 text-center">
        {"All done here with your scheduling, we're excited to see you shine soon!"}
      </h3>
      <Link href="/" className="button mt-7 bg-green-600">
        Go back to home page
      </Link>
    </>
  )
}
