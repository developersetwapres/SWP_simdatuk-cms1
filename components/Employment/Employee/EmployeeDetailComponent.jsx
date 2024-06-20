/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useEffect } from 'react'
import { Box, Grid, List, Typography } from '@mui/material'
import BiodataPegawai from './Section/BiodataPegawai'
import ListNavigation from '@/components/core/ListNavigation'
import RiwayatPendidikanSection from './Section/RiwayatPendidikanSection'
import RiwayatJabatanSection from './Section/RiwayatJabatanSection'
import RiwayatGolonganSection from './Section/RiwayatGolongan'
// import RiwayatGajiSection from './Section/RiwayatGajiSection'
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
import { monthsOptions } from 'libs/months'
import RiwayatAssessmentSection from './Section/RiwayatAssessmentSection'
import RiwayatUjikomSection from './Section/RiwayatUjikomSection'
import RiwayatTalentPoolSection from './Section/RiwayatTalentPoolSection'

const dataPegawai = [
  'Data Pegawai',
  'Riwayat Pendidikan',
  'Riwayat Golongan',
  // 'Riwayat Gaji',
  'Riwayat Pelatihan Struktural',
  'Riwayat Pelatihan Fungsional',
  'Riwayat Pelatihan Teknis',
  'Riwayat Penghargaan',
  'Riwayat SKP',
  'Riwayat Penilaian Prestasi Kerja',
  'Riwayat Hukuman Disiplin',
  'Riwayat Keluarga',
  'Riwayat Cuti',
  'Riwayat Catatan'
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
      month: monthsOptions,
      organization: ['Organisasi'],
      unit: ['Unit'],
      religion: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'],
      gender: ['Laki-Laki', 'Perempuan'],
      marital: ['Belum Menikah', 'Menikah', 'Cerai', 'Janda', 'Duda'],
      employeeStatus: [
        'Aktif',
        'Pensiun',
        'Berhenti',
        'Meninggal',
        'Alih Status',
        'Aktif PS',
        'CLTN',
        'TBLN',
        'Non Aktif',
        'Hukdis'
      ],
      educationLevel: [
        'SD/Sederajat',
        'SLTP/Sederajat',
        'SLTA/Sederajat',
        'Akademik/D3/S.Muda',
        'Diploma IV',
        'Strata I',
        'Strata II',
        'Strata III'
      ],
      educationStatus: [
        'Lulus',
        'DO',
        'Aktif',
        'Non Aktif',
        'Mengundurkan Diri'
      ],
      relationshipStatus: ['Orang Tua', 'Anak'],
      grove: [],
      typeOfDecree: [],
      typeOfDecreeEnd: [],
      positionLevels: [],
      positionStatus: [],
      gradeType: [],
      gradeStatus: []
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
                src={`https://content.ekuator.id/simdatuk/${data?.photo_profile}`}
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
            <Grid item xs={2} sx={{ position: 'sticky', top: '400px' }}>
              <List
                sx={{
                  padding: '12px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#fff'
                }}
              >
                {dataPegawai.map((item, index) => (
                  <ListNavigation key={index} name={item} />
                ))}
              </List>
            </Grid>
            <Grid item xs={10}>
              <Grid container gap={3}>
                <Grid item xs={12}>
                  <BiodataPegawai detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatPendidikanSection detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatJabatanSection detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatGolonganSection detail={data} />
                </Grid>
                {/* <Grid item xs={12}>
                  <RiwayatGajiSection detail={data} />
                </Grid> */}
                <Grid item xs={12}>
                  <PelatihanStrukturalSection detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <PelatihanFungsionalSection detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatPelatihanTeknisSection detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatPenghargaanSection detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatSKP detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatPrestasiKerja detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatHukumanDisiplin detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatKeluargaSection detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatCutiSection detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatCatatanSection detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatAssessmentSection detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatUjikomSection detail={data} />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatTalentPoolSection detail={data} />
                </Grid>
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
