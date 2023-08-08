import { getCommonServerSideProps } from '@/api/services/utils'
import { ContainerServices } from '@/components/containers/container-services/container-services'
import { QueryClient } from '@tanstack/react-query'
import type { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  return getCommonServerSideProps(context, queryClient)
}

export default function Services() {
  return <ContainerServices />
}
