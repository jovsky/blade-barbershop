"use client"
import Page from "@/components/shared/Page"
import { PropsWithChildren } from "react"

export default function Layout(props: PropsWithChildren) {
  return <Page>{props.children}</Page>
}
