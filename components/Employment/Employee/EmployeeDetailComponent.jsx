/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useEffect, useState } from 'react'
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
import ModalEditEmploymentStatus from '@/components/shared/Modal/ModalEditEmploymentStatus'
import ModalAddNotes from '@/components/shared/Modal/ModalAddNotes'
import { capitalizeFirstLetter, dateTimeFormat } from '@/utils/index'
import { useDispatch } from 'react-redux'
import { CLEAR_EXPORT_EMPLOYEE_DETAIL_STATE } from '@/store/constants'

const EmployeeDetailComponent = ({
  employee,
  exportEmployeeData,
  institution,
  getEmployee = () => { },
  updateEmployee = () => { },
  clearEmployeeState = () => { },
  exportEmployeeDetail = () => { },
  setRender = () => { }
}) => {
  const router = useRouter()
  const dispatch = useDispatch()

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
  }, [employee])

  useEffect(() => {
    const id = router?.query?.id
    if (id) getEmployee(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearEmployeeState)

    return () => {
      router.events.off('routeChangeComplete', clearEmployeeState)
    }
  }, [router])

  useEffect(() => {
    setRender(!(employee?.loading || institution?.loading || exportEmployeeData?.loading))
  }, [employee, institution, exportEmployeeData])

  // Export
  useEffect(() => {
    if (exportEmployeeData?.detail) saveFile(exportEmployeeData?.detail)
  }, [exportEmployeeData])

  const saveFile = (resp) => {
    // set the blog type to final pdf
    const file = new Blob([resp], { type: 'application/pdf' })

    // process to auto download it
    const fileURL = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = fileURL
    link.download = getFileName()
    link.click()
    URL.revokeObjectURL(fileURL)
    dispatch({ type: CLEAR_EXPORT_EMPLOYEE_DETAIL_STATE })
  }

  const getFileName = () => {
    const dateNow = dateTimeFormat(new Date())?.replace(' ', '_')
    const prefix = 'DATA_PEGAWAI_' + data?.id

    return prefix + dateNow + '.pdf'
  }

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        {router?.asPath?.includes('data-pegawai') && (
          <>
            <Button text='Edit Status Pegawai' color='primary' onClick={() => setEmploymentStatusModal(true)} />
            <Button
              text='Edit'
              color='sidatukDraweBase'
              onClick={() =>
                router.push(`${router.pathname}/edit/${btoa(data?.id)}`)
              }
            />
          </>
        )}

        <ButtonExport
          data={[
            { name: 'PDF', action: () => exportAsPDF() }
          ]}
        />
      </Box>
    )
  }, [employmentStatusModalOpen])

  const exportAsPDF = () => {
    const id = router?.query?.id

    if (id) {
      exportEmployeeDetail(atob(id))
    }
  }

  const sectionComponents = () => {
    return sectionsList.map(item => (
      <Grid item key={item.id} xs={12} id={item.id}>
        <item.Section
          data={item.data}
        />
      </Grid>
    ))
  }

  const handleNavigationMenuClick = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  const [employmentStatusModalOpen, setEmploymentStatusModal] = useState(false)
  const [notesModal, setNotesModal] = useState(false)

  const sectionsList = useMemo(() => {
    const sections = [
      {
        id: 'data_pegawai',
        data: data,
        Section: (props) => <BiodataPegawai {...props} />
      },
      {
        id: 'riwayat_pendidikan',
        data: data?.educations || [],
        Section: (props) => <RiwayatPendidikanSection {...props} />
      },
      {
        id: 'riwayat_jabatan',
        data: data?.positions || [],
        Section: (props) => <RiwayatJabatanSection {...props} />
      },
      {
        id: 'riwayat_golongan',
        data: data?.grades || [],
        Section: (props) => <RiwayatGolonganSection {...props} />
      },
      {
        id: 'riwayat_pelatihan_struktural',
        data: data?.structurals || [],
        Section: (props) => <PelatihanStrukturalSection {...props} />
      },
      {
        id: 'riwayat_pelatihan_fungsional',
        data: data?.functionals || [],
        Section: (props) => <PelatihanFungsionalSection {...props} />
      },
      {
        id: 'riwayat_pelatihan_teknis',
        data: data?.technicals || [],
        Section: (props) => <RiwayatPelatihanTeknisSection {...props} />
      },
      {
        id: 'riwayat_penghargaan',
        data: data?.recognitions || [],
        Section: (props) => <RiwayatPenghargaanSection {...props} />
      },
      {
        id: 'riwayat_skp',
        data: data?.targets || [],
        Section: (props) => <RiwayatSKP {...props} />
      },
      {
        id: 'riwayat_penilaian_prestasi_kerja',
        data: data?.performances || [],
        Section: (props) => <RiwayatPrestasiKerja {...props} />
      },
      {
        id: 'riwayat_hukuman_disiplin',
        data: data?.disciplinaries || [],
        Section: (props) => <RiwayatHukumanDisiplin {...props} />
      },
      {
        id: 'riwayat_keluarga',
        data: data?.families || [],
        Section: (props) => <RiwayatKeluargaSection {...props} />
      },
      {
        id: 'riwayat_cuti',
        data: data?.leaves || [],
        Section: (props) => <RiwayatCutiSection {...props} />
      },
      {
        id: 'riwayat_catatan',
        data: data?.notes || [],
        Section: (props) => <RiwayatCatatanSection {...props} addNewNotes={() => setNotesModal(true)} />
      },
      {
        id: 'hasil_assessment',
        data: data?.assessments || [],
        Section: (props) => <RiwayatAssessmentSection {...props} />
      },
      {
        id: 'hasil_uji_kompetensi',
        data: data?.competencies || [],
        Section: (props) => <RiwayatUjikomSection {...props} />
      },
      {
        id: 'hasil_talent_pool',
        data: data?.talents || [],
        Section: (props) => <RiwayatTalentPoolSection {...props} />
      }
    ]

    const datas = sections
      .filter((item) => {
        const outsourcingPage = router?.asPath?.includes('outsourcing')
        const outsourcingMenu = ['riwayat_pendidikan', 'riwayat_catatan']
        const chosenRiwayatMenu = [
          'riwayat_jabatan',
          'riwayat_golongan',
          'riwayat_pelatihan_struktural',
          'riwayat_pelatihan_fungsional',
          'riwayat_pelatihan_teknis',
          'riwayat_penghargaan',
          'riwayat_skp',
          'riwayat_penilaian_prestasi_kerja',
          'riwayat_hukuman_disiplin'
        ]

        // Filter by Outsourcing menus
        if (outsourcingPage && outsourcingMenu?.includes(item?.id)) {
          return true
        }

        if (!outsourcingPage) {
          if (chosenRiwayatMenu.includes(item.id)) {
            return Array.isArray(item?.data) && item.data.length > 0
          } else {
            return true
          }
        }

        return false
      })
      .map(i => ({
        ...i,
        sideBarLabel:
          i?.id?.split('_')?.map(item => capitalizeFirstLetter(item))?.join(' ')
      }))

    return datas
  }, [data])

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
                src={data?.photo_profile || '/simdatuk/userIcon.png'}
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
                {data?.position_merged || '-'}
              </Typography>
              <Grid container sx={{ marginTop: '20px' }}>
                <Grid item xs={4}>
                  <Box>
                    <Typography component='h5' sx={{ fontSize: '14px' }}>
                      Eselon
                    </Typography>
                    <Typography fontSize={14} fontWeight='600'>
                      {data?.echelon_name || '-'}, {data?.echelon_effective_date || '-'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography component='h5' sx={{ fontSize: '14px' }}>
                      Golongan
                    </Typography>
                    <Typography fontSize={14} fontWeight='600'>
                      {data?.grade_name || '-'} {data?.grade_code || '-'}, {data?.grade_effective_date || '-'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography component='h5' sx={{ fontSize: '14px' }}>
                      NIP/NRP
                    </Typography>
                    <Typography fontSize={14} fontWeight='600'>
                      {data?.employee_id_number || '-'}/{data?.employee_registration_number || '-'}
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
                  height: 'fit-content',
                  maxHeight: '88vh'
                }}
              >
                {sectionsList
                  .map((item) => {
                    return (
                      <ListNavigation
                        key={item?.id}
                        name={item?.sideBarLabel}
                        handleClick={() => handleNavigationMenuClick(item?.id)}
                        sx={{ height: '20px ' }}
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

      <ModalEditEmploymentStatus
        open={employmentStatusModalOpen}
        handleCancel={() => setEmploymentStatusModal(false)}
        handleSave={updateEmployee}
        data={data}
      />

      <ModalAddNotes
        open={notesModal}
        handleCancel={() => setNotesModal(false)}
        handleSave={updateEmployee}
        data={data}
      />
    </LayoutPages>
  )
}

EmployeeDetailComponent.propTypes = {
  employee: PropTypes.object,
  exportEmployeeData: PropTypes.object,
  institution: PropTypes.object,
  getEmployee: PropTypes.func,
  clearEmployeeState: PropTypes.func,
  exportEmployeeDetail: PropTypes.func,
  updateEmployee: PropTypes.func,
  setRender: PropTypes.func
}

export default EmployeeDetailComponent
