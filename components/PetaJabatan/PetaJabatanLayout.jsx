/* eslint-disable react/prop-types */
import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { Button } from '../shared'
import PropTypes from 'prop-types'

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
    justifyContent: {
      xs: 'center',
      sm: 'center',
      md: 'center',
      lg: 'flex-start',
      xl: 'flex-start'
    }
  }
}

const PetaJabatanLayout = ({ data, children }) => {
  return (
    <>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        {data?.name == null ? (
          <Box width='40vw' borderRadius={3} sx={styles.headerMap}>
            <Typography textAlign='center' fontWeight='bold'>
              {data?.position}
            </Typography>
            {data?.isDetail && <Button text='Lihat Detail' marginBottom={4} />}
          </Box>
        ) : (
          <Grid
            item
            container
            padding={2}
            width='40vw'
            borderRadius={3}
            sx={styles.leaderBox}
            columnSpacing={2}
          >
            {/* Jabatan */}
            <Grid item xs={12}>
              <Typography
                variant='h6'
                component='p'
                fontSize='16px'
                fontWeight='600'
                textAlign='center'
                color='#394346'
              >
                {data?.position || '-'}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              columnSpacing={3}
              sx={{ marginY: '20px' }}
            >
              {/* Avatar */}
              <Grid item xs={3}>
                {data?.image ? (
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
                      src={data?.image}
                      width={150}
                      height={200}
                      alt='avatar'
                    />
                  </Box>
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
                )}
              </Grid>

              {/* Bio */}
              <Grid item xs={9}>
                <Typography color='primary' fontSize='16px' fontWeight='600'>
                  {data?.name || '-'}
                </Typography>
                <Grid
                  item
                  container
                  paddingY={2}
                  justifyContent='space-between'
                >
                  <Grid item lg={3} xs={4}>
                    <Typography fontSize={16}>Eselon</Typography>
                    <Typography fontWeight='600' fontSize={14}>
                      {data?.eselon || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Golongan</Typography>
                    <Typography fontWeight='600' fontSize={14}>
                      {data?.golongan || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>NIP/NRP</Typography>
                    <Typography
                      fontWeight='600'
                      fontSize={14}
                      sx={{
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word'
                      }}
                    >
                      {data?.nip || '-'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Action */}
            {(data?.isDetail || data?.isProfile) && (
              <Grid container item xs={12} columnSpacing={2}>
                {data?.isProfile && (
                  <Grid item xs={data?.isProfile ? 6 : 12}>
                    <Button
                      text='Lihat Profil'
                      sx={{
                        backgroundColor: '#394346',
                        width: '100%'
                      }}
                    />
                  </Grid>
                )}
                {data?.isDetail && (
                  <Grid item xs={data?.isDetail ? 6 : 12}>
                    <Button
                      text='Lihat Detail'
                      sx={{
                        width: '100%'
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        )}

        {children}
      </Grid>
    </>
  )
}

PetaJabatanLayout.propTypes = {
  children: PropTypes.node,
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
