/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Grid, Typography } from '@mui/material'
import { Button } from '@/components/shared'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Card from '../shared/Card/Index'
import LayoutPages from '../core/LayoutPages'

const useStyles = makeStyles({
  section: {
    marginTop: '12px',
    padding: '20px'
  },
  sectionText: {
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  positionCard: {
    height: '200px',
    padding: '20px',
    border: '2px solid black',
    borderRadius: '6px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  cardButton: {
    width: '100%'
  },
  hidden: {
    display: 'hidden'
  }
})

function PromosiPegawaiComponent({ promotions, setLoading = () => { } }) {
  const router = useRouter()

  const navigateToPositions = (positionId, echelonId, positionItem) => {
    const ids = btoa(`${positionId}-${echelonId}-${positionItem?.name}-${positionItem?.total}`)
    router.push(`${router.asPath}/positions/${ids}`)
  }

  const unoccupiedPositions = useMemo(() => {
    return promotions?.unoccupiedPositions
  }, [promotions])

  useEffect(() => {
    setLoading(!promotions?.loading)
  }, [promotions])

  return (
    <LayoutPages summary={'Promosi Pegawai'}>
      <Typography variant='h6' component='h1' fontWeight='bold'></Typography>
      <Grid container spacing={3}>
        {unoccupiedPositions?.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
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
                  {item?.name || '-'}
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
                  {`Total jabatan kosong: ${item?.total || 0}`}
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {item?.cards?.map((pos) => (
                  <Grid
                    item
                    key={pos?.id}
                    xs={
                      item?.cards?.length == 2
                        ? 6
                        : item?.cards?.length == 3
                          ? 4
                          : 3
                    }
                  >
                    <PositionCard
                      position={pos?.name}
                      count={pos?.unoccupied}
                      handleClick={
                        () => navigateToPositions(
                          item?.id, pos?.id, item
                        )
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </LayoutPages>
  )
}

const PositionCard = ({ position, count, handleClick }) => {
  const classes = useStyles()

  return (
    <Box className={classes.positionCard}>
      <Typography fontWeight='600' fontSize={16}>
        {position}
      </Typography>

      <Typography
        fontWeight='600'
        fontSize={28}
        color='#895700'
        sx={{ marginTop: 2 }}
      >
        {count}
      </Typography>

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
