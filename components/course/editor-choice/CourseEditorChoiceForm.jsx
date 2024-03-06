import React from 'react'
import { Box } from '@mui/material'
import { Button, Autocomplete } from '@/components/shared'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add'
import { primaryButtonStyle } from '@/utils/theme'

function CourseEditorChoiceForm({
  course,
  values,
  // eslint-disable-next-line no-unused-vars
  errors,
  removeDuplicates,
  customError,
  handleInputChange = () => { },
  handleSelectedCourse = () => { }
}) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: {
          md: 'center',
          sm: 'normal',
          xs: 'normal'
        },
        flexDirection: {
          md: 'row',
          sm: 'column',
          xs: 'column'
        }
      }}
    >
      <Box
        sx={{
          width: {
            md: '89%',
            sm: '100%',
            xs: '100%'
          }
        }}
      >
        <Autocomplete
          options={course}
          value={values.course}
          name='course'
          onChange={handleInputChange}
          placeholder='Pilih Course'
          label='Course'
          error={customError.courseError}
        />
      </Box>
      <Box
        sx={{
          marginTop: customError?.courseError ? '20px' : '50px'
        }}
      >
        <Button
          text='Tambah'
          color='warning'
          sx={{
            ...primaryButtonStyle,
            textTransform: 'none'
          }}
          startIcon={<AddIcon />}
          onClick={() => handleSelectedCourse(values.course)}
          isBusy={values.course === '' || removeDuplicates.length >= 10 ? true : false}
        />
      </Box>
    </Box>
  )
}

CourseEditorChoiceForm.propTypes = {
  course: PropTypes.array,
  values: PropTypes.object,
  errors: PropTypes.object,
  removeDuplicates: PropTypes.array,
  customError: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleSelectedCourse: PropTypes.func
}

export default CourseEditorChoiceForm