import React, { useState } from 'react'
import UserUpdateLevelToolbarComponent from './UserUpdateLevelToolbarComponent'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/index'
import { getFileExtension } from '@/utils/index'

function UserUpdateLevelComponent({
  importExcel,
  exportExcel,
  importExcelUserLevel = () => { },
  exportExcelUserLevel = () => { }
}) {
  const [initialValues, setInitialValues] = useState({
    level: []
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('level' in fieldOfValues) {
      const exFile = fieldOfValues.level.name
        ? getFileExtension(fieldOfValues.level.name)
        : ''

      temp.level = fieldOfValues.level.length === 0
        ? 'File tidak boleh kosong'
        : (
          exFile !== 'xlsx'
            ? 'File harus berupa xlsx'
            : ''
        )
    }

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
    resetForm,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const handleImportLevel = () => {
    if (validate()) {
      const file = new FormData()
      file.append('file', values.level)
      importExcelUserLevel(file)
    }
  }

  const handleClearFile = () => {
    setInitialValues({
      level: []
    })
    resetForm()
    window.location.reload()
  }
  return (
    <>
      <h3>Update Level Pengguna</h3>
      <UserUpdateLevelToolbarComponent
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
        handleImportLevel={handleImportLevel}
        handleClearFile={handleClearFile}
        exportExcelUserLevel={exportExcelUserLevel}
        importExcel={importExcel}
        exportExcel={exportExcel}
      />
    </>
  )
}

UserUpdateLevelComponent.propTypes = {
  importExcel: PropTypes.object,
  exportExcel: PropTypes.object,
  importExcelUserLevel: PropTypes.func,
  exportExcelUserLevel: PropTypes.func
}

export default UserUpdateLevelComponent