import { ServiceProviderDetails } from '@/components/containers/container-services/service-provider-list/service-provider/service-provider-details/service-provider-details'

export async function getServerSideProps(context) {
  const { id } = context.params

  return {
    props: {
      id,
    },
  }
}

export default function ServiceProviderDetailsPage({ id }) {
  return <ServiceProviderDetails id={id} />
}
