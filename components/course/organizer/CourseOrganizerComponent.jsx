/* eslint-disable @next/next/no-img-element */
import { Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CourseOrganizerList from './CourseOrganizerList'
import PropTypes from 'prop-types'
import { Button, Modal } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'

function CourseOrganizerComponent({
  providerCourse,
  updateBulkProvider = () => { }
}) {
  const [finishModal, setFinishModal] = useState(false)

  useEffect(() => {
    setFinishModal(false)
    if (providerCourse.isFetch === false) {
      setFinishModal(true)
    } else if (providerCourse.isFetch === true) {
      setFinishModal(false)
    }
  }, [providerCourse])

  useEffect(() => {
    setFinishModal(false)
  }, [])
  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
      >
        <Grid
          container
          direction='column'
        >
          {
            providerCourse?.provider.map((value, index) => (
              <CourseOrganizerList
                path={value?.photo}
                lastUpdate={value?.last_update}
                key={index}
                id={value?.id}
                loading={providerCourse}
                fetch={value?.fetch_data}
                updateBulkProvider={updateBulkProvider}
              />
            ))
          }
        </Grid>
      </Grid>
      {/* Modal */}
      <Modal
        open={finishModal}
        padding='3rem 0'
        onClose={() => {
          window.location.reload()
          setFinishModal(false)
        }}
        width='700px'
      >
        <img
          src={providerCourse?.icon}
          alt='response'
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '128px',
            display: 'block',
            margin: '0 auto'
          }}
        />
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          {providerCourse?.message || ''}
        </h2>
        <div style={{
          marginRight: 'auto',
          marginLeft: 'auto',
          width: '100%',
          textAlign: 'center'
        }}>
          <Button
            text='Tutup'
            type='button'
            color='warning'
            sx={{
              padding: '12px',
              width: '540px',
              textTransform: 'none',
              ...primaryButtonStyle
            }}
            onClick={() => {
              setFinishModal(false)
              window.location.reload()
            }}
          />
        </div>
      </Modal>
      {/* Modal */}
    </Grid>
  )
}

CourseOrganizerComponent.propTypes = {
  providerCourse: PropTypes.object,
  updateBulkProvider: PropTypes.func
}

export default CourseOrganizerComponent