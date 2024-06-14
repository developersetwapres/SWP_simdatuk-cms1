import React from 'react'
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

function PromosiPegawaiComponent() {
  const list = [
    {
      id: 1,
      title: 'Jabatan A',
      unfilledPositions: 10,
      positions: [
        { id: 1, position: 'Posisi A', count: 10 },
        { id: 2, position: 'Posisi B', count: 0 }
      ]
    },
    {
      id: 2,
      title: 'B',
      unfilledPositions: 10,
      positions: [
        { id: 1, position: 'A', count: 10 },
        { id: 2, position: 'B', count: 0 },
        { id: 3, position: 'C', count: 10 }
      ]
    },
    {
      id: 3,
      title: 'C',
      unfilledPositions: 10,
      positions: [
        { id: 1, position: 'A', count: 10 },
        { id: 2, position: 'B', count: 10 },
        { id: 3, position: 'C', count: 0 },
        { id: 4, position: 'D', count: 10 }
      ]
    }
  ]
  const classes = useStyles()
  const router = useRouter()

  const navigateToPositions = positionId => {
    router.push(`${router.asPath}/positions/${positionId}`)
  }

  return (
    <>
      <Typography variant='h6' component='h1' fontWeight='bold'>Promosi Pegawai</Typography>

      {list.map(item => (
        <Paper className={classes.section} key={item.id}>
          <Box className={classes.sectionText}>
            <Typography fontWeight='bold' color='#895700'>{item.title}</Typography>
            <Typography fontWeight='bold' color='#895700'>
              Total jabatan kosong: {item.unfilledPositions}
            </Typography>
          </Box>

          <Grid container sx={{ marginTop: '-10px' }} spacing={2}>
            {item.positions.map(pos => (
              <Grid item key={pos.id} xs={12 / item.positions.length}>
                <PositionCard
                  position={pos.position}
                  count={pos.count}
                  handleClick={() => navigateToPositions(pos.id)}
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

PositionCard.propTypes = {
  position: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  handleClick: PropTypes.func
}

export default PromosiPegawaiComponent