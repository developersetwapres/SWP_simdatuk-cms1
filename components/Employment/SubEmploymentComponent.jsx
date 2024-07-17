/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import CardEmployment from '../shared/Card/CardEmployment'
import { useRouter } from 'next/router'
import Card from '../shared/Card/Index'
import LayoutPages from '../core/LayoutPages'
import { v4 as uuidv4 } from 'uuid'

const SubEmploymentComponent = ({
  recapComposition,
  recapASN,
  recapNonASN,
  recapOutsource,
  setRender = () => {},
  getCompositionsCategories = () => {},
  getASNRecapByCategory = () => {}
}) => {
  const router = useRouter()

  const datas = useMemo(() => {
    const path = router.asPath

    if (path?.includes('komposisi')) return recapComposition?.data
    if (path?.includes('pegawai-asn')) return recapASN?.data
    if (path?.includes('pegawai-non-asn')) return recapNonASN?.data
    if (path?.includes('pegawai-outsourcing')) return recapOutsource?.data

    return {}
  }, [router, recapComposition, recapASN, recapNonASN, recapOutsource])

  useEffect(() => {
    const path = router.asPath
    const id = router.query?.subEmployment

    if (path?.includes('komposisi')) getCompositionsCategories(atob(id))
    if (path?.includes('pegawai-asn')) getASNRecapByCategory(atob(id))
  }, [router])

  // Loading
  useEffect(() => {
    setRender(
      !(
        recapComposition?.loading &&
        recapASN?.loading &&
        recapNonASN?.loading &&
        recapOutsource?.loading
      )
    )
  }, [recapComposition, recapASN, recapNonASN, recapOutsource])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary={datas?.name}
      count={`Total Keseluruhan: ${datas?.total}`}
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

  const pathRedirect = (value) => {
    const query = router?.query

    const pages = () => {
      switch (query?.employment) {
        case 'komposisi-pegawai':
          return 'recapitulation'
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
      page: pages(),
      categoryId: atob(query?.subEmployment) || null,
      sectionId: data?.id,
      cardId: value?.id
    }
    const jsonString = JSON.stringify(payload)
    const params = btoa(jsonString)
    router.push(`${router?.asPath}/pegawai?category=${params}`)
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
        <Grid
          container
          spacing={3}
          alignItems='start'
          justifyContent='flex-start'
        >
          {data?.cards?.map((itm, idx) => (
            <Grid
              item
              key={idx}
              xs={6}
              sm={data?.cards.length == 2 ? 6 : data?.cards.length == 3 ? 4 : 3}
            >
              <CardEmployment
                data={itm}
                handleRedirect={() => pathRedirect(itm)}
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
