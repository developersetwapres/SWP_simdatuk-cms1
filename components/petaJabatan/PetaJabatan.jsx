import React from 'react'
import EmployeeLayout from '../employee/EmployeeLayout'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { Button } from '../shared'
import ProfileCard from '../core/card/ProfileCard'

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


  const listPegawai = [
    {
      id: 1,
      position: 'Kepala Sekretariat Wakil Presiden',
      name: 'Ahmad Erani Yustika, S.E., M.Sc., Ph.Dr',
      image: '/simdatuk/imagePegawai.png',
      eselon: 'Es. I.a., 25-01-2021',
      golongan: 'Pembina Utama Madya (IV/d), 01-04-2017',
      NIP: '197303221997021001'
    },
    {
      id: 2,
      position: 'Asisten Deputi Ekonomi dan Keuangan',
      name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
      image: '/simdatuk/imagePegawai.png',
      eselon: 'Es. I.a., 25-01-2021',
      golongan: 'Pembina Utama (IV/e), 01-04-2017',
      NIP: '1965053019991031002'
    },
    {
      id: 3,
      position:
        'Asisten Deputi Industri, Perdagangan, Pariwisata, dan Ekonomi Kreatif ',
      name: 'Dr. Velix Vernando Wanggai S.IP., MPA',
      image: '/simdatuk/imagePegawai.png',
      eselon: 'Es. I.a, 23-08-2022',
      golongan: 'Pembina Utama Muda (IV/c), 01-10-2019',
      NIP: '197202161998031005'
    },
    {
      id: 4,
      position: 'Kepala Subbagian Dukungan Administrasi',
      name: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.',
      image: '/simdatuk/imagePegawai.png',
      eselon: 'Es. I.a, 01-03-2023',
      golongan: 'Pembina Utama (IV/e), 01-03-2023',
      NIP: '180004061 / 197010271995031001'
    }
  ]


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
      // gap={5}
      >
        <Box
          width='40vw'
          borderRadius={3}
          sx={styles.headerMap}
          marginBottom={4}
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
              paddingY={2}
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
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                  }}
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
        <hr
          style={{
            height: '50px',
            backgroundColor: '#394346',
            width: '2px',
            border: 0,
            margin: '0 auto'
          }}
        />
        <hr
          style={{
            width: '71.1%',
            height: '2px',
            border: 0,
            margin: 0,
            backgroundColor: '#394346'
          }}
        />
        <Grid
          container
          item
          gutter={0}
          padding={0}
          justifyContent='center'
          gap={3}
        >
          {
            listPegawai.map((item, index) =>
              <Grid
                item
                key={index + 1}

              >
                <hr
                  style={{
                    height: '10%',
                    width: '2px',
                    border: 0,
                    backgroundColor: '#394346',
                    margin: '0 auto'
                  }}
                />
                <ProfileCard
                  summary={item.position}
                  name={item.name}
                  imageSource={item.image}
                  eselon={item.eselon}
                  golongan={item.golongan}
                  nip={item.NIP}
                  lihatProfile='Lihat Profile'
                  lihatDetail='Lihat Detail'
                />

              </Grid>
            )
          }
        </Grid>
      </Grid>
    </EmployeeLayout >
  )
}

export default PetaJabatanComponent
