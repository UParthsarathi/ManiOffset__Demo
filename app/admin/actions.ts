'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'
import { ADMIN_EMAIL, ADMIN_USERNAME } from '../../lib/admin'
import { parseRates } from '../../lib/offset-pricing'

// One fixed admin. Any other name is turned away before a sign-in is even attempted,
// and every failure gets the same message so the form gives nothing away.
export async function login(formData: FormData) {
  const fail = () => redirect('/admin/login?message=' + encodeURIComponent('Wrong username or password.'))

  const username = String(formData.get('username') ?? '').trim().toLowerCase()
  // The admin's own email is accepted too: it names the same account, and typing it is a natural slip.
  if (username !== ADMIN_USERNAME && username !== ADMIN_EMAIL) return fail()

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password: String(formData.get('password') ?? ''),
  })
  if (error) return fail()

  revalidatePath('/', 'layout')
  redirect('/admin')
}

// Publishes a new rate card version. Server actions are public endpoints, so the admin
// check and the number check both happen here (and again in the table's RLS policy).
export async function publishRates(rates: unknown, note: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== ADMIN_EMAIL) return { error: 'Not signed in as the admin.' }

  const clean = parseRates(rates)
  if (!clean) return { error: 'Every rate must be a number above zero.' }

  const { error } = await supabase
    .from('rate_cards')
    .insert({ rates: clean, note: String(note).slice(0, 200), created_by: user.email })
  if (error) return { error: error.message }

  revalidatePath('/calculator')
  revalidatePath('/admin/calculator')
  return {}
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
