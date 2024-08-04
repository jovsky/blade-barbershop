'use client'
import { SchedulingProvider } from '@/data/contexts/SchedulingContext'
import ForceUser from '@/components/shared/ForceUser'
import Page from '@/components/shared/Page'
import { PropsWithChildren } from 'react'

export default function Layout(props: PropsWithChildren) {
  return (
    <ForceUser>
      <SchedulingProvider>
        <Page>{props.children}</Page>
      </SchedulingProvider>
    </ForceUser>
  )
}
