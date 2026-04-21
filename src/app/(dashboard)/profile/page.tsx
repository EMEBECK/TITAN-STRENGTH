import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/(auth)/actions'
import { User, Mail, Shield, LogOut } from 'lucide-react'
import { ProfileForm } from './ProfileForm'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    profile = data || {}
  }

  return (
    <div className="space-y-12 pb-24">
      <div>
        <h3 className="text-[10px] font-black text-primary_fixed uppercase tracking-[0.4em] mb-4">PERSONNEL RECORD</h3>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tightest leading-[0.9] uppercase">
          OPERATOR PROFILE
        </h1>
      </div>

      <div className="surface-card p-10 max-w-3xl space-y-10 border border-on_surface_variant/5 hover:border-primary_fixed/20 transition-all">
         
         <div className="flex items-center gap-6 pb-10 border-b border-on_surface_variant/10">
            <div className="w-24 h-24 rounded-2xl bg-surface-container flex items-center justify-center text-primary_fixed">
               <User className="w-10 h-10" />
            </div>
            <div>
               <p className="text-[10px] font-bold text-on_surface_variant uppercase tracking-widest mb-1">IDENTIFICATION</p>
               <h2 className="text-3xl font-black italic uppercase text-white truncate max-w-[20rem] md:max-w-md">
                 {profile?.full_name || user?.email?.split('@')[0]}
               </h2>
               {profile?.sex && <p className="text-primary_fixed mt-1 text-sm font-bold tracking-widest uppercase">[{profile.sex}]</p>}
            </div>
         </div>

         <ProfileForm profile={profile} />

         <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on_surface_variant">CONTACT PROTOCOLS</h4>
            
            <div className="flex items-center gap-4 bg-surface-container p-6 rounded-xl border border-on_surface_variant/5">
               <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on_surface_variant">
                  <Mail className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-[9px] font-bold text-on_surface_variant uppercase tracking-widest">EMAIL ADDRESS</p>
                  <p className="text-lg font-black italic">{user?.email}</p>
               </div>
            </div>

            <div className="flex items-center gap-4 bg-surface-container p-6 rounded-xl border border-on_surface_variant/5">
               <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on_surface_variant">
                  <Shield className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-[9px] font-bold text-on_surface_variant uppercase tracking-widest">UID</p>
                  <p className="text-sm font-black text-on_surface_variant/60">{user?.id}</p>
               </div>
            </div>
         </div>

         <div className="pt-10 border-t border-on_surface_variant/10">
            <form action={logout}>
               <button type="submit" className="flex items-center justify-center gap-3 w-full py-5 bg-error_dim/10 hover:bg-error_dim/20 text-error_dim border border-error_dim/20 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors">
                  <LogOut className="w-4 h-4" />
                  TERMINATE SESSION
               </button>
            </form>
         </div>

      </div>
    </div>
  )
}
