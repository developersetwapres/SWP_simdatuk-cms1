/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { Close } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import { PENCIL_SQUARE_ALT, ADD_SQUARE } from '@/utils/iconConstant'

const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: 15,
    margin: 0,
    fontSize: '12px'
  },
  boxListData: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  boxMain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    marginBottom: '15px'
  },
  tableRowClass: {
    [`& .${tableCellClasses.root}`]: {
      borderBottom: 'none'
    }
  },
  tableContainer: {
    display: 'flex'
  },
  table: {
    minWidth: 300
  },
  tableHead: {
    width: '20%'
  },
  tableBody: {
    flex: 1
  }
}))

const title = [
  { id: uuidv4(), title: '' },
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

const ListDataPegawai = ({
  employees,
  filters,
  openNotesModal = () => { }
}) => {
  const router = useRouter()
  const classes = useStyles()
  const [employeesState, setEmployeesState] = useState([])

  const titles = useMemo(() => {
    if (filters?.length) {
      const filtered = [
        { id: uuidv4(), title: '' },
        ...title?.filter(t => filters?.includes(t?.title))
      ]
      return filtered
    }

    return title
  }, [filters])

  const backPage = () => {
    localStorage.removeItem('dataPegawai')
    router.back()
  }

  const removeEmployee = (id) => {
    if (employeesState?.length <= 1) {
      backPage()
    } else {
      setEmployeesState(
        employeesState?.filter(i => i?.id != id)
      )
    }
  }

  useEffect(() => {
    setEmployeesState(employees)
  }, [employees])

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {titles?.map((item) => (
            <TableRow
              key={item?.id}
              className={classes.tableRowClass}
            >
              <TableCell
                sx={{
                  minWidth: '200px',
                  verticalAlign: 'top',
                  position: 'sticky !important',
                  left: '0 !important',
                  background: '#FFF',
                  zIndex: 1
                }}
              >
                <Typography>{item?.title}</Typography>
              </TableCell>
              {employeesState?.map((itm, idx) => {
                switch (item?.title) {
                  case '':
                    return (
                      <TableCell
                        key={itm?.id}
                        align='center'
                        sx={{
                          width: `${100 / employees.length}%`,
                          position: 'relative'
                        }}
                      >
                        <Box sx={{ minHeight: '280px' }}>
                          <img
                            src={itm?.photo_profile || '/simdatuk/imagePegawai.png'}
                            alt='Photo Pegawai'
                            width={150}
                            height={200}
                          />
                          <Typography
                            fontSize={16}
                            fontWeight='500'
                            color='primary'
                            sx={{ marginTop: '12px' }}
                          >
                            {itm?.name || '-'}
                          </Typography>
                        </Box>
                        <Box
                          onClick={() => removeEmployee(itm?.id)}
                          sx={{
                            height: '36px',
                            width: '36px',
                            backgroundColor: '#D32F2F',
                            borderRadius: '8px',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                              cursor: 'pointer'
                            }
                          }}
                        >
                          <Close sx={{ fontSize: '22px', color: 'white' }} />
                        </Box>
                      </TableCell>
                    )
                  case 'Jabatan':
                    return <CellString key={itm?.id} value={itm?.position_name || '-'} data={employees} />
                  case 'Eselon':
                    return <CellString key={itm?.id} value={itm?.echelon_name || '-'} data={employees} />
                  case 'Golongan':
                    return <CellString key={itm?.id} value={itm?.grade_name || '-'} data={employees} />
                  case 'Pendidikan Terakhir':
                    return <CellString key={itm?.id} value={itm?.educations[0]?.major || '-'} data={employees} />
                  case 'Riwayat Jabatan':
                    return (
                      <CellList
                        key={itm?.id}
                        value={itm?.positions?.map(i => i?.position)}
                        data={employees}
                      />
                    )
                  case 'Riwayat Pelatihan Struktural':
                    return (
                      <CellList
                        key={itm?.id}
                        value={itm?.structurals?.map(i => i?.name)}
                        data={employees}
                      />
                    )
                  case 'Riwayat Pelatihan Fungsional':
                    return (
                      <CellList
                        key={itm?.id}
                        value={itm?.functionals?.map(i => i?.name)}
                        data={employees}
                      />
                    )
                  case 'Riwayat Pelatihan Teknis':
                    return (
                      <CellList
                        key={itm?.id}
                        value={itm?.technicals?.map(i => i?.name)}
                        data={employees}
                      />
                    )
                  case 'Catatan':
                    return (
                      <CellList
                        isNotes
                        key={itm?.id}
                        value={itm?.notes?.map(i => i?.description)}
                        data={employees}
                        onAddNotes={() => openNotesModal(itm?.id)}
                        onEditNotes={() => openNotesModal(itm?.id)}
                      />
                    )
                  case 'Hasil Assessment':
                    return (
                      <CellList
                        key={itm?.id}
                        value={itm?.assessments?.map(i => `${i?.event_date}, ${i?.point}`)}
                        data={employees}
                      />
                    )
                  case 'Hasil Uji Kompetensi':
                    return (
                      <CellList
                        key={itm?.id}
                        value={itm?.competencies?.map(i => `${i?.event_date}, ${i?.point}`)}
                        data={employees}
                      />
                    )
                  case 'Hasil Talent Pool':
                    return (
                      <CellList
                        key={itm?.id}
                        value={itm?.talents?.map(i => `${i?.event_date}, ${i?.point}`)}
                        data={employees}
                      />
                    )
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const CellString = ({ value, data }) => {
  return (
    <TableCell
      sx={{
        width: `${100 / data.length}%`,
        verticalAlign: 'top'
      }}
    >
      <Typography fontSize={16} fontWeight='400'>
        {value}
      </Typography>
    </TableCell>
  )
}

const CellList = ({
  value,
  data,
  isNotes = false,
  onAddNotes = () => { },
  onEditNotes = () => { }
}) => {
  if (value?.length == 0) {
    return (
      <TableCell
        sx={{
          width: `${100 / data?.length}%`,
          verticalAlign: 'top'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>-</Typography>
          {isNotes && (
            <img
              src={ADD_SQUARE}
              alt='Icon tambah catatan'
              width={50}
              height={50}
              onClick={onAddNotes}
            />
          )}
        </Box>
      </TableCell>
    )
  }

  return (
    <TableCell
      sx={{
        width: `${100 / data.length}%`,
        verticalAlign: 'top'
      }}
    >
      <Box>
        {value?.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              marginBottom: '4px',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              fontSize={16}
              fontWeight='400'
              sx={{ marginRight: '4px' }}
            >
              {`${index + 1}. ${item}`}
            </Typography>
            {isNotes && (
              <img
                src={PENCIL_SQUARE_ALT}
                alt='Icon edit catatan'
                width={50}
                height={50}
                onClick={onEditNotes}
              />
            )}
          </Box>
        ))}
      </Box>
    </TableCell>
  )
}

ListDataPegawai.propTypes = {
  employees: PropTypes.array,
  filters: PropTypes.array,
  openNotesModal: PropTypes.func
}

CellString.propTypes = {
  value: PropTypes.string,
  data: PropTypes.array
}

CellList.propTypes = {
  value: PropTypes.array,
  data: PropTypes.array,
  isNotes: PropTypes.bool,
  onAddNotes: PropTypes.func,
  onEditNotes: PropTypes.func
}

export default ListDataPegawai
