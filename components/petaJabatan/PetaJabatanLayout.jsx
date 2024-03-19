import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { Button } from '../shared'
import PropTypes from 'prop-types'
import StrukturPetaJabatan from './StrukturPetaJabatan'


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

const PetaJabatanLayout = ({
  petaHeaderText,
  imageSrc,
  jabatan,
  name,
  golongan,
  eselon,
  nip,
  profil,
  detail,
  data
}) => {
  return (
    <>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        {
          petaHeaderText && (
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
                {petaHeaderText}
              </Typography>
              <Button
                text='Lihat Detail'
              />
            </Box>

          )
        }
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
              {jabatan}
            </Typography>
          </Grid>

          {/* Profile Image condition */}
          <Grid
            item
          >
            {
              imageSrc ? (
                <Image
                  src={imageSrc}
                  width={150}
                  height={200}
                  alt='avatar'
                />
              ) : (
                <Box
                  height={200}
                  width={150}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0'
                  }}
                >
                  <Image
                    src='/simdatuk/userIcon.png'
                    alt='profile'
                    height={70}
                    width={70}
                  />
                </Box>
              )
            }
          </Grid>
          {/* End Profile Image condition */}

          <Grid
            item
            xs={8}
          >
            <Typography
              color='primary'
              fontSize='16px'
              fontWeight='600'
            >
              {name ? name : '-'}
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
                  {eselon ? eselon : '-'}
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
                  {golongan ? golongan : '-'}
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
                  {nip ? nip : '-'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Header Button (Profile / Detail) */}
          <Grid
            container
            item
          >

            {
              profil && (
                <Grid
                  item
                  xs={detail ? 6 : 12}
                >
                  <Button
                    text='Lihat Profil'
                    sx={{
                      backgroundColor: '#394346',
                      width: detail ? '15rem' : '100%'
                    }}
                  />
                </Grid>
              )
            }
            {
              detail && (
                <Grid
                  item
                  xs={profil ? 6 : 12}
                >
                  <Button
                    text='Lihat Detail'
                    sx={{
                      width: profil ? '15rem' : '100%'
                    }}
                  />
                </Grid>
              )
            }
          </Grid>
          {/* End Header Button (Profile / Detail) */}

        </Grid>

        {/* Struktur organisasi (Anggota) */}
        <StrukturPetaJabatan
          data={data}
        />
        {/* End Struktur organisasi (Anggota) */}


      </Grid>
    </>
  )
}

PetaJabatanLayout.propTypes = {
  data: PropTypes.array,
  petaHeaderText: PropTypes.string,
  jabatan: PropTypes.string,
  name: PropTypes.string,
  eselon: PropTypes.string,
  golongan: PropTypes.string,
  nip: PropTypes.string,
  profil: PropTypes.bool,
  detail: PropTypes.bool,
  imageSrc: PropTypes.string
}

export default PetaJabatanLayout
