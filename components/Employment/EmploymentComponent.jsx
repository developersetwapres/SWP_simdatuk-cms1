/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import CardEmployment from '../shared/Card/CardEmployment'
import { useRouter } from 'next/router'
import Card from '../shared/Card/Index'
import LayoutPages from '../core/LayoutPages'
import ButtonExport from '../core/ButtonExport'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { CLEAR_EXPORT_RECAP_STATE } from '@/store/constants'
import { dateTimeFormat } from '@/utils/index'

const EmploymentComponent = ({
  recapComposition,
  recapASN,
  recapNonASN,
  recapOutsource,
  exportRecapData,
  getCompositions = () => {},
  getASNRecap = () => {},
  getNonASNRecap = () => {},
  getOutsourceRecap = () => {},
  exportRecap = () => {},
  setRender = () => {}
}) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const datas = useMemo(() => {
    const path = router.asPath

    if (path?.includes('komposisi')) return recapComposition?.data
    if (path?.includes('pegawai-asn')) return recapASN?.data
    if (path?.includes('pegawai-non-asn')) return recapNonASN?.data
    if (path?.includes('pegawai-outsourcing')) return recapOutsource?.data

    return {}
  }, [router, recapComposition, recapASN, recapNonASN, recapOutsource])

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
    dispatch({ type: CLEAR_EXPORT_RECAP_STATE })
  }

  const getFileName = () => {
    const currentPage = router?.asPath
    const dateNow = dateTimeFormat(new Date())?.replace(' ', '_')
    let prefix = 'DATA_ASN_'

    if (currentPage?.includes('komposisi')) {
      prefix = 'DATA_KESELURUHAN_'
    } else if (currentPage?.includes('pegawai-asn')) {
      prefix = 'DATA_ASN_'
    } else if (currentPage?.includes('non-asn')) {
      prefix = 'DATA_NON_ASN_'
    } else {
      prefix = 'DATA_OUTSOURCING_'
    }

    return prefix + dateNow + '.pdf'
  }

  const exportPDF = () => {
    const currentPage = router?.asPath
    let type = 1

    if (currentPage?.includes('komposisi')) {
      type = 1
    } else if (currentPage?.includes('pegawai-asn')) {
      type = 2
    } else if (currentPage?.includes('non-asn')) {
      type = 3
    } else {
      type = 4
    }

    exportRecap(type)
  }

  const action = useMemo(() => {
    return (
      <Box sx={{ marginTop: '12px', display: 'flex', gap: 1 }}>
        <ButtonExport data={[{ name: 'PDF', action: () => exportPDF() }]} />
      </Box>
    )
  }, [router])

  // Path
  useEffect(() => {
    const path = router.asPath

    if (path?.includes('komposisi')) getCompositions()
    if (path?.includes('pegawai-asn')) getASNRecap()
    if (path?.includes('pegawai-non-asn')) getNonASNRecap()
    if (path?.includes('pegawai-outsourcing')) getOutsourceRecap()
  }, [router])

  // Loading
  useEffect(() => {
    setRender(
      !(
        recapComposition?.loading ||
        recapASN?.loading ||
        recapNonASN?.loading ||
        recapOutsource?.loading ||
        exportRecapData?.loading
      )
    )
  }, [
    recapComposition?.loading,
    recapASN?.loading,
    recapNonASN?.loading,
    recapOutsource?.loading,
    exportRecapData?.loading
  ])

  // Recap Data
  useEffect(() => {
    if (exportRecapData?.data) saveFile(exportRecapData?.data)
  }, [exportRecapData])

  return (
    <LayoutPages
      summary={datas?.name || ''}
      count={`Total Keseluruhan : ${datas?.total || 0}`}
      action={action}
    >
      <Grid container spacing={3}>
        {datas?.cards?.map((item) => (
          <RecapItem
            key={uuidv4()}
            showBackground={datas?.cards?.length > 1}
            data={item}
          />
        ))}
      </Grid>
    </LayoutPages>
  )
}

const RecapItem = ({ showBackground, data }) => {
  const router = useRouter()

  const nextPagePath = (value) => {
    const path = router?.asPath

    if (
      (path?.includes('pegawai-asn') &&
        !data?.name.toLowerCase().includes('keterangan jabatan')) ||
      path?.includes('pegawai-non-asn') ||
      path?.includes('pegawai-outsourcing')
    ) {
      const query = router?.query

      const pages = () => {
        switch (query?.employment) {
          case 'pegawai-asn':
            return 'asn'
          case 'pegawai-non-asn':
            return 'nonasn'
          case 'pegawai-outsourcing':
            return 'outsource'
          default:
            return null
        }
      }

      const payload = {
        name: value?.name,
        page: pages(),
        categoryId: '',
        sectionId: data?.id,
        cardId: value?.id
      }

      const jsonString = JSON.stringify(payload)
      const params = btoa(jsonString)
      router.push(
        `/rekapitulasi/${query?.employment}/${btoa(
          0
        )}/pegawai?category=${params}`
      )
    } else {
      router.push(`${router?.asPath}/${btoa(value?.id)}`)
    }
  }

  return (
    <Grid item xs={12}>
      <Card
        otherStyle={{
          padding: showBackground ? '20px' : '4px 0',
          backgroundColor: showBackground ? '#FFF' : 'transparent',
          boxShadow: showBackground ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'none'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: showBackground ? 'flex' : 'none',
            alignItems: 'start',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant='h3'
            component='h3'
            color='primary'
            sx={{
              marginBottom: '12px',
              fontSize: '16px',
              fontWeight: 800
            }}
          >
            {data?.name || '-'}
          </Typography>
          <Typography
            variant='h3'
            component='h3'
            color='primary'
            sx={{
              marginBottom: '12px',
              fontSize: '16px',
              fontWeight: 800
            }}
          >
            {`Total: ${data?.total || 0}`}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {data?.cards?.map((itm, idx) => (
            <Grid
              item
              key={idx}
              xs={6}
              sm={
                data?.cards?.length == 2 ? 6 : data?.cards?.length == 3 ? 4 : 3
              }
            >
              <CardEmployment
                data={itm}
                handleRedirect={() => nextPagePath(itm)}
                cardStyle={{
                  border: showBackground ? '2px solid #394346' : 'none',
                  boxShadow: !showBackground
                    ? '0px 4px 10px rgba(0, 0, 0, 0.1)'
                    : 'none'
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Grid>
  )
}

EmploymentComponent.propTypes = {
  exportRecapData: PropTypes.object,
  recapComposition: PropTypes.object,
  recapASN: PropTypes.object,
  recapNonASN: PropTypes.object,
  recapOutsource: PropTypes.object,
  getCompositions: PropTypes.func,
  getASNRecap: PropTypes.func,
  getNonASNRecap: PropTypes.func,
  getOutsourceRecap: PropTypes.func,
  exportRecap: PropTypes.func,
  setRender: PropTypes.func
}

RecapItem.propTypes = {
  showBackground: PropTypes.bool,
  title: PropTypes.string,
  count: PropTypes.number,
  cards: PropTypes.array
}

export default EmploymentComponent
