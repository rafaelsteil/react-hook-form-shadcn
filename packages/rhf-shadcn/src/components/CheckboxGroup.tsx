import { forwardRef } from 'react'
import { Controller, useController, useFormContext } from 'react-hook-form'

import { useShadcnRegistry } from '../useShadcnRegistry'
import { propertyExists } from '../utils'
import { assertComponents } from '../utils/assertComponents'

type Props = {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  control?: any
  rules?: any
  disabled?: boolean
  returnObject?: boolean
  labelProps?: React.ComponentProps<'label'>
  options: unknown[]
  valueKey?: string
  labelKey?: string
  optionClassName?: string
} & React.ComponentPropsWithoutRef<'input'>

const CheckboxGroup = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      description,
      control,
      rules,
      disabled,
      labelProps,
      options,
      returnObject = false,
      valueKey = 'id',
      labelKey = 'label',
      optionClassName,
      ...inputProps
    },
    ref
  ) => {
    const methods = useFormContext()
    const components = useShadcnRegistry()

    assertComponents(components, [
      'Checkbox',
      'Field',
      'FieldLabel',
      'FieldError',
      'FieldGroup',
      'FieldSet',
      { name: 'FieldLegend', value: label },
      { name: 'FieldDescription', value: description },
    ])

    const { Checkbox, Field, FieldLabel, FieldError, FieldGroup, FieldSet, FieldLegend, FieldDescription } = components
    const componentControl = control ?? methods?.control

    const {
      field,
      fieldState: { error, invalid },
    } = useController({
      name,
      // rules: { required: 'This field is required' },
      //rules: required ? {required: 'This field is required'} : rules,
      disabled,
      control: componentControl,
      //defaultValue: defaultValue as PathValue<TFieldValues, TName>,
    })

    const selectedOptions = field.value
    const onChange = field.onChange

    const handleChange = (option: unknown) => {
      const optionValue = propertyExists(option, valueKey) ? option[valueKey] : option
      const existsAtIndex = selectedOptions.findIndex(selectedOption => {
        const selectedOptionValue = propertyExists(selectedOption, valueKey) ? selectedOption[valueKey] : selectedOption
        return optionValue === selectedOptionValue
      })

      const newValues = (
        existsAtIndex === -1
          ? [...selectedOptions, option]
          : selectedOptions.filter((_, index) => existsAtIndex !== index)
      ).map(selectedOption =>
        returnObject || !propertyExists(selectedOption, valueKey) ? selectedOption : selectedOption[valueKey]
      ) as unknown[]

      onChange(newValues)
      //inputProps.onChange?.(newValues)

      // if (typeof rest.onChange === 'function') {
      //   rest.onChange(newValues)
      // }
    }

    return (
      <Controller
        name={name}
        control={componentControl}
        render={({ field, fieldState }) => {
          return (
            <FieldSet data-invalid={fieldState.invalid} disabled={disabled}>
              {label && <FieldLegend>{label}</FieldLegend>}
              {description && <FieldDescription>{description}</FieldDescription>}

              <FieldGroup data-slot='checkbox-group'>
                {options.map(option => {
                  const optionValue = propertyExists(option, valueKey) ? option[valueKey] : option
                  const optionLabel = propertyExists(option, labelKey) ? option[labelKey] : option

                  const isChecked = selectedOptions.some(selectedOption => {
                    const selectedOptionValue = propertyExists(selectedOption, valueKey)
                      ? selectedOption[valueKey]
                      : selectedOption
                    return selectedOptionValue === optionValue
                  })

                  const componentId = `${field.name}_${optionValue}_checkboxGroup`

                  return (
                    <Field key={optionValue} orientation='horizontal' data-invalid={fieldState.invalid}>
                      <Checkbox
                        aria-invalid={fieldState.invalid}
                        id={componentId}
                        disabled={disabled}
                        checked={isChecked}
                        onCheckedChange={checked => {
                          handleChange(option)
                        }}
                      />

                      <FieldLabel htmlFor={componentId} className={optionClassName}>
                        {optionLabel}
                      </FieldLabel>
                    </Field>
                  )
                })}
              </FieldGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldSet>
          )
        }}
      />
    )
  }
)

CheckboxGroup.displayName = 'CheckboxGroup'

export { CheckboxGroup }
