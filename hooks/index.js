import { useState } from 'react'

/**
 * 
 * @param {*} initialValues
 * @param {Boolean} validateOnChange
 * @param {*} validate
 */
export const useForm = (
  initialValues,
  validateOnChange = false,
  validate
) => {
  // * Set Value and Error Form 
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  /**
   * Set Handle Input Change 
   * @param {*} e
   */
  const handleInputChange = e => {
    const { name, value } = e.target
    // * Set Dynamic Value from Form 
    setValues({
      ...values,
      [name]: value
    })

    // * Validate When onChange 
    if (validateOnChange)
      validate({ [name]: value })
  }

  /**
   * Reset Form
   */
  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
  }

  /**
   * Reset Field
   */
  const resetField = (name, value) => {
    setValues({
      ...values,
      [name]: value
    })
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    resetField
  }
}