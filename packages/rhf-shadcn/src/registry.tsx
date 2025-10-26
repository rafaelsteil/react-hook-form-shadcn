import React, { createContext } from 'react'

export type ShadcnRegistry = {
  Field?: React.ComponentType<any>
  FieldLabel?: React.ComponentType<any>
  FieldLegend?: React.ComponentType<any>
  FieldSet?: React.ComponentType<any>
  FieldDescription?: React.ComponentType<any>
  FieldContent?: React.ComponentType<any>
  FieldError?: React.ComponentType<any>
  FieldGroup?: React.ComponentType<any>
  Input?: React.ComponentType<any>
  Switch?: React.ComponentType<any>
  Checkbox?: React.ComponentType<any>
}

export const ShadcnRegistryContext = createContext<ShadcnRegistry>({})

type ShadcnProviderProps = {
  components: ShadcnRegistry
  children: React.ReactNode
}

export const RHFShadcnProvider = ({ components, children }: ShadcnProviderProps) => {
  return <ShadcnRegistryContext.Provider value={components}>{children}</ShadcnRegistryContext.Provider>
}
