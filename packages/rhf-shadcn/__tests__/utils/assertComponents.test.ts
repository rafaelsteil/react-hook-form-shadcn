import React from 'react'

import { assertComponents } from '../../src/utils/assertComponents'
import { ShadcnRegistry } from '../../src/registry'

/**
 * Mock component factory for creating test components
 */
const createMockComponent = (): React.ComponentType<any> => {
  const MockComponent = () => React.createElement('div')
  MockComponent.displayName = 'MockComponent'
  return MockComponent
}

describe('assertComponents', () => {
  describe('with string keys (simple component validation)', () => {
    it('should not throw when all required string components are registered', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
        Input: createMockComponent(),
      }

      expect(() => {
        assertComponents(registry, ['Field', 'Input'])
      }).not.toThrow()
    })

    it('should throw RequiredComponentError when a required string component is missing', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
      }

      expect(() => {
        assertComponents(registry, ['Field', 'Input'])
      }).toThrow('Input component is not registered in ShadcnRegistry')
    })

    it('should throw with the correct component name in the error message', () => {
      const registry: ShadcnRegistry = {}

      expect(() => {
        assertComponents(registry, ['Textarea'])
      }).toThrow('Textarea component is not registered in ShadcnRegistry')
    })

    it('should validate multiple required string components', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
        FieldLabel: createMockComponent(),
        FieldDescription: createMockComponent(),
        FieldError: createMockComponent(),
      }

      expect(() => {
        assertComponents(registry, ['Field', 'FieldLabel', 'FieldDescription', 'FieldError'])
      }).not.toThrow()
    })

    it('should throw on first missing component when multiple are required', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
        Input: createMockComponent(),
      }

      expect(() => {
        assertComponents(registry, ['Field', 'Checkbox', 'Input', 'Switch'])
      }).toThrow('Checkbox component is not registered in ShadcnRegistry')
    })

    it('should handle undefined components as missing', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
        Input: undefined,
      }

      expect(() => {
        assertComponents(registry, ['Field', 'Input'])
      }).toThrow('Input component is not registered in ShadcnRegistry')
    })

    it('should handle null components as missing', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
        Input: null as any,
      }

      expect(() => {
        assertComponents(registry, ['Field', 'Input'])
      }).toThrow('Input component is not registered in ShadcnRegistry')
    })
  })

  describe('with conditional components (object format)', () => {
    it('should not throw when conditional component has a defined value', () => {
      const registry: ShadcnRegistry = {
        Input: createMockComponent(),
      }

      expect(() => {
        assertComponents(registry, [
          {
            name: 'Input',
            value: createMockComponent(),
          },
        ])
      }).not.toThrow()
    })

    it('should throw RequiredComponentError when conditional component value is undefined', () => {
      expect(() => {
        assertComponents({}, [
          {
            name: 'Input',
            value: undefined,
          },
        ])
      }).toThrow('Input component is not registered in ShadcnRegistry')
    })

    it('should throw with correct component name from conditional object', () => {
      expect(() => {
        assertComponents({}, [
          {
            name: 'Textarea',
            value: undefined,
          },
        ])
      }).toThrow('Textarea component is not registered in ShadcnRegistry')
    })

    it('should accept conditional component with truthy value', () => {
      expect(() => {
        assertComponents({}, [
          {
            name: 'Checkbox',
            value: true,
          },
        ])
      }).not.toThrow()
    })

    it('should accept conditional component with falsy but defined value (false)', () => {
      expect(() => {
        assertComponents({}, [
          {
            name: 'Switch',
            value: false,
          },
        ])
      }).not.toThrow()
    })

    it('should accept conditional component with zero value', () => {
      expect(() => {
        assertComponents({}, [
          {
            name: 'Input',
            value: 0,
          },
        ])
      }).not.toThrow()
    })

    it('should accept conditional component with empty string value', () => {
      expect(() => {
        assertComponents({}, [
          {
            name: 'Input',
            value: '',
          },
        ])
      }).not.toThrow()
    })

    it('should accept conditional component with null value explicitly set', () => {
      expect(() => {
        assertComponents({}, [
          {
            name: 'Input',
            value: null,
          },
        ])
      }).not.toThrow()
    })

    it('should accept conditional component with complex object value', () => {
      const complexValue = {
        Root: createMockComponent(),
        Trigger: createMockComponent(),
      }

      expect(() => {
        assertComponents({}, [
          {
            name: 'Select',
            value: complexValue,
          },
        ])
      }).not.toThrow()
    })

    it('should throw on first undefined conditional component value', () => {
      expect(() => {
        assertComponents({}, [
          {
            name: 'Input',
            value: createMockComponent(),
          },
          {
            name: 'Textarea',
            value: undefined,
          },
          {
            name: 'Checkbox',
            value: undefined,
          },
        ])
      }).toThrow('Textarea component is not registered in ShadcnRegistry')
    })
  })

  describe('with mixed string and conditional components', () => {
    it('should validate both string and conditional components together', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
      }

      expect(() => {
        assertComponents(registry, [
          'Field',
          {
            name: 'Input',
            value: createMockComponent(),
          },
        ])
      }).not.toThrow()
    })

    it('should throw when string component is missing in mixed list', () => {
      expect(() => {
        assertComponents({}, [
          'Field',
          {
            name: 'Input',
            value: createMockComponent(),
          },
        ])
      }).toThrow('Field component is not registered in ShadcnRegistry')
    })

    it('should throw when conditional component is missing in mixed list', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
      }

      expect(() => {
        assertComponents(registry, [
          'Field',
          {
            name: 'Input',
            value: undefined,
          },
        ])
      }).toThrow('Input component is not registered in ShadcnRegistry')
    })

    it('should validate multiple mixed components', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
        FieldLabel: createMockComponent(),
      }

      expect(() => {
        assertComponents(registry, [
          'Field',
          'FieldLabel',
          {
            name: 'Input',
            value: createMockComponent(),
          },
          {
            name: 'Checkbox',
            value: createMockComponent(),
          },
        ])
      }).not.toThrow()
    })
  })

  describe('with empty inputs', () => {
    it('should not throw with empty registry and empty required keys', () => {
      expect(() => {
        assertComponents({}, [])
      }).not.toThrow()
    })

    it('should not throw with populated registry and empty required keys', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
        Input: createMockComponent(),
      }

      expect(() => {
        assertComponents(registry, [])
      }).not.toThrow()
    })

    it('should throw with empty registry and required keys', () => {
      expect(() => {
        assertComponents({}, ['Field'])
      }).toThrow('Field component is not registered in ShadcnRegistry')
    })
  })

  describe('type guard assertion', () => {
    it('should act as a type guard for ShadcnRegistry', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
        Input: createMockComponent(),
      }

      assertComponents(registry, ['Field', 'Input'])

      // After assertion, TypeScript should treat registry as Required<ShadcnRegistry>
      // This is a compile-time check, but we can verify runtime behavior
      expect(registry.Field).toBeDefined()
      expect(registry.Input).toBeDefined()
    })
  })

  describe('error message formatting', () => {
    it('should include component name in error message for string keys', () => {
      expect(() => {
        assertComponents({}, ['Field' as any])
      }).toThrow('Field component is not registered in ShadcnRegistry')
    })

    it('should include component name in error message for conditional objects', () => {
      expect(() => {
        assertComponents({}, [
          {
            name: 'Field',
            value: undefined,
          },
        ])
      }).toThrow('Field component is not registered in ShadcnRegistry')
    })
  })

  describe('edge cases and boundary conditions', () => {
    it('should handle component with falsy display name', () => {
      const MockComponent = () => React.createElement('div')
      MockComponent.displayName = ''
      const registry: ShadcnRegistry = {
        Field: MockComponent,
      }

      expect(() => {
        assertComponents(registry, ['Field'])
      }).not.toThrow()
    })

    it('should handle registry with additional unexpected properties', () => {
      const MockComponent = () => React.createElement('div')
      const registry: ShadcnRegistry & { extraProp?: any } = {
        Field: MockComponent,
        extraProp: 'should be ignored',
      }

      expect(() => {
        assertComponents(registry, ['Field'])
      }).not.toThrow()
    })

    it('should handle very large required keys list', () => {
      const registry: ShadcnRegistry = {
        Field: createMockComponent(),
        FieldLabel: createMockComponent(),
        FieldDescription: createMockComponent(),
        FieldError: createMockComponent(),
        Input: createMockComponent(),
        Textarea: createMockComponent(),
        Checkbox: createMockComponent(),
        Switch: createMockComponent(),
      }

      const requiredKeys: any[] = [
        'Field',
        'FieldLabel',
        'FieldDescription',
        'FieldError',
        'Input',
        'Textarea',
        'Checkbox',
        'Switch',
      ]

      expect(() => {
        assertComponents(registry, requiredKeys)
      }).not.toThrow()
    })

    it('should fail fast on first missing component in large list', () => {
      const requiredKeys: any[] = ['Field', 'FieldLabel', 'Missing1', 'Missing2', 'Missing3']

      expect(() => {
        assertComponents({}, requiredKeys)
      }).toThrow('Field component is not registered in ShadcnRegistry')
    })

    it('should handle component with special object properties', () => {
      const registry: ShadcnRegistry = {
        Field: Object.create(null),
      }

      expect(() => {
        assertComponents(registry, ['Field'])
      }).not.toThrow()
    })
  })

  describe('RequiredComponentError class', () => {
    it('should be an instance of Error', () => {
      try {
        assertComponents({}, ['Field'])
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    it('should have correct error message format', () => {
      try {
        assertComponents({}, ['Input'])
      } catch (error) {
        expect((error as Error).message).toBe('Input component is not registered in ShadcnRegistry')
      }
    })
  })
})
