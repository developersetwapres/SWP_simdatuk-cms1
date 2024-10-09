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
  religionOptions,
  studyAreaOptions
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
import RiwayatCredit from './Section/RiwayatCredit'

const EmployeeDetailComponent = ({
  employee,
  training,
  exportEmployeeData,
  employmentType,
  position,
  getEmployee = () => {},
  getPosition = () => {},
  updateNotesByUserID = () => {},
  updateEmployeeStatus = () => {},
  clearEmployeeState = () => {},
  exportEmployeeDetail = () => {},
  setRender = () => {},
  clearPositionState = () => {}
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
    if (val || val >= 0) {
      if (type == 'marital_status') return options?.marital[val]

      if (type == 'employment_status') return options?.employeeStatus[val]

      if (type == 'education') return options?.educationLevel[val]

      if (type == 'education_status') return options?.educationStatus[val]

      if (type == 'structurals') return options?.educationStatus[val]

      return options[type][val]
    } else {
      return val
    }
  }

  const getPermissionID = (type) => {
    if (type == 1) {
      return PermissionsIDs.EMPLOYEE_ASN
    } else if (type == 2) {
      return PermissionsIDs.EMPLOYEE_NON_ASN
    } else if (type == 3) {
      return PermissionsIDs.EMPLOYEE_OUTSOURCING
    } else {
      return null
    }
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
      relationshipStatus: relationshipStatusOptions,
      studyArea: studyAreaOptions,
      levels: training?.levels || []
    }

    return dataOptions
  }, [training])

  const data = useMemo(() => {
    const detailEmployee = employee?.detail

    const payload = {
      ...detailEmployee,
      religion: getValue(
        'religion',
        detailEmployee?.religion ? detailEmployee?.religion - 1 : null
      ),
      maritalStatus: getValue(
        'marital_status',
        detailEmployee?.marital_status
          ? detailEmployee?.marital_status - 1
          : null
      ),
      employmentStatus: getValue(
        'employment_status',
        detailEmployee?.employment_status
          ? detailEmployee?.employment_status - 1
          : null
      ),
      educationLevel: getValue(
        'education',
        detailEmployee?.education_level
          ? detailEmployee?.education_level - 1
          : null
      ),
      educations: !!detailEmployee?.educations?.length
        ? [
            ...detailEmployee?.educations?.map((i) => ({
              ...i,
              level: getValue('education', i?.level - 1),
              status: getValue('education_status', i?.status - 1),
              area: getValue('studyArea', i?.study_area - 1)
            }))
          ]
        : []
    }

    return payload
  }, [employee, options])

  const path = useMemo(() => {
    const type = data?.type
    const payload = {
      ASN: type == 1,
      NonASN: type == 2,
      Outsource: type == 3
    }

    return payload
  }, [data])

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
    const employeeType = data?.type
    const isEdit =
      router?.pathname.includes('data-pegawai') &&
      accessGranted(getPermissionID(employeeType), Access.UPDATE)

    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        {isEdit && (
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
  }, [employmentStatusModalOpen, router, exportEmployeeData?.loading, data])

  const positionType = useMemo(() => {
    return position?.detail?.type == 2
  }, [position])

  const sectionsList = useMemo(() => {
    const sections = [
      {
        id: 'data_pegawai',
        data: data,
        Section: (props) => (
          <BiodataPegawai employmentType={employmentType?.data} {...props} />
        )
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
        id: 'riwayat_golongan_/_pangkat',
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
        id: 'riwayat_penetapan_angka_kredit_terakhir',
        data: data?.credits || [],
        Section: (props) => <RiwayatCredit {...props} />
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
        const hasTalentPoolAccess = accessGranted(
          PermissionsIDs.TALENT_POOL,
          Access.READ
        )

        if (
          (item?.id == 'riwayat_catatan' && !hasNotesAccess) ||
          (item?.id == 'hasil_talent_pool' && !hasTalentPoolAccess) ||
          (item?.id == 'riwayat_penetapan_angka_kredit_terakhir' &&
            !data?.position_id &&
            !positionType) ||
          (!path?.ASN &&
            (item?.id == 'hasil_assessment' ||
              item?.id == 'hasil_uji_kompetensi' ||
              item?.id == 'hasil_talent_pool'))
        ) {
          return false
        }

        // Filter menus by employment type
        const outsourcingMenu = [
          'data_pegawai',
          'riwayat_pendidikan',
          'riwayat_jabatan',
          'riwayat_pelatihan_teknis',
          'riwayat_keluarga',
          'riwayat_catatan'
        ]
        const asnMenu = [
          'riwayat_jabatan',
          'riwayat_golongan_/_pangkat',
          'riwayat_pelatihan_struktural',
          'riwayat_pelatihan_fungsional',
          'riwayat_pelatihan_teknis',
          'riwayat_penghargaan',
          'riwayat_skp',
          'riwayat_penetapan_angka_kredit_terakhir',
          'riwayat_penilaian_prestasi_kerja',
          'riwayat_hukuman_disiplin'
        ]
        const nonAsnMenu = ['data_pegawai', 'riwayat_jabatan']

        if (path?.ASN) {
          if (asnMenu.includes(item.id)) {
            return Array.isArray(item?.data) && item?.data.length > 0
          }

          return true
        }

        if (
          (path?.NonASN && nonAsnMenu.includes(item.id)) ||
          (path?.Outsource && outsourcingMenu?.includes(item?.id))
        ) {
          return item.id == 'data_pegawai' || item.id == 'riwayat_keluarga'
            ? true
            : Array.isArray(item?.data) && item?.data.length > 0
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

  const hanldleClearState = () => {
    clearPositionState()
    clearEmployeeState()
  }

  useEffect(() => {
    const id = router?.query?.id
    if (id) getEmployee(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', hanldleClearState)

    return () => {
      router.events.off('routeChangeComplete', hanldleClearState)
    }
  }, [router])

  useEffect(() => {
    const state = !employee?.loading && !position?.loading
    setRender(state)
  }, [employee, position])

  useEffect(() => {
    if (exportEmployeeData?.detail) saveFile(exportEmployeeData?.detail)
  }, [exportEmployeeData])

  useEffect(() => {
    const detailEmployee = employee?.detail
    const idPosition = detailEmployee?.position_id

    if (idPosition) getPosition(idPosition)
  }, [employee])

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
                          Eselon / Jenjang, TMT Eselon
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
                          Pangkat / Golongan
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
  training: PropTypes.object,
  exportEmployeeData: PropTypes.object,
  employmentType: PropTypes.object,
  position: PropTypes.object,
  getEmployee: PropTypes.func,
  clearEmployeeState: PropTypes.func,
  exportEmployeeDetail: PropTypes.func,
  updateNotesByUserID: PropTypes.func,
  updateEmployeeStatus: PropTypes.func,
  setRender: PropTypes.func,
  getPosition: PropTypes.func,
  clearPositionState: PropTypes.func
}

export default EmployeeDetailComponent
