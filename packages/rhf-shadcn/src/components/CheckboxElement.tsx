import { forwardRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { useShadcnRegistry } from '../useShadcnRegistry'
import { assertComponents } from '../utils/assertComponents'

type Props = {
  name: string
  label?: React.ReactNode
  control?: any
  rules?: any
  disabled?: boolean
  labelProps?: React.ComponentProps<'label'>
  onCheckedChange?: (checked: boolean) => void
} & React.ComponentPropsWithoutRef<'input'>

const CheckboxElement = forwardRef<HTMLInputElement, Props>(
  ({ name, label, control, rules, disabled, labelProps, onCheckedChange, ...inputProps }, ref) => {
    const methods = useFormContext()
    const components = useShadcnRegistry()

    assertComponents(components, ['Checkbox', 'Field', 'FieldLabel'])

    const { Checkbox, Field, FieldLabel } = components
    const componentControl = control ?? methods?.control

    return (
      <Controller
        name={name}
        control={componentControl}
        rules={rules}
        render={({ field }) => {
          return (
            <Field orientation='horizontal'>
              <Checkbox
                id={`${field.name}_checkbox`}
                disabled={disabled}
                {...inputProps}
                {...field}
                value={field.value}
                ref={ref}
                onCheckedChange={checked => {
                  field.onChange(checked)
                  onCheckedChange?.(checked)
                }}
              />
              {label && (
                <FieldLabel as='label' htmlFor={`${field.name}_checkbox`} {...labelProps}>
                  {label}
                </FieldLabel>
              )}
            </Field>
          )
        }}
      />
    )
  }
)

CheckboxElement.displayName = 'CheckboxElement'

export { CheckboxElement }
