import 'reflect-metadata';

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.end(JSON.stringify({ data: '❤️' }));
};
