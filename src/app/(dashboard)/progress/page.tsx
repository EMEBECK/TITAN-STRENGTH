'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Zap, Target, Activity } from 'lucide-react'

const data = [
  { name: 'Mon', volume: 4000 },
  { name: 'Tue', volume: 3000 },
  { name: 'Wed', volume: 5000 },
  { name: 'Thu', volume: 2780 },
  { name: 'Fri', volume: 4890 },
  { name: 'Sat', volume: 2390 },
  { name: 'Sun', volume: 3490 },
]

export default function ProgressPage() {
  return (
    <div className="space-y-12 pb-24">
      <div>
        <h3 className="text-[10px] font-black text-primary_fixed uppercase tracking-[0.4em] mb-4">ANALYTICS: PERFORMANCE</h3>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tightest leading-[0.9] uppercase">
          PROGRESS TRACK
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatsCard icon={TrendingUp} label="STRENGTH GAIN" value="+12%" sublabel="LAST 30 DAYS" />
         <StatsCard icon={Zap} label="VOLUME LIFTED" value="42.5K" sublabel="THIS WEEK (KG)" />
         <StatsCard icon={Activity} label="SESSIONS" value="18" sublabel="PLAN: 20/MONTH" />
         <StatsCard icon={Target} label="PRs BROKEN" value="4" sublabel="PERSONAL BESTS" />
      </div>

      <div className="surface-card p-10 space-y-8">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black italic tracking-tightest uppercase">VOLUME TREND</h2>
            <div className="flex gap-4">
              <button className="text-[10px] font-black text-primary_fixed uppercase tracking-widest border-b-2 border-primary_fixed">7D</button>
              <button className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest hover:text-white transition-colors">30D</button>
              <button className="text-[10px] font-black text-on_surface_variant uppercase tracking-widest hover:text-white transition-colors">90D</button>
            </div>
         </div>
         
         <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#cafd00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#cafd00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#adaaaa" 
                  fontSize={10} 
                  fontWeight="bold" 
                  axisLine={false} 
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#adaaaa" 
                  fontSize={10} 
                  fontWeight="bold" 
                  axisLine={false} 
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#cafd00', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}
                  cursor={{ stroke: '#cafd00', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#cafd00" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorVolume)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  )
}

function StatsCard({ icon: Icon, label, value, sublabel }: any) {
  return (
    <div className="surface-card p-8 border-b-2 border-on_surface_variant/5 hover:border-primary_fixed transition-all group">
       <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mb-6 group-hover:bg-primary_fixed/10 transition-colors">
          <Icon className="w-5 h-5 text-on_surface_variant group-hover:text-primary_fixed transition-colors" />
       </div>
       <p className="text-[10px] font-black text-on_surface_variant uppercase tracking-[0.2em] mb-2">{label}</p>
       <p className="text-4xl font-black italic mb-1">{value}</p>
       <p className="text-[10px] font-bold text-on_surface_variant/60 uppercase tracking-widest">{sublabel}</p>
    </div>
  )
}
