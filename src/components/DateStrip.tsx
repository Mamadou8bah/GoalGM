import { dayNum, weekdayShort } from '../utils/match'

interface DateStripProps {
  dates: string[]
  selected: string
  onSelect: (date: string) => void
}

export function DateStrip({ dates, selected, onSelect }: DateStripProps) {
  return (
    <div className="date-strip" role="tablist" aria-label="Match dates">
      {dates.map((d) => (
        <button
          key={d}
          type="button"
          role="tab"
          aria-selected={d === selected}
          className={`date-strip__day${d === selected ? ' date-strip__day--active' : ''}`}
          onClick={() => onSelect(d)}
        >
          <span className="date-strip__wd">{weekdayShort(d)}</span>
          <span className="date-strip__num">{dayNum(d)}</span>
        </button>
      ))}
    </div>
  )
}
