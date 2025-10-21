import { Controller, useFormContext } from 'react-hook-form'
import { forwardRef } from 'react'
import { SwitchProps } from '@radix-ui/react-switch'

import { useShadcnRegistry } from '../useShadcnRegistry'
import { assertComponents } from '../utils/assertComponents'
import { cn } from '../utils/cn'

type Props = {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  control?: any // optional if using useFormContext
  rules?: any
  disabled?: boolean
  className?: string

  containerProps?: React.ComponentProps<'div'>
  switchProps?: SwitchProps
  labelProps?: React.ComponentProps<'label'>
  descriptionProps?: React.ComponentProps<'p'>
  errorProps?: React.ComponentProps<'div'>
}

/**
 * RHFSwitch wraps shadcn form components with react-hook-form integration.
 * All shadcn components can be customized via their respective props objects.
 */
const RHFSwitch = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      description,
      control,
      rules,
      disabled,
      switchProps,
      className,
      containerProps,
      labelProps,
      descriptionProps,
      errorProps,
    },
    ref
  ) => {
    const methods = useFormContext()
    const components = useShadcnRegistry()

    assertComponents(components, [
      'Field',
      { name: 'FieldLabel', value: label },
      'FieldError',
      'Switch',
      { name: 'FieldDescription', value: description },
    ])

    const { Field, FieldLabel, FieldError, Switch, FieldDescription, FieldContent } = components
    const componentControl = control ?? methods?.control

    return (
      <Controller
        name={name}
        control={componentControl}
        rules={rules}
        render={({ field, fieldState }) => {
          const hasError = !!fieldState.error?.message || fieldState.invalid

          return (
            <Field
              orientation='horizontal'
              data-invalid={hasError}
              className={cn(`rhfContainer_${name}`, className)}
              {...containerProps}
            >
              <FieldContent>
                {label && (
                  <FieldLabel as='label' htmlFor={field.name} {...labelProps}>
                    {label}
                  </FieldLabel>
                )}
                {description && <FieldDescription {...descriptionProps}>{description}</FieldDescription>}
                {hasError && <FieldError {...errorProps}>{fieldState.error?.message}</FieldError>}
              </FieldContent>

              <Switch id={field.name} disabled={disabled} {...switchProps} {...field} ref={ref} />
            </Field>
          )
        }}
      />
    )
  }
)

RHFSwitch.displayName = 'RHFSwitch'

export { RHFSwitch }
