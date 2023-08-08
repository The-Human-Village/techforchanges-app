import { NewsDetails } from '@/components/containers/container-news/news-details/news-details'

export async function getServerSideProps(context) {
  const { id } = context.params

  return {
    props: {
      id,
    },
  }
}

export default function NewsDetailsPage({ id }) {
  return <NewsDetails id={id} />
}
