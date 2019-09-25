import 'reflect-metadata';

import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../../db/Database';
import { Connection } from 'typeorm';
import { Item } from '../../../entity/Item';
import { validate } from 'class-validator';
import { Http } from '@status/codes';

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const db = new Database();
  let dbConn: Connection = await db.getConnection();

  const {
    name,
    description,
    price,
    height,
    width,
    length,
    quantity,
    accessories
  } = req.body || ({} as any);

  const newItem = new Item();

  newItem.name = name;
  newItem.description = description;
  newItem.price = price;
  newItem.height = height;
  newItem.width = width;
  newItem.length = length;
  newItem.quantity = quantity;
  newItem.accessories = accessories;

  const errors = await validate(newItem);

  if (errors.length > 0) {
    res.statusCode = Http.NotAcceptable;
    res.send({ errors });
    return;
  }
  try {
    const data = await dbConn.getRepository(Item).save(newItem);

    res.statusCode = Http.Created;
    res.send(data);
  } catch (e) {
    res.statusCode = Http.InternalServerError;
    res.send({ errors: [e] });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const db = new Database();
  let dbConn: Connection = await db.getConnection();

  const data = await dbConn.getRepository(Item).find();

  res.json(data);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return await handleGet(req, res);
  }
  if (req.method === 'POST') {
    return await handlePost(req, res);
  }

  res.statusCode = Http.MethodNotAllowed;
  res.send(null);
};
