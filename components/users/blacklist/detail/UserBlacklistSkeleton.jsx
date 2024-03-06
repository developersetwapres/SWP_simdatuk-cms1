import React from 'react'
import { Grid, Skeleton } from '@mui/material'

function UserBlacklistSkeleton() {
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
          marginBottom: '40px'
        }}
      >
        <Skeleton
          variant='circular'
          width='200px'
          height='200px'
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '40px'
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
          marginBottom: '40px'
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
          marginBottom: '40px'
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
          marginBottom: '40px'
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
          marginBottom: '40px'
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
          marginBottom: '40px'
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

export default UserBlacklistSkeleton