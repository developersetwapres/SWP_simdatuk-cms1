/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { Button } from '@/components/shared'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  section: {
    marginTop: '12px',
    padding: '16px 12px 12px 12px'
  },
  sectionText: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  positionCard: {
    border: '1px solid black',
    borderRadius: '6px',
    padding: '8px',
    textAlign: 'center'
  },
  cardButton: {
    width: '100%'
  },
  hidden: {
    display: 'hidden'
  }
})

function PromosiPegawaiComponent({
  promotions,
  setLoading = () => { }
}) {
  const classes = useStyles()
  const router = useRouter()

  const navigateToPositions = (positionId, echelonId) => {
    const ids = btoa(`${positionId}-${echelonId}`)
    router.push(`${router.asPath}/positions/${ids}`)
  }

  const unoccupiedPositions = useMemo(() => {
    return promotions?.unoccupiedPositions
  }, [promotions])

  useEffect(() => {
    setLoading(!(promotions?.loading))
  }, [promotions])

  return (
    <>
      <Typography variant='h6' component='h1' fontWeight='bold'>Promosi Pegawai</Typography>

      {unoccupiedPositions?.map(item => (
        <Paper className={classes.section} key={item.id}>
          <Box className={classes.sectionText}>
            <Typography fontWeight='bold' color='#895700'>{item?.name || '-'}</Typography>
            <Typography fontWeight='bold' color='#895700'>
              Total jabatan kosong: {item?.total || 0}
            </Typography>
          </Box>

          <Grid container sx={{ marginTop: '-10px' }} spacing={2}>
            {item?.cards?.map(pos => (
              <Grid item key={pos?.id} xs={12 / item?.cards?.length}>
                <PositionCard
                  position={pos?.name}
                  count={pos?.unoccupied}
                  handleClick={() => navigateToPositions(item?.id, pos?.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </>
  )
}

const PositionCard = ({ position, count, handleClick }) => {
  const classes = useStyles()

  return (
    <Box className={classes.positionCard}>
      <Typography
        fontWeight='600'
        fontSize={16}
      >{position}</Typography>

      <Typography
        fontWeight='600'
        fontSize={28}
        color='#895700'
        sx={{ marginTop: 2 }}>{count}</Typography>

      <Button
        text='Lihat Detail'
        color='primary'
        sx={{
          width: '100%',
          visibility: count > 0 ? 'visible' : 'hidden',
          marginTop: 2
        }}
        onClick={handleClick}
      />
    </Box>
  )
}

PromosiPegawaiComponent.propTypes = {
  promotions: PropTypes.object,
  setLoading: PropTypes.func
}

PositionCard.propTypes = {
  position: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  handleClick: PropTypes.func
}

export default PromosiPegawaiComponent