/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Button, ModalConfirm } from '@/components/shared'
import { Box, Grid } from '@mui/material'
import { blackButtonStyle, dangerButtonStyle, primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

function CourseDetailToolbar({
  courseId,
  deleteCourse = () => { }
}) {
  const [modalDelete, setModalDelete] = useState(false)
  const router = useRouter()

  const handleDeleteModal = () => {
    setModalDelete(true)
  }

  const handleCancelModal = () => {
    setModalDelete(false)
  }

  const handleDeleteCourse = () => {
    deleteCourse(courseId)
    setModalDelete(false)
  }

  return (
    <Grid
      container
      direction='row'
      spacing={2}
      sx={{
        marginTop: '20px'
      }}
    >
      <Grid
        item
      >
        <Button
          text='Edit'
          sx={{
            textTransform: 'none',
            ...primaryButtonStyle
          }}
          color='warning'
          onClick={() => { router.push(`/manajemen-course/course/edit/${courseId}`) }}
        />
      </Grid>
      <Grid
        item
      >
        <Button
          text='Hapus'
          sx={{
            textTransform: 'none',
            ...dangerButtonStyle
          }}
          color='danger'
          onClick={handleDeleteModal}
        />
      </Grid>
      {/* Modal Confirm */}
      <ModalConfirm
        open={modalDelete}
      >
        <img
          src='/images/information-circle.png'
          alt='logo'
          style={{
            width: '100%',
            maxWidth: '160px',
            height: '160px',
            display: 'block',
            margin: '0 auto'
          }}
        />
        <p style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '22px',
          marginTop: '30px'
        }}>Apakah anda yakin akan menghapus Course ?</p>
        <Box
          component='div'
          sx={{
            display: 'flex',
            alignItems: 'center',
            // flexWrap: 'nowrap',
            flexDirection: {
              xl: 'row',
              lg: 'row',
              md: 'column',
              sm: 'column',
              xs: 'column'
            },
            justifyContent: 'space-evenly'
          }}
        >
          <Button
            text='Ya'
            color='warning'
            onClick={() => { handleDeleteCourse() }}
            sx={{
              width: '100%',
              maxWidth: '240px',
              textTransform: 'none',
              marginBottom: {
                xl: 0,
                lg: 0,
                md: '10px',
                sm: '10px',
                xs: '10px'
              },
              ...primaryButtonStyle
            }}
          />
          <Button
            text='Tidak'
            sx={{
              width: '100%',
              maxWidth: '240px',
              textTransform: 'none',
              ...blackButtonStyle
            }}
            onClick={handleCancelModal}
          />
        </Box>
      </ModalConfirm>
      {/* End Modal Confirm */}
    </Grid>
  )
}

CourseDetailToolbar.propTypes = {
  courseId: PropTypes.number,
  deleteCourse: PropTypes.func
}

export default CourseDetailToolbar