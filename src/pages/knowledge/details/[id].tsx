import { KnowledgeDetails } from '@/components/containers/container-knowledge/knowledge-details/knowledge-details'

export async function getServerSideProps(context) {
  const { id } = context.params

  return {
    props: {
      id,
    },
  }
}

export default function KnowledgeDetailsPage({ id }) {
  return <KnowledgeDetails id={id} />
}
