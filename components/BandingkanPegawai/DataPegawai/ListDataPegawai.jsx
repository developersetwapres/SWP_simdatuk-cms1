/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { Close } from '@mui/icons-material'
import { useRouter } from 'next/router'

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
  '',
  'Jabatan',
  'Eselon',
  'Golongan',
  'NIP/NRP',
  'Riwayat Pendidikan',
  'Riwayat Jabatan',
  'Riwayat Pelatihan Struktural',
  'Riwayat Pelatihan Fungsional',
  'Riwayat Pelatihan Teknis',
  'Riwayat Catatan'
]

const ListDataPegawai = () => {
  const router = useRouter()
  const classes = useStyles()
  const [data, setData] = useState([])

  const handleRemoveData = (value) => {
    if (data.length > 1) {
      const dataFilter = data.filter((item) => {
        return item?.name !== value?.name
      })
      setData(dataFilter)
    } else {
      router.back()
    }
  }

  useEffect(() => {
    const storedData = localStorage.getItem('dataPegawai')
    const retrievedArray = storedData ? JSON.parse(storedData) : []
    setData(retrievedArray)
  }, [])

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {title.map((item, index) => (
            <TableRow className={classes.tableRowClass} key={index}>
              <TableCell
                sx={{
                  minWidth: '200px',
                  verticalAlign: 'top'
                }}
              >
                <Typography>{item}</Typography>
              </TableCell>
              {data &&
                data.map((itm, idx) => {
                  switch (item) {
                    case '':
                      return (
                        <TableCell
                          key={idx}
                          align='center'
                          sx={{
                            width: `${100 / data.length}%`,
                            position: 'relative'
                          }}
                        >
                          <Box sx={{ minHeight: '280px' }}>
                            <Image
                              src={itm?.image}
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
                              {itm?.name}
                            </Typography>
                          </Box>
                          <Box
                            onClick={() => handleRemoveData(itm)}
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
                      return <CellString value={itm?.position} data={data} />
                    case 'Eselon':
                      return <CellString value={itm?.eselon} data={data} />
                    case 'Golongan':
                      return <CellString value={itm?.golongan} data={data} />
                    case 'NIP/NRP':
                      return <CellString value={itm?.nip} data={data} />
                    case 'Riwayat Pendidikan':
                      return (
                        <CellList value={itm?.riwayatPendidikan} data={data} />
                      )
                    case 'Riwayat Jabatan':
                      return (
                        <CellList value={itm?.riwayatJabatan} data={data} />
                      )
                    case 'Riwayat Pelatihan Struktural':
                      return (
                        <CellList
                          value={itm?.riwayatPelatihanStruktural}
                          data={data}
                        />
                      )
                    case 'Riwayat Pelatihan Fungsional':
                      return (
                        <CellList
                          value={itm?.riwayatPelatihanFungsional}
                          data={data}
                        />
                      )
                    case 'Riwayat Pelatihan Teknis':
                      return (
                        <CellList
                          value={itm?.riwayatPelatihanTeknis}
                          data={data}
                        />
                      )
                    case 'Riwayat Catatan':
                      return (
                        <CellString value={itm?.riwayatCatatan} data={data} />
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

const CellList = ({ value, data }) => {
  if (value.length == 0) {
    return (
      <TableCell
        sx={{
          width: `${100 / data.length}%`,
          verticalAlign: 'top'
        }}
      >
        -
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
        {value.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', marginBottom: '4px' }}>
            <Typography
              fontSize={16}
              fontWeight='400'
              sx={{ marginRight: '4px' }}
            >
              {`${index + 1}.`}
            </Typography>
            <Typography fontSize={16} fontWeight='400'>
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </TableCell>
  )
}

CellString.propTypes = {
  value: PropTypes.string,
  data: PropTypes.array
}

CellList.propTypes = {
  value: PropTypes.array,
  data: PropTypes.array
}

export default ListDataPegawai
