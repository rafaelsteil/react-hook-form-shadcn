import { forwardRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { useShadcnRegistry } from '../useShadcnRegistry'
import { assertComponents } from '../utils/assertComponents'
import { cn } from '../utils/cn'

type Props = {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  control?: any // optional if using useFormContext
  rules?: any
  placeholder?: string
  disabled?: boolean
  className?: string

  containerProps?: React.ComponentProps<'div'>

  // inputProps?: React.ComponentProps<'input'> & Record<string, unknown>

  labelProps?: React.ComponentProps<'label'>
  descriptionProps?: React.ComponentProps<'p'>
  errorProps?: React.ComponentProps<'div'>
} & React.ComponentPropsWithoutRef<'input'>

/**
 * RHFInput wraps shadcn form components with react-hook-form integration.
 * All shadcn components can be customized via their respective props objects.
 */
const RHFInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      description,
      control,
      rules,
      disabled,
      placeholder,
      className,
      containerProps,
      labelProps,
      descriptionProps,
      errorProps,
      ...inputProps
    },
    ref
  ) => {
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

          // console.log('fieldState', componentControl)

          return (
            <Field data-invalid={hasError} className={cn(`rhfContainer_${name}`, className)} {...containerProps}>
              {label && (
                <FieldLabel as='label' htmlFor={field.name} {...labelProps}>
                  {label}
                </FieldLabel>
              )}
              <Input
                id={field.name}
                disabled={disabled}
                aria-invalid={hasError || undefined}
                placeholder={placeholder}
                {...inputProps}
                {...field}
                value={field.value || ''}
                ref={ref}
              />
              {description && <FieldDescription {...descriptionProps}>{description}</FieldDescription>}
              {hasError && <FieldError {...errorProps}>{fieldState.error?.message}</FieldError>}
            </Field>
          )
        }}
      />
    )
  }
)

RHFInput.displayName = 'RHFInput'

export { RHFInput }
