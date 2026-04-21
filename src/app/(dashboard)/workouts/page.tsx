import { createClient } from '@/utils/supabase/server'
import { Dumbbell, Calendar, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function WorkoutsPage() {
  const supabase = await createClient()
  
  const { data: workouts } = await supabase
    .from('workouts')
    .select('*, exercises(*, sets(*))')
    .order('date', { ascending: false })

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h3 className="text-[10px] font-black text-primary_fixed uppercase tracking-[0.4em] mb-4">RECORDS: HISTORY</h3>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tightest leading-[0.9] uppercase">
            WORKOUT LOG
          </h1>
        </div>
        <Link 
          href="/workouts/new"
          className="btn-primary py-6 px-10 text-[10px] uppercase tracking-[0.3em] h-fit"
        >
          LOG NEW SESSION
        </Link>
      </div>

      <div className="space-y-4">
        {workouts && workouts.length > 0 ? (
          workouts.map((workout) => {
            const totalVolume = workout.exercises?.reduce((acc: number, e: any) => 
              acc + (e.sets?.reduce((sAcc: number, s: any) => sAcc + (s.weight * s.reps), 0) || 0), 0
            ) || 0;

            return (
              <Link 
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="surface-card p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-surface-container transition-all group border border-on_surface_variant/5 hover:border-primary_fixed/20"
              >
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary_fixed border border-on_surface_variant/5 font-black italic text-2xl group-hover:bg-primary_fixed group-hover:text-black transition-all">
                    {workout.name[0]}
                  </div>
                  <div>
                    <h4 className="text-3xl font-black uppercase italic group-hover:text-primary_fixed transition-colors tracking-tightest leading-tight">
                      {workout.name}
                    </h4>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-on_surface_variant uppercase tracking-widest">
                         <Calendar className="w-3 h-3" />
                         {new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-on_surface_variant uppercase tracking-widest">
                         <Clock className="w-3 h-3" />
                         {workout.duration || 0} MIN
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 md:text-right">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest">VOLUME</p>
                     <p className="text-2xl font-black italic">
                       {totalVolume.toLocaleString()}
                       <span className="text-xs ml-1 text-on_surface_variant">KG</span>
                     </p>
                  </div>
                  <ChevronRight className="w-8 h-8 text-on_surface_variant group-hover:text-primary_fixed group-hover:translate-x-2 transition-all" />
                </div>
              </Link>
            )
          })
        ) : (
          <div className="surface-card p-24 text-center border-2 border-dashed border-on_surface_variant/10">
            <p className="text-on_surface_variant font-black uppercase tracking-widest text-lg mb-6">NO DEPLOYMENTS DETECTED</p>
            <Link href="/workouts/new" className="btn-primary inline-flex py-6 px-12 text-[10px] uppercase tracking-widest">
              INITIALIZE FIRST SESSION
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
