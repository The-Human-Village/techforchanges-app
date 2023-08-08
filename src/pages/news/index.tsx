import { getCommonServerSideProps } from '@/api/services/utils'
import { ContainerNews } from '@/components/containers/container-news/container-news'
import { QueryClient } from '@tanstack/react-query'
import type { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  return getCommonServerSideProps(context, queryClient)
}

export default function News() {
  return <ContainerNews />
}
