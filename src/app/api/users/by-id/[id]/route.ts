import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;

  const { data, error } = await supabase
    .from('users')
    .select('id, username, avatar_url, bio, links(*)')
    .eq('id', id)
    .single();
  if (error || !data) {
    return NextResponse.json({ message: `Usuário ${id} não encontrado` }, { status: 404 });
  }

  return NextResponse.json(data);
}
