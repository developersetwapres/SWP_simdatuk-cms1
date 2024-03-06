import React from 'react'
import { Grid, Skeleton } from '@mui/material'


function UserRoleSkeleton() {
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
          height={40}
        />
      </Grid>
      <Grid
        item
      >
        {
          Array.from(Array(6), (_, i) => (
            <Grid
              key={i}
              container
              sx={{
                display: 'flex',
                flexDirection: {
                  xl: 'row',
                  lg: 'row',
                  md: 'column',
                  sm: 'column',
                  xs: 'column'
                },
                justifyContent: {
                  xl: 'space-between',
                  lg: 'space-between',
                  md: 'unset',
                  sm: 'unset',
                  xs: 'unset'
                },
                marginBottom: '30px'
              }}
            >
              <Grid
                item
                sx={{
                  width: {
                    xl: '48%',
                    lg: '48%',
                    md: '100%',
                    sm: '100%',
                    xs: '100%'
                  },
                  marginBottom: {
                    xl: '30px',
                    lg: '30px',
                    md: '20px',
                    sm: '20px',
                    xs: '20px'
                  }
                }}
              >
                <Skeleton
                  variant='rounded'
                  width='100%%'
                  height={110}
                />
              </Grid>
              <Grid
                item
                sx={{
                  width: {
                    xl: '48%',
                    lg: '48%',
                    md: '100%',
                    sm: '100%',
                    xs: '100%'
                  },
                  marginBottom: {
                    xl: '30px',
                    lg: '30px',
                    md: '20px',
                    sm: '20px',
                    xs: '20px'
                  }
                }}
              >
                <Skeleton
                  variant='rounded'
                  width='100%'
                  height={110}
                />
              </Grid>
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  )
}

export default UserRoleSkeleton