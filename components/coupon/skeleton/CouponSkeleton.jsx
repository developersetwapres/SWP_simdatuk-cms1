import { Grid, Skeleton } from '@mui/material'
import React from 'react'

function CouponSkeleton() {
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
          width='100%'
          height={50}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Grid
          container
          direction='row'
          alignItems='center'
          spacing={3}
        >
          <Grid
            item
            sx={{
              width: '50%'
            }}
          >
            <Skeleton
              variant='rounded'
              width='100%'
              height={50} />
          </Grid>
          <Grid
            item
            sx={{
              width: '50%'
            }}
          >
            <Skeleton
              variant='rounded'
              width='100%'
              height={50} />
          </Grid>
        </Grid>
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
          height={50}
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
          height={50}
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
          width='20%'
          height={50}
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
          width='20%'
          height={50}
        />
      </Grid>
    </Grid>
  )
}

export default CouponSkeleton