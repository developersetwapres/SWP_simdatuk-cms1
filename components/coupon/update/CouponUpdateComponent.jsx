import React, { useState } from 'react'
import CouponUpdateFormComponent from './CouponUpdateFormComponent'
import CouponUpdateToolbarComponent from './CouponUpdateToolbarComponent'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/'
import { notAllowedCharAndWord } from '@/utils/regex'
import { format } from 'date-fns'

function CouponUpdateComponent({
  coupon,
  command,
  updateCoupon = () => { },
  filterCourseByProvider = () => { }
}) {
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    name: coupon?.detail?.name,
    code: coupon?.detail?.code,
    amount: coupon?.detail?.amount,
    // provider: coupon?.detail?.provider,
    type: coupon?.detail?.type.toString(),
    course: coupon?.detail?.course
  })

  const [provider, setProvider] = useState(coupon?.detail?.provider || null || '')

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('name' in fieldOfValues)
      temp.name = fieldOfValues.name ? '' : 'Nama tidak boleh kosong'

    if ('code' in fieldOfValues)
      temp.code = fieldOfValues.code ? '' : 'Code tidak boleh kosong'

    if ('amount' in fieldOfValues) {
      temp.amount = fieldOfValues.amount
        ? (
          notAllowedCharAndWord(fieldOfValues.amount)
            ? ''
            : 'Nilai Kupon harus berupa angka'
        )
        : 'Nilai kupon tidak boleh kosong'
    }


    // if ('provider' in fieldOfValues)
    //   temp.provider = fieldOfValues.provider ? '' : 'Penyelenggara tidak boleh kosong'

    if ('type' in fieldOfValues)
      temp.type = fieldOfValues.type ? '' : 'Tipe tidak boleh kosong'

    if ('course' in fieldOfValues)
      temp.course = fieldOfValues.type !== 1
        ? ''
        : (
          fieldOfValues.type === 1 && fieldOfValues.course ? '' : 'Course tidak boleh kosong'
        )

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
    // resetForm,
    resetField,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const [dateRange, setDateRange] = useState({
    start: new Date(coupon?.detail?.start_date),
    end: new Date(coupon?.detail?.end_date)
  })

  const pullData = (val) => {
    setDateRange({
      start: val[0] || null,
      end: val[1] || null
    })
  }

  const handleProvider = (e) => {
    setProvider(e.target.value)
    resetField('course', '')
  }

  const handleSubmit = () => {
    if (validate()) {
      const startDate = new Date(dateRange?.start)
      const endDate = new Date(dateRange?.end).setHours(23, 59, 59, 999)
      if (values.type === '0' || values.type === 0) {
        const payload = {
          id: coupon?.detail?.id,
          name: values.name,
          code: values.code,
          provider_id: provider.id,
          amount: parseInt(values.amount),
          type: parseInt(values.type),
          status: coupon?.detail?.status,
          start_date: format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          end_date: format(endDate, 'yyyy-MM-dd HH:mm:ss')
        }
        updateCoupon(payload)
      } else {
        const payload = {
          id: coupon?.detail?.id,
          name: values.name,
          code: values.code,
          provider_id: provider.id,
          amount: parseInt(values.amount),
          type: parseInt(values.type),
          status: coupon?.detail?.status,
          start_date: format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          end_date: format(endDate, 'yyyy-MM-dd HH:mm:ss'),
          course_id: values.course
        }
        updateCoupon(payload)
      }
    }
  }

  return (
    <>
      <h3>Edit Kupon</h3>
      <CouponUpdateFormComponent
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
        command={command}
        coupon={coupon}
        pullData={pullData}
        filterCourseByProvider={filterCourseByProvider}
        handleProvider={handleProvider}
        provider={provider}
      />
      <CouponUpdateToolbarComponent
        handleSubmit={handleSubmit}
        loadingCoupon={coupon}
      />
    </>
  )
}

CouponUpdateComponent.propTypes = {
  coupon: PropTypes.object,
  command: PropTypes.object,
  updateCoupon: PropTypes.func,
  filterCourseByProvider: PropTypes.func
}

export default CouponUpdateComponent