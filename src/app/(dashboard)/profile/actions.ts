'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const updates = {
    id: user.id,
    full_name: formData.get('full_name') as string,
    sex: formData.get('sex') as string,
    phone: formData.get('phone') as string,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('profiles').upsert(updates)
  if (error) throw error

  revalidatePath('/profile')
  return { success: true }
}
