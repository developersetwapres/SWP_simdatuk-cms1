/* eslint-disable no-unused-vars */
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
  employeesDetails,
  setLoading = () => { },
  getNotesByUserID = () => { },
  updateNotesByUserID = () => { },
  exportComparison = () => { },
  clearExportComparisonState = () => { }
}) => {
  const router = useRouter()
  const [expandFilter, setExpandFilter] = useState(false)
  const [filters, setFilters] = useState([])
  const [currentUserId, setCurrentUserId] = useState('')

  const employees = useMemo(() => {
    return employeesDetails
  }, [employeesDetails])

  const employeesIds = useMemo(() => {
    return employeesDetails?.map(item => item?.id) || []
  }, [employeesDetails])

  const getFileName = (type) => {
    const dateNow = dateTimeFormat(new Date())?.replace(' ', '_')
    const prefix = 'PERBANDINGAN_PEGAWAI_' + employeesIds?.join('_') + '_'
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

  const exportAsPDF = () => {
    exportComparison({
      ids: employeesIds?.join(', '),
      output: '.pdf'
    })
  }

  const exportAsXLS = () => {
    exportComparison({
      ids: employeesIds?.join(', '),
      output: '.xlsx'
    })
  }

  const exportAsCSV = () => {
    exportComparison({
      ids: employeesIds?.join(', '),
      output: '.csv'
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
              action: () => exportAsPDF()
            },
            {
              name: 'XLS',
              action: () => exportAsXLS()
            },
            {
              name: 'CSV',
              action: () => exportAsCSV()
            }
          ]}
        />
      </Box>
    )
  }, [employeesDetails])

  const handleFilterClick = () => {
    setExpandFilter(!expandFilter)
  }

  const handleFilterChange = (vals) => {
    setFilters(vals)
  }

  const resetFilter = () => {
    setFilters([])
  }

  useEffect(() => {
    setLoading(
      !(employee?.loading || notes?.loading || exportComparisonStore?.loading)
    )
  }, [employee, notes, exportComparisonStore])

  // Modal Notes
  const [notesModalOpen, setNotesModalOpen] = useState(false)
  const newNote = () => ({
    id: uuidv4(),
    giver_name: '',
    created_at: '',
    description: '',
    error: ''
  })

  const handleNotesModal = (userId) => {
    if (userId) {
      getNotesByUserID(userId)
      setCurrentUserId(userId)
    }

    setNotesModalOpen(v => !v)
  }

  const currentNotes = useMemo(() => {
    const allNotes = [...notes?.data, newNote()]
    return allNotes
  }, [notes])

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
        />
      </Paper>

      <ModalAddNotes
        open={notesModalOpen}
        handleModal={() => handleNotesModal(null)}
        handleSave={updateNotesByUserID}
        data={{ notes: currentNotes, userId: btoa(currentUserId) }}
      />
    </LayoutPages>
  )
}

BandingkanDataPegawai.propTypes = {
  notes: PropTypes.object,
  exportComparisonStore: PropTypes.object,
  employee: PropTypes.object,
  employeesDetails: PropTypes.array,
  setLoading: PropTypes.func,
  getNotesByUserID: PropTypes.func,
  updateNotesByUserID: PropTypes.func,
  exportComparison: PropTypes.func,
  clearExportComparisonState: PropTypes.func
}

export default BandingkanDataPegawai
