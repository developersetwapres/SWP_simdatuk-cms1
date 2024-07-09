/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ListDataPegawai from './ListDataPegawai'
import { useRouter } from 'next/router'
import { Button, Autocomplete } from '@/components/shared'
import LayoutPages from '@/components/core/LayoutPages'
import ButtonExport from '@/components/core/ButtonExport'
import ModalAddNotes from '@/components/shared/Modal/ModalAddNotes'
import { v4 as uuidv4 } from 'uuid'
import { SaveAs, saveFile } from '@/utils/fileSaver'
import { dateTimeFormat } from '@/utils/index'

// Dummy Data
const filterData = [
  { id: uuidv4(), title: 'Jabatan' },
  { id: uuidv4(), title: 'Eselon' },
  { id: uuidv4(), title: 'Golongan' },
  { id: uuidv4(), title: 'Pendidikan Terakhir' },
  { id: uuidv4(), title: 'Riwayat Jabatan' },
  { id: uuidv4(), title: 'Riwayat Pelatihan Struktural' },
  { id: uuidv4(), title: 'Riwayat Pelatihan Fungsional' },
  { id: uuidv4(), title: 'Riwayat Pelatihan Teknis' },
  { id: uuidv4(), title: 'Catatan' },
  { id: uuidv4(), title: 'Hasil Assessment' },
  { id: uuidv4(), title: 'Hasil Uji Kompetensi' },
  { id: uuidv4(), title: 'Hasil Talent Pool' }
]

// End Dummy Data

const BandingkanDataPegawai = ({
  exportComparisonStore,
  employee,
  notes,
  promotions,
  setLoading = () => { },
  getNotesByUserID = () => { },
  updateNotesByUserID = () => { },
  exportComparison = () => { },
  clearExportComparisonState = () => { },
  fetch = () => { }
}) => {
  const router = useRouter()
  const [expandFilter, setExpandFilter] = useState(false)
  const [filters, setFilters] = useState([])
  const [currentUserId, setCurrentUserId] = useState('')
  const [employees, setEmployees] = useState([])

  const getFileName = (type) => {
    const dateNow = dateTimeFormat(new Date())?.replace(' ', '_')
    const prefix = 'PERBANDINGAN_PEGAWAI_'
    let ext = '.pdf'

    if (type?.includes('pdf')) {
      ext = '.pdf'
    } else if (type?.includes('sheet')) {
      ext = '.xlsx'
    } else {
      ext = '.csv'
    }

    return prefix + dateNow + ext
  }

  const backPage = () => {
    localStorage.removeItem('dataPegawai')
    router.back()
  }

  const removeEmployee = (id) => {
    if (employees?.length <= 2) {
      backPage()
    } else {
      updateStorage(id)
      setEmployees(() => employees?.filter(i => i?.id != id))
    }
  }

  const updateStorage = (id) => {
    const storedData = localStorage.getItem('dataPegawai')
    const retrievedArray = storedData ? JSON.parse(storedData) : []
    const employeesData = retrievedArray?.filter(item => item?.id != id)
    localStorage.setItem('dataPegawai', JSON.stringify(employeesData))
  }

  const exportFileAs = (type, data) => {
    let output = '.pdf'

    if (type === SaveAs.PDF) {
      output = '.pdf'
    } else if (type === SaveAs.XLS) {
      output = '.xlsx'
    } else {
      output = '.csv'
    }

    exportComparison({
      user_id: data?.map(e => e?.id),
      output
    })
  }

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button text='Tambah Pegawai' color='primary' onClick={router.back} />
        <Button
          text='Reset Pegawai'
          color='sidatukDraweBase'
          onClick={() => {
            localStorage.removeItem('dataPegawai')
            router.back()
          }}
        />
        <ButtonExport
          data={[
            {
              name: 'PDF',
              action: () => exportFileAs(SaveAs.PDF, employees)
            },
            {
              name: 'XLS',
              action: () => exportFileAs(SaveAs.XLS, employees)
            },
            {
              name: 'CSV',
              action: () => exportFileAs(SaveAs.CSV, employees)
            }
          ]}
        />
      </Box>
    )
  }, [promotions, employees])

  const handleFilterClick = () => {
    setExpandFilter(!expandFilter)
  }

  const handleFilterChange = (vals) => {
    setFilters(vals)
  }

  const resetFilter = () => {
    setFilters([])
  }

  const [notesModalOpen, setNotesModalOpen] = useState(false)

  const handleNotesModal = (userId) => {
    if (userId) {
      getNotesByUserID(userId)
      setCurrentUserId(userId)
    }

    setNotesModalOpen(v => !v)
  }

  useEffect(() => {
    const isPromotion = router?.asPath?.includes('/promosi-pegawai')

    if (isPromotion) {
      setEmployees(promotions?.employeesDetailPromotion)
    } else {
      setEmployees(promotions?.employeesDetailCompare)
    }
  }, [promotions, router])

  useEffect(() => {
    fetch(router)
  }, [router])

  useEffect(() => {
    if (exportComparisonStore?.data) {
      const responseType = exportComparisonStore?.data?.type
      let type = SaveAs.PDF

      if (type?.includes('pdf')) {
        type = SaveAs.PDF
      } else if (type?.includes('sheet')) {
        type = SaveAs.XLS
      } else {
        type = SaveAs.CSV
      }

      saveFile(
        exportComparisonStore?.data,
        getFileName(responseType),
        type
      )

      clearExportComparisonState()
    }
  }, [exportComparisonStore])

  useEffect(() => {
    setLoading(
      !(
        employee?.loading ||
        notes?.loading ||
        exportComparisonStore?.loading ||
        promotions?.loading
      )
    )
  }, [employee, notes, exportComparisonStore, promotions])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Bandingkan Pegawai'
      action={action}
    >
      <Paper sx={{ padding: '20px' }}>
        <Box sx={{ marginBottom: '20px' }}>
          <Box
            sx={{
              marginBottom: '12px',
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography fontWeight='500'>Data Pegawai</Typography>
            </Box>
            <Box
              onClick={handleFilterClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '5px',
                width: '7rem',
                height: '3rem',
                borderRadius: '10px',
                border: '2px solid #895700',
                cursor: 'pointer'
              }}
            >
              <FilterAltIcon
                color='primary'
                sx={{
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              />
              <Typography
                color='primary'
                sx={{
                  fontWeight: '500'
                }}
              >
                Filter
              </Typography>
            </Box>
          </Box>
          {expandFilter && (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography fontWeight='500'>Filter Data</Typography>
                <Box width='90%'>
                  <Autocomplete
                    multiple
                    options={filterData?.map(i => i?.title)}
                    name='filter'
                    placeholder='Pilih Filter Data'
                    label=''
                    error={''}
                    value={filters}
                    onChange={handleFilterChange}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  marginTop: '12px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Button
                  text='Reset Filter'
                  sx={{
                    backgroundColor: '#d32f2f'
                  }}
                  onClick={resetFilter}
                />
                {/* <Button text='Selesai' /> */}
              </Box>
            </Box>
          )}
        </Box>
        <ListDataPegawai
          employees={employees}
          filters={filters}
          openNotesModal={handleNotesModal}
          removeEmployee={removeEmployee}
        />
      </Paper>

      <ModalAddNotes
        open={notesModalOpen}
        handleModal={() => handleNotesModal(null)}
        handleSave={updateNotesByUserID}
        data={employees?.find(item => item?.id === currentUserId)}
      />
    </LayoutPages>
  )
}

BandingkanDataPegawai.propTypes = {
  notes: PropTypes.object,
  exportComparisonStore: PropTypes.object,
  employee: PropTypes.object,
  promotions: PropTypes.object,
  setLoading: PropTypes.func,
  fetch: PropTypes.func,
  getNotesByUserID: PropTypes.func,
  updateNotesByUserID: PropTypes.func,
  exportComparison: PropTypes.func,
  clearExportComparisonState: PropTypes.func
}

export default BandingkanDataPegawai
