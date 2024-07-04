/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button } from '..'
import PropTypes from 'prop-types'
import { Box, FormControlLabel, Grid } from '@mui/material'
import Image from 'next/image'
import Checkbox from '@mui/material/Checkbox'
import { CardTypes } from 'libs/types/CardTypes'
import { HiArrowsExpand } from 'react-icons/hi'
import { useRouter } from 'next/router'

const style = {
  cardParent: {
    minWidth: {
      md: '18vw',
      sm: '25vw',
      xs: '50vw'
    },
    height: 'fit-content'
  },
  imageBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: '.5rem'
  },
  cardContent: {
    minHeight: '480px',
    maxHeight: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  }
}

const CardProfile = ({
  rootStyle,
  data,
  isExpand,
  onCLick,
  isCheck,
  checkLabel,
  handleModal = () => { },
  handleCheck = () => { }
}) => {
  const ExpandModal = useMemo(() => {
    if (data?.slot > 1) return true
    return false
  }, [data])

  return (
    <Card sx={rootStyle || style.cardParent}>
      <CardContent sx={style.cardContent}>
        <Box
          sx={{
            width: '90%',
            minHeight: '10px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {data?.position && (
            <Typography
              fontWeight='bold'
              gutterBottom
              textAlign='center'
              sx={{
                width: '90%',
                minHeight: '40px',
                margin: '0 auto',
                fontSize: 14
              }}
            >
              {data?.position}
            </Typography>
          )}
          {data?.slot > 1 && (
            <Typography
              fontWeight='bold'
              gutterBottom
              textAlign='center'
              sx={{ margin: '4px auto 0 auto', fontSize: 14 }}
            >
              {`(${data?.children.length}/${data?.slot})`}
            </Typography>
          )}
          <Box
            onClick={() => handleModal(data?.type, data)}
            fontSize={18}
            sx={{
              display: isExpand && ExpandModal ? 'block' : 'none',
              cursor: 'pointer',
              position: 'absolute',
              top: 15,
              right: 15
            }}
          >
            <HiArrowsExpand color='#895700' />
          </Box>
        </Box>
        <ContentProfile
          data={data?.children ? data?.children[0] : data}
          type={data?.type}
          isCheck={isCheck}
          handleCheck={handleCheck}
        />
      </CardContent>
    </Card>
  )
}

const ItemDetail = ({ title, value }) => {
  return (
    <Grid item xs={12}>
      <Typography fontSize={14}>{title}</Typography>
      <Typography
        variant='p'
        component='div'
        fontSize={14}
        fontWeight='600'
        sx={{
          wordWrap: 'break-word'
        }}
      >
        {value || '-'}
      </Typography>
    </Grid>
  )
}

const ContentProfile = ({
  data,
  type,
  detailCard,
  isCheck,
  handleCheck
}) => {
  const router = useRouter()

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={style.imageBox}>
        {data?.image?.length > 0 ? (
          <img src={data?.image[0]} alt='profile' height={200} width={150} />
        ) : (
          <Box
            height={200}
            width={150}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              backgroundColor: '#f0f0f0'
            }}
          >
            <Image
              src='/simdatuk/userIcon.png'
              alt='profile'
              height={70}
              width={70}
            />
          </Box>
        )}
        <Typography
          color='primary'
          fontWeight='600'
          textAlign='center'
          sx={{ height: '40px' }}
        >
          {data?.name || '-'}
        </Typography>
      </Box>
      <Grid container spacing={1} marginY={2}>
        {type == CardTypes?.PROFILE1 ? (
          <>
            <ItemDetail title='Eselon' value={data?.eselon} />
            <ItemDetail title='Golongan' value={data?.golongan} />
            <ItemDetail title='NIP/NRP' value={data?.nip} />
          </>
        ) : type == CardTypes?.PROFILE2 ? (
          <>
            {data?.golongan && (
              <ItemDetail title='Jabatan' value={data?.golongan} />
            )}
            <ItemDetail title='TMT' value={data?.tmt} />
            <ItemDetail title='NRP' value={data?.nip} />
          </>
        ) : type == CardTypes?.PROFILE3 ? (
          <>
            <ItemDetail title='TMT' value={data?.tmt} />
            <ItemDetail title='Golongan' value={data?.golongan} />
            <ItemDetail title='NIP/NRP' value={data?.nip} />
          </>
        ) : (
          <ItemDetail title='TMT' value={data?.tmt} />
        )}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          gap: '5px'
        }}
      >
        {data?.isProfile && (
          <Button
            onClick={() => router.push(data?.pathProfil)}
            text='Lihat Profile'
            color='sidatukDraweBase'
            fullWidth
            type='submit'
            sx={{
              color: '#fff',
              textTransform: 'none',
              fontSize: '10px'
            }}
          />
        )}
        {data?.isDetail && (
          <Button
            onClick={() =>
              router.push(
                `/rekapitulasi/peta-jabatan/${btoa(data?.pathDetail)}`
              )
            }
            text='Lihat Detail'
            color='primary'
            fullWidth
            type='submit'
            sx={{
              color: '#fff',
              textTransform: 'none',
              fontSize: '10px'
            }}
          />
        )}
        {data?.isCheck && (
          <FormControlLabel
            label={'Bandingkan'}
            control={
              <Checkbox
                onClick={(e) => handleCheck(e.target.checked, data)}
                checked={isCheck}
              />
            }
          />
        )}
      </Box>
    </Box>
  )
}

CardProfile.propTypes = {
  rootStyle: PropTypes.object,
  isExpand: PropTypes.bool,
  onCLick: PropTypes.func,
  handleModal: PropTypes.func,
  handleCheck: PropTypes.func,
  check: PropTypes.bool,
  checkLabel: PropTypes.string,
  handleCheckboxChange: PropTypes.func,
  chekValue: PropTypes.func,
  deleteValue: PropTypes.func,
  id: PropTypes.string,
  chekedAll: PropTypes.bool
}

export default CardProfile
