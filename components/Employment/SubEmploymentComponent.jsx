/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import CardEmployment from '../shared/Card/CardEmployment'
import { useRouter } from 'next/router'
import Card from '../shared/Card/Index'
import LayoutPages from '../core/LayoutPages'
import { v4 as uuidv4 } from 'uuid'

const SubEmploymentComponent = ({
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
    console.log('ROUTER: ', router)
    getRecapData(router)
  }, [router])

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

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary={recapData?.name}
      count={`Total Keseluruhan : ${recapData?.total}`}
    >
      <Grid container spacing={3}>
        {recapData?.cards?.map((item) => (
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
            {count}
          </Typography>
        </Box>
        <Grid
          container
          spacing={3}
          alignItems='start'
          justifyContent='space-between'
        >
          {cards?.map((itm, idx) => (
            <Grid
              item
              key={idx}
              xs={6}
              sm={
                cards.length == 2
                  ? 6
                  : cards.length == 3
                    ? 4
                    : 3
              }
            >
              <CardEmployment
                data={itm}
                // path={`/rekapitulasi/${router?.query?.employment}/${btoa(idx + 1)}/pegawai`}
                path={router.asPath}
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

SubEmploymentComponent.propTypes = {
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

export default SubEmploymentComponent
