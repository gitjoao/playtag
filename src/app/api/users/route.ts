import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, avatar_url, bio } = await req.json();
  const { data, error } = await supabase
    .from('users')
    .insert([{ username, avatar_url, bio }])
    .select()
    .single();
  if (error) return NextResponse.json({ message: `Usuário não cadastrado` }, { status: 400 });
  return NextResponse.json({ message: 'Usuário criado', user: data.username }, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, bio } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};

  if (bio !== undefined) updates.bio = bio;

  const { data, error } = await supabase.from('users').update(updates).eq('id', id).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Atualizado com sucesso', data });
}
