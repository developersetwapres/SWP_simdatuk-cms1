/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useEffect } from 'react'
import { Box, Grid, List, Typography } from '@mui/material'
import BiodataPegawai from './Section/BiodataPegawai'
import ListNavigation from '@/components/core/ListNavigation'
import RiwayatPendidikanSection from './Section/RiwayatPendidikanSection'
import RiwayatJabatanSection from './Section/RiwayatJabatanSection'
import RiwayatGolonganSection from './Section/RiwayatGolongan'
import PelatihanStrukturalSection from './Section/PelatihanStrukturalSection'
import PelatihanFungsionalSection from './Section/PelatihanFungsional'
import RiwayatPelatihanTeknisSection from './Section/RiwayatPelatihanTeknisSection'
import RiwayatPenghargaanSection from './Section/RiwayatPenghargaanSection'
import RiwayatSKP from './Section/RiwayatSKPSection'
import RiwayatPrestasiKerja from './Section/RiwayatPrestasiKerja'
import RiwayatHukumanDisiplin from './Section/RiwayatHukumanDisiplin'
import RiwayatKeluargaSection from './Section/RiwayatKeluargaSection'
import RiwayatCutiSection from './Section/RiwayatCutiSection'
import RiwayatCatatanSection from './Section/RiwayatCatatanSection'
import { useRouter } from 'next/router'
import LayoutPages from '@/components/core/LayoutPages'
import ButtonExport from '@/components/core/ButtonExport'
import Paper from '@/components/shared/overrides/Paper'
import { Button } from '@/components/shared'
import PropTypes from 'prop-types'
import RiwayatAssessmentSection from './Section/RiwayatAssessmentSection'
import RiwayatUjikomSection from './Section/RiwayatUjikomSection'
import RiwayatTalentPoolSection from './Section/RiwayatTalentPoolSection'
import {
  educationStatusOptions,
  employeeEducationLevelOptions,
  employeeStatusOptions,
  genderOptions,
  maritalStatusOptions,
  monthOptions,
  organizationOptions,
  relationshipStatusOptions,
  religionOptions
} from 'libs/types/options'

const dataPegawai = [
  'Data Pegawai',
  'Riwayat Pendidikan',
  'Riwayat Golongan',
  'Riwayat Pelatihan Struktural',
  'Riwayat Pelatihan Fungsional',
  'Riwayat Pelatihan Teknis',
  'Riwayat Penghargaan',
  'Riwayat SKP',
  'Riwayat Penilaian Prestasi Kerja',
  'Riwayat Hukuman Disiplin',
  'Riwayat Keluarga',
  'Riwayat Cuti',
  'Riwayat Catatan',
  'Hasil Assessment',
  'Hasil Uji Kompetensi',
  'Hasil Talent Pool'
]

const EmployeeDetailComponent = ({
  employee,
  institution,
  residence,
  getEmployee = () => { },
  setRender = () => { }
}) => {
  const router = useRouter()
  const options = useMemo(() => {
    const dataOptions = {
      month: monthOptions,
      organization: organizationOptions,
      religion: religionOptions,
      gender: genderOptions,
      marital: maritalStatusOptions,
      employeeStatus: employeeStatusOptions,
      educationLevel: employeeEducationLevelOptions,
      educationStatus: educationStatusOptions,
      relationshipStatus: relationshipStatusOptions
    }

    return dataOptions
  }, [])

  const getValue = (type, val) => {
    if (type == 'institutions')
      return institution?.options?.find((itm) => itm?.id == val)?.name

    if (type == 'marital_status')
      return options?.marital[val]

    if (type == 'residence')
      return residence?.data?.find(item => item?.id == val)?.name

    if (type == 'employment_status')
      return options?.employeeStatus[val]

    if (type == 'education')
      return options?.educationLevel[val]

    if (type == 'education_status')
      return options?.educationStatus[val]

    return options[type][val]
  }

  const data = useMemo(() => {
    const detailEmployee = employee?.detail

    const payload = {
      ...detailEmployee,
      religion: getValue('religion', detailEmployee?.religion - 1),
      institution: getValue('institutions', detailEmployee?.institution_id),
      maritalStatus: getValue('marital_status', detailEmployee?.marital_status - 1),
      residence: getValue('residence', detailEmployee?.residence_id),
      employmentStatus: getValue('employment_status', detailEmployee?.employment_status - 1),
      educationLevel: getValue('education', detailEmployee?.education_level - 1),
      educations:
        !!detailEmployee?.educations?.length ?
          [...detailEmployee?.educations?.map(
            i => ({
              ...i,
              level: getValue('education', i?.level - 1),
              status: getValue('education_status', i?.status - 1)
            })
          )] : []
    }

    return payload
  }, [employee, residence, institution])

  useEffect(() => {
    const id = router?.query?.id
    if (id) getEmployee(atob(id))
  }, [router])

  useEffect(() => {
    setRender(!(employee?.loading && institution?.loading && residence?.loading))
  }, [employee?.loading, institution?.loading, residence?.loading])

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button text='Edit Status Pegawai' color='primary' onClick={() => { }} />
        <Button text='Edit' color='sidatukDraweBase' onClick={() => { }} />
        <ButtonExport data={[{ name: 'PDF', action: () => { } }]} />
      </Box>
    )
  }, [])

  const sectionComponents = () => {
    const outsourcingPage = router?.asPath?.includes('outsourcing')

    if (outsourcingPage) {
      return (
        <>
          <Grid item xs={12} id='data_pegawai'>
            <BiodataPegawai
              detail={data}
            />
          </Grid>
          <Grid item xs={12} id='riwayat_pendidikan'>
            <RiwayatPendidikanSection
              detail={data}
            />
          </Grid>
          <Grid item xs={12} id='riwayat_catatan'>
            <RiwayatCatatanSection
              detail={data}
            />
          </Grid>
        </>
      )
    }

    return (
      <>
        <Grid item xs={12} id='data_pegawai'>
          <BiodataPegawai
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_pendidikan'>
          <RiwayatPendidikanSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_jabatan'>
          <RiwayatJabatanSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_golongan'>
          <RiwayatGolonganSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_pelatihan_struktural'>
          <PelatihanStrukturalSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_pelatihan_fungsional'>
          <PelatihanFungsionalSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_pelatihan_teknis'>
          <RiwayatPelatihanTeknisSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_penghargaan'>
          <RiwayatPenghargaanSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_skp'>
          <RiwayatSKP
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_penilaian_prestasi_kerja'>
          <RiwayatPrestasiKerja
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_hukuman_disiplin'>
          <RiwayatHukumanDisiplin
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_keluarga'>
          <RiwayatKeluargaSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_cuti'>
          <RiwayatCutiSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='riwayat_catatan'>
          <RiwayatCatatanSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='hasil_assessment'>
          <RiwayatAssessmentSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='hasil_uji_kompetensi'>
          <RiwayatUjikomSection
            detail={data}
          />
        </Grid>
        <Grid item xs={12} id='hasil_talent_pool'>
          <RiwayatTalentPoolSection
            detail={data}
          />
        </Grid>
      </>
    )
  }

  const handleNavigationMenuClick = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary={'Detail Profil'}
      formatExport={['PDF']}
      otherStyle={{ alignItems: 'center' }}
      action={action}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ height: '200px', display: 'flex', gap: '20px' }}>
            {/* Image Profile */}
            <Box
              sx={{
                height: '160px',
                width: '130px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={data?.photo_profile}
                alt='Pegawai'
                style={{
                  height: '100%',
                  width: 'fit-content'
                }}
              />
            </Box>
            {/* Detail Bio */}
            <Box sx={{ width: '100%' }}>
              <Typography
                component='h5'
                fontSize={20}
                fontWeight='bold'
                color='primary'
              >
                {data?.name || '-'}
              </Typography>
              <Typography fontSize={14} fontWeight='500'>
                {data?.position_name || '-'}
              </Typography>
              <Grid container sx={{ marginTop: '20px' }}>
                <Grid item xs={4}>
                  <Box>
                    <Typography component='h5' sx={{ fontSize: '14px' }}>
                      Eselon
                    </Typography>
                    <Typography fontSize={14} fontWeight='600'>
                      {
                        data?.echelon_name && data?.echelon_effective_date ?
                          `${data?.echelon_name}${data?.echelon_effective_date ? ', ' + data?.echelon_effective_date : ''}` : '-'
                      }
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography component='h5' sx={{ fontSize: '14px' }}>
                      Golongan
                    </Typography>
                    <Typography fontSize={14} fontWeight='600'>
                      {
                        data?.grade_name && data?.grade_effective_date ?
                          `${data?.grade_name || ''}${data?.grade_effective_date ? ', ' + data?.grade_effective_date : ''}` : '-'
                      }
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography component='h5' sx={{ fontSize: '14px' }}>
                      NIP/NRP
                    </Typography>
                    <Typography fontSize={14} fontWeight='600'>
                      {data?.employee_registration_number || '-'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <List
                sx={{
                  padding: '12px',
                  borderRadius: '12px',
                  overflow: 'scroll',
                  backgroundColor: '#fff',
                  position: 'sticky !important',
                  top: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  height: () => {
                    const outsourcingPage = router?.asPath?.includes('outsourcing')

                    return outsourcingPage ? 'unset' : window.innerHeight * 0.70 + 'px'
                  }
                }}
              >
                {dataPegawai
                  .filter((item) => {
                    const outsourcingPage = router?.asPath?.includes('outsourcing')
                    const outsourcingMenu = ['Data Pegawai', 'Riwayat Pendidikan', 'Riwayat Catatan']
                    return outsourcingPage ? outsourcingMenu?.includes(item) : item
                  })
                  .map((item, index) => {
                    const id = item?.toLowerCase()?.split(' ')?.join('_')

                    return (
                      <ListNavigation
                        key={index}
                        name={item}
                        handleClick={() => handleNavigationMenuClick(id)}
                      />
                    )
                  })}
              </List>
            </Grid>
            <Grid item xs={10}>
              <Grid container gap={3}>
                {sectionComponents()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LayoutPages>
  )
}

EmployeeDetailComponent.propTypes = {
  employee: PropTypes.object,
  institution: PropTypes.object,
  residence: PropTypes.object,
  getEmployee: PropTypes.func,
  setRender: PropTypes.func
}

export default EmployeeDetailComponent
