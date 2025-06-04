import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { HiArrowsExpand } from 'react-icons/hi'
import CardListJobs from './CardListJobs'
import Card from './Index'
import { CardTypes } from 'libs/types/CardTypes'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

const styles = {
  jabatanFungsional: {
    backgroundColor: '#f6ebda',
    position: 'relative'
  }
}

const CardJobs = ({ styleBoxFungsional, data, isModal, handleModal }) => {
  const ExpandModal = useMemo(() => {
    return data?.childs.length > 1
  }, [data])

  return (
    <Card
      otherStyle={{
        ...styleBoxFungsional,
        ...styles.jabatanFungsional,
        padding: '16px',
        paddingBottom: ExpandModal ? '34px' : '16px'
      }}
    >
      <Box
        onClick={() =>
          handleModal(
            data?.type == 1 ? CardTypes?.STRUCTURAL : CardTypes?.FUNGSIONAL,
            data
          )
        }
        fontSize={18}
        sx={{
          display: ExpandModal ? 'block' : 'none',
          cursor: 'pointer',
          position: 'absolute',
          top: 15,
          right: 15
        }}
      >
        <HiArrowsExpand />
      </Box>
      <Typography textAlign='center' fontWeight='500'>
        Jabatan Fungsional
      </Typography>
      <Box sx={{ marginTop: '14px', display: 'flex', flexDirection: 'column' }}>
        {ExpandModal && (
          <Box sx={{ position: 'relative', height: '14px' }}>
            <Box
              sx={{
                width: '88%',
                height: '50px',
                backgroundColor: '#FFF',
                border: '1px solid #000',
                borderRadius: '10px',
                position: 'absolute',
                top: '0px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
            <Box
              sx={{
                width: '94%',
                height: '50px',
                backgroundColor: '#FFF',
                border: '1px solid #000',
                borderRadius: '10px',
                position: 'absolute',
                top: '7px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </Box>
        )}
        <Box
          sx={{
            height: '100%',
            backgroundColor: '#FFF',
            border: '1px solid #000',
            borderRadius: '10px',
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
            {data?.childs &&
              data?.childs.map((item, index) => (
                <SwiperSlide
                  style={{
                    width: '100%'
                  }}
                  key={index}
                >
                  <CardListJobs
                    data={item}
                    isModal={isModal}
                    handleModal={handleModal}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </Box>
      </Box>
    </Card>
  )
}

CardJobs.propTypes = {
  styleBoxFungsional: PropTypes.any,
  data: PropTypes.any,
  isModal: PropTypes.bool,
  handleModal: PropTypes.func
}

export default CardJobs
