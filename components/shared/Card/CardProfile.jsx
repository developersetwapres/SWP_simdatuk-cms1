/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useMemo } from 'react'
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
import Card from './Index'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

const style = {
  cardParent: {
    minWidth: {
      md: '18vw',
      sm: '25vw',
      xs: '50vw'
    },
    height: 'fit-content',
    padding: 0
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
    justifyContent: 'space-between'
  }
}

const CardProfile = ({
  data,
  isProfile = true,
  isShadow = true,
  isBorder = false,
  checked = false,
  isCheck = false,
  handleModal = () => {},
  handleCheck = () => {}
}) => {
  const isMultipleEmployee = useMemo(() => {
    return data?.available > 1
  }, [data])

  const hasChilds = useMemo(() => {
    return data?.filled > 1
  }, [data])

  return (
    <Card
      otherStyle={{
        ...style.cardParent,
        boxShadow: isShadow ? '0px 0px 12px 0px #9F9F9F26' : 'none',
        paddingBottom: isMultipleEmployee ? '16px' : 0,
        position: 'relative'
      }}
    >
      <CardContent sx={style.cardContent}>
        <Box
          sx={{
            width: '90%',
            marginBottom: data?.name ? '20px' : 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {data?.name && (
            <Typography
              fontWeight='bold'
              gutterBottom
              textAlign='center'
              sx={{
                width: '90%',
                // minHeight: '40px',
                margin: '0 auto',
                fontSize: 14
              }}
            >
              {data?.name || '-'}
            </Typography>
          )}
          {isMultipleEmployee && (
            <Typography
              fontWeight='bold'
              gutterBottom
              textAlign='center'
              sx={{ margin: '4px auto 0 auto', fontSize: 14 }}
            >
              {`(${data?.available}/${data?.filled})`}
            </Typography>
          )}
          {isShadow && hasChilds && (
            <Box
              onClick={() =>
                handleModal(
                  data?.type == 2
                    ? CardTypes?.FUNGSIONAL
                    : CardTypes?.STRUCTURAL,
                  data
                )
              }
              fontSize={18}
              sx={{
                cursor: 'pointer',
                position: 'absolute',
                top: 15,
                right: 15
              }}
            >
              <HiArrowsExpand color='#895700' />
            </Box>
          )}
        </Box>
        <ContentProfile
          data={data}
          checked={checked}
          isCheck={isCheck}
          isProfile={isProfile}
          isBorder={isMultipleEmployee ? true : isBorder}
          isMultipleEmployee={isMultipleEmployee}
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
  checked,
  isCheck,
  isProfile,
  isBorder,
  handleCheck
}) => {
  const router = useRouter()

  const employee = useMemo(() => {
    const payload = {
      ...data,
      users: data?.users.length > 0 ? data?.users : [{}]
    }

    return payload
  }, [data])

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        border: isBorder ? '1px solid #000' : 'none',
        borderRadius: isBorder ? '12px' : 0,
        position: 'relative'
      }}
    >
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true
        }}
        modules={[Pagination]}
      >
        {employee?.users.map((item, index) => (
          <SwiperSlide
            style={{
              width: '100%',
              borderRadius: isBorder ? '12px' : 0
            }}
            key={index}
          >
            <Box sx={{ padding: isBorder ? '14px' : 0 }}>
              <Box sx={style.imageBox}>
                {/* Photo Profile */}
                <Box
                  sx={{
                    width: '150px',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  {item?.photo_profile ? (
                    <img
                      src={item?.photo_profile}
                      alt='Employee Profile'
                      style={{ width: '100%', height: 'fit-content' }}
                    />
                  ) : (
                    <Image
                      src='/simdatuk/userIcon.png'
                      alt='profile'
                      height={70}
                      width={70}
                    />
                  )}
                </Box>
                {/* Name */}
                <Typography
                  color='primary'
                  fontWeight='600'
                  textAlign='center'
                  sx={{ height: '40px' }}
                >
                  {item?.name
                    ? [item?.title_prefix, item?.name, item?.title_suffix].join(
                        ' '
                      )
                    : '-'}
                </Typography>
              </Box>
              <Grid container spacing={1} marginY={2}>
                {/* Detail Position */}
                {/* 1. ASN, 2. Non ASN, 3. Outsourcing */}
                {item?.type == 2 ? (
                  <>
                    {item?.position_name && (
                      <ItemDetail title='Jabatan' value={item?.position_name} />
                    )}
                    <ItemDetail
                      title='TMT'
                      value={item?.position_effective_date || '-'}
                    />
                    {item?.employee_id_number && (
                      <ItemDetail
                        title='NRP'
                        value={item?.employee_id_number || '-'}
                      />
                    )}
                  </>
                ) : item?.type == 3 ? (
                  <>
                    <ItemDetail
                      title='Jabatan'
                      value={item?.position_name || '-'}
                    />
                    <ItemDetail
                      title='TMT'
                      value={item?.position_effective_date || '-'}
                    />
                    <ItemDetail
                      title='Golongan'
                      value={
                        item?.grade_name
                          ? `${item?.grade_name} ${item?.grade_code || ''}${
                              item?.position_effective_date
                                ? `, ${item?.position_effective_date}`
                                : ''
                            }`
                          : '-'
                      }
                    />
                    <ItemDetail
                      title='NIP/NRP'
                      value={item?.employee_id_number || '-'}
                    />
                  </>
                ) : (
                  <>
                    <ItemDetail
                      title='Eselon'
                      value={item?.echelon_name || '-'}
                    />
                    <ItemDetail
                      title='Golongan'
                      value={
                        item?.grade_name
                          ? `${item?.grade_name} ${item?.grade_code || ''}${
                              item?.position_effective_date
                                ? `, ${item?.position_effective_date}`
                                : ''
                            }`
                          : '-'
                      }
                    />
                    <ItemDetail
                      title='NIP/NRP'
                      value={
                        !item?.employee_id_number &&
                        !item?.employee_registration_number
                          ? '-'
                          : !item?.employee_registration_number
                          ? item?.employee_id_number
                          : `${item?.employee_id_number} / ${item?.employee_registration_number}`
                      }
                    />
                  </>
                )}
              </Grid>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '100%',
                    gap: '5px'
                  }}
                >
                  {item?.id && isProfile && (
                    <Button
                      onClick={() =>
                        router.push(
                          `/rekapitulasi/peta-jabatan/detail/${btoa(item?.id)}`
                        )
                      }
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
                  {employee?.has_child && (
                    <Button
                      onClick={() =>
                        router.push(
                          `/rekapitulasi/peta-jabatan/${btoa(data?.id)}`
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
                </Box>
                {isCheck && (
                  <FormControlLabel
                    label={'Bandingkan'}
                    control={
                      <Checkbox
                        onClick={(e) => handleCheck(e.target.checked, item?.id)}
                        checked={checked}
                      />
                    }
                  />
                )}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
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
