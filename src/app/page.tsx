import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  const supabase = await createClient()

  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      redirect('/login')
    }

    // Redirect to study page if logged in
    redirect('/study')
  } catch (error) {
    // If Supabase errors, redirect to login
    redirect('/login')
  }
}
