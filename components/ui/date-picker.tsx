import * as React from "react"

import { cn } from "@/lib/utils"

export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(({ className, ...props }, ref) => {
  return <div className={cn("relative flex items-center w-full", className)} ref={ref} {...props} />
})
DatePicker.displayName = "DatePicker"

export { DatePicker }

export const Calendar = () => <></>

