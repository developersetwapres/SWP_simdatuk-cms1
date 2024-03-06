import React, { useState, useRef, useEffect } from 'react'
import SortBannerList from './SortBannerList'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
import SortBannerToolbar from './SortBannerToolbar'

function SortBannerComponent({
  banner,
  patchSortBanner = () => { }
}) {
  const [bannerBoard, setBannerBoard] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setBannerBoard(banner?.sortBanner)
  }, [banner?.sortBanner])
  // * save reference for dragItem and dragOverItem
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  const handleDragSorting = () => {
    let bannerList = [...bannerBoard]

    // remove and save the dragged item content 
    const draggedItemContent = bannerList.splice(dragItem.current, 1)[0]

    // switch the position 
    bannerList.splice(dragOverItem.current, 0, draggedItemContent)

    // reset the position ref 
    dragItem.current = null
    dragOverItem.current = null

    // update the actual array 
    setBannerBoard(bannerList)
  }

  // check screen size 
  const handleMobileDevices = () => {
    if (window.innerWidth < 1400) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleMobileDevices)
  }, [])

  // Handle Sort 
  const handleSubmit = () => {
    const data = bannerBoard?.map((val, i) => {
      const currentPosition = {
        currentPosition: i + 1
      }
      const mergeObject = { ...currentPosition, ...val }
      return mergeObject
    })
    const payload = data?.map(val => {
      return {
        banner_id: val.id,
        position: val.currentPosition
      }
    })
    patchSortBanner(payload)
  }


  return (
    <>
      {
        isMobile ? (
          <h1>Mohon Maaf untuk versi mobile tidak support, untuk menggunakan fitur ini mohon menggunakan device Laptop atau Komputer </h1>
        ) : (
          <>
            <h3 style={{
              marginBottom: '20px'
            }}>Sort Banner</h3>
            <Grid
              container
              direction='column'
            >
              {
                bannerBoard.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    sx={{
                      height: '100%',
                      maxHeight: '200px',
                      marginBottom: '22.42px',
                      cursor: 'pointer'
                    }}
                  >
                    <SortBannerList
                      detail={item}
                      index={index}
                      dragItem={dragItem}
                      dragOverItem={dragOverItem}
                      handleDragSorting={handleDragSorting}
                    />
                  </Grid>
                ))
              }
            </Grid>
            <SortBannerToolbar
              handleSubmit={handleSubmit}
              bannerLoading={banner}
            />
          </>
        )
      }
    </>
  )
}

SortBannerComponent.propTypes = {
  banner: PropTypes.object,
  patchSortBanner: PropTypes.func
}

export default SortBannerComponent