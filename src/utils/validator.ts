import { ObjectSchema, ValidationError } from 'joi'

type V = object | undefined

const validate = (schema: ObjectSchema, object: V) => {
  let error: ValidationError | undefined
  let values
  try {
    const { error: err, value: val } = schema.validate(object)

    error = err
    values = val
  } catch (e) {
    error = e
  }
  return { values, error }
}

export default validate
