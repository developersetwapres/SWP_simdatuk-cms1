import React from 'react'
import { Grid, Skeleton } from '@mui/material'

function CourseOrganizerSkeleton() {
  return (
    <Grid
      container
      direction='column'
    >
      {/* <Grid
        item
        sx={{
          margin: '20px 0 '
        }}
      >
        <Skeleton
          variant='rounded'
          width='100%'
          height={40}
        />
      </Grid> */}
      {
        Array.from(Array(3), (_, i) => (
          <Grid
            key={i}
            sx={{
              marginBottom: {
                xl: '20px',
                lg: '20px',
                md: '20px',
                sm: '20px',
                xs: '20px'
              }
            }}
          >
            <Grid
              container
              sx={{
                flexDirection: {
                  xl: 'row',
                  lg: 'row',
                  md: 'column',
                  sm: 'column',
                  xs: 'column'
                }
              }}
            // spacing={3}
            >
              <Grid
                item
                sx={{
                  width: {
                    xl: '60%',
                    lg: '60%',
                    md: '100%',
                    sm: '100%',
                    xs: '100%'
                  },
                  marginBottom: {
                    xl: '20px',
                    lg: '20px',
                    md: '20px',
                    sm: '20px',
                    xs: '20px'
                  }
                }}
              >
                <Skeleton
                  variant='rounded'
                  sx={{
                    width: {
                      xl: '60%',
                      lg: '60%',
                      md: '100%',
                      sm: '100%',
                      xs: '100%'
                    }
                  }}
                  height={100}
                />
              </Grid>
              <Grid
                item
                sx={{
                  width: '20%'
                }}
              >
                {/* <Skeleton
                  variant='rounded'
                  width='40%'
                  height={100}
                /> */}
              </Grid>
            </Grid>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default CourseOrganizerSkeleton