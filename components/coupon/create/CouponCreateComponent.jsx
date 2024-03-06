import React, { useState, useEffect } from 'react'
import CouponCreateFormComponent from './CouponCreateFormComponent'
import { useForm } from '@/hooks/'
import CouponCreateToolbarComponent from './CouponCreateToolbarComponent'
import PropTypes from 'prop-types'
import { notAllowedCharAndWord } from '@/utils/regex'
import { format } from 'date-fns'

function CouponCreateComponent({
  coupon,
  command,
  postCoupon = () => { },
  filterCourseByProvider = () => { }
}) {
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    nameCoupon: '',
    codeUniq: '',
    valueCoupon: '',
    status: '',
    course: '',
    provider: ''
  })

  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })


  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('nameCoupon' in fieldOfValues)
      temp.nameCoupon = fieldOfValues.nameCoupon ? '' : 'Nama Kupon tidak boleh kosong'

    if ('codeUniq' in fieldOfValues)
      temp.codeUniq = fieldOfValues.codeUniq ? '' : 'Kode unik tidak boleh kosong'

    if ('valueCoupon' in fieldOfValues) {
      temp.valueCoupon = fieldOfValues.valueCoupon
        ? (
          notAllowedCharAndWord(fieldOfValues.valueCoupon)
            ? ''
            : 'Nilai Kupon harus berupa angka'
        )
        : 'Nilai Kupon tidak boleh kosong'
    }

    if ('status' in fieldOfValues)
      temp.status = fieldOfValues.status ? '' : 'Status tidak boleh kosong'

    if ('provider' in fieldOfValues)
      temp.provider = fieldOfValues.provider
        ? ''
        : 'Penyelenggara tidak boleh kosong'

    if ('course' in fieldOfValues) {
      temp.course = parseInt(fieldOfValues.status) !== 1
        ? ''
        : (
          parseInt(fieldOfValues.status) === 1 && fieldOfValues.course ? '' : 'Course tidak boleh kosong'
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
    resetField,
    handleInputChange
  } = useForm(initialValues, true, validate)

  useEffect(() => {
    if (values.provider !== '') {
      resetField('course', '')
      filterCourseByProvider(values.provider.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.provider, filterCourseByProvider])


  const pullDate = (val) => {
    setDateRange({
      start: val[0] || null,
      end: val[1] || null
    })
  }

  const [customError, setCustomError] = useState({
    dateError: ''
  })
  const handleSubmit = () => {
    if (validate() && dateRange.start !== '') {
      const startDate = new Date(dateRange?.start)
      const endDate = new Date(dateRange?.end).setHours(23, 59, 59, 999)
      if (values.status === '0') {
        const payload = {
          name: values.nameCoupon,
          code: values.codeUniq,
          provider_id: values.provider.id,
          amount: parseInt(values.valueCoupon),
          type: parseInt(values.status),
          status: 0,
          start_date: format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          end_date: format(endDate, 'yyyy-MM-dd HH:mm:ss')
        }
        postCoupon(payload)
      } else {
        const payload = {
          name: values.nameCoupon,
          code: values.codeUniq,
          provider_id: values.provider.id,
          amount: parseInt(values.valueCoupon),
          type: parseInt(values.status),
          status: 0,
          start_date: format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          end_date: format(endDate, 'yyyy-MM-dd HH:mm:ss'),
          course_id: values.course
        }
        postCoupon(payload)
      }
    } else {
      if (!dateRange.start) {
        setCustomError({
          dateError: 'Periode Kupon tidak boleh kosong'
        })
      } else {
        setCustomError({
          dateError: ''
        })
      }
    }
  }

  return (
    <>
      <h3>Tambah Kupon</h3>
      <CouponCreateFormComponent
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
        command={command}
        pullData={pullDate}
        customError={customError}
        setCustomError={setCustomError}
      />
      <CouponCreateToolbarComponent
        handleSubmit={handleSubmit}
        loadingCoupon={coupon}
      />
    </>
  )
}

CouponCreateComponent.propTypes = {
  coupon: PropTypes.object,
  command: PropTypes.object,
  postCoupon: PropTypes.func,
  filterCourseByProvider: PropTypes.func
}

export default CouponCreateComponent