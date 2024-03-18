import React from 'react'
import EmployeeLayout from '../employee/EmployeeLayout'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { Button } from '../shared'

const styles = {
  headerMap: {
    backgroundColor: '#fff',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '15px'
  },
  leaderBox: {
    backgroundColor: '#fff',
    gap: '10px',
    justifyContent: {
      xs: 'center',
      sm: 'center',
      md: 'center',
      lg: 'flex-start',
      xl: 'flex-start'
    }
  }
}


const PetaJabatanComponent = () => {
  return (
    <EmployeeLayout
      summary='Peta Jabatan'
      showExpButton={true}
    >
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Box
          width='40vw'
          borderRadius={3}
          sx={styles.headerMap}
        >
          <Typography
            textAlign='center'
            fontWeight='bold'
          >
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
          borderRadius={3}
          sx={styles.leaderBox}
        >
          <Grid
            item
            xs={12}
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
            xs={8}
          >
            <Typography
              color='primary'
              fontSize='16px'
              fontWeight='600'
            >
              Ahmad Erani Yustika, S.E., M.Sc., Ph.D.
            </Typography>
            <Grid
              item
              container
              justifyContent='space-between'
            >
              <Grid
                item
                lg={3}
                xs={4}
              >
                <Typography
                  fontSize={16}
                >
                  Eselon
                </Typography>
                <Typography
                  fontWeight='600'
                  fontSize={14}
                >
                  Es. I.a., 25-01-2021
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
              >
                <Typography>
                  Golongan
                </Typography>
                <Typography
                  fontWeight='600'
                  fontSize={14}
                >
                  Pembina Utama Madya (IV/d), 01-04-2017
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
              >
                <Typography>
                  NIP/NRP
                </Typography>
                <Typography
                  fontWeight='600'
                  fontSize={14}
                  whiteSpace='pre-wrap'
                  wordWrap='break-word'
                >
                  197303221997021001
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            justifyContent='center'
            columnSpacing={2}
          >
            <Grid
              item
              xs={6}
            >
              <Button
                text='Lihat Profile'
                sx={{
                  backgroundColor: '#394346',
                  width: '15rem'
                }}
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <Button
                text='Lihat Detail'
                sx={{
                  width: '15rem'
                }}
              />
            </Grid>
          </Grid>
        </Grid>


      </Grid>
    </EmployeeLayout >
  )
}

export default PetaJabatanComponent
