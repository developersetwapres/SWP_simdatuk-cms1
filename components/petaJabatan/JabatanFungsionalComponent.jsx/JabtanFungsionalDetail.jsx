import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { HiArrowsExpand } from 'react-icons/hi'

const styles = {
  jabatanFungsional: {
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: '#f6ebda',
    paddingY: 2,
    paddingX: 1

  }
}


const JabatanFungsionalDetail = ({
  data,
  jabatan,
  amount,
  styleBoxFungsional,
  dataLength,
  children,
  expandButton,
  openModal = () => { }
}) => {


  const handleOpenModal = (item) => {
    openModal(item, true)
  }

  return (
    <>
      {
        data.id == '1' ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: 0,
              margin: 0
            }}
          >
            <hr
              style={{
                width: '50.1%',
                height: '2px',
                border: 0,
                margin: 0,
                backgroundColor: '#394346'
              }}
            />
          </Box>
        ) : data.id == dataLength?.length ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              padding: 0,
              margin: 0
            }}
          >
            <hr
              style={{
                width: '50.1%',
                height: '2px',
                border: 0,
                margin: 0,
                backgroundColor: '#394346'
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: 0,
              margin: 0
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
        )
      }
      <Grid
        container
        item
        gutter={0}
        padding={0}
        justifyContent='center'
        gap={3}
        sx={{
          position: 'relative',
          width: '100%'
        }}
      >
        <Grid
          item
        >
          <hr
            style={{
              height: '50px',
              width: '2px',
              border: 0,
              backgroundColor: '#394346',
              margin: '0 auto'
            }}
          />
          <Box
            sx={styleBoxFungsional || styles.jabatanFungsional}
          >
            {
              expandButton && (
                <Box
                  onClick={() => handleOpenModal(data)}
                  position='absolute'
                  right={15}
                  top={10}
                  fontSize={18}
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  <HiArrowsExpand />
                </Box>
              )
            }
            <Typography
              textAlign='center'
              fontWeight='500'
            >
              {jabatan}
            </Typography>
            <Typography
              textAlign='center'
              fontWeight='500'
            >
              {amount}
            </Typography>
            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}


JabatanFungsionalDetail.propTypes = {
  children: PropTypes.node,
  data: PropTypes.number,
  dataLength: PropTypes.array,
  jabatan: PropTypes.string,
  amount: PropTypes.string,
  styleBoxFungsional: PropTypes.object,
  styleBoxProfile: PropTypes.object,
  openModal: PropTypes.func,
  expandButton: PropTypes.bool
}

export default JabatanFungsionalDetail
