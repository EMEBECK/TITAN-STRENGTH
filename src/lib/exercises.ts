export type ExerciseCategory = 
  | 'Chest' 
  | 'Back' 
  | 'Legs' 
  | 'Shoulders' 
  | 'Arms' 
  | 'Core' 
  | 'Full Body' 
  | 'Cardio'

export interface ExerciseDefinition {
  name: string
  category: ExerciseCategory
}

export const PREDEFINED_EXERCISES: ExerciseDefinition[] = [
  { name: 'Barbell Bench Press', category: 'Chest' },
  { name: 'Dumbbell Bench Press', category: 'Chest' },
  { name: 'Incline Dumbbell Press', category: 'Chest' },
  { name: 'Chest Fly', category: 'Chest' },
  { name: 'Deadlift', category: 'Back' },
  { name: 'Pull Ups', category: 'Back' },
  { name: 'Barbell Row', category: 'Back' },
  { name: 'Lat Pulldown', category: 'Back' },
  { name: 'Squat', category: 'Legs' },
  { name: 'Leg Press', category: 'Legs' },
  { name: 'Lunge', category: 'Legs' },
  { name: 'Leg Extension', category: 'Legs' },
  { name: 'Leg Curl', category: 'Legs' },
  { name: 'Overhead Press', category: 'Shoulders' },
  { name: 'Lateral Raise', category: 'Shoulders' },
  { name: 'Front Raise', category: 'Shoulders' },
  { name: 'Bicep Curl', category: 'Arms' },
  { name: 'Tricep Extension', category: 'Arms' },
  { name: 'Hammer Curl', category: 'Arms' },
  { name: 'Skull Crusher', category: 'Arms' },
  { name: 'Plank', category: 'Core' },
  { name: 'Crunch', category: 'Core' },
  { name: 'Leg Raise', category: 'Core' },
  { name: 'Russian Twist', category: 'Core' },
]
