import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { useShadcnRegistry } from '@/useShadcnRegistry'
import { assertComponents } from '@/utils/assertComponents'

type TextInputProps = {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  control?: any // optional if using useFormContext
  rules?: any
  placeholder?: string
  disabled?: boolean
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const TextInput = ({ name, label, description, control, rules, disabled, inputProps }: TextInputProps) => {
  const methods = useFormContext()
  const components = useShadcnRegistry()

  assertComponents(components, [
    'Field',
    { name: 'FieldLabel', value: label },
    'FieldError',
    'Input',
    { name: 'FieldDescription', value: description },
  ])

  const { Field, FieldLabel, FieldError, Input, FieldDescription } = components
  const componentControl = control ?? methods?.control

  return (
    <Controller
      name={name}
      control={componentControl}
      rules={rules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error?.message || fieldState.invalid

        return (
          <Field data-invalid={hasError}>
            {label && (
              <FieldLabel as='label' htmlFor={field.name}>
                {label}
              </FieldLabel>
            )}
            <Input
              id={field.name}
              disabled={disabled}
              aria-invalid={hasError || undefined}
              {...inputProps}
              {...field}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {hasError && <FieldError>{fieldState.error?.message}</FieldError>}
          </Field>
        )
      }}
    />
  )
}

export { TextInput, TextInput as RHFTextInput }
