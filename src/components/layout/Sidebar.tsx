'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Dumbbell, 
  TrendingUp, 
  Library, 
  User, 
  HelpCircle,
  Plus
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Workout Log', href: '/workouts', icon: Dumbbell },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'Exercise Library', href: '/exercises', icon: Library },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen w-64 bg-surface-container-low shrink-0 overflow-y-auto scrollbar-hide">
      {/* Logo */}
      <div className="p-8">
        <h2 className="text-xl font-black text-white italic tracking-tightest leading-tight">
          TITAN STRENGTH
          <span className="block text-[10px] not-italic font-bold text-on_surface_variant/60 tracking-[0.3em] mt-1 uppercase">
            Elite Performance
          </span>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold transition-all uppercase tracking-[0.1em]",
                isActive 
                  ? "bg-surface-container-highest text-primary_fixed" 
                  : "text-on_surface_variant hover:text-white hover:bg-surface-container"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-primary_fixed" : "text-on_surface_variant/60")} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 space-y-4">
        <Link 
          href="/workouts/new"
          className="btn-primary w-full gap-2 text-[10px] py-7 uppercase tracking-[0.2em]"
        >
          <Plus className="w-4 h-4" />
          Start Workout
        </Link>
        
        <div className="pt-4 border-t border-on_surface_variant/5 mt-4">
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[10px] font-bold text-on_surface_variant hover:text-white transition-colors uppercase tracking-[0.2em]">
            <User className="w-4 h-4" />
            Profile
          </Link>
          <Link href="/support" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[10px] font-bold text-on_surface_variant hover:text-white transition-colors uppercase tracking-[0.2em]">
            <HelpCircle className="w-4 h-4" />
            Support
          </Link>
        </div>
      </div>
    </div>
  )
}
