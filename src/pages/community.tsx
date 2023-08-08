import { getCommonServerSideProps } from '@/api/services/utils'
import { ContainerCommunity } from '@/components/containers/container-community/container-community'
import { QueryClient } from '@tanstack/react-query'
import type { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  return getCommonServerSideProps(context, queryClient)
}

export default function Community() {
  return <ContainerCommunity />
}
