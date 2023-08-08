import { ServiceDetails } from '@/components/containers/container-services/service-details/service-details'

export async function getServerSideProps(context) {
  const { id } = context.params

  return {
    props: {
      id,
    },
  }
}

export default function ServiceDetailsPage({ id }) {
  return <ServiceDetails id={id} />
}
