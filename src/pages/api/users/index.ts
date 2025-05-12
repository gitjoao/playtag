import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      if (req.method !== 'GET') return res.status(405).end();

      const { data, error } = await supabase.from('users').select('*');
      if (error) return res.status(500).json({ error: error.message });

      res.status(200).json(data);
    }
    case 'POST': {
      const { username, avatar_url, bio } = req.body;

      if (!username || !avatar_url || bio)
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });

      const { data, error } = await supabase
        .from('users')
        .insert([{ username, avatar_url, bio }])
        .select()
        .single();

      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(data);
    }
    default:
      return res.status(405).json({ error: 'Método não permitido' });
  }
}
