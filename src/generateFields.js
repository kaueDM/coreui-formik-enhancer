import React from 'react'
import MaskedInput from 'react-text-mask'
import { _validSchema, _throwError, _setFieldSize } from './utils'
import { FormGroup, Input, Label, FormFeedback, Row, Col } from 'reactstrap'

const generateFields = (schema, formikProps) => {
  if (_validSchema(schema)) {
    return (
      <Row>
        {schema.map((field, index) => _renderField(index, field, formikProps))}
      </Row>
    )
  }

  return _throwError('generateFields')
}

const _renderField = (key, field, formikProps) => {
  switch (field['type']) {
    case 'text':
    case 'password':
      return _renderTextField(key, field, formikProps)
    case 'select':
      return _renderSelectField(key, field, formikProps)
    default:
      return _renderTextField(key, field, formikProps)
  }
}

const _renderTextField = (key, field, formikProps) => {
  const { touched, errors, values, setFieldValue, handleBlur } = formikProps
  const { name, label, type, mask, disabled, placeholder, size, onChangeCallback } = field

  return (
    <Col {..._setFieldSize(size)} key={key}>
      <FormGroup>
        <Label>{label}</Label>
        <MaskedInput

          className='form-control'
          name={name}
          disabled={disabled}
          type={type || 'text'}
          onBlur={handleBlur(name)}
          mask={mask || (_ => false)}
          placeholder={placeholder || ''}
          onChange={e => {
            onChangeCallback(e.target.value)
            setFieldValue(name, e.target.value)
          }}
          render={(ref, props) => (
            <Input
              innerRef={ref}
              value={values[name]}
              invalid={!!(touched[name] && errors[name])}
              {...props}
            />
          )}
        />

        {touched[name] &&
          errors[name] &&
          <FormFeedback className='form-message'>{errors[name]}</FormFeedback>
        }
      </FormGroup>
    </Col>
  )
}

const _renderSelectField = (key, field, formikProps) => {
  const { values, touched, errors, setFieldValue } = formikProps
  const { name, label, disabled, options, size, onChangeCallback } = field

  return (
    <Col {..._setFieldSize(size)} key={key}>
      <FormGroup style={{ position: 'relative' }}>
        <Label>{label}</Label>
        <Input
          name={name}
          type='select'
          disabled={disabled}
          value={values[name]}
          invalid={!!(touched[name] && errors[name])}
          onChange={e => {
            onChangeCallback(e.target.value)
            setFieldValue(name, e.target.value)
          }}
        >
          <option>Selecione</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </Input>

        {
          touched[name] &&
          errors[name] &&
          <FormFeedback className='form-message'>{errors[name]}</FormFeedback>
        }
      </FormGroup>
    </Col>
  )
}

export default generateFields
