import { getCommonServerSideProps } from '@/api/services/utils'
import { ContainerOnboarding } from '@/components/containers/container-onboarding/container-onboarding'
import { QueryClient } from '@tanstack/react-query'
import type { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  return getCommonServerSideProps(context, queryClient)
}

export default function Onboarding() {
  return <ContainerOnboarding />
}
