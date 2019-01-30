import { _validSchema, _throwError } from './utils'

const generateInitialValues = schema => {
  if (_validSchema(schema)) {
    const output = {}

    schema.forEach(field => (output[field['name']] = field['initialValue'] || ''))

    return output
  }

  return _throwError('generateInitialValues')
}

export default generateInitialValues
