import React from 'react'
import { Grid, Skeleton } from '@mui/material'


function UserSkeleton() {
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
          margin: '30px 0 '
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
          marginBottom: '30px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='40%'
          height={100}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '30px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='100%'
          height={40}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '30px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='100%'
          height={40}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '30px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='100%'
          height={40}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '30px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='100%'
          height={40}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '30px'
        }}
      >
        <Skeleton
          variant='rounded'
          width='100%'
          height={40}
        />
      </Grid>
    </Grid>
  )
}

export default UserSkeleton