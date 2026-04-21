import { WorkoutForm } from './WorkoutForm'

export default function NewWorkoutPage() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-[10px] font-black text-primary_fixed uppercase tracking-[0.4em] mb-4">DEPLOYMENT: NEW SESSION</h3>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tightest leading-[0.9] uppercase">
          LOG WORKOUT
        </h1>
      </div>

      <WorkoutForm />
    </div>
  )
}
