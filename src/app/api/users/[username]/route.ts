import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, context: { params: { username: string } }) {
  const { username } = await context.params;

  const { data: user, error } = await supabase
    .from('users')
    .select('id, username, avatar_url, bio')
    .eq('username', username)
    .single();
  if (error || !user) {
    return NextResponse.json({ message: `Usuário ${username} não encontrado` }, { status: 404 });
  }

  const { data: links, error: linksError } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', user.id);

  if (linksError) {
    return NextResponse.json(
      { message: `Erro ao buscar links do usuário ${username}` },
      { status: 500 },
    );
  }

  return NextResponse.json({
    user,
    links,
  });
}
