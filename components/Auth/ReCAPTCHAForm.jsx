import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const ReCAPTCHAForm = ({ setToken }) => {
  const recaptchaRef = useRef()

  const handleChange = (val) => {
    setToken(val)
  }

  return (
    <Box sx={{ width: '100px' }}>
      <form>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
          onChange={handleChange}
        />
      </form>
    </Box>
  )
}

ReCAPTCHAForm.propTypes = {
  setToken: PropTypes.func
}

export default ReCAPTCHAForm
