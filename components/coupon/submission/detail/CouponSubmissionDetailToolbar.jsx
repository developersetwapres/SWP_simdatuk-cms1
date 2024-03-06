import React from 'react'
import { Grid } from '@mui/material'
import { Button } from '@/components/shared'
import PropTypes from 'prop-types'

function CouponSubmissionDetailToolbar({
  coupon,
  handleModalReject = () => { },
  handleModalApprove = () => { },
  getCommandFilterCouponSubmission = () => { }
}) {
  return (
    <Grid
      container
      direction='row'
      spacing={2}
    >
      {
        coupon.status === 0 && (
          <>
            <Grid
              item
            >
              <Button
                text='Setujui'
                color='success'
                sx={{
                  textTransform: 'none'
                }}
                onClick={() => {
                  handleModalApprove('open')
                  getCommandFilterCouponSubmission({ provider_id: coupon?.provider?.id })
                }}
              />
            </Grid>
            <Grid
              item
            >
              <Button
                text='Tolak'
                color='danger'
                onClick={() => handleModalReject('open')}
                sx={{
                  textTransform: 'none'
                }}
              />
            </Grid>
          </>
        )
      }
    </Grid>
  )
}

CouponSubmissionDetailToolbar.propTypes = {
  coupon: PropTypes.object,
  handleModalReject: PropTypes.func,
  handleModalApprove: PropTypes.func,
  getCommandFilterCouponSubmission: PropTypes.func
}

export default CouponSubmissionDetailToolbar