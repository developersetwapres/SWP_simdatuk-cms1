/* eslint-disable indent */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import CardProfile from '../shared/Card/CardProfile'
import CardJobs from '../shared/Card/CardJobs'

const StrukturPetaJabatan = ({
  data,
  isModal,
  styleBoxProfile,
  handleModal
}) => {
  if (data.length == 0) return null

  const datas = useMemo(() => {
    const arr = []
    let grouping = null

    data.map((item) => {
      if (item?.type == 2) {
        if (!grouping) {
          grouping = {
            ...item,
            childs: [item]
          }
        } else {
          grouping?.childs?.push(item)
        }
      } else {
        arr.push(item)
      }
    })

    if (grouping?.childs?.length > 0) arr.unshift(grouping)

    return arr
  }, [data])

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
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <hr
            style={{
              width: '70%',
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
          {datas &&
            datas.map((item, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: {
                    sm:
                      datas.length == 1
                        ? `${100 / 2}%`
                        : datas.length > 1 && datas.length <= 4
                        ? `${100 / datas.length}%`
                        : '280px',
                    xs: '50vw'
                  },
                  height: 'fit-content',
                  position: 'relative'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '2px',
                    display: 'flex',
                    justifyContent:
                      index == '0'
                        ? 'flex-start'
                        : index + 1 == datas.length
                        ? 'flex-end'
                        : 'center',
                    padding: 0,
                    margin: 0,
                    position: 'relative'
                  }}
                >
                  <hr
                    style={{
                      width:
                        index == 0 || index + 1 == datas.length
                          ? '50.6%'
                          : '100%',
                      height: '2px',
                      border: 0,
                      margin: 0,
                      backgroundColor: '#394346',
                      position: 'absolute',
                      right: index == 0 ? 0 : '49.6%'
                    }}
                  />
                  {(index == 0 || index + 1 == datas.length) && (
                    <hr
                      style={{
                        width: '49.8%',
                        height: '2px',
                        border: 0,
                        margin: 0,
                        backgroundColor: '#F4F4F4',
                        position: 'absolute',
                        right: index == 0 ? '50.2%' : 0
                      }}
                    />
                  )}
                </Box>
                {item?.type == 2 ? (
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
                    <CardJobs
                      data={item}
                      isModal={isModal}
                      handleModal={handleModal}
                    />
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
  isModal: PropTypes.bool,
  handleModal: PropTypes.func,
  styleBoxProfile: PropTypes.object
}

export default StrukturPetaJabatan
