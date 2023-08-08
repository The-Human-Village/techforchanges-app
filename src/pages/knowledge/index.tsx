import { getCommonServerSideProps } from '@/api/services/utils'
import { ContainerKnowledge } from '@/components/containers/container-knowledge/container-knowledge'
import { QueryClient } from '@tanstack/react-query'
import type { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  return getCommonServerSideProps(context, queryClient)
}

export default function Knowledge() {
  return <ContainerKnowledge />
}
