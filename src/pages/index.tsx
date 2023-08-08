import { getCommonServerSideProps } from '@/api/services/utils'
import { ContainerHome } from '@/components/containers/container-home/container-home'
import { QueryClient } from '@tanstack/react-query'
import type { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  return getCommonServerSideProps(context, queryClient)
}

export default function Home() {
  return <ContainerHome />
}
