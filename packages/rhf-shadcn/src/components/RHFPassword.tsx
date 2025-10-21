import { forwardRef } from 'react'

import { RHFInput } from './RHFInput'

type Props = React.ComponentProps<typeof RHFInput>

/**
 * RHFPassword is a password input field component that wraps RHFInput
 * with the input type preset to 'password'.
 */
const RHFPassword = forwardRef<HTMLInputElement, Props>(({ inputProps, ...props }, ref) => (
  <RHFInput
    {...props}
    inputProps={{
      type: 'password',
      ...inputProps,
    }}
    ref={ref}
  />
))

RHFPassword.displayName = 'RHFPassword'

export { RHFPassword }
