/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'

export default (_req: NextApiRequest, res: NextApiResponse<void>) => {
  res.setHeader('next-js', 'All OK')
  res.status(204).end()
}
