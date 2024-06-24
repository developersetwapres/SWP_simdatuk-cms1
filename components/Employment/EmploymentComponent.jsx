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
  recapData,
  recapComposition,
  recapASN,
  recapNonASN,
  recapOutsource,
  exportRecapData,
  getRecapData = () => { },
  setRecapData = () => { },
  exportRecap = () => { },
  setRender = () => { }
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  // Path
  useEffect(() => {
    getRecapData(router.asPath)
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

  // Composition
  useEffect(() => {
    setRecapData(recapComposition?.data)
  }, [recapComposition?.data])

  // ASN
  useEffect(() => {
    setRecapData(recapASN?.data)
  }, [recapASN?.data])

  // NON-ASN
  useEffect(() => {
    setRecapData(recapNonASN?.data)
  }, [recapNonASN?.data])

  // OUTSOURCE
  useEffect(() => {
    setRecapData(recapOutsource?.data)
  }, [recapOutsource?.data])

  // Recap Data
  useEffect(() => {
    if (exportRecapData?.data) saveFile(exportRecapData?.data)
  }, [exportRecapData])

  const saveFile = (resp) => {
    // set the blog type to final pdf
    const file = new Blob([resp], { type: 'application/pdf' })

    // process to auto download it
    const fileURL = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = fileURL
    link.download = getFileName()
    link.click()
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
        <ButtonExport
          data={[
            { name: 'PDF', action: () => exportPDF() },
            { name: 'XLS', action: () => { } },
            { name: 'CSV', action: () => { } }
          ]}
        />
      </Box>
    )
  }, [router])

  return (
    <LayoutPages
      summary={recapData?.name || ''}
      count={`Total Keseluruhan : ${recapData?.total || 0}`}
      action={action}
    >
      <Grid container spacing={3}>
        {recapData?.cards?.map(item => (
          <RecapItem
            key={uuidv4()}
            showBackground={recapData?.cards?.length > 1}
            count={item?.total}
            cards={item?.cards?.map(i => ({ title: i?.name, count: i?.total }))}
            title={item?.name}
          />
        ))}
      </Grid>
    </LayoutPages>
  )
}

const RecapItem = ({
  showBackground,
  title,
  count,
  cards
}) => {
  const router = useRouter()

  const nextPagePath = (title, idx) => {
    return `${router?.asPath}/${btoa(idx + 1)}`
  }

  return (
    <Grid item xs={12}>
      <Card
        otherStyle={{
          padding: showBackground ? '20px' : '4px 0',
          backgroundColor: showBackground ? '#FFF' : 'transparent',
          boxShadow: showBackground
            ? '0px 4px 10px rgba(0, 0, 0, 0.1)'
            : 'none'
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
            {title || '-'}
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
            Total: {count}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {cards?.map((itm, idx) => (
            <Grid
              item
              key={idx}
              xs={6}
              sm={
                cards?.length == 2
                  ? 6
                  : cards?.length == 3
                    ? 4
                    : 3
              }
            >
              <CardEmployment
                data={itm}
                path={nextPagePath(title, idx)}
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
  recapData: PropTypes.object,
  recapComposition: PropTypes.object,
  recapASN: PropTypes.object,
  recapNonASN: PropTypes.object,
  recapOutsource: PropTypes.object,
  getRecapData: PropTypes.func,
  setRecapData: PropTypes.func,
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
