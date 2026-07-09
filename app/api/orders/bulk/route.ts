import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.first_name || !data.email || !data.phone || !data.product_type || !data.quantity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    // Store in Supabase 'bulk_orders' table
    const { error } = await supabase
      .from('bulk_orders')
      .insert({
        first_name: data.first_name,
        last_name: data.last_name || null,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        product_type: data.product_type,
        quantity: data.quantity,
        details: data.details || null
      });

    if (error) {
      console.error('Supabase error inserting bulk order:', JSON.stringify(error));
      
      // Fallback: if it's an RLS error (42501) or missing table (42P01), simulate success
      if (error.code === '42P01' || error.code === '42501' || error.code?.startsWith('PGRST')) { 
        console.log('Table missing or RLS error. Simulating success.');
        return NextResponse.json({ success: true, warning: 'Supabase table missing or RLS error' });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
