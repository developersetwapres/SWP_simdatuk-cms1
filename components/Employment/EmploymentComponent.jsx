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

const EmploymentComponent = ({
  recapData,
  recapComposition,
  recapASN,
  recapNonASN,
  recapOutsource,
  getRecapData = () => { },
  setRecapData = () => { },
  setRender = () => { }
}) => {
  const router = useRouter()
  // Path
  useEffect(() => {
    getRecapData(router.asPath)
  }, [router.asPath])

  // Loading
  useEffect(() => {
    setRender(!recapComposition?.loading)
  }, [recapComposition?.loading])

  useEffect(() => {
    setRender(!recapASN?.loading)
  }, [recapASN?.loading])

  useEffect(() => {
    setRender(!recapNonASN?.loading)
  }, [recapNonASN?.loading])

  useEffect(() => {
    setRender(!recapOutsource?.loading)
  }, [recapOutsource?.loading])

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
    console.log('RECAP: ', recapData)
  }, [recapData])

  const action = useMemo(() => {
    return (
      <Box sx={{ marginTop: '12px', display: 'flex', gap: 1 }}>
        <ButtonExport
          data={[
            { name: 'PDF', action: () => { } },
            { name: 'XLS', action: () => { } },
            { name: 'CSV', action: () => { } }
          ]}
        />
      </Box>
    )
  }, [])

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
    // if (
    //   router.asPath?.includes('komposisi') ||
    //   router.asPath?.includes('pegawai-asn')
    // ) {
    //   return `${router?.asPath}/${btoa(idx + 1)}`
    // }

    // if (
    //   router.asPath?.includes('pegawai-asn') &&
    //   title?.toLowerCase()?.includes('keterangan jabatan')
    // ) {
    //   return `${router?.asPath}/${btoa(idx + 1)}`
    // }

    // return router.asPath

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
  recapData: PropTypes.object,
  recapComposition: PropTypes.object,
  recapASN: PropTypes.object,
  recapNonASN: PropTypes.object,
  recapOutsource: PropTypes.object,
  getRecapData: PropTypes.func,
  setRecapData: PropTypes.func,
  setRender: PropTypes.func
}

RecapItem.propTypes = {
  showBackground: PropTypes.bool,
  title: PropTypes.string,
  count: PropTypes.number,
  cards: PropTypes.array
}

export default EmploymentComponent
