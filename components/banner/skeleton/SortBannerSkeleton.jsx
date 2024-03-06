import { Grid, Skeleton } from '@mui/material'
import React from 'react'

function SortBannerSkeleton() {
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
      {
        Array.from(Array(4), (_, i) => (
          <Grid
            item
            key={i}
            sx={{
              marginBottom: '20px'
            }}
          >
            <Grid
              container
              direction='row'
              alignItems='center'
            >
              <Grid
                item
                sx={{
                  width: '10%'
                }}
              >
                <Skeleton
                  variant='rounded'
                  width='80%'
                  height={80}
                />
              </Grid>
              <Grid
                item
                sx={{
                  width: '90%'
                }}
              >
                <Skeleton
                  variant='rounded'
                  width='100%'
                  height={120}
                />
              </Grid>
            </Grid>
          </Grid>
        ))
      }

    </Grid>
  )
}

export default SortBannerSkeleton