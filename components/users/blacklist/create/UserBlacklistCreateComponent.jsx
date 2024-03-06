import React, { useState } from 'react'
import UserBlacklistCreateFormComponent from './UserBlacklistCreateFormComponent'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/index'
import { getFileExtension } from '@/utils/index'

function UserBlacklistCreateComponent({
  importExcel,
  exportExcel,
  importExcelUserBlacklist = () => { },
  exportExcelUserBlacklist = () => { }
}) {
  const [initialValues, setInitialValues] = useState({
    blacklist: []
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('blacklist' in fieldOfValues) {
      const exFile = fieldOfValues.blacklist.name
        ? getFileExtension(fieldOfValues.blacklist.name)
        : ''

      temp.blacklist = fieldOfValues.blacklist.length === 0
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

  const handleImportBlacklist = () => {
    if (validate()) {
      const file = new FormData()
      file.append('file', values.blacklist)
      importExcelUserBlacklist(file)
    }
  }

  const handleClearFile = () => {
    setInitialValues({
      blacklist: []
    })
    resetForm()
    window.location.reload()
  }

  return (
    <>
      <h3>Blacklist</h3>
      <UserBlacklistCreateFormComponent
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
        handleImportBlacklist={handleImportBlacklist}
        handleClearFile={handleClearFile}
        importExcel={importExcel}
        exportExcel={exportExcel}
        exportExcelUserBlacklist={exportExcelUserBlacklist}
      />
    </>
  )
}

UserBlacklistCreateComponent.propTypes = {
  importExcel: PropTypes.object,
  exportExcel: PropTypes.object,
  importExcelUserBlacklist: PropTypes.func,
  exportExcelUserBlacklist: PropTypes.func
}

export default UserBlacklistCreateComponent