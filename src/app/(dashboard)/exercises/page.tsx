import { PREDEFINED_EXERCISES } from '@/lib/exercises'
import { Search, Dumbbell } from 'lucide-react'
import Link from 'next/link'

export default function ExercisesPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string }
}) {
  const query = searchParams.q?.toLowerCase() || ''
  const category = searchParams.category || 'All'

  const categories: string[] = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']

  const filteredExercises = PREDEFINED_EXERCISES.filter(ex => {
    const matchesQuery = ex.name.toLowerCase().includes(query)
    const matchesCategory = category === 'All' || ex.category === category
    return matchesQuery && matchesCategory
  })

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-[10px] font-black text-primary_fixed uppercase tracking-[0.4em] mb-4">RESOURCES: MOVEMENTS</h3>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tightest leading-[0.9] uppercase">
          EXERCISE LIBRARY
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 pb-24">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 space-y-8">
           <div className="surface-card p-6 border-l-4 border-primary_fixed">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6">FILTER BY UNIT</h4>
              <div className="flex flex-col gap-1">
                 {categories.map(cat => (
                   <Link 
                     key={cat}
                     href={`/exercises?category=${cat}${query ? `&q=${query}` : ''}`}
                     className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-4 rounded-lg transition-all ${
                       category === cat ? 'bg-primary_fixed text-black' : 'text-on_surface_variant hover:text-white hover:bg-surface-container'
                     }`}
                   >
                     {cat}
                   </Link>
                 ))}
              </div>
           </div>
        </div>

        {/* Search & Results */}
        <div className="flex-1 space-y-8">
           <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-on_surface_variant" />
              <form action="/exercises" className="w-full">
                <input 
                  name="q"
                  defaultValue={searchParams.q}
                  placeholder="SEARCH KINETIC MODULES..."
                  className="w-full bg-surface-container-highest border-b-2 border-on_surface_variant/10 px-16 py-7 text-2xl font-black italic uppercase focus:outline-none focus:border-primary transition-all rounded-xl shadow-2xl"
                />
                {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
              </form>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredExercises.map(ex => (
                <div key={ex.name} className="surface-card p-8 group hover:bg-surface-container transition-all border border-on_surface_variant/5 hover:border-primary_fixed/20 relative overflow-hidden">
                   <Dumbbell className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 group-hover:text-primary_fixed/10 transition-colors" />
                   <p className="text-[10px] font-bold text-on_surface_variant/60 uppercase tracking-widest mb-1">{ex.category}</p>
                   <h4 className="text-xl font-black italic uppercase tracking-tightest group-hover:text-primary_fixed transition-colors leading-tight">{ex.name}</h4>
                </div>
              ))}
           </div>

           {filteredExercises.length === 0 && (
             <div className="surface-card p-24 text-center border-2 border-dashed border-on_surface_variant/10">
                <p className="text-on_surface_variant font-black uppercase tracking-widest text-lg">MODULE NOT FOUND</p>
             </div>
           )}
        </div>
      </div>
    </div>
  )
}
