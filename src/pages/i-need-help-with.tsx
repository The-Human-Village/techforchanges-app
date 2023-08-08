import { getCommonServerSideProps } from '@/api/services/utils'
import { ContainerINeedHelpWith } from '@/components/containers/container-i-need-help-with/container-i-need-help-with'
import { QueryClient } from '@tanstack/react-query'
import type { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  return getCommonServerSideProps(context, queryClient)
}

export default function INeedHelpWith() {
  return <ContainerINeedHelpWith />
}
