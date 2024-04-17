import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { HiArrowsExpand } from 'react-icons/hi'
import CardListJobs from './CardListJobs'

const styles = {
  jabatanFungsional: {
    padding: 2,
    minWidth: {
      md: '18vw',
      sm: '25vw',
      xs: '50vw'
    },
    borderRadius: '5px',
    backgroundColor: '#f6ebda',
    position: 'relative'
  }
}

const CardJobs = ({ styleBoxFungsional, data, handleModal }) => {
  const ExpandModal = useMemo(() => {
    if (data?.children.length > 1) return true
    return false
  }, [data])

  return (
    <Box sx={styleBoxFungsional || styles.jabatanFungsional}>
      <Box
        onClick={() => handleModal(data?.type, data)}
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
        {data?.position}
      </Typography>
      <CardListJobs data={data?.children[0]} />
    </Box>
  )
}

CardJobs.propTypes = {
  styleBoxFungsional: PropTypes.any,
  data: PropTypes.any,
  handleModal: PropTypes.func
}

export default CardJobs
