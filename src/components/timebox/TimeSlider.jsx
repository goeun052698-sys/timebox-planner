import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { generateTimeOptions, timeToMinutes } from '@/utils/time'

export default function TimeSlider({ label, value, onChange, minTime, maxTime }) {
  const options = generateTimeOptions()

  const filteredOptions = options.filter(opt => {
    const mins = timeToMinutes(opt.value)
    if (minTime && mins <= timeToMinutes(minTime)) return false
    if (maxTime && mins >= timeToMinutes(maxTime)) return false
    return true
  })

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-8 shrink-0">{label}</span>
      <Select value={value || ''} onValueChange={onChange}>
        <SelectTrigger className="h-8 text-xs w-[100px]">
          <SelectValue placeholder="선택" />
        </SelectTrigger>
        <SelectContent>
          {filteredOptions.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
