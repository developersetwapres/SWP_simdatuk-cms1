/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect, Fragment } from 'react'
import LayoutPages from '../core/LayoutPages'
import { useRouter } from 'next/router'
import { Box, Grid, Paper, Typography, List, ListItem, ListItemText } from '@mui/material'
import ButtonExport from '../core/ButtonExport'
import { Button } from '../shared'
import { Close } from '@mui/icons-material'
import PropTypes from 'prop-types'
import { SaveAs, saveFile } from '@/utils/fileSaver'
import { dateTimeFormat } from '@/utils/index'
import Card from '../shared/Card/Index'
import { v4 as uuidv4 } from 'uuid'
import LinearProgressBar from '../core/LinearProgressBar'
import { Tooltip } from 'react-tooltip'

const baseColors = [
  '#F16637',
  '#74B856',
  '#2D9DD1',
  '#F8A232',
  '#506CB2',
  '#C22551'
]

const stats = [
  {
    id: uuidv4(),
    title: 'Umum',
    sections: [
      {
        id: uuidv4(),
        label: 'Eselon',
        name: 'echelon'
      },
      {
        id: uuidv4(),
        label: 'Golongan',
        name: 'grade'
      },
      {
        id: uuidv4(),
        label: 'Pendidikan Terakhir',
        name: 'education'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Nilai Manajemen Talenta',
    sections: [
      {
        id: uuidv4(),
        label: 'Hasil Assessment',
        name: 'assessments'
      },
      {
        id: uuidv4(),
        label: 'Hasil Uji Kompetensi',
        name: 'competencies'
      },
      {
        id: uuidv4(),
        label: 'Hasil Talent Pool',
        name: 'talents'
      }
    ]
  }
]

function ComparisonsComponent({
  promotions,
  exportPromotionData,
  setLoading = () => { },
  exportPromotionUsers = () => { },
  clearExportPromotionState = () => { }
}) {
  const router = useRouter()
  const [employees, setEmployees] = useState([])

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const getFileName = (type) => {
    const dateNow = dateTimeFormat(new Date())?.replace(' ', '_')
    const prefix = 'PERBANDINGAN_PEGAWAI_PROMOSI'
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

  const exportFileAs = (type, data) => {
    let output = '.pdf'

    if (type === SaveAs.PDF) {
      output = '.pdf'
    } else if (type === SaveAs.XLS) {
      output = '.xlsx'
    } else {
      output = '.csv'
    }

    exportPromotionUsers({
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
            localStorage.removeItem('dataPegawaiPromosi')
            router.back()
          }}
        />
        <ButtonExport
          data={[
            { name: 'PDF', action: () => exportFileAs(SaveAs.PDF, employees) },
            { name: 'XLS', action: () => exportFileAs(SaveAs.XLS, employees) },
            { name: 'CSV', action: () => exportFileAs(SaveAs.CSV, employees) }
          ]}
        />
      </Box>
    )
  }, [employees])

  const removeEmployee = (id) => {
    setEmployees(
      employees?.filter(item => item?.id !== id)
    )
  }

  useEffect(() => {
    if (exportPromotionData?.data) {
      const responseType = exportPromotionData?.data?.type
      let type = SaveAs.PDF

      if (type?.includes('pdf')) {
        type = SaveAs.PDF
      } else if (type?.includes('sheet')) {
        type = SaveAs.XLS
      } else {
        type = SaveAs.CSV
      }

      saveFile(
        exportPromotionData?.data,
        getFileName(responseType),
        type
      )

      clearExportPromotionState()
    }
  }, [exportPromotionData])

  useEffect(() => {
    setEmployees(
      promotions?.employeesDetailPromotion?.map((item, index) => {
        const colorCode = index > (baseColors.length - 1) ?
          getRandomColor() : baseColors[index]

        return {
          ...item,
          colorCode
        }
      })
    )
  }, [promotions])

  useEffect(() => {
    setLoading(!(promotions?.loading || exportPromotionData?.loading))
  }, [promotions, exportPromotionData])

  return (
    <LayoutPages
      handleBack={router.back}
      summary='Promosi Pegawai'
      action={action}
    >
      <Paper sx={{ padding: '20px' }}>
        <Grid container spacing={2} sx={{ paddingLeft: 20 }}>
          {employees?.map((employee, index) => {
            const columnSize = 12 / employees?.length
            const columnWidth = employees?.length >= 3 ? 4 : columnSize
            const colorCode = index > (baseColors?.length - 1) ?
              getRandomColor() : baseColors[index]

            return (
              <Grid key={employee?.id} item xs={columnWidth}>
                <EmployeeDataComponent
                  name={employee?.name}
                  titleColor={colorCode}
                  image={employee?.photo_profile}
                  registrationNumber={employee?.employee_registration_number}
                  handleRemove={() => removeEmployee(employee?.id)}
                />
              </Grid>
            )
          })}
        </Grid>

        <Typography fontWeight={700} variant='h5' component='h5' sx={{ marginTop: 2 }}>Grafik</Typography>

        {stats?.map((item) => (
          <Card
            key={item?.id}
            otherStyle={{ marginTop: '16px' }}
          >
            <Grid container spacing={2} sx={{ marginTop: 1, padding: 2 }}>
              <Grid item xs={12}>
                <Typography
                  color='#895700'
                  fontWeight={700}
                  fontSize={14}
                >
                  {item?.title}
                </Typography>
              </Grid>

              {item?.sections?.map((section) => {
                return (
                  <StatsComponent
                    key={section?.id}
                    label={section?.label}
                    data={employees}
                    type={section?.name}
                  />
                )
              })}
            </Grid>
          </Card>
        ))}

        <Typography fontWeight={700} variant='h5' component='h5' sx={{ marginTop: 2 }}>Catatan</Typography>

        <Grid container spacing={2} sx={{ marginTop: 1, padding: 2 }}>
          {employees?.map((item, index) => {
            const colorCode = index > (baseColors?.length - 1) ?
              getRandomColor() : baseColors[index]

            return (
              <NotesComponent
                key={item.id}
                notes={item?.notes}
                name={item?.name}
                textNameColor={colorCode}
              />
            )
          })}
        </Grid>
      </Paper>

      <PercentageTooltip
        data={employees}
      />
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
          {notes?.map((value, index) => (
            <ListItem
              key={value}
              disableGutters
              disablePadding
            >
              <ListItemText primary={`${index + 1}. ${value}`} />
            </ListItem>
          ))}

          {!notes?.length && (
            <Typography fontSize={14} fontWeight={600}>-</Typography>
          )}
        </List>
      </Box>
    </Grid>
  )
}

const PercentageTooltip = ({ data = [] }) => {
  const getValueByType = (type, item) => {
    if (type === 'echelon')
      return item?.echelon?.percentage

    if (type === 'grade')
      return item?.grade?.percentage

    if (type === 'education')
      return item?.education_level?.percentage

    if (type === 'assessments')
      return item?.assessment?.percentage

    if (type === 'competencies')
      return item?.competency?.percentage

    if (type === 'talents')
      return item?.talent?.percentage

    return ''
  }

  return (
    <Tooltip
      id='percentage-tooltip'
      style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        maxWidth: '300px'
      }}
      render={({ activeAnchor }) => (
        <>
          <Typography
            fontWeight='700'
            color='#895700'
          >
            {activeAnchor?.getAttribute('data-label') || ''}
          </Typography>

          <Grid
            container
            spacing={2}
            sx={{
              marginTop: '12px'
            }}
          >
            {data?.map((item, index) => {
              const colorCode = index > (baseColors?.length - 1) ?
                getRandomColor() : baseColors[index]

              return (
                <Fragment key={item?.id}>
                  <Grid item xs={2}>
                    <LinearProgressBar
                      value={100}
                      bgColor={colorCode}
                      baseBgColor='#FFF'
                    />
                  </Grid>

                  <Grid item xs={7}>
                    <Typography>{activeAnchor?.getAttribute('data-name') || ''}</Typography>
                  </Grid>

                  <Grid item xs={3} justifyContent='flex-end'>
                    <Typography textAlign='right'>
                      {getValueByType(activeAnchor?.getAttribute('data-type'), item)}
                    </Typography>
                  </Grid>
                </Fragment>
              )
            })}
          </Grid>
        </>
      )}
    />
  )
}

const StatsComponent = ({
  label = '',
  type = '',
  data = []
}) => {
  const getPercentageDataByType = (item) => {
    if (type === 'echelon')
      return item?.echelon?.percentage

    if (type === 'grade')
      return item?.grade?.percentage

    if (type === 'education')
      return item?.education_level?.percentage

    if (type === 'assessments')
      return item?.assessment?.percentage

    if (type === 'competencies')
      return item?.competency?.percentage

    if (type === 'talents')
      return item?.talent?.percentage

    return 0
  }

  const getLabelByType = (type) => {
    if (type === 'echelon')
      return 'Eselon'

    if (type === 'grade')
      return 'Golongan'

    if (type === 'education')
      return 'Pendidikan Terakhir'

    if (type === 'assessments')
      return 'Hasil Assessment'

    if (type === 'competencies')
      return 'Hasil Uji Kompetensi'

    if (type === 'talents')
      return 'Hasil Talent Pool'

    return 0
  }

  const getDataByType = (type, item) => {
    if (type === 'echelon')
      return item?.echelon?.name

    if (type === 'grade')
      return item?.grade?.name

    if (type === 'education')
      return item?.education_level?.name

    if (type === 'assessments')
      return item?.assessment?.name

    if (type === 'competencies')
      return item?.competency?.name

    if (type === 'talents')
      return item?.talent?.name

    return ''
  }

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
          {data?.map((item, index) => {
            const colorCode = index > (baseColors?.length - 1) ?
              getRandomColor() : baseColors[index]

            return (
              <Box
                key={item?.id}
                data-tooltip-id='percentage-tooltip'
                data-type={type}
                data-label={getLabelByType(type)}
                data-name={getDataByType(type, item)}
              >
                <LinearProgressBar
                  value={getPercentageDataByType(item)}
                  bgColor={colorCode}
                  baseBgColor='#FFF'
                />
              </Box>
            )
          })}
        </Box>
      </Grid>
    </Grid>
  )
}

const EmployeeDataComponent = ({
  titleColor = 'primary',
  image = '/simdatuk/imagePegawai.png',
  registrationNumber = '',
  name = '',
  handleRemove = () => { }
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
        <img
          src={image}
          alt='Foto Pegawai'
          style={{
            width: '72px',
            height: '96px'
          }}
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
          onClick={handleRemove}
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

NotesComponent.propTypes = {
  name: PropTypes.string,
  textNameColor: PropTypes.string,
  notes: PropTypes.array
}

StatsComponent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.array
}

PercentageTooltip.propTypes = {
  data: PropTypes.array
}

ComparisonsComponent.propTypes = {
  promotions: PropTypes.object,
  exportPromotionData: PropTypes.object,
  setLoading: PropTypes.func,
  exportPromotionUsers: PropTypes.func,
  clearExportPromotionState: PropTypes.func
}

EmployeeDataComponent.propTypes = {
  name: PropTypes.string,
  registrationNumber: PropTypes.string,
  image: PropTypes.string,
  titleColor: PropTypes.string,
  handleRemove: PropTypes.func
}

export default ComparisonsComponent