import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const testData = await prisma.test.findMany();
      return res.status(200).json(testData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
    }
  }

  else if (req.method === 'POST') {
    try {
      const { inhalt } = req.body; // Daten aus dem Request holen

      const newTest = await prisma.test.create({
        data: {
            inhalt,
        },
      });

      return res.status(201).json(newTest);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Fehler beim Erstellen des Eintrags' });
    }
  }

  return res.status(405).json({ error: 'Methode nicht erlaubt' });
}