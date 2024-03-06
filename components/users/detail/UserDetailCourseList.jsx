/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/styles'
import { Rating } from '@/components/shared'

const BorderLinearProgress = styled(LinearProgress)({
  height: 12,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#EDEDED',
    height: 12
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: '#FE9516'
  }
})

const useStyles = makeStyles({
  root: {
    display: 'flex'
  },
  image: {
    width: '100%',
    maxWidth: '240px',
    height: '135px',
    borderRadius: '6px',
    objectFit: 'cover'
  },
  rating: {
    marginTop: '-10px'
  }
})

const bull = (
  <Box
    component='span'
    sx={{ display: 'inline-block', mx: '5px', transform: 'scale(1.4)' }}
  >
    •
  </Box>
)

/**
 * User Detail Course List 
 * @param {String} path
 * @param {*} progress
 * @param {*} title 
 * @param {*} author 
 * @param {*} category 
 * @param {*} rating 
 * @param {*} totalRating
 * 
 * @returns 
 * 
 */

function UserDetailCourseList({
  path,
  progress,
  title,
  author,
  category,
  rating,
  totalRating,
  footer
}) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <div>
        <div>
          <img
            src={path || '/images/default-image.png'}
            alt='course'
            className={classes.image}
          />
        </div>
        <div style={{
          marginTop: '20px'
        }}>
          <BorderLinearProgress variant='determinate' value={progress} />
        </div>
      </div>
      <div style={{
        marginLeft: '20px'
      }}>
        <h3 style={{
          fontWeight: '500',
          margin: 0
        }}>{title}</h3>
        <p style={{
          margin: '0'
        }}>{author} {bull} {category}</p>
        <Rating
          totalRating={totalRating}
          value={rating}
          readOnly
          classes={{
            margin: 0
          }}
        />
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <p style={{
            // marginLeft: '10px'
          }}>{footer?.level?.name}</p>
          {bull}
          <p>{
            footer?.language?.length > 1
              ? footer?.language?.map(v => v.name).join(', ')
              : footer?.language?.map(v => v.name) || ''}</p>
          {bull}
          <p>{footer?.price_name?.name}</p>
          {bull}
          <p>{footer?.date_course?.name}</p>
        </div>
      </div>
    </Box>
  )
}

UserDetailCourseList.propTypes = {
  path: PropTypes.string,
  progress: PropTypes.any,
  title: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.any,
  rating: PropTypes.any,
  totalRating: PropTypes.any,
  footer: PropTypes.object
}

export default UserDetailCourseList