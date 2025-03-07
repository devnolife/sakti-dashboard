"use client"

import { useState, type ChangeEvent, type FocusEvent } from "react"

interface UseFormFieldProps<T> {
  initialValue?: T
  validate?: (value: T) => string | undefined
}

// Use the 'type' keyword before the generic parameter to avoid JSX confusion
const useFormField = <T,>(props: UseFormFieldProps<T> = {}) => {
  const { initialValue, validate } = props
  const [value, setValue] = useState<T>(initialValue as T)
  const [isTouched, setIsTouched] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value as unknown as T
    setValue(newValue)
    setError(validate ? validate(newValue) : undefined)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsTouched(true)
    setError(validate ? validate(value) : undefined)
  }

  const reset = () => {
    setValue(initialValue as T)
    setIsTouched(false)
    setError(undefined)
  }

  const isInvalid = !!error && isTouched
  const correct = !isInvalid

  return {
    value,
    error,
    isInvalid,
    correct,
    handleChange,
    handleBlur,
    reset,
  }
}

export default useFormField

