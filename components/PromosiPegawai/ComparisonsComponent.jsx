import React, { useMemo, useState, useEffect } from 'react'
import LayoutPages from '../core/LayoutPages'
import { useRouter } from 'next/router'
import { Box, Grid, Paper, Typography, LinearProgress, List, ListItem, ListItemText } from '@mui/material'
import ButtonExport from '../core/ButtonExport'
import { Button } from '../shared'
import Image from 'next/image'
import { Close } from '@mui/icons-material'
import PropTypes from 'prop-types'

function ComparisonsComponent() {
  const router = useRouter()
  const [employees, setEmployees] = useState([
    {
      id: 1,
      image: '/simdatuk/imagePegawai.png',
      registration_number: '1209381209381029831',
      colorCode: '#ffff',
      name: 'AA, S.E',
      echelon: '',
      totalWorkingPeriods: 10,
      type: 10,
      typeWorkingPeriods: 7,
      managementScore: 9,
      highestEducation: 5
    },
    {
      id: 2,
      image: '/simdatuk/imagePegawai.png',
      registration_number: '1209381209381029831',
      colorCode: '#ffff',
      name: 'AA, S.E',
      echelon: '',
      totalWorkingPeriods: 10,
      type: 10,
      typeWorkingPeriods: 7,
      managementScore: 9,
      highestEducation: 5
    },
    {
      id: 3,
      image: '/simdatuk/imagePegawai.png',
      registration_number: '1209381209381029831',
      colorCode: '#ffff',
      name: 'AA, S.E',
      echelon: '',
      totalWorkingPeriods: 10,
      type: 10,
      typeWorkingPeriods: 7,
      managementScore: 9,
      highestEducation: 5
    },
    {
      id: 4,
      image: '/simdatuk/imagePegawai.png',
      registration_number: '1209381209381029831',
      colorCode: '#ffff',
      name: 'AA, S.E',
      echelon: '',
      totalWorkingPeriods: 10,
      type: 10,
      typeWorkingPeriods: 7,
      managementScore: 9,
      highestEducation: 5
    }
  ])

  const stats = [
    {
      id: 1,
      label: 'Eselon',
      name: 'echelon'
    },
    {
      id: 2,
      label: 'Golongan',
      name: 'type'
    },
    {
      id: 3,
      label: 'Masa Kerja Golongan',
      name: 'typeWorkingPeriods'
    },
    {
      id: 4,
      label: 'Masa Kerja Keseluruhan',
      name: 'totalWorkingPeriods'
    },
    {
      id: 5,
      label: 'Nilai Manajemen Talenta',
      name: 'totalWorkingPeriods'
    },
    {
      id: 6,
      label: 'Pendidikan Terakhir',
      name: 'highestEducation'
    }
  ]

  const notes = [
    {
      id: 1,
      name: 'AA, S.H',
      notes: [
        'Notes X',
        'Notes X',
        'Notes X',
        'Notes X',
        'Notes X',
        'Notes X'
      ]
    },
    {
      id: 2,
      name: 'AA, S.H',
      notes: ['Notes X', 'Notes X']
    },
    {
      id: 3,
      name: 'AA, S.H',
      notes: ['Notes X', 'Notes X']
    },
    {
      id: 4,
      name: 'AA, S.H',
      notes: ['Notes X', 'Notes X']
    },
    {
      id: 5,
      name: 'AA, S.H',
      notes: ['Notes X', 'Notes X']
    }
  ]

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const baseColors = [
    '#FF0000', // Merah
    '#FFA500', // Oranye
    '#FFFF00', // Kuning
    '#008000', // Hijau
    '#0000FF', // Biru
    '#800080', // Ungu
    '#FF4500', // Jingga
    '#A52A2A', // Coklat
    '#FFC0CB', // Pink
    '#808080' // Abu-abu
  ]

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button text='Tambah Pegawai' color='primary' onClick={() => { }} />
        <Button
          text='Reset Pegawai'
          color='sidatukDraweBase'
          onClick={() => { }}
        />
        <ButtonExport
          data={[
            { name: 'PDF', action: () => { } },
            { name: 'XLS', action: () => { } },
            { name: 'CSV', action: () => { } }
          ]}
        />
      </Box>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setEmployees(
      employees.map((item, index) => {
        const colorCode = index > (baseColors.length - 1) ?
          getRandomColor() : baseColors[index]

        return {
          ...item,
          colorCode
        }
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LayoutPages
      handleBack={router.back}
      summary='Promosi Pegawai'
      action={action}
    >
      <Paper sx={{ padding: '20px' }}>
        <Grid container spacing={2} sx={{ paddingLeft: 20 }}>
          {employees.map(employee => {
            const columnSize = 12 / employees.length
            const columnWidth = employees.length >= 3 ? 4 : columnSize
            return (
              <Grid key={employee.id} item xs={columnWidth}>
                <EmployeeDataComponent
                  name={employee.name}
                  titleColor={employee.colorCode}
                  image={employee.image}
                  registrationNumber={employee.registration_number}
                  handleClick={() => { }}
                />
              </Grid>
            )
          })}
        </Grid>

        <Typography fontWeight={700} variant='h5' component='h5' sx={{ marginTop: 2 }}>Grafik</Typography>

        <Grid container spacing={2} sx={{ marginTop: 1, padding: 2 }}>
          {stats.map(item => (
            <StatsComponent
              key={item.id}
              label={item.label}
            />
          ))}
        </Grid>

        <Typography fontWeight={700} variant='h5' component='h5' sx={{ marginTop: 2 }}>Catatan</Typography>

        <Grid container spacing={2} sx={{ marginTop: 1, padding: 2 }}>
          {notes.map(item => (
            <NotesComponent
              key={item.id}
              notes={item.notes}
              name={item.name}
            />
          ))}
        </Grid>
      </Paper>
    </LayoutPages>
  )
}

const NotesComponent = ({
  name,
  textNameColor = 'primary',
  notes = []
}) => {
  return (
    <Grid item xs={6} sx={{ borderBottom: '1px solid #F0F0F0', paddingBottom: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{ wordWrap: 'break-word' }}
          fontSize={16}
          fontWeight={700}
          color={textNameColor}
        >
          {name}
        </Typography>

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop: 2 }}>
          {notes.map((value, index) => (
            <ListItem
              key={value}
              disableGutters
              disablePadding
            >
              <ListItemText primary={`${index + 1}. ${value}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Grid>
  )
}

NotesComponent.propTypes = {
  name: PropTypes.string,
  textNameColor: PropTypes.string,
  notes: PropTypes.array
}

const StatsComponent = ({
  label = ''
}) => {
  return (
    <Grid
      container
      item
      xs={6}
      alignItems='center'
      sx={{ borderBottom: '1px solid #F0F0F0', paddingBottom: 2 }}
    >
      <Grid item xs={5}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={7}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <LinearProgress value={10} variant='determinate' color='secondary' sx={{ height: 10 }} />
          <LinearProgress variant='determinate' color='success' sx={{ height: 10 }} />
          <LinearProgress variant='determinate' color='inherit' sx={{ height: 10 }} />
        </Box>
      </Grid>
    </Grid>
  )
}

StatsComponent.propTypes = {
  label: PropTypes.string
}

const EmployeeDataComponent = ({
  titleColor = 'primary',
  image = '/simdatuk/imagePegawai.png',
  registrationNumber = '',
  name = '',
  handleClick = () => { }
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}
    >
      <Box sx={{ width: '30%' }}>
        <Image
          src={image}
          alt='Foto Pegawai'
          width={72}
          height={96}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          justifyContent: 'flex-start'
        }}
      >
        <Typography
          sx={{ wordWrap: 'break-word' }}
          fontSize={16}
          fontWeight={700}
          color={titleColor}
        >
          {name}
        </Typography>
        <Typography
          sx={{ wordWrap: 'break-word' }}
          fontSize={14}
          fontWeight={600}
          color='sidatukDrawBase'
        >
          {registrationNumber}
        </Typography>
      </Box>

      <Box
        sx={{
          width: '20%',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Box
          onClick={handleClick}
          sx={{
            height: '30px',
            width: '30px',
            backgroundColor: '#D32F2F',
            borderRadius: '8px',
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
      </Box>
    </Box>
  )
}

EmployeeDataComponent.propTypes = {
  name: PropTypes.string,
  registrationNumber: PropTypes.string,
  image: PropTypes.string,
  titleColor: PropTypes.string,
  handleClick: PropTypes.func
}

export default ComparisonsComponent