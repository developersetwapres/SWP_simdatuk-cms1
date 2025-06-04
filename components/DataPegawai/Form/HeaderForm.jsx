import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@/components/shared'
import { Box, Divider, Typography } from '@mui/material'

const style = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  divide: {
    border: '1px solid #929292',
    margin: '10px 0px'
  }
}

const HeaderForm = ({ title, isDelete = true, handleDelete = () => {} }) => {
  return (
    <Box sx={style?.wrapper}>
      <Box sx={style?.header}>
        <Typography color='#895700' fontWeight={700}>
          {title}
        </Typography>
        {isDelete && (
          <Button
            text='Hapus'
            color='danger'
            onClick={handleDelete}
            sx={{ textTransform: 'none' }}
          />
        )}
      </Box>
      <Divider sx={style?.divide} />
    </Box>
  )
}

HeaderForm.propTypes = {
  title: PropTypes.string,
  isDelete: PropTypes.bool,
  handleDelete: PropTypes.func
}

export default HeaderForm
