/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { makeStyles } from '@mui/styles'
import { HAMBURGER_ICON } from '@/utils/iconConstant'
import { IconButton } from '@/components/shared'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '100%'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    marginLeft: '20px'
  }
})

const removeImage = `
  #content img {
    display: none
  }
`

function SortBannerList({
  detail,
  dragItem,
  dragOverItem,
  index,
  handleDragSorting = () => { }
}) {
  const classes = useStyles()
  return (
    <div
      className={classes.root}
      draggable
      onDragStart={() => (dragItem.current = index)}
      onDragEnter={() => (dragOverItem.current = index)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={handleDragSorting}
    >
      <div style={{
        width: '10%'
      }}>
        <IconButton
          path={HAMBURGER_ICON}
        />
      </div>
      <div style={{
        width: '25%'
      }}>
        <img
          src={detail?.photo || '/images/default-image.png'}
          alt='preview'
          style={{
            width: '240px',
            height: '118px'
          }}
        />
      </div>
      <div className={classes.list}>
        <h2 style={{ margin: '5px 0', fontSize: '20px' }}>{detail?.name}</h2>
        <p
          style={{ margin: '0px', fontSize: '16px', color: '#444444' }}
        >
          {detail?.type === 0 ? 'Pembelajaran' : detail?.type === 1 ? 'Pengumuman' : detail?.type === 2 ? 'Link' : ''}
        </p>
        {
          detail?.type === 0 && (
            <p>{detail?.course?.name}</p>
          )
        }
        {
          detail?.type === 1 && (
            <>
              <style >{removeImage}</style>
              <p id='content' style={{
                marginTop: 0,
                display: '-webkit-box',
                maxWidth: '600px',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontSize: '16px',
                color: '#444444'
              }} dangerouslySetInnerHTML={{ __html: detail?.content }} />
            </>
          )
        }
        {
          detail?.type === 2 && (
            <p>{detail?.external_url}</p>
          )
        }
      </div>
    </div>
  )
}

SortBannerList.propTypes = {
  detail: PropTypes.object,
  handleDragSorting: PropTypes.func,
  index: PropTypes.number,
  dragItem: PropTypes.any,
  dragOverItem: PropTypes.any
}

export default SortBannerList