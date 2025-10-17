import { useContext } from 'react'

import { ShadcnRegistryContext } from './registry'

export const useShadcnRegistry = () => {
  const context = useContext(ShadcnRegistryContext)

  if (!context) {
    throw new Error('useShadcnRegistryRegistry must be used within a ShadcnRegistryProvider')
  }

  return context
}
