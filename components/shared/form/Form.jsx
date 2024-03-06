import React from 'react'
import PropTypes from 'prop-types'

function Form({
  children,
  ...others
}) {
  return (
    <form
      autoComplete='off'
      {...others}
    >
      {children}
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node
}

export default Form