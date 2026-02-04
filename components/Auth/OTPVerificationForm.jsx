import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { Button } from '@/components/shared'
import { makeStyles } from '@mui/styles'
import { primaryButtonStyle } from '@/utils/theme'
import OtpInput from 'react-otp-input'

const useStyles = makeStyles({
  fontBold: {
    fontWeight: '600',
    padding: '0',
    margin: '0'
  },
  resendLink: {
    color: '#1976d2',
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': {
      color: '#115293'
    }
  }
})

function OTPVerificationForm({
  otpValue,
  error,
  countdown,
  canResend,
  handleOTPChange = () => {},
  handleSubmitOTP = () => {},
  handleResendOTP = () => {}
}) {
  const classes = useStyles()

  return (
    <Grid
      container
      direction='column'
      sx={{
        marginTop: '20px',
        backgroundColor: '#fff'
      }}
    >
      <Grid
        item
        sx={{
          marginBottom: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <OtpInput
          value={otpValue}
          onChange={handleOTPChange}
          numInputs={6}
          renderSeparator={<span style={{ margin: '0 8px' }}></span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: '50px',
            height: '50px',
            margin: '0 4px',
            fontSize: '20px',
            borderRadius: '8px',
            border: error ? '2px solid #d32f2f' : '2px solid #ccc',
            textAlign: 'center',
            outline: 'none',
            transition: 'all 0.3s'
          }}
          focusStyle={{
            border: '2px solid #1976d2',
            outline: 'none'
          }}
          shouldAutoFocus
        />
        {error && (
          <Typography
            sx={{
              color: '#d32f2f',
              margin: '10px 0 0 0',
              fontSize: '12px'
            }}
          >
            {error}
          </Typography>
        )}
      </Grid>

      <Grid item>
        <Button
          text='Verifikasi'
          sx={{
            textTransform: 'none',
            ...primaryButtonStyle,
            fontWeight: 'bold',
            fontSize: '15px',
            mt: 2
          }}
          fullWidth
          disabled={otpValue.length < 6}
          onClick={handleSubmitOTP}
        />
      </Grid>

      <Grid
        item
        sx={{
          marginTop: '20px',
          textAlign: 'center'
        }}
      >
        <Typography
          variant='body2'
          component='span'
          sx={{
            color: '#666'
          }}
        >
          Tidak menerima kode?{' '}
        </Typography>
        {canResend ? (
          <Typography
            variant='body2'
            component='span'
            className={classes.resendLink}
            onClick={handleResendOTP}
          >
            Kirim ulang
          </Typography>
        ) : (
          <Typography
            variant='body2'
            component='span'
            sx={{
              color: '#999',
              cursor: 'not-allowed'
            }}
          >
            Kirim ulang ({countdown}s)
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

OTPVerificationForm.propTypes = {
  otpValue: PropTypes.string,
  error: PropTypes.string,
  countdown: PropTypes.number,
  canResend: PropTypes.bool,
  handleOTPChange: PropTypes.func,
  handleSubmitOTP: PropTypes.func,
  handleResendOTP: PropTypes.func
}

export default OTPVerificationForm
