import React from 'react'
import { Rating as MuiRating } from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from '@mui/styles'

const CustomStyledRating = styled(MuiRating)({
  '& .MuiRating-iconFilled': {
    color: '#FE9516'
  }
  // '& .MuiRating-iconHover': {
  //   color: '#ff3d47'
  // }
})

function Rating({
  name,
  value,
  totalRating,
  classes,
  ...others
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      ...classes
    }}>
      <CustomStyledRating
        name={name}
        value={value}
        {...others}
      />
      {
        totalRating && (
          <p style={{ paddingLeft: '5px', fontWeight: '400' }}>{`(${totalRating})`}</p>
        )
      }
    </div>
  )
}

Rating.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  totalRating: PropTypes.number,
  classes: PropTypes.object
}

export default Rating