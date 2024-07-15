/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { Button } from '../shared'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

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
    width: '700px',
    padding: '20px',
    backgroundColor: '#fff',
    justifyContent: {
      xs: 'center',
      sm: 'center',
      md: 'center',
      lg: 'flex-start',
      xl: 'flex-start'
    },
    gap: '20px',
    borderRadius: '12px'
  }
}

const PetaJabatanLayout = ({ data, children }) => {
  const router = useRouter()

  const isDetail = useMemo(() => {
    return router?.pathname.includes('[staff]')
  }, [router])

  const employee = useMemo(() => {
    const payload = {
      ...data,
      user: { ...data?.users[0], has_child: data?.has_child } || {}
    }
    return payload
  }, [data, router])

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      {employee?.entity == 2 ? (
        <Box width='40vw' borderRadius={3} sx={styles.headerMap}>
          <Typography textAlign='center' fontWeight='bold'>
            {employee?.name}
          </Typography>
          {data?.isDetail && <Button text='Lihat Detail' marginBottom={4} />}
        </Box>
      ) : (
        <Grid item container sx={styles.leaderBox}>
          {/* Jabatan */}
          <Grid item xs={12}>
            <Typography
              variant='h6'
              component='p'
              sx={{
                width: '70%',
                margin: '0 auto',
                fontSize: '16px',
                fontWeight: 600,
                color: '#394346',
                textAlign: 'center'
              }}
            >
              {employee?.name || '-'}
            </Typography>
          </Grid>
          <Grid container item spacing={3}>
            {/* Avatar */}
            <Grid item xs={3}>
              {employee?.user?.photo_profile ? (
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
                  <img
                    src={employee?.user?.photo_profile}
                    alt='Employee Profile'
                    style={{ width: '100%', height: 'fit-content' }}
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
            <Grid item container xs={9} paddingY={2} sx={{ paddingX: '20px' }}>
              {/* Name */}
              <Grid item xs={12}>
                <Typography color='primary' fontSize='16px' fontWeight='600'>
                  {employee?.user?.name
                    ? [
                        employee?.user?.title_prefix,
                        employee?.user?.name,
                        employee?.user?.title_suffix
                      ].join(' ')
                    : '-'}
                </Typography>
              </Grid>
              {employee?.user?.type == 1 ? (
                <>
                  {/* Echelon */}
                  <Grid item xs={4}>
                    <Typography fontSize={16}>Eselon</Typography>
                    <Typography fontWeight='600' fontSize={14}>
                      {employee?.user?.echelon_name || '-'}
                    </Typography>
                  </Grid>
                  {/* Grade */}
                  <Grid item xs={4}>
                    <Typography>Golongan</Typography>
                    <Typography fontWeight='600' fontSize={14}>
                      {employee?.user?.grade_name || '-'}
                      {employee?.user?.grade_code
                        ? ` ${employee?.user?.grade_code}`
                        : ''}
                      {employee?.user?.position_effective_date
                        ? `, ${employee?.user?.position_effective_date}`
                        : ''}
                    </Typography>
                  </Grid>
                  {/* NIP/NRP */}
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
                      {`${employee?.user?.employee_id_number || '-'}${
                        employee?.user?.employee_registration_number ? '/' : ''
                      }`}
                    </Typography>
                    {employee?.user?.employee_registration_number && (
                      <Typography
                        fontWeight='600'
                        fontSize={14}
                        sx={{
                          whiteSpace: 'pre-wrap',
                          wordWrap: 'break-word'
                        }}
                      >
                        {employee?.user?.employee_registration_number}
                      </Typography>
                    )}
                  </Grid>
                </>
              ) : (
                <>
                  {/* NIP/NRP */}
                  <Grid item xs={4}>
                    <Typography>TMT</Typography>
                    <Typography
                      fontWeight='600'
                      fontSize={14}
                      sx={{
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word'
                      }}
                    >
                      {employee?.user?.position_effective_date || '-'}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          {/* Action */}
          <Grid container item xs={12} columnSpacing={2}>
            {employee?.user?.id && (
              <Grid item xs={employee?.has_child && !isDetail ? 6 : 12}>
                <Button
                  text='Lihat Profil'
                  onClick={() =>
                    router.push(
                      `/rekapitulasi/peta-jabatan/detail/${btoa(
                        employee?.user?.id
                      )}`
                    )
                  }
                  sx={{
                    backgroundColor: '#394346',
                    width: '100%'
                  }}
                />
              </Grid>
            )}
            {employee?.has_child && !isDetail && (
              <Grid item xs={6}>
                <Button
                  text='Lihat Detail'
                  onClick={() => {
                    router.push(
                      `/rekapitulasi/peta-jabatan/${btoa(employee?.id)}`
                    )
                  }}
                  sx={{
                    width: '100%'
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}

      {children}
    </Grid>
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
