import React from 'react'
import { Grid, Skeleton } from '@mui/material'

function BannerSkeleton() {
  return (
    <Grid
      container
      direction='column'
      sx={{
        marginTop: '20px'
      }}
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
          width='100%'
          height={40} />
      </Grid>
      <Grid
        item={{
          marginBottom: '20px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='25%'
          height={200} />
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '20px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='100%'
          height={40} />
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '20px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='15%'
          height={60}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '20px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='15%'
          height={60}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '20px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='15%'
          height={60}
        />
      </Grid>
    </Grid>
  )
}

export default BannerSkeleton