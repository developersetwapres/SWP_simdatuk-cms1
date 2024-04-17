/* eslint-disable indent */
import React from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { CardTypes } from 'libs/types/CardTypes'
import CardProfile from '../shared/Card/CardProfile'
import CardJobs from '../shared/Card/CardJobs'

const StrukturPetaJabatan = ({ data, styleBoxProfile, handleModal }) => {
  return (
    <>
      <hr
        style={{
          height: '50px',
          backgroundColor: '#394346',
          width: '2px',
          border: 0,
          margin: '0 auto'
        }}
      />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          overflow: 'auto'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0
          }}
        >
          <hr
            style={{
              width: '100%',
              height: '2px',
              border: 0,
              margin: 0,
              backgroundColor: '#394346'
            }}
          />
        </Box>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingBottom: '10px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: 'row',
            overflow: 'auto',
            gap: '30px'
          }}
        >
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                minWidth: {
                  md: data.length < 3 ? `${100 / 2}%` : '18vw',
                  sm: '25vw',
                  xs: '50vw'
                }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent:
                    index == '0'
                      ? 'flex-start'
                      : index + 1 == data.length
                      ? 'flex-end'
                      : 'center',
                  padding: 0,
                  margin: 0
                }}
              >
                <hr
                  style={{
                    width:
                      index == '0' || index + 1 == data.length
                        ? '49.6%'
                        : '100%',
                    height: '2px',
                    border: 0,
                    margin: 0,
                    backgroundColor:
                      index == '0' || index + 1 == data.length
                        ? '#F4F4F4'
                        : '#394346'
                  }}
                />
              </Box>

              {item?.type == CardTypes?.CARDJOBS ? (
                <>
                  <hr
                    style={{
                      height: '50px',
                      backgroundColor: '#394346',
                      width: '2px',
                      border: 0,
                      margin: '0 auto'
                    }}
                  />
                  <CardJobs data={item} handleModal={handleModal} />
                </>
              ) : (
                <Box>
                  <hr
                    style={{
                      height: '50px',
                      width: '2px',
                      border: 0,
                      backgroundColor: '#394346',
                      margin: '0 auto'
                    }}
                  />
                  <CardProfile
                    rootStyle={styleBoxProfile}
                    data={item}
                    isProfile
                    isDetail
                    handleModal={handleModal}
                    isExpand={item?.slot > 1}
                  />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

StrukturPetaJabatan.propTypes = {
  data: PropTypes.array,
  handleModal: PropTypes.func,
  styleBoxProfile: PropTypes.object
}

export default StrukturPetaJabatan
