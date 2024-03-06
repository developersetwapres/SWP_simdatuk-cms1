import React from 'react'
import { Button } from '@/components/shared'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { blackButtonStyle, primaryButtonStyle } from '@/utils/theme'

function CouponToolbarComponent() {
  const router = useRouter()
  return (
    <Grid
      container
      spacing={2}
      direction='row'
    >
      <Grid
        item
      >
        <Button
          text='Tambah Kupon'
          sx={{
            textTransform: 'none',
            ...primaryButtonStyle
          }}
          color='warning'
          onClick={() => router.push('/manajemen-kupon/kupon/create')}
        />
      </Grid>
      <Grid
        item
      >
        <Button
          text='Tambah Kupon by Spreadsheet'
          sx={{
            textTransform: 'none',
            ...blackButtonStyle
          }}
          onClick={() => router.push('/manajemen-kupon/kupon/create/spreadsheet')}
        />
      </Grid>
    </Grid>
  )
}

export default CouponToolbarComponent