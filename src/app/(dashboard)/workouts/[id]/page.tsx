import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Calendar, Clock, Dumbbell, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const supabase = await createClient()
  
  const { data: workout, error } = await supabase
    .from('workouts')
    .select('*, exercises(*, sets(*))')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !workout) {
    notFound()
  }

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
           <Link 
             href="/workouts" 
             className="inline-flex items-center gap-2 text-[10px] font-black text-on_surface_variant hover:text-primary_fixed uppercase tracking-[0.3em] transition-colors"
           >
             <ArrowLeft className="w-4 h-4" />
             Back to Records
           </Link>
           <h3 className="text-[10px] font-black text-primary_fixed uppercase tracking-[0.4em]">DEPLOYMENT: {resolvedParams.id.slice(0, 8)}</h3>
           <h1 className="text-6xl md:text-8xl font-black italic tracking-tightest leading-[0.9] uppercase">
             {workout.name}
           </h1>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 items-center bg-surface-container-low p-8 rounded-xl border border-on_surface_variant/5">
         <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary_fixed" />
            <div>
               <p className="text-[10px] font-bold text-on_surface_variant uppercase tracking-widest">DATE</p>
               <p className="text-lg font-black italic uppercase">
                 {new Date(workout.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
               </p>
            </div>
         </div>
         <div className="w-[1px] h-10 bg-on_surface_variant/10 hidden md:block" />
         <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary_fixed" />
            <div>
               <p className="text-[10px] font-bold text-on_surface_variant uppercase tracking-widest">DURATION</p>
               <p className="text-lg font-black italic uppercase">{workout.duration || 0} MIN</p>
            </div>
         </div>
         <div className="w-[1px] h-10 bg-on_surface_variant/10 hidden md:block" />
         <div className="flex items-center gap-3">
            <Dumbbell className="w-5 h-5 text-primary_fixed" />
            <div>
               <p className="text-[10px] font-bold text-on_surface_variant uppercase tracking-widest">MOVEMENTS</p>
               <p className="text-lg font-black italic uppercase">{workout.exercises?.length || 0} TOTAL</p>
            </div>
         </div>
      </div>

      <div className="space-y-8">
        {workout.exercises?.sort((a: any, b: any) => a.order - b.order).map((exercise: any) => (
          <div key={exercise.id} className="surface-card p-10 space-y-8">
             <div className="flex items-center justify-between border-b border-on_surface_variant/5 pb-6">
                <h3 className="text-3xl font-black tracking-tightest italic uppercase">
                  {exercise.name}
                </h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {exercise.sets?.sort((a: any, b: any) => a.order - b.order).map((set: any, index: number) => (
                  <div key={set.id} className="bg-surface-container p-6 rounded-xl border border-on_surface_variant/5 hover:border-primary_fixed/20 transition-all">
                     <p className="text-[10px] font-black text-primary_fixed uppercase tracking-[0.2em] mb-4 text-center border-b border-primary_fixed/10 pb-2">SET 0{index + 1}</p>
                     <div className="flex items-center justify-center gap-4">
                        <div className="text-center">
                           <p className="text-[9px] font-bold text-on_surface_variant uppercase tracking-widest">WEIGHT</p>
                           <p className="text-3xl font-black italic">{set.weight}<span className="text-xs ml-1 opacity-50">KG</span></p>
                        </div>
                        <div className="text-center">
                           <p className="text-[9px] font-bold text-on_surface_variant uppercase tracking-widest">REPS</p>
                           <p className="text-3xl font-black italic">{set.reps}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}
