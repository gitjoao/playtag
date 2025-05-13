import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { username, avatar_url, bio } = await req.json();
          const { data, error } = await supabase
            .from('users')
            .insert([{ username, avatar_url, bio }])
            .select()
            .single();
            if (error) return NextResponse.json(
                { message: `Usuário não cadastrado` },
                { status: 400 }
              );
    return NextResponse.json({ message: 'Usuário criado', user: data.username }, { status: 201 });
  }