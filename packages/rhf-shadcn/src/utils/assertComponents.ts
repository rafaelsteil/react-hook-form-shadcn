import { ShadcnRegistry } from '../registry'

type ConditionalComponent = {
  name: keyof ShadcnRegistry
  value: any
}

type AssertableComponent = ConditionalComponent | keyof ShadcnRegistry

/**
 * Asserts that all required components are registered
 * @param components - The components to assert
 * @param requiredKeys - The keys of the components to assert
 * @throws An error if any required component is not registered
 */
export function assertComponents(
  components: ShadcnRegistry,
  requiredKeys: AssertableComponent[]
): asserts components is Required<ShadcnRegistry> {
  for (const key of requiredKeys) {
    if (isStringKey(key) && !components[key]) {
      throw new RequiredComponentError(key)
    } else if (isRequiredConditionally(key) && typeof key.value !== 'undefined' && !components[key.name]) {
      throw new RequiredComponentError(key.name)
    }
  }
}

class RequiredComponentError extends Error {
  constructor(key: any) {
    super(`"${String(key)}" component is not registered in ShadcnRegistry of react-hook-form-shadcn`)
  }
}

function isStringKey(key: AssertableComponent): key is keyof ShadcnRegistry {
  return typeof key === 'string'
}

function isRequiredConditionally(key: AssertableComponent): key is ConditionalComponent {
  return key instanceof Object && 'value' in key
}
