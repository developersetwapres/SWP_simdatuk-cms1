/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable indent */
import React, { useMemo, useEffect, useState, useRef } from 'react'
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
  maritalStatuFamilysOptions,
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
import {
  Access,
  accessGranted,
  PermissionsIDs
} from '@/utils/permissionManager'

const EmployeeDetailComponent = ({
  employee,
  exportEmployeeData,
  getEmployee = () => {},
  updateNotesByUserID = () => {},
  updateEmployeeStatus = () => {},
  clearEmployeeState = () => {},
  exportEmployeeDetail = () => {},
  setRender = () => {}
}) => {
  const router = useRouter()
  const sectionRef = useRef(null)
  const dispatch = useDispatch()

  const [employmentStatusModalOpen, setEmploymentStatusModal] = useState(false)
  const [notesModal, setNotesModal] = useState(false)
  const [sectionId, setSectionId] = useState('data_pegawai')

  const handleNotesModal = () => {
    setNotesModal((notesModal) => !notesModal)
  }

  const getValue = (type, val) => {
    if (type == 'marital_status') return options?.marital[val]

    if (type == 'employment_status') return options?.employeeStatus[val]

    if (type == 'education') return options?.educationLevel[val]

    if (type == 'education_status') return options?.educationStatus[val]

    return options[type][val]
  }

  const path = useMemo(() => {
    const pathname = router?.pathname.split('/')[2]
    const data = {
      ASN: pathname == 'asn',
      NonASN: pathname == 'non-asn',
      Outsource: pathname == 'outsourcing'
    }

    return data
  }, [router])

  const getPermissionID = (pathName) => {
    // Rekapitulasi
    if (pathName?.includes('rekapitulasi')) {
      if (pathName?.includes('/komposisi-pegawai/'))
        return PermissionsIDs.RECAP_COMPOSITION

      if (pathName?.includes('/pegawai-asn/')) return PermissionsIDs.RECAP_ASN

      if (pathName?.includes('/pegawai-non-asn/'))
        return PermissionsIDs.RECAP_NON_ASN

      if (pathName?.includes('/pegawai-outsourcing/'))
        return PermissionsIDs.RECAP_OUTSOURCING

      if (pathName?.includes('/peta-jabatan/'))
        return PermissionsIDs.RECAP_POSITION_MAPPING

      return null
    }
    // Data Pegawai
    if (pathName?.includes('data-pegawai')) {
      if (pathName?.includes('/asn/')) return PermissionsIDs.EMPLOYEE_ASN

      if (pathName?.includes('/non-asn/'))
        return PermissionsIDs.EMPLOYEE_NON_ASN

      if (pathName?.includes('/outsourcing/'))
        return PermissionsIDs.EMPLOYEE_OUTSOURCING

      return null
    }
    // Data Riwayat
    if (pathName?.includes('data-riwayat')) {
      if (pathName?.includes('/golongan/')) return PermissionsIDs.HISTORY_GRADE

      if (pathName?.includes('/hukuman-disiplin/'))
        return PermissionsIDs.HISTORY_DISCIPLINARY

      if (pathName?.includes('/jabatan/'))
        return PermissionsIDs.HISTORY_POSITION

      if (pathName?.includes('/pelatihan-fungsional/'))
        return PermissionsIDs.HISTORY_FUNCTIONAL

      if (pathName?.includes('/pelatihan-struktural/'))
        return PermissionsIDs.HISTORY_STRUCTURAL

      if (pathName?.includes('/pelatihan-teknis/'))
        return PermissionsIDs.HISTORY_TECHNICAL

      if (pathName?.includes('/penghargaan/'))
        return PermissionsIDs.HISTORY_AWARD

      if (pathName?.includes('/skp/')) return PermissionsIDs.HISTORY_SKP

      if (pathName?.includes('/ppk/')) return PermissionsIDs.HISTORY_PERFORMANCE

      return null
    }

    return null
  }

  const options = useMemo(() => {
    const dataOptions = {
      month: monthOptions,
      organization: organizationOptions,
      religion: religionOptions,
      gender: genderOptions,
      marital: maritalStatusOptions,
      maritalFamily: maritalStatuFamilysOptions,
      employeeStatus: employeeStatusOptions,
      educationLevel: employeeEducationLevelOptions,
      educationStatus: educationStatusOptions,
      relationshipStatus: relationshipStatusOptions
    }

    return dataOptions
  }, [])

  const data = useMemo(() => {
    const detailEmployee = employee?.detail

    const payload = {
      ...detailEmployee,
      religion: getValue('religion', detailEmployee?.religion - 1),
      maritalStatus: getValue(
        'marital_status',
        detailEmployee?.marital_status - 1
      ),
      employmentStatus: getValue(
        'employment_status',
        detailEmployee?.employment_status - 1
      ),
      educationLevel: getValue(
        'education',
        detailEmployee?.education_level - 1
      ),
      educations: !!detailEmployee?.educations?.length
        ? [
            ...detailEmployee?.educations?.map((i) => ({
              ...i,
              level: getValue('education', i?.level - 1),
              status: getValue('education_status', i?.status - 1)
            }))
          ]
        : []
    }

    return payload
  }, [employee])

  const titleSummary = useMemo(() => {
    if (router?.pathname.includes('data-pegawai')) {
      const type = data?.type
        ? data?.type == 1
          ? 'ASN'
          : data?.type == 2
          ? 'Non ASN'
          : 'Outsourcing'
        : ''

      return `Detail Pegawai ${type} ${data?.employmentStatus || ''}`
    } else {
      return 'Detail Profil'
    }
  }, [data])

  const action = useMemo(() => {
    if (!accessGranted(getPermissionID(router.asPath), Access.UPDATE))
      return null

    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        {router?.asPath?.includes('data-pegawai') && (
          <>
            <Button
              text='Edit Status Pegawai'
              color='primary'
              onClick={() => setEmploymentStatusModal(true)}
            />
            <Button
              text='Edit'
              color='sidatukDraweBase'
              onClick={() => {
                const id = router?.query?.id
                const path = router.pathname
                const pathSplit = path.split('/')
                const pathname = pathSplit.slice(0, 3).join('/')
                router.push(`${pathname}/edit/${id}`)
              }}
            />
          </>
        )}

        <ButtonExport
          isLoading={exportEmployeeData?.loading}
          data={[{ name: 'PDF', action: () => exportAsPDF() }]}
        />
      </Box>
    )
  }, [employmentStatusModalOpen, router, exportEmployeeData?.loading])

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
        Section: (props) => (
          <RiwayatCatatanSection {...props} addNewNotes={handleNotesModal} />
        )
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
        // Filter Notes Section by some permissions
        const hasNotesAccess = accessGranted(PermissionsIDs.NOTES, Access.READ)

        if (!hasNotesAccess) {
          return item?.id !== 'riwayat_catatan'
        }

        const hasTalentPoolAccess = accessGranted(
          PermissionsIDs.TALENT_POOL,
          Access.READ
        )

        if (!hasTalentPoolAccess) {
          return item?.id !== 'hasil_talent_pool'
        }

        // Filter by Outsourcing menus
        const outsourcingPage = router?.asPath?.includes('outsourcing')
        const outsourcingMenu = [
          'data_pegawai',
          'riwayat_pendidikan',
          'riwayat_catatan'
        ]
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
      .map((i) => ({
        ...i,
        sideBarLabel: i?.id
          ?.split('_')
          ?.map((item) => capitalizeFirstLetter(item))
          ?.join(' ')
      }))

    return datas
  }, [data])

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

  const exportAsPDF = () => {
    const id = router?.query?.id

    if (id) {
      exportEmployeeDetail(atob(id))
    }
  }

  const sectionComponents = () => {
    return sectionsList.map((item) => (
      <Grid ref={sectionRef} item key={item.id} xs={12} id={item.id}>
        <item.Section data={item.data} />
      </Grid>
    ))
  }

  const handleNavigationMenuClick = (id) => {
    setSectionId(id)
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleCheckSectionActive = (id) => {
    return id == sectionId
  }

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
    const state = !employee?.loading
    setRender(state)
  }, [employee])

  useEffect(() => {
    if (exportEmployeeData?.detail) saveFile(exportEmployeeData?.detail)
  }, [exportEmployeeData])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary={titleSummary}
      otherStyle={{ alignItems: 'center' }}
      action={action}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ minHeight: '200px', display: 'flex', gap: '20px' }}>
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
              {/* Name */}
              <Typography
                component='h5'
                fontSize={20}
                fontWeight='bold'
                color='primary'
              >
                {[data?.title_prefix, data?.name, data?.title_suffix].join(' ')}
              </Typography>
              {/* Position */}
              <Typography fontSize={14} fontWeight='500'>
                {data?.position_merged || '-'}
              </Typography>
              <Grid container sx={{ marginTop: '20px' }} spacing={1}>
                {/* Echelon / Grade */}
                {!path?.Outsource && (
                  <>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography component='h5' sx={{ fontSize: '14px' }}>
                          Eselon
                        </Typography>
                        <Typography fontSize={14} fontWeight='600'>
                          {[
                            data?.echelon_name || '-',
                            data?.echelon_effective_date || '-'
                          ].join(', ')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography component='h5' sx={{ fontSize: '14px' }}>
                          Golongan / Pangkat
                        </Typography>
                        <Typography fontSize={14} fontWeight='600'>
                          {[
                            [
                              data?.grade_name || '-',
                              data?.grade_code || '-'
                            ].join(' '),
                            data?.grade_effective_date || '-'
                          ].join(', ')}
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                )}
                {/* NIP/NRP */}
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography component='h5' sx={{ fontSize: '14px' }}>
                      {`NIP${!path?.Outsource ? '/NRP' : ''}`}
                    </Typography>
                    <Typography
                      fontSize={14}
                      fontWeight='600'
                      sx={{
                        wordWrap: 'break-word'
                      }}
                    >
                      {[
                        data?.employee_id_number || '-',
                        ...[
                          !path?.Outsource
                            ? data?.employee_registration_number || '-'
                            : null
                        ]
                      ]
                        .filter((itm) => itm)
                        .join('/')}
                      {}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          {/* Navigation */}
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
              {sectionsList.map((item) => {
                return (
                  <ListNavigation
                    key={item?.id}
                    name={item?.sideBarLabel}
                    handleClick={() => handleNavigationMenuClick(item?.id)}
                    sx={{ height: '20px ' }}
                    otherStyle={{
                      borderRadius: '4px',
                      background: handleCheckSectionActive(item?.id)
                        ? '#895700'
                        : 'inherit',
                      color: handleCheckSectionActive(item?.id)
                        ? '#FFF'
                        : 'inherit',
                      '&:hover': {
                        background: handleCheckSectionActive(item?.id)
                          ? '#6d4500'
                          : 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  />
                )
              })}
            </List>
          </Grid>
          {/* Section */}
          <Grid container item xs={10} gap={3}>
            {sectionComponents()}
          </Grid>
        </Grid>
      </Grid>

      <ModalEditEmploymentStatus
        open={employmentStatusModalOpen}
        handleCancel={() => setEmploymentStatusModal(false)}
        handleSave={updateEmployeeStatus}
        data={data}
      />

      <ModalAddNotes
        open={notesModal}
        handleModal={handleNotesModal}
        handleSave={updateNotesByUserID}
        data={data}
      />
    </LayoutPages>
  )
}

EmployeeDetailComponent.propTypes = {
  employee: PropTypes.object,
  exportEmployeeData: PropTypes.object,
  getEmployee: PropTypes.func,
  clearEmployeeState: PropTypes.func,
  exportEmployeeDetail: PropTypes.func,
  updateNotesByUserID: PropTypes.func,
  updateEmployeeStatus: PropTypes.func,
  setRender: PropTypes.func
}

export default EmployeeDetailComponent
