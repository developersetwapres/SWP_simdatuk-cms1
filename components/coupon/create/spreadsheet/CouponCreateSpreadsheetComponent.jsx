import React, { useState } from 'react'
import UserCreateSpreadsheetToolbarComponent from './CouponCreateToolbarComponent'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/index'
import { getFileExtension } from '@/utils/index'

function CouponCreateSpreadsheetComponent({
  importExcel,
  exportExcel,
  exportExcelCoupon = () => { },
  importExcelCoupon = () => { }
}) {
  const [initialValues, setInitialValues] = useState({
    coupon: []
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('coupon' in fieldOfValues) {
      const exFile = fieldOfValues.coupon.name
        ? getFileExtension(fieldOfValues.coupon.name)
        : ''

      temp.coupon = fieldOfValues.coupon.length === 0
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

  const handleImportCoupon = () => {
    if (validate()) {
      const file = new FormData()
      file.append('file', values.coupon)
      importExcelCoupon(file)
    }
  }

  const handleClearFile = () => {
    setInitialValues({
      coupon: []
    })
    resetForm()
    window.location.reload()
  }
  return (
    <>
      <h4>Kupon by Spreadsheet</h4>
      <UserCreateSpreadsheetToolbarComponent
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
        handleImportCoupon={handleImportCoupon}
        handleClearFile={handleClearFile}
        exportExcelCoupon={exportExcelCoupon}
        importExcel={importExcel}
        exportExcel={exportExcel}
      />
    </>
  )
}

CouponCreateSpreadsheetComponent.propTypes = {
  importExcel: PropTypes.object,
  exportExcel: PropTypes.object,
  exportExcelCoupon: PropTypes.func,
  importExcelCoupon: PropTypes.func
}

export default CouponCreateSpreadsheetComponent