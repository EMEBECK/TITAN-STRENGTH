'use client'

import { useState } from 'react'
import { Plus, Trash2, X, Search } from 'lucide-react'
import { PREDEFINED_EXERCISES } from '@/lib/exercises'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Set {
  id: string
  weight: string
  reps: string
}

interface Exercise {
  id: string
  name: string
  sets: Set[]
}

export function WorkoutForm() {
  const router = useRouter()
  const supabase = createClient()
  const [isSaving, setIsSaving] = useState(false)
  const [workoutName, setWorkoutName] = useState('New Session')
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showExerciseSearch, setShowExerciseSearch] = useState(false)

  const addExercise = (name: string) => {
    const newExercise: Exercise = {
      id: crypto.randomUUID(),
      name,
      sets: [{ id: crypto.randomUUID(), weight: '', reps: '' }]
    }
    setExercises([...exercises, newExercise])
    setShowExerciseSearch(false)
    setSearchTerm('')
  }

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(e => e.id !== id))
  }

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(e => {
      if (e.id === exerciseId) {
        return {
          ...e,
          sets: [...e.sets, { id: crypto.randomUUID(), weight: '', reps: '' }]
        }
      }
      return e
    }))
  }

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(e => {
      if (e.id === exerciseId) {
        return {
          ...e,
          sets: e.sets.filter(s => s.id !== setId)
        }
      }
      return e
    }))
  }

  const updateSet = (exerciseId: string, setId: string, field: 'weight' | 'reps', value: string) => {
    setExercises(exercises.map(e => {
      if (e.id === exerciseId) {
        return {
          ...e,
          sets: e.sets.map(s => s.id === setId ? { ...s, [field]: value } : s)
        }
      }
      return e
    }))
  }

  const handleSave = async () => {
    if (exercises.length === 0) return alert('Add at least one exercise')
    
    setIsSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // 1. Insert Workout
      const { data: workout, error: wError } = await supabase
        .from('workouts')
        .insert({
          user_id: user.id,
          name: workoutName,
          date: workoutDate,
        })
        .select()
        .single()

      if (wError) throw wError

      // 2. Insert Exercises & Sets
      for (const [eIndex, e] of exercises.entries()) {
        const { data: exercise, error: eError } = await supabase
          .from('exercises')
          .insert({
            workout_id: workout.id,
            name: e.name,
            order: eIndex
          })
          .select()
          .single()

        if (eError) throw eError

        const { error: sError } = await supabase
          .from('sets')
          .insert(e.sets.map((s: Set, sIndex: number) => ({
            exercise_id: exercise.id,
            weight: parseFloat(s.weight) || 0,
            reps: parseInt(s.reps) || 0,
            order: sIndex
          })))

        if (sError) throw sError
      }

      router.push('/')
      router.refresh()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const filteredExercises = PREDEFINED_EXERCISES.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-12">
      {/* Top Actions */}
      <div className="flex gap-4">
         <button 
           onClick={() => router.back()}
           className="px-8 py-4 bg-surface-container-highest text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-surface-container transition-colors"
         >
           Cancel
         </button>
         <button 
           onClick={handleSave}
           disabled={isSaving}
           className="btn-primary flex-1 max-w-[200px] uppercase tracking-widest text-xs"
         >
           {isSaving ? 'Processing...' : 'Save Workout'}
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-12 pb-24">
          {/* Workout Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-on_surface_variant uppercase tracking-[0.2em]">Session Title</label>
              <input 
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="field-input text-2xl font-black italic uppercase"
                placeholder="Upper Body Power..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-on_surface_variant uppercase tracking-[0.2em]">Deployment Date</label>
              <input 
                type="date"
                value={workoutDate}
                onChange={(e) => setWorkoutDate(e.target.value)}
                className="field-input text-2xl font-black"
              />
            </div>
          </div>

          {/* Movements List */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black italic tracking-tightest flex items-center gap-4">
              MOVEMENTS
              <span className="h-[2px] flex-1 bg-surface-container-highest"></span>
            </h2>

            <div className="space-y-6">
              {exercises.map((exercise, eIndex) => (
                <div key={exercise.id} className="surface-card p-8 space-y-8 border border-on_surface_variant/5 hover:border-primary_fixed/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black tracking-tightest italic flex items-center gap-4">
                      <span className="text-primary_fixed/40 text-sm not-italic font-bold tracking-widest">0{eIndex + 1}</span>
                      {exercise.name}
                    </h3>
                    <button onClick={() => removeExercise(exercise.id)} className="text-error_dim hover:bg-error_dim/10 p-2 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4 px-4 text-center items-center">
                       <p className="w-12 shrink-0 text-[10px] font-black text-on_surface_variant/60 uppercase tracking-widest">SET</p>
                       <p className="flex-1 min-w-0 text-[10px] font-black text-on_surface_variant/60 uppercase tracking-widest">WEIGHT (KG)</p>
                       <p className="flex-1 min-w-0 text-[10px] font-black text-on_surface_variant/60 uppercase tracking-widest">REPS</p>
                       <div className="w-12 shrink-0" />
                    </div>

                    <div className="space-y-2">
                      {exercise.sets.map((set, sIndex) => (
                        <div key={set.id} className="flex gap-4 items-center">
                           <div className="w-12 shrink-0 text-xl font-black italic text-primary_fixed text-center">0{sIndex + 1}</div>
                           <input 
                              type="number"
                              placeholder="0"
                              value={set.weight}
                              onChange={(e) => updateSet(exercise.id, set.id, 'weight', e.target.value)}
                              className="flex-1 min-w-0 bg-surface-container border-b-2 border-on_surface_variant/10 px-4 py-4 text-center text-xl font-black focus:outline-none focus:border-primary transition-all rounded-lg"
                           />
                           <input 
                              type="number"
                              placeholder="0"
                              value={set.reps}
                              onChange={(e) => updateSet(exercise.id, set.id, 'reps', e.target.value)}
                              className="flex-1 min-w-0 bg-surface-container border-b-2 border-on_surface_variant/10 px-4 py-4 text-center text-xl font-black focus:outline-none focus:border-primary transition-all rounded-lg"
                           />
                           <button onClick={() => removeSet(exercise.id, set.id)} className="w-12 shrink-0 text-on_surface_variant hover:text-white p-2 flex justify-center items-center">
                              <X className="w-5 h-5" />
                           </button>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => addSet(exercise.id)}
                      className="w-full py-4 border-2 border-dashed border-on_surface_variant/10 rounded-xl text-[10px] font-black text-on_surface_variant hover:text-primary_fixed hover:border-primary_fixed/30 transition-all uppercase tracking-[0.2em]"
                    >
                      + ADD SET
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowExerciseSearch(true)}
              className="w-full py-12 surface-card border-2 border-dashed border-on_surface_variant/10 flex flex-col items-center justify-center gap-4 group hover:border-primary_fixed/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary_fixed group-hover:text-black transition-all">
                <Plus className="w-6 h-6" />
              </div>
              <p className="text-xs font-black italic tracking-[0.3em] uppercase">APPEND NEW MOVEMENT</p>
            </button>
          </div>
        </div>

        {/* Right Column: Library / Search Overlay */}
        {showExerciseSearch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/95 backdrop-blur-2xl p-6 animate-in fade-in duration-300">
            <div className="surface-card w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border border-on_surface_variant/10 animate-in zoom-in-95 duration-300">
               <div className="p-8 border-b border-on_surface_variant/5 space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-2xl font-black italic tracking-tightest uppercase">SELECT MOVEMENT</h3>
                     <button onClick={() => setShowExerciseSearch(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                     </button>
                  </div>
                  <div className="relative">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on_surface_variant" />
                     <input 
                        autoFocus
                        placeholder="Search library or create custom..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full field-input pl-12 py-5"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && searchTerm) {
                            addExercise(searchTerm)
                          }
                        }}
                     />
                  </div>
               </div>
               
               <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {searchTerm && !filteredExercises.some(e => e.name.toLowerCase() === searchTerm.toLowerCase()) && (
                    <button 
                      onClick={() => addExercise(searchTerm)}
                      className="col-span-full p-6 flex items-center justify-between bg-primary_fixed/10 border border-primary_fixed/20 rounded-xl text-left group hover:bg-primary_fixed/20 transition-all"
                    >
                      <div>
                        <p className="text-[10px] font-black text-primary_fixed uppercase tracking-widest mb-1">DEPLOY CUSTOM</p>
                        <p className="text-xl font-black italic uppercase italic">{searchTerm}</p>
                      </div>
                      <Plus className="w-6 h-6 text-primary_fixed" />
                    </button>
                  )}

                  {filteredExercises.map(ex => (
                    <button 
                      key={ex.name}
                      onClick={() => addExercise(ex.name)}
                      className="p-6 text-left bg-surface-container rounded-xl hover:bg-surface-container-highest transition-all group border border-transparent hover:border-primary_fixed/20"
                    >
                      <p className="text-[10px] font-bold text-on_surface_variant/60 uppercase tracking-widest mb-1">{ex.category}</p>
                      <p className="text-md font-black italic uppercase group-hover:text-primary_fixed transition-colors">{ex.name}</p>
                    </button>
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
