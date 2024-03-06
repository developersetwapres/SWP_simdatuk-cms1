import React from 'react'
import { Grid, Skeleton } from '@mui/material'

function CourseEditorChoiceSkeleton() {
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
          width='100%'
          height={40}
        />
      </Grid>
      {
        Array.from(Array(3), (_, i) => (
          <Grid
            item
            key={i}
            sx={{
              margin: '20px 0'
            }}
          >
            <Skeleton
              variant='rounded'
              width='100%'
              height={150}
            />
          </Grid>
        ))
      }
      <Grid
        item
      >
        <Skeleton
          variant='rounded'
          width='20%'
          height={40}
        />
      </Grid>
    </Grid>
  )
}

export default CourseEditorChoiceSkeleton