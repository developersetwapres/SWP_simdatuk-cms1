import React from 'react'
import EmployeeLayout from '../employee/EmployeeLayout'
import { Box, Grid, Typography } from '@mui/material'
import { Button } from '../shared'
import Image from 'next/image'

const PetaJabatanComponent = () => {
  return (
    <EmployeeLayout
      summary='Peta Jabatan'
    >
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        sx={{
          backgroundColor: 'red'
        }}
      >
        <Box
          width='40vw'
          sx={{
            backgroundColor: '#cedede',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '15px'

          }}
        >
          <Typography>
            Staff Khusus Wakil Presiden
          </Typography>
          <Button
            text='Lihat Detail'
          />
        </Box>

        <Grid
          item
          container
          padding={2}
          width='40vw'
          sx={{
            backgroundColor: '#eaeaea',
            gap: 2
          }}
        >
          <Grid
            item
            lg={12}
          >
            <Typography
              variant='h6'
              component='p'
              fontSize='16px'
              fontWeight='600'
              textAlign='center'
              color='#394346'
            >
              Kepala Sekretariat Wakil Presiden
            </Typography>
          </Grid>
          <Grid
            item

          >
            <Image
              src='/simdatuk/imagePegawai.png'
              width={130}
              height={170}
              alt='Profile Image'
            />
          </Grid>
          <Grid
            item
            lg={8}
          >
            <Typography
              color='primary'
              sx={{
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Ahmad Erani Yustika, S.E., M.Sc., Ph.D.
            </Typography>
            <Grid
              item
              container

            >
              <Grid
                item
                lg={4}
              >
                <Typography
                  fontSize={16}
                >
                  Eselon
                </Typography>
                <Typography
                  fontWeight='600'
                >
                  Es. I.a., 25-01-2021
                </Typography>
              </Grid>
              <Grid
                item
                lg={4}
              >
                <Typography>
                  Golongan
                </Typography>
                <Typography
                  fontWeight='600'
                >
                  Pembina Utama Madya (IV/d), 01-04-2017
                </Typography>
              </Grid>
              <Grid
                item
                lg={4}
              >
                <Typography>
                  NIP/NRP
                </Typography>
                <Typography
                  fontWeight='600'
                >
                  197303221997021001
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </EmployeeLayout >
  )
}

export default PetaJabatanComponent
