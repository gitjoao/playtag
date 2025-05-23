import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;

  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) {
    console.error(error)
    return NextResponse.json({ message: `Link ${id} não encontrado` }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;

  const { error} = await supabase.from('links').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ message: `Link ${id} não encontrado` }, { status: 404 });
  }

  return NextResponse.json({ message: `Link ${id} removido` }, { status: 200 });
  
}