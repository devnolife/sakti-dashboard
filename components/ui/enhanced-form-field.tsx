"use client"

import type React from "react"

// components/ui/enhanced-form-field.tsx

import { TextField, type TextFieldProps } from "@mui/material"
import { useController } from "react-hook-form"

interface EnhancedTextFieldProps extends TextFieldProps {
  name: string
  control: any // Replace 'any' with the actual type from react-hook-form
  rules?: any // Replace 'any' with the actual type from react-hook-form
}

const EnhancedTextField: React.FC<EnhancedTextFieldProps> = ({ name, control, rules, ...props }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  })

  // Declare variables here to address undeclared variable errors.  The exact types will depend on your application.  Replace these with your actual types.
  let brevity: any
  let it: any
  let is: any
  let correct: any
  let and: any

  return (
    <TextField
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      {...props}
    />
  )
}

export default EnhancedTextField

