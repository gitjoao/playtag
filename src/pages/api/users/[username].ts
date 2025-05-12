import { supabase } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (!username || typeof username !== 'string')
    return res.status(400).json({ error: 'ID inválido' });

  switch (req.method) {
    case 'GET': {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
      if (error) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.status(200).json(data);
    }

    case 'PUT': {
      const { avatar_url, bio } = req.body;

      const { data: user, error: err } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .single();
      console.error(err);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      const { data, error } = await supabase
        .from('users')
        .update({ username, avatar_url, bio })
        .eq('id', user.id)
        .select()
        .single();

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    case 'DELETE': {
      return res.status(204).end();
    }

    default:
      return res.status(405).json({ error: 'Método não permitido' });
  }
}
