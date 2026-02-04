/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import LayoutPages from '../core/LayoutPages'
import { Box, Typography, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { Button } from '../shared'
import Card from '../shared/Card/Index'
import PropTypes from 'prop-types'
import { createShortUuidUrl } from '@/utils'

const useStyles = makeStyles({
  heading: {},
  inputParent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: '1px solid #878787',
    margin: '1rem',
    borderRadius: '4px',
    width: '30%',
    alignSelf: 'flex-end',
    padding: '0 10px'
  },
  input: {
    cursor: 'text',
    caretColor: '#000',
    color: '#000',
    border: 'none',
    borderRight: '1px solid #fff',
    width: '100%',
    padding: '15px 15px',
    backgroundColor: 'transparent',
    fontSize: '14px',
    '&:focus': {
      outline: 'none',
      borderRight: '1px solid #fff'
    }
  },
  positionCard: {
    textAlign: 'center'
  }
})

function PositionsComponent({
  positionInfo,
  promotions,
  fetch = () => { },
  setLoading = () => { }
}) {
  const router = useRouter()
  const classes = useStyles()

  const action = useMemo(() => {
    return (
      <Box className={classes.heading}>
        <Typography fontWeight='bold'>
          Total Jabatan Kosong: {positionInfo?.total || 0}
        </Typography>
      </Box>
    )
  }, [positionInfo])

  const navigateToCompare = (positionId) => {
    router.push(createShortUuidUrl(`/rekapitulasi/promosi-pegawai/bandingkan-pegawai`, positionId))
  }

  const unoccupiedPositions = useMemo(() => {
    return promotions?.unoccupiedPositionsDetail || []
  }, [promotions])

  useEffect(() => {
    fetch(router)
  }, [router])

  useEffect(() => {
    setLoading(!(promotions?.loading))
  }, [promotions])

  return (
    <LayoutPages
      handleBack={router.back}
      summary={positionInfo?.name || '-'}
      action={action}
    >
      <Grid container spacing={2}>
        {unoccupiedPositions?.map(pos => (
          <Grid item key={pos?.id} xs={3}>
            <PositionCard
              position={pos?.name}
              unit={pos?.hierarchy}
              count={pos?.unoccupied}
              handleClick={() => navigateToCompare(pos?.position_id)}
            />
          </Grid>
        ))}
      </Grid>
    </LayoutPages>
  )
}

const cardStyle = {}

const PositionCard = ({ position, unit, count, handleClick }) => {
  return (
    <Card otherStyle={cardStyle}>
      <Typography
        fontWeight='700'
        color='primary'
        fontSize={16}
        sx={{ textAlign: 'center' }}
      >{position}</Typography>

      <Typography
        fontWeight='400'
        fontSize={14}
        color='sidatukDraweBase'
        sx={{ marginTop: 2 }}
      >Hierarki Jabatan</Typography>

      <Typography
        fontWeight='700'
        color='sidatukDrawBase'
        fontSize={14}
      >{unit}</Typography>

      <Typography
        fontWeight='400'
        fontSize={14}
        color='sidatukDraweBase'
        sx={{ marginTop: 2 }}>Jumlah yang diperlukan</Typography>

      <Typography
        fontWeight='700'
        color='sidatukDrawBase'
        fontSize={14}
      >{count}</Typography>

      <Button
        text='Pilih Kandidat'
        color='primary'
        sx={{
          width: '100%',
          visibility: count > 0 ? 'visible' : 'hidden',
          marginTop: 2
        }}
        onClick={handleClick}
      />
    </Card>
  )
}

PositionsComponent.propTypes = {
  positionInfo: PropTypes.object,
  promotions: PropTypes.object,
  fetch: PropTypes.func,
  setLoading: PropTypes.func
}

PositionCard.propTypes = {
  position: PropTypes.string.isRequired,
  unit: PropTypes.string,
  count: PropTypes.number.isRequired,
  handleClick: PropTypes.func
}

export default PositionsComponent