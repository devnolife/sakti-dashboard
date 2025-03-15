"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
  label?: string
  placeholder?: string
  className?: string
  description?: string
}

export function DatePicker({
  date,
  onDateChange,
  label,
  placeholder = "Pilih tanggal",
  className,
  description,
}: DatePickerProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date ? (
              format(date, "PPP")
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single" 
            selected={date} 
            onSelect={onDateChange} 
            disabled={(date: Date) => 
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus 
          />
        </PopoverContent>
      </Popover>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}

export const Calendar = () => <></>

