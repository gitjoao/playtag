import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { title, url, icon } = await req.json();
  const user_id = '0de7c8a9-675b-4f3c-a9f0-6fb0ac1677cc'

  const { data, error } = await supabase
    .from('links')
    .insert([{ title, url, user_id, icon }])
    .select()
    .single();

  if (error) return NextResponse.json({ message: `Link não cadastrado` }, { status: 400 });
  return NextResponse.json({ message: 'Link criado', user: data.url }, { status: 201 });
}

export async function PUT(req: Request) {

  const {id, title, url, icon} = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
  }

  const { data, error } = await supabase.from('links').update({title, url, icon}).eq('id', id).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Atualizado com sucesso', data });
}
