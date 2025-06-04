/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material'
import { Input, Autocomplete, Button } from '@/components/shared'
import { Delete } from '@mui/icons-material'

const MasterDataPositionForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  formikRef,
  options,
  isPositionsLoading,
  onChangeHierarchies = () => {},
  onFetchHierarchy = () => {}
}) => {
  const POSITION = useMemo(() => {
    const val = options?.positionType
    return val.reduce((acc, val, index) => {
      const key = val.toUpperCase()
      acc[key] = val
      return acc
    }, {})
  }, [options])

  const isShow = useMemo(() => {
    return values?.show && values?.position !== POSITION?.OUTSOURCING
  }, [values])

  const handleData = (data, type, indexItem) => {
    if (type == 'add') {
      const newData = {
        name: null,
        quantity: ''
      }

      const updatedDate = [...data, newData]
      setFieldValue('echelons', updatedDate, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      setFieldValue('echelons', newData, false)
    }
  }

  useEffect(() => {
    const datas = values?.parent || []
    const hierarchiesNull = datas.filter((itm) => itm?.name == null)

    onChangeHierarchies(
      datas,
      values?.position !== POSITION?.OUTSOURCING ? [1, 2] : [3]
    )

    if (hierarchiesNull.length == 0) {
      const newValues = [...datas, { name: null }]
      setFieldValue(`parent`, newValues, false)
    }
  }, [values?.parent])

  return (
    <Grid container spacing={3} sx={{ paddingBottom: '6px' }}>
      {/* Position */}
      <Grid item xs={12}>
        <Typography
          sx={{ marginBottom: '10px', fontSize: '16px', fontWeight: 600 }}
        >
          Jabatan
        </Typography>
        <Grid container spacing={3}>
          {/* Entity */}
          <Grid item xs={6}>
            <Autocomplete
              options={options?.entity}
              label='Tipe Entitas *'
              placeholder='Pilih Tipe Entitas'
              name={`entity`}
              value={values?.entity}
              error={errors?.entity}
              onChange={(val) => {
                setFieldValue('entity', val, false)
                setTimeout(() => {
                  formikRef.current.validateField('entity')
                }, 1)
              }}
            />
          </Grid>
          {/* Name */}
          <Grid item xs={6}>
            <Input
              label='Nama Jabatan *'
              placeholder='Masukkan Jabatan'
              name='name'
              value={values?.name}
              error={errors?.name}
              onChange={(e) => {
                const val = e?.target?.value
                setFieldValue('name', val, false)
                setTimeout(() => {
                  formikRef.current.validateField('name')
                }, 1)
              }}
            />
          </Grid>
          {/* Position */}
          <Grid item xs={6}>
            <Autocomplete
              options={options?.positionType}
              label='Tipe Jabatan *'
              placeholder='Pilih Tipe Jabatan'
              name={`position`}
              value={values?.position}
              error={errors?.position}
              onChange={(val) => {
                setFieldValue('position', val, false)
                setFieldValue('show', val !== POSITION?.OUTSOURCING, false)
                onFetchHierarchy(val)

                if (val == POSITION?.OUTSOURCING) {
                  setFieldValue(
                    'echelons',
                    [{ name: null, quantity: '' }],
                    false
                  )
                }

                setTimeout(() => {
                  formikRef.current.validateField('position')
                }, 1)
              }}
            />
          </Grid>
          {/* Show on Peta Jabatan */}
          <Grid item xs={6} alignContent='flex-end'>
            <Typography
              sx={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}
            >
              Peta Jabatan
            </Typography>
            <FormControlLabel
              label={'Tampilkan'}
              control={
                <Checkbox
                  checked={values?.showOnPetaJabatan}
                  onClick={(e) =>
                    setFieldValue('showOnPetaJabatan', e.target.checked, false)
                  }
                />
              }
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Echelon */}
      {values?.position && (
        <Grid item xs={12}>
          {values?.position !== POSITION?.OUTSOURCING && (
            <Box sx={{ marginBottom: '10px' }}>
              <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
                Eselon
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values?.show}
                    onChange={(e) => {
                      const val = e?.target?.checked
                      const echelon = values?.echelons[0]

                      if (!val) {
                        setFieldValue(
                          'echelons',
                          [
                            {
                              name: null,
                              quantity: echelon?.quantity
                            }
                          ],
                          false
                        )
                      }

                      setFieldValue('show', val, false)
                    }}
                  />
                }
                label='Tampilkan Eselon'
              />
            </Box>
          )}
          <Grid container spacing={3}>
            {values?.echelons.map((itm, idx) => (
              <Fragment key={idx}>
                {/* Echelon */}
                {isShow && (
                  <Grid item xs={6}>
                    <Autocomplete
                      options={options?.echelons}
                      label='Eselon *'
                      placeholder='Pilih Eselon'
                      name={`echelons[${idx}].name`}
                      value={itm?.name}
                      error={errors?.echelons && errors?.echelons[idx]?.name}
                      onChange={(val) => {
                        setFieldValue(`echelons[${idx}].name`, val, false)
                        // setTimeout(() => {
                        //   formikRef.current.validateField(
                        //     `echelons[${idx}].name`
                        //   )
                        // }, 1)
                      }}
                    />
                  </Grid>
                )}
                {/* Quantity */}
                <Grid item xs={isShow ? 6 : 12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'start',
                      gap: '16px'
                    }}
                  >
                    <Input
                      type='number'
                      inputProps={{ min: 0 }}
                      label='Jumlah yang diperlukan *'
                      placeholder='Masukkan Jumlah yang diperlukan'
                      name={`echelons[${idx}].quantity`}
                      value={itm?.quantity}
                      error={
                        errors?.echelons && errors?.echelons[idx]?.quantity
                      }
                      onChange={(e) => {
                        const val = e?.target?.value
                        setFieldValue(`echelons[${idx}].quantity`, val, false)
                        // setTimeout(() => {
                        //   formikRef.current.validateField(
                        //     `echelons[${idx}].quantity`
                        //   )
                        // }, 1)
                      }}
                    />
                    {values?.echelons.length > 1 && (
                      <Button
                        icon={<Delete />}
                        color='danger'
                        sx={{
                          marginTop: '28px',
                          width: '50px',
                          height: '50px'
                        }}
                        onClick={() => {
                          const error = errors?.echelons

                          if (error) error.splice(idx, 1)

                          handleData(values?.echelons, 'delete', idx)
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </Fragment>
            ))}
            {/* Action */}
            {isShow && (
              <Grid item xs={12}>
                <Button
                  variant='outlined'
                  text='Tambah Eselon'
                  sx={{ textTransform: 'none' }}
                  onClick={() => handleData(values?.echelons, 'add', null)}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
      {/* Hierarchy */}
      <Grid item xs={12}>
        <Box sx={{ marginBottom: '10px' }}>
          <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
            Hierarki Jabatan
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {/* Parent */}
          {values?.parent &&
            values?.parent.map((itm, idx) => (
              <Grid item xs={12} key={idx}>
                <Autocomplete
                  loading={isPositionsLoading}
                  options={options?.positions[idx] || []}
                  label='Parent'
                  placeholder='Pilih Parent'
                  name={`parent[${idx}].name`}
                  value={itm?.name}
                  error={errors?.parent && errors?.parent[idx]?.name}
                  onChange={(val) => {
                    const data = values?.parent
                    const dataSlice = data.slice(0, idx)
                    const newData = [...dataSlice, { name: val || null }]

                    if (val) {
                      newData.push({ name: null })
                    }

                    setFieldValue(`parent`, newData, false)
                  }}
                />
              </Grid>
            ))}
          {/* Order */}
          <Grid item xs={12}>
            <Autocomplete
              options={options?.orders}
              label='Urutan *'
              placeholder='Pilih Urutan'
              name={`order`}
              value={values?.order}
              error={errors?.order}
              onChange={(val) => {
                setFieldValue('order', val, false)
                // setTimeout(() => {
                //   formikRef.current.validateField('order')
                // }, 1)
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

MasterDataPositionForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleField: PropTypes.func,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  formikRef: PropTypes.any,
  options: PropTypes.object,
  isPositionsLoading: PropTypes.bool,
  onChangeHierarchies: PropTypes.func,
  onFetchHierarchy: PropTypes.func
}

export default MasterDataPositionForm
