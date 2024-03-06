/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/'
import CourseEditorChoiceForm from './CourseEditorChoiceForm'
import CourseEditorChoiceListComponent from './CourseEditorChoiceListComponent'
import { Grid } from '@mui/material'
import { Button, Modal } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'

function CourseEditorChoiceComponent({
  editor,
  postEditorChoice = () => { }
}) {

  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    course: ''
  })
  const [customError, setCustomError] = useState({
    courseError: ''
  })

  const [newCourse, setNewCourse] = useState([])
  const [finishModal, setFinishModal] = useState(false)

  useEffect(() => {
    setNewCourse(editor?.list)
  }, [editor?.list])
  const removeDuplicates = [...new Map(newCourse.map(item => [item.id, item])).values()]
  const [isMobile, setIsMobile] = useState(false)
  // Check screen size 
  const handleMobileDevices = () => {
    if (window.innerWidth < 1200) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleMobileDevices)
  })

  useEffect(() => {
    setFinishModal(false)
    if (editor.loading === false) {
      setFinishModal(true)
    } else if (editor.loading === true) {
      setFinishModal(false)
    }
  }, [editor])

  useEffect(() => {
    setFinishModal(false)
  }, [])

  // * save reference for dragItem and dragOverItem 
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('course' in fieldOfValues)
      temp.course = fieldOfValues.course
        ? setCustomError({ courseError: '' })
        : 'Course tidak boleh kosong'

    setErrors({
      ...temp
    })

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '')
  }

  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialValues, true, validate)


  const handleAddToSelected = (values) => {
    const findDuplicates = newCourse.find((v) => v.id === values.id)
    if (!findDuplicates) {
      setNewCourse(prevState => [...prevState, values, ...editor?.list])
    } else {
      setCustomError({
        courseError: 'Course tidak boleh sama dengan data yang ada di list'
      })
    }

  }

  const handleDeleteSelected = (id) => {
    setNewCourse(newCourse.filter(course => course.id !== id))
  }

  const handleDragSorting = () => {
    // duplicate items 
    let courseItem = [...newCourse]

    // remove and save the draggeed item content 
    const draggedItemContent = courseItem.splice(dragItem.current, 1)[0]

    // switch the position 
    courseItem.splice(dragOverItem.current, 0, draggedItemContent)

    // reset the position ref 
    dragItem.current = null
    dragOverItem.current = null

    // update the actual array 
    setNewCourse(courseItem)
  }


  const handleSubmit = () => {
    if (newCourse.length > 0) {
      const data = newCourse?.map((val, i) => {
        const currentPosition = {
          currentPosition: i + 1
        }
        const mergeObject = { ...currentPosition, ...val }
        return mergeObject
      })
      const unique = [...new Map(data.map((d) => [d.id, d])).values()]
      const payload = unique.map(val => {
        return {
          course_id: val.id,
          position: val.currentPosition
        }
      })
      postEditorChoice(payload)
    } else {
      setCustomError({
        courseError: 'Course tidak boleh kosong'
      })
    }
  }

  return (
    <>
      {
        isMobile ? (
          <h1>Mohon Maaf untuk versi mobile tidak support, untuk menggunakan fitur ini mohon menggunakan device Laptop atau Komputer </h1>
        ) : (
          <>
            <CourseEditorChoiceForm
              values={values}
              handleInputChange={handleInputChange}
              course={editor?.editor}
              errors={errors}
              handleSelectedCourse={handleAddToSelected}
              removeDuplicates={removeDuplicates}
              customError={customError}
            />
            <Grid
              container
              direction='column'
              sx={{
                margin: '40px 0'
              }}
            >
              {
                removeDuplicates?.length > 0 && (
                  removeDuplicates?.map((item, index) => (
                    <Grid
                      item
                      key={index}
                      sx={{
                        height: '100%',
                        marginBottom: '22.42px',
                        cursor: 'move'
                      }}
                    >
                      <CourseEditorChoiceListComponent
                        index={index}
                        detail={item}
                        dragItem={dragItem}
                        dragOverItem={dragOverItem}
                        handleDragSorting={handleDragSorting}
                        handleDeleteSelected={handleDeleteSelected}
                      />
                    </Grid>
                  ))
                )
              }
            </Grid>
          </>
        )
      }
      <Button
        text='Submit'
        color='warning'
        sx={{
          textTransform: 'none',
          ...primaryButtonStyle
        }}
        onClick={handleSubmit}
        isLoading={editor?.loading}
        isBusy={editor?.isBusy}
      />
      {/* Start Modal */}
      <Modal
        open={finishModal}
        padding='3rem 0'
        onClose={() => {
          setFinishModal(false)
          window.location.reload()
        }}
        width='600px'
      >
        <img
          src={editor?.icon}
          alt='icon'
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
        }}>{editor?.message ?? ''}</h2>
        <p style={{ textAlign: 'center' }}>{editor?.error || ''}</p>
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
      {/* End Modal */}
    </>
  )
}

CourseEditorChoiceComponent.propTypes = {
  editor: PropTypes.object,
  postEditorChoice: PropTypes.func
}

export default CourseEditorChoiceComponent