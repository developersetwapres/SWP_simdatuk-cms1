/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { HAMBURGER_ICON, TRASH_WHITE_ICON } from '@/utils/iconConstant'
import { Icon, Rating } from '@/components/shared'
import { Grid, IconButton } from '@mui/material'
import { dangerButtonStyle } from '@/utils/theme'
import { formatRupiah } from '@/utils/number'

const useStyles = makeStyles(theme => ({
  image: {
    width: '100%',
    height: '135px',
    objectFit: 'cover',
    borderRadius: '6px',
    maxWidth: '320px',
    [theme.breakpoints.between('xs', 'sm')]: {
      display: 'block',
      margin: '0 auto'
    }
  },
  content: {
    display: 'flex',
    [theme.breakpoints.between('xs', 'sm')]: {
      flexDirection: 'column'
    }
  }
}))
function CourseEditorChoiceListComponent({
  index,
  dragItem,
  detail,
  dragOverItem,
  handleDragSorting = () => { },
  handleDeleteSelected = () => { }
}) {
  const classes = useStyles()
  return (
    <Grid
      draggable
      onDragStart={() => (dragItem.current = index)}
      onDragEnter={() => (dragOverItem.current = index)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={handleDragSorting}
      sx={{
        padding: '40px 0'
      }}
      container
      direction='row'
      spacing={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3
      }}
      alignItems={{
        xs: 'flex-start',
        sm: 'flex-start',
        md: 'flex-start',
        lg: 'center',
        xl: 'center'
      }}
    >
      <Grid
        item
        lg={1}
        xl={1}
        md={1}
        sm={1}
        xs={1}
      >
        <Icon
          path={HAMBURGER_ICON}
          maxWidth={30}
        />
      </Grid>
      <Grid
        item
        xl={3}
        lg={3}
        md={3}
        sm={9}
        xs={9}
      >
        <img
          src={detail?.photo || '/images/default-image.png'}
          alt='preview'
          className={classes.image}
        />
      </Grid>
      <Grid
        item
        lg={7}
        xl={7}
        md={7}
        alignSelf='flex-start'
        sx={{
          padding: 0
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <h6 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '400'
          }}
          >
            {detail?.name || ''}
          </h6>
          <h6 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '400',
            color: '#FE9516'
          }}
          >
            {formatRupiah(detail?.price) || ''}
          </h6>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <p style={{ marginTop: 0 }}>{detail?.coach || ''}</p>
          <p style={{ marginTop: 0, marginRight: '10px', marginLeft: '10px', fontWeight: 900 }}>&#8226;</p>
          <p style={{ marginTop: 0 }}>{detail?.category?.name}</p>
        </div>
        <Rating
          readOnly
          value={detail?.rating?.value}
          totalRating={detail?.rating?.count}
          classes={{
            marginTop: '-10px',
            height: '20px'
          }}
        />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <p>{detail?.level?.name || ''}</p>
          <span style={{ marginRight: '10px', marginLeft: '10px', fontWeight: 900 }}>&#8226;</span>
          <p>{detail?.duration || ''} JP</p>
          <span style={{ marginRight: '10px', marginLeft: '10px', fontWeight: 900 }}>&#8226;</span>
          <p>{detail?.language?.length > 1 ? detail?.language?.map(v => v.name).join(', ') : detail?.language?.map(v => v.name)}</p>
          <span style={{ marginRight: '10px', marginLeft: '10px', fontWeight: 900 }}>&#8226;</span>
          <p>Gratis</p>
          <span style={{ marginRight: '10px', marginLeft: '10px', fontWeight: 900 }}>&#8226;</span>
          <p style={{
            margin: 0
          }}>{detail?.date_course?.name || ''}</p>
        </div>
      </Grid>
      <Grid
        item
        xl={1}
        lg={1}
        md={1}
        sm={2}
        xs={2}
      >
        <IconButton
          sx={{
            backgroundColor: '#D32F2F',
            ...dangerButtonStyle,
            borderRadius: '8px'
          }}
          onClick={() => handleDeleteSelected(detail?.id)}
        >
          <Icon
            path={TRASH_WHITE_ICON}
            maxWidth={25}
          />
        </IconButton>
      </Grid>
    </Grid >
  )
}

CourseEditorChoiceListComponent.propTypes = {
  index: PropTypes.any,
  dragItem: PropTypes.any,
  detail: PropTypes.object,
  dragOverItem: PropTypes.any,
  handleDragSorting: PropTypes.func,
  handleDeleteSelected: PropTypes.func
}

export default CourseEditorChoiceListComponent