import { Sidebar } from '@/components/layout/Sidebar'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="flex h-screen bg-surface font-sans text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-surface p-8 md:p-12 lg:p-24 scrollbar-hide">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
