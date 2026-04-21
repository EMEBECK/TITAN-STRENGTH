'use client'

import { useState } from 'react'
import { updateProfile } from './actions'
import { Edit2, Save, X } from 'lucide-react'

export function ProfileForm({ profile }: { profile: any }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleAction = async (formData: FormData) => {
    setIsSaving(true)
    try {
      const res = await updateProfile(formData)
      if (res.success) {
        setIsEditing(false)
      }
    } catch (e: any) {
      alert('Error updating databanks: ' + e.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isEditing) {
    return (
      <div className="space-y-6 pb-6 border-b border-on_surface_variant/10">
        <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on_surface_variant">OPERATOR DETAILS</h4>
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-[10px] font-bold text-primary_fixed hover:text-white transition-colors uppercase tracking-[0.2em]">
              <Edit2 className="w-4 h-4" />
              UPDATE DATA
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-surface-container p-6 rounded-xl border border-on_surface_variant/5">
              <p className="text-[9px] font-bold text-on_surface_variant uppercase tracking-widest">FULL NAME</p>
              <p className="text-lg font-black italic">{profile?.full_name || 'UNDEFINED'}</p>
           </div>
           <div className="bg-surface-container p-6 rounded-xl border border-on_surface_variant/5">
              <p className="text-[9px] font-bold text-on_surface_variant uppercase tracking-widest">SEX</p>
              <p className="text-lg font-black italic">{profile?.sex || 'UNDEFINED'}</p>
           </div>
           <div className="bg-surface-container p-6 rounded-xl border border-on_surface_variant/5 md:col-span-2">
              <p className="text-[9px] font-bold text-on_surface_variant uppercase tracking-widest">PHONE NUMBER</p>
              <p className="text-lg font-black italic">{profile?.phone || 'UNDEFINED'}</p>
           </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6 border-b border-on_surface_variant/10">
       <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on_surface_variant">UPDATING DATABANKS...</h4>
          <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 text-[10px] font-bold text-error_dim hover:text-white transition-colors uppercase tracking-[0.2em]">
            <X className="w-4 h-4" />
            CANCEL
          </button>
       </div>

       <form action={handleAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[9px] font-bold text-on_surface_variant uppercase tracking-widest">FULL NAME</label>
                <input required name="full_name" defaultValue={profile?.full_name || ''} className="field-input w-full" placeholder="John Doe" />
             </div>
             <div className="space-y-2">
                <label className="text-[9px] font-bold text-on_surface_variant uppercase tracking-widest">SEX</label>
                <select required name="sex" defaultValue={profile?.sex || ''} className="field-input w-full appearance-none cursor-pointer">
                   <option value="" disabled>Select...</option>
                   <option value="Male">Male</option>
                   <option value="Female">Female</option>
                </select>
             </div>
             <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-bold text-on_surface_variant uppercase tracking-widest">PHONE NUMBER</label>
                <input name="phone" defaultValue={profile?.phone || ''} className="field-input w-full" placeholder="+1 (555) 000-0000" />
             </div>
          </div>
          <button type="submit" disabled={isSaving} className="btn-primary w-full py-4 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
             <Save className="w-4 h-4" />
             {isSaving ? 'UPLOADING...' : 'CONFIRM CHANGES'}
          </button>
       </form>
    </div>
  )
}
