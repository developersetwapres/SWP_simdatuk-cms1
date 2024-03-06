import { Grid, Skeleton } from '@mui/material'
import React from 'react'

function SpreadSheetSkeleton() {
  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
        sx={{
          margin: '20px 0 '
        }}
      >
        <Skeleton
          variant='rounded'
          width='20%'
          height={40}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='45%'
          height={40}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='10%'
          height={20}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='45%'
          height={40}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='45%'
          height={200}
        />
      </Grid>
    </Grid>
  )
}

export default SpreadSheetSkeleton