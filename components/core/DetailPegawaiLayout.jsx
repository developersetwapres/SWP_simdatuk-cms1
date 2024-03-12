import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import ButtonExport from './ButtonExport'
import { Button } from '../shared'
import ButtonEdit from './ButtonEdit'

const DetailPegawaiLayout = () => {
  return (
    <Container
      width='lg'
      height='100%'
      sx={{
        backgroundColor: '#000'
      }}
    >
      <Grid container>
        <Grid
          container
          item
        >
          <Box>
            <Typography>Detail Profile</Typography>
          </Box>

          <Box>
            <Button
              text='Edit Status pegawai'
            />
            <ButtonEdit />
            <ButtonExport />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DetailPegawaiLayout
