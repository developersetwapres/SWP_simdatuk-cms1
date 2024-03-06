import React, { Fragment } from 'react'
import { Skeleton as MuiSkeleton } from '@mui/material'

export default function Skeleton() {
  return (
    <Fragment>
      <MuiSkeleton animation='wave' width='50%' />
      <MuiSkeleton animation='wave' width='100%' />
      {/* <MuiSkeleton animation='wave' width='100%' />
      <MuiSkeleton animation='wave' width='100%' /> */}
    </Fragment>
  )
}