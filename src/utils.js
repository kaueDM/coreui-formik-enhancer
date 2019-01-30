import errors from './errors'

export const _validSchema = schema => Array.isArray(schema) && schema.length

export const _throwError = functionName => {
  const index = errors.findIndex(x => x['name'] === functionName)
  const error = index > -1 ? errors[index]['message'] : 'generic error message'

  return console.error(`[FormBoost] ${functionName} failed! \n ${error}`)
}

export const _setFieldSize = size => typeof (size) === 'object' ? size : { xs: size || 12 }
