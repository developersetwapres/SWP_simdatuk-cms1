import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, List, Typography } from '@mui/material'
import { Button } from '..'
import { useRouter } from 'next/router'

const CardListJobs = ({ data, otherStyle, isModal, handleModal }) => {
  const router = useRouter()

  const isDetail = useMemo(() => {
    const totalUsers = data?.childs.reduce((sum, item) => sum + item.filled, 0)

    return totalUsers > 0
  }, [data])

  return (
    <Box
      sx={{
        height: '100%',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        otherStyle
      }}
    >
      <Box>
        <Typography textAlign='center' fontWeight='600' color='primary'>
          {data?.name || '-'}
        </Typography>
        <List sx={{ marginBottom: '14px' }}>
          {data?.childs &&
            data?.childs.map((itm, idx) => (
              <Typography key={idx} fontWeight='600'>
                {`${idx + 1}. ${itm?.name || '-'} (${itm?.filled}/${
                  itm?.available
                })`}
              </Typography>
            ))}
        </List>
      </Box>
      {isDetail && (
        <Button
          onClick={() => {
            if (isModal) handleModal()
            router.push(btoa(data?.id))
          }}
          text='Lihat Detail'
          color='primary'
          fullWidth
          type='submit'
          sx={{
            color: '#fff',
            textTransform: 'none',
            fontSize: '10px',
            alignSelf: 'flex-end'
          }}
        />
      )}
    </Box>
  )
}

CardListJobs.propTypes = {
  data: PropTypes.object,
  otherStyle: PropTypes.object,
  isModal: PropTypes.bool,
  handleModal: PropTypes.func
}

export default CardListJobs
