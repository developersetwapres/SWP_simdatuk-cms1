import React, { useState } from 'react'
import UserCreateSpreadsheetToolbarComponent from './UserCreateSpreadsheetToolbarComponent'
import { getFileExtension } from '@/utils/index'
import { useForm } from '@/hooks/index'
import PropTypes from 'prop-types'

function UserCreateSpreadsheetComponent({
  importExcel,
  exportExcel,
  importExcelUser = () => { },
  exportExcelUser = () => { }
}) {
  const [initialValues, setInitialValues] = useState({
    user: []
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('user' in fieldOfValues) {
      const exFile = fieldOfValues.user.name
        ? getFileExtension(fieldOfValues.user.name)
        : ''

      temp.user = fieldOfValues.user.length === 0
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

  const handleImportUser = () => {
    if (validate()) {
      const file = new FormData()
      file.append('file', values.user)
      importExcelUser(file)
    }
  }

  const handleClearFile = () => {
    setInitialValues({
      user: []
    })
    resetForm()
    window.location.reload()
  }
  return (
    <>
      <h3>Tambah Pengguna by Spreadsheet</h3>
      <UserCreateSpreadsheetToolbarComponent
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
        handleImportUser={handleImportUser}
        handleClearFile={handleClearFile}
        exportExcelUser={exportExcelUser}
        importExcel={importExcel}
        exportExcel={exportExcel}
      />
    </>
  )
}

UserCreateSpreadsheetComponent.propTypes = {
  importExcel: PropTypes.object,
  exportExcel: PropTypes.object,
  importExcelUser: PropTypes.func,
  exportExcelUser: PropTypes.func
}

export default UserCreateSpreadsheetComponent