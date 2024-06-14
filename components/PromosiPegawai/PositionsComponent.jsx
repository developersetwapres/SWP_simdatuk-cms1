import React, { useMemo } from 'react'
import LayoutPages from '../core/LayoutPages'
import { Box, Typography, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { Button } from '../shared'
import Card from '../shared/Card/Index'
import Search from '../core/Search'
import PropTypes from 'prop-types'

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

function PositionsComponent() {
  const list = [
    {
      id: 1,
      position: 'Position A',
      unit: 'Unit',
      count: 10
    },
    {
      id: 2,
      position: 'Position B',
      unit: 'Unit',
      count: 10
    },
    {
      id: 3,
      position: 'Position C',
      unit: 'Unit',
      count: 0
    },
    {
      id: 4,
      position: 'Position D',
      unit: 'Unit',
      count: 10
    },
    {
      id: 1,
      position: 'Position A',
      unit: 'Unit',
      count: 10
    },
    {
      id: 2,
      position: 'Position B',
      unit: 'Unit',
      count: 10
    },
    {
      id: 3,
      position: 'Position C',
      unit: 'Unit',
      count: 0
    },
    {
      id: 4,
      position: 'Position D',
      unit: 'Unit',
      count: 10
    }
  ]
  const router = useRouter()
  const classes = useStyles()
  const action = useMemo(() => {
    return (
      <Box className={classes.heading}>
        <Typography fontWeight='bold'>Total Jabatan Kosong: 10</Typography>
      </Box>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigateToCompare = () => {
    router.push(`/rekapitulasi/bandingkan-pegawai`)
  }

  return (
    <LayoutPages
      handleBack={router.back}
      summary='Jabatan Fungsional Analis Kebijakan: Ahli Madya'
      action={action}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Search
          inputParentClasses={classes.inputParent}
          inputClass={classes.input}
          iconStyle={{ fontSize: '20px' }}
          placeholder='Cari Jabatan'
        />
      </Box>

      <Grid container spacing={2}>
        {list.map(pos => (
          <Grid item key={pos.id} xs={3}>
            <PositionCard
              position={pos.position}
              unit={pos.unit}
              count={pos.count}
              handleClick={() => navigateToCompare()}
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
      >Unit Kerja</Typography>

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

PositionCard.propTypes = {
  position: PropTypes.string.isRequired,
  unit: PropTypes.string,
  count: PropTypes.number.isRequired,
  handleClick: PropTypes.func
}

export default PositionsComponent