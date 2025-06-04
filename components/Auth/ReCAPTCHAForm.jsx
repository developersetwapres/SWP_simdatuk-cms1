import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useSelector } from 'react-redux'

const ReCAPTCHAForm = ({ setToken }) => {
  const recaptchaRef = useRef()
  const auth = useSelector((state) => state.authentication)

  const handleChange = (val) => {
    setToken(val)
  }

  useEffect(() => {
    if (auth?.error) recaptchaRef.current.reset()
  }, [auth])

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
