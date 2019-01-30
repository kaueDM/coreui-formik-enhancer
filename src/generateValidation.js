import * as Yup from 'yup'
import { _validSchema, _throwError } from './utils'

const generateValidation = schema => {
  if (_validSchema(schema)) {
    const output = {}

    schema.forEach(field => (output[field['name']] = field['validation']))

    return Yup.object().shape(output)
  }

  return _throwError('generateValidation')
}

export default generateValidation
