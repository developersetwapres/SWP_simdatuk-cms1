/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import { dateTimeFormat } from '@/utils/index'

const useStyles = makeStyles({
  image: {
    width: '100%',
    maxWidth: '158px',
    height: '60px',
    display: 'block',
    margin: '0 auto',
    objectFit: 'cover'
  }
})

function CourseOrganizerList({
  id,
  path,
  lastUpdate,
  loading,
  fetch,
  updateBulkProvider = () => { }
}) {
  // const [isBusy, setIsBusy] = useState(false)
  const handleBulk = async () => {
    const payload = {
      id: id
    }
    // await setIsBusy(true)
    await updateBulkProvider(payload.id)
    // await setIsBusy(false)
  }
  const classes = useStyles()
  return (
    <Grid
      item
      sx={{
        margin: '15px 0'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            md: 'row',
            sm: 'column',
            xs: 'column'
          },
          alignItems: {
            md: 'center',
            sm: 'start',
            xs: 'start'
          }
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            width: '100%',
            maxWidth: '200px',
            height: '100px',
            boxShadow: '0px 0px 13.8408px rgba(133, 133, 133, 0.25)',
            padding: '20px 20px',
            borderRadius: '9px',
            marginRight: '40px',
            marginBottom: {
              md: '0',
              sm: '20px',
              xs: '20px'
            }
          }}
        >
          <img
            src={path || '/images/default-image.png'}
            alt='logo'
            className={classes.image}
          />
        </Box>
        {
          fetch === true ? (
            <Button
              text='Update Data'
              color='warning'
              sx={{
                marginRight: '20px',
                ...primaryButtonStyle,
                textTransform: 'none',
                '&:disabled': {
                  backgroundColor: '#D9D9D9'
                }
              }}
              isBusy={loading?.isFetch}
              isLoading={loading.loading}
              onClick={handleBulk}
            />
          ) : (
            <Button
              text='Update Data'
              color='warning'
              sx={{
                marginRight: '20px',
                ...primaryButtonStyle,
                textTransform: 'none',
                '&:disabled': {
                  backgroundColor: '#D9D9D9'
                }
              }}
              isBusy={true}
              // isLoading={loading.loading}
              onClick={handleBulk}
            />
          )
        }

      </Box>

      <p>Pembaharuan Terakhir : {lastUpdate !== null ? dateTimeFormat(lastUpdate) : '-'}</p>
    </Grid>
  )
}

CourseOrganizerList.propTypes = {
  id: PropTypes.number,
  path: PropTypes.string,
  lastUpdate: PropTypes.any,
  loading: PropTypes.object,
  fetch: PropTypes.any,
  updateBulkProvider: PropTypes.func
}

export default CourseOrganizerList