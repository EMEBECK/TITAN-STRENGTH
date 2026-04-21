import { createClient } from '@/utils/supabase/server'
import { Dumbbell, Trophy, Activity, ArrowRight, Zap, Target } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Fetch user profile
  const { data: { user } } = await supabase.auth.getUser()
  
  // Fetch recent workouts
  const { data: workouts } = await supabase
    .from('workouts')
    .select('*, exercises(*, sets(*))')
    .order('date', { ascending: false })
    .limit(3)

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h3 className="text-[10px] font-black text-primary_fixed uppercase tracking-[0.4em] mb-4">
          Welcome Back, {user?.email?.split('@')[0] || 'TITAN'}
        </h3>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tightest leading-[0.9] flex flex-wrap items-center gap-4">
          LET'S GET STRONGER TODAY 💪
        </h1>
        
        <div className="mt-8">
          <Link 
            href="/workouts/new"
            className="btn-primary inline-flex items-center gap-4 py-8 px-10 text-sm uppercase tracking-[0.2em]"
          >
            START WORKOUT
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="surface-card p-10 relative overflow-hidden group">
          <Dumbbell className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 group-hover:text-primary/10 transition-colors" />
          <p className="text-[10px] font-black text-on_surface_variant uppercase tracking-[0.3em] mb-6">COMPLETED SESSIONS</p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black">{workouts?.length || 0}</span>
          </div>
          <p className="text-[10px] font-bold text-on_surface_variant/60 mt-4 uppercase tracking-widest">TOTAL LIFETIME</p>
        </div>

        <div className="surface-card p-10 relative overflow-hidden group">
          <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 group-hover:text-primary/10 transition-colors" />
          <p className="text-[10px] font-black text-on_surface_variant uppercase tracking-[0.3em] mb-6">TOTAL VOLUME</p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black">1.2</span>
            <span className="text-xl font-black text-on_surface_variant">M KG</span>
          </div>
          <p className="text-[10px] font-bold text-on_surface_variant/60 mt-4 uppercase tracking-widest">ACCUMULATED WEIGHT</p>
        </div>

        <div className="surface-card p-10 relative overflow-hidden group border-b-4 border-primary_fixed/20">
           <Activity className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 group-hover:text-primary/10 transition-colors" />
          <p className="text-[10px] font-black text-on_surface_variant uppercase tracking-[0.3em] mb-6">WEEKLY PROGRESS</p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black">4/5</span>
          </div>
          <p className="text-[10px] font-bold text-on_surface_variant/60 mt-4 uppercase tracking-widest">ON TARGET TRACK</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Workouts */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-black italic tracking-tightest">RECENT WORKOUTS</h2>
             <Link href="/workouts" className="text-[10px] font-black text-on_surface_variant hover:text-primary_fixed uppercase tracking-[0.2em] transition-colors">
               VIEW HISTORY
             </Link>
          </div>
          
          <div className="space-y-4">
            {workouts && workouts.length > 0 ? (
              workouts.map((workout) => (
                <Link 
                  key={workout.id}
                  href={`/workouts/${workout.id}`}
                  className="surface-card p-6 flex items-center justify-between hover:bg-surface-container transition-colors group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary_fixed border border-on_surface_variant/5 font-black italic">
                      {workout.name[0]}
                    </div>
                    <div>
                      <h4 className="text-lg font-black group-hover:text-primary_fixed transition-colors">{workout.name}</h4>
                      <p className="text-xs font-bold text-on_surface_variant uppercase tracking-wider">
                        {new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black italic">{workout.duration || 0} MIN</p>
                    <p className="text-[10px] font-bold text-on_surface_variant uppercase tracking-widest">SESSION TIME</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="surface-card p-12 text-center border-2 border-dashed border-on_surface_variant/10">
                <p className="text-on_surface_variant font-bold uppercase tracking-widest text-sm mb-4">No deployments recorded yet</p>
                <Link href="/workouts/new" className="text-primary_fixed font-black uppercase text-xs hover:underline tracking-widest">
                  Initialize First Session
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          <div className="surface-card-secondary p-8 border-l-4 border-primary_fixed">
             <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-5 h-5 text-primary_fixed" />
                <h3 className="text-sm font-black italic">PERSONAL RECORDS</h3>
             </div>
             
             <div className="space-y-6">
                <div className="bg-surface p-4 rounded-lg border border-on_surface_variant/5">
                   <p className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest mb-1">DEADLIFT</p>
                   <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black">220.0</span>
                      <span className="text-[10px] font-black text-on_surface_variant">KG</span>
                   </div>
                   <p className="text-[9px] font-bold text-primary_fixed/60 mt-2 uppercase tracking-tightest">+10KG FROM LAST SESSION</p>
                </div>
                
                <div className="bg-surface p-4 rounded-lg border border-on_surface_variant/5 opacity-50">
                   <p className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest mb-1">BENCH PRESS</p>
                   <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black">140.0</span>
                      <span className="text-[10px] font-black text-on_surface_variant">KG</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="surface-card-secondary p-8 bg-gradient-to-br from-surface-container to-surface-card-highest relative overflow-hidden">
             <Target className="absolute -right-8 -bottom-8 w-32 h-32 text-primary/5" />
             <h3 className="text-sm font-black italic mb-4">DAILY QUOTE</h3>
             <p className="text-lg font-black leading-tight italic uppercase">
               "STRENGTH DOES NOT COME FROM WINNING."
             </p>
             <p className="text-[10px] font-bold text-on_surface_variant mt-4 tracking-widest">ARNOLD SCHWARZENEGGER</p>
          </div>
        </div>
      </div>
    </div>
  )
}
