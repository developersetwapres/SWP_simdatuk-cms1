/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Input } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import DatepickerYear from '@/components/shared/form/DatepickerYear'

const ExportDrfForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  formikRef,
  options
}) => {
  return (
    <Grid container direction='row' spacing={3}>
      {/* Employee Type */}
      <Grid item xs={6}>
        <Autocomplete
          options={options?.employeeType}
          multiple={true}
          placeholder='Pilih Pegawai'
          label='Pegawai'
          name='employeeType'
          value={values?.employeeType}
          error={errors?.employeeType}
          onChange={(val) => {
            setFieldValue('employeeType', val, false)
          }}
        />
      </Grid>
      {/* Deputy */}
      <Grid item xs={6}>
        <Autocomplete
          options={options?.deputy}
          multiple={true}
          placeholder='Pilih Deputi'
          label='Deputi'
          name='deputy'
          value={values?.deputy}
          error={errors?.deputy}
          onChange={(val) => {
            setFieldValue('deputy', val, false)
          }}
        />
      </Grid>
      {/* Echelon */}
      <Grid item xs={6}>
        <Autocomplete
          options={options?.echelon}
          multiple={true}
          placeholder='Pilih Eselon'
          label='Eselon'
          name='echelon'
          value={values?.echelon}
          error={errors?.echelon}
          onChange={(val) => {
            setFieldValue('echelon', val, false)
          }}
        />
      </Grid>
      {/* Grade */}
      <Grid item xs={6}>
        <Autocomplete
          options={options?.grade}
          multiple={true}
          placeholder='Pilih Golongan'
          label='Golongan'
          name='grade'
          value={values?.grade}
          error={errors?.grade}
          onChange={(val) => {
            setFieldValue('grade', val, false)
          }}
        />
      </Grid>
      {/* Position Desc */}
      <Grid item xs={6}>
        <Autocomplete
          options={options?.positionDesc}
          multiple={true}
          placeholder='Pilih Keterangan Jabatan'
          label='Keterangan Jabatan'
          name='positionDesc'
          value={values?.positionDesc}
          error={errors?.positionDesc}
          onChange={(val) => {
            setFieldValue('positionDesc', val, false)
          }}
        />
      </Grid>
      {/* Education History */}
      <Grid item xs={6}>
        <Autocomplete
          options={options?.educationHistory}
          multiple={true}
          placeholder='Pilih Riwayat Pendidikan'
          label='Riwayat Pendidikan'
          name='educationHistory'
          value={values?.educationHistory}
          error={errors?.educationHistory}
          onChange={(val) => {
            setFieldValue('educationHistory', val, false)
          }}
        />
      </Grid>
      {/* Gender */}
      <Grid item xs={6}>
        <Autocomplete
          options={options?.gender}
          multiple={true}
          placeholder='Pilih Jenis Kelamin'
          label='Jenis Kelamin'
          name='gender'
          value={values?.gender}
          error={errors?.gender}
          onChange={(val) => {
            setFieldValue('gender', val, false)
          }}
        />
      </Grid>
      {/* Min Age */}
      <Grid item xs={6}>
        <Input
          type='number'
          inputProps={{ min: 10 }}
          label='Umur Minimum'
          name='age.min'
          placeholder='0'
          value={values?.age?.min}
          error={errors?.age?.min}
          onChange={(e) => {
            const value = e?.target?.value

            setFieldValue(
              'age.min',
              value,
              false
            )
          }}
        />
      </Grid>
      {/* Max Age */}
      <Grid item xs={6}>
        <Input
          type='number'
          inputProps={{ min: '0' }}
          label='Umur Maksimum'
          name='age.max'
          placeholder='0'
          value={values?.age?.max}
          error={errors?.age?.max}
          onChange={(val) => {
            setFieldValue('age.max', val?.target?.value, false)
          }}
        />
      </Grid>
      {/* Marital Status */}
      <Grid item xs={6}>
        <Autocomplete
          options={options?.maritalStatus}
          multiple={true}
          placeholder='Pilih Status Perkawinan'
          label='Status Perkawinan'
          name='maritalStatus'
          value={values?.maritalStatus}
          error={errors?.maritalStatus}
          onChange={(val) => {
            setFieldValue('maritalStatus', val, false)
          }}
        />
      </Grid>
      {/* Retirement Age */}
      <Grid item xs={6}>
        <Autocomplete
          options={options?.retirementAge}
          multiple={true}
          placeholder='Pilih Batas Usia Pensiun'
          label='Batas Usia Pensiun'
          name='retirementAge'
          value={values?.retirementAge}
          error={errors?.retirementAge}
          onChange={(val) => {
            setFieldValue('retirementAge', val, false)
          }}
        />
      </Grid>
      {/* Retirement Year */}
      <Grid item xs={6}>
        <DatepickerYear
          isClear
          label='Pilih Tahun Usia Pensiun'
          placeholder='Pilih Tahun Usia Pensiun'
          name='retirementYear'
          value={values?.retirementYear}
          onChange={(val) => {
            setFieldValue(`retirementYear`, val, false)
          }}
        />
      </Grid>
      {/* Total Working Tine */}
      <Grid item xs={6}>
        <Autocomplete
          options={options?.totalWorkingTime}
          multiple={true}
          placeholder='Pilih Masa Kerja Keseluruhan'
          label='Masa Kerja Keseluruhan'
          name='totalWorkingTime'
          value={values?.totalWorkingTime}
          error={errors?.totalWorkingTime}
          onChange={(val) => {
            setFieldValue('totalWorkingTime', val, false)
          }}
        />
      </Grid>
      {/* Grade Working Time */}
      <Grid item xs={6}>
        <Autocomplete
          options={options?.gradeWorkingTime}
          multiple={true}
          placeholder='Pilih Masa Kerja Golongan'
          label='Masa Kerja Golongan'
          name='gradeWorkingTime'
          value={values?.gradeWorkingTime}
          error={errors?.gradeWorkingTime}
          onChange={(val) => {
            setFieldValue('gradeWorkingTime', val, false)
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          options={options?.employeeStatuses}
          name='employeeStatus'
          placeholder='Pilih Status Pegawai'
          multiple={true}
          label='Status Pegawai'
          value={values?.employeeStatus || []}
          onChange={(val) => {
            setFieldValue('employeeStatus', val || [], false)
          }}
        />
      </Grid>
    </Grid>
  )
}

ExportDrfForm.propTypes = {
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
  options: PropTypes.object
}

export default ExportDrfForm
