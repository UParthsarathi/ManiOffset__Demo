import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Server-side validation
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Store in Supabase 'quotes' table
    const { error } = await supabase
      .from('quotes')
      .insert({
        user_id: user?.id ?? null,
        name: data.name,
        email: data.email,
        phone: data.phone,
        organization: data.organization || null,
        product_id: data.product_id || null,
        product_title: data.product_title || null,
        copies: data.copies,
        pages: data.pages,
        size_format: data.size_format,
        binding: data.binding,
        inner_color: data.inner_color,
        inner_paper: data.inner_paper,
        wrapper: data.wrapper,
        estimated_price: data.estimated_price
      });

    if (error) {
      console.error('Supabase error inserting quote:', JSON.stringify(error));
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
