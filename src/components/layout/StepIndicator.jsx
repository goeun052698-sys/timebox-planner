import { cn } from '@/lib/utils'

const steps = [
  { num: 1, label: '브레인 덤프' },
  { num: 2, label: '우선순위' },
  { num: 3, label: '타임박스' },
  { num: 4, label: '실행' },
]

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 py-4 px-4">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                currentStep === step.num && "bg-primary text-primary-foreground scale-110",
                currentStep > step.num && "bg-primary/20 text-primary",
                currentStep < step.num && "bg-muted text-muted-foreground"
              )}
            >
              {currentStep > step.num ? '✓' : step.num}
            </div>
            <span className={cn(
              "text-xs hidden sm:block",
              currentStep === step.num ? "text-foreground font-medium" : "text-muted-foreground"
            )}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              "w-12 md:w-20 h-0.5 mx-2 transition-all",
              currentStep > step.num ? "bg-primary/40" : "bg-muted"
            )} />
          )}
        </div>
      ))}
    </div>
  )
}
