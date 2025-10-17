import React, { createContext } from 'react'

export type ShadcnRegistry = {
  Field?: React.ComponentType<any>
  FieldLabel?: React.ComponentType<any>
  FieldDescription?: React.ComponentType<any>
  FieldError?: React.ComponentType<any>
  Input?: React.ComponentType<any>
}

export const ShadcnRegistryContext = createContext<ShadcnRegistry>({})

export const ShadcnRegistryProvider = ({ children }: { children: React.ReactNode }) => {
  return <ShadcnRegistryContext.Provider value={{}}>{children}</ShadcnRegistryContext.Provider>
}
