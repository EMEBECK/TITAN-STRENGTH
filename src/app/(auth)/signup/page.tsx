import { signup } from '@/app/(auth)/actions'
import Link from 'next/link'

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-left">
          <h1 className="text-4xl font-extrabold text-white tracking-tightest mb-2 italic uppercase">TITAN STRENGTH</h1>
          <p className="text-on_surface_variant font-medium tracking-wider">ENLIST IN ELITE PERFORMANCE</p>
        </div>

        <form className="mt-8 space-y-6" action={signup}>
          {searchParams.error && (
            <div className="p-4 bg-error_dim/10 border-l-4 border-error_dim rounded-r-lg text-white text-sm">
               <span className="font-bold uppercase tracking-wider block mb-1 text-[10px]">Error</span>
              {decodeURIComponent(searchParams.error)}
            </div>
          )}

          <div className="space-y-6">
             <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-on_surface_variant uppercase tracking-[0.2em]" htmlFor="email">
                Register Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="field-input"
                placeholder="titan@performance.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-on_surface_variant uppercase tracking-[0.2em]" htmlFor="password">
                Create Secure Key
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="field-input"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="btn-primary w-full uppercase tracking-[0.15em] text-xs py-5"
            >
              Initialize Deployment
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-on_surface_variant/10 text-center">
           <p className="text-[11px] text-on_surface_variant font-medium tracking-wider">
            ALREADY ENLISTED?{' '}
            <Link href="/login" className="text-primary_fixed font-black hover:text-white transition-colors ml-1 uppercase">
              Authorize Credentials
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
