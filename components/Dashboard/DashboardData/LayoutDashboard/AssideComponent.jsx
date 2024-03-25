import React from 'react'
import { Grid } from '@mui/material'
import Image from 'next/image'
import PropTypes from 'prop-types'
import COUNT_ICON from '/public/simdatuk/count.png'
import GENDER_ICON from '/public/simdatuk/gender.png'
import TYPE_ICON from '/public/simdatuk/type.png'


const AssideComponent = ({ name }) => {

  return (
    <Grid item>
      <Image
        src={
          name === 'count' ? (COUNT_ICON) : (
            name === 'gender' ? (GENDER_ICON) : TYPE_ICON
          )
        }
        width={350}
        height={250}
        alt=''
      />
    </Grid>
  )
}


AssideComponent.propTypes = {
  name: PropTypes.string
}

export default AssideComponent
