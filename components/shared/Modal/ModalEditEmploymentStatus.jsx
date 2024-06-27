/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Autocomplete } from '..'
import { Box, Typography } from '@mui/material'
import { SUCCESS_ICON } from '@/utils/iconConstant'
import { employeeStatusOptions } from 'libs/types/options'
import DatePickerDay from '../form/DatePickerDay'

const style = {
  containerModal: {
    padding: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'relative'
  },
  wrapperButton: {
    width: '100%',
    display: 'flex',
    gap: '14px',
    marginTop: '20px'
  }
}

const ModalEditEmploymentStatus = ({
  open,
  data,
  handleCancel = () => { },
  handleSave = () => { }
}) => {
  const [employeeStatus, setEmployeeStatus] = useState('')
  const [employeeStatusError, setEmployeeStatusError] = useState('')
  const [dateError, setDateError] = useState('')
  const [date, setDate] = useState('')

  const isActive = useMemo(() => {
    const active = ['Aktif', 'Aktif PS', 'Hukdis']

    return active.includes(employeeStatus)
  }, [employeeStatus])

  const updateEmployeeStatus = () => {
    if (!employeeStatus) {
      setEmployeeStatusError('Status Pegawai tidak boleh kosong')
      return
    }

    if (!isActive && !date) {
      setDateError('Tanggal harus diisi')
      return
    }
    setDateError('')
    const param = {
      // Required params
      name: data?.name,
      employee_id_number: data?.employee_id_number,
      place_of_birth: data?.place_of_birth,
      date_of_birth: data?.date_of_birth,
      religion: data?.religion,
      gender: data?.gender,
      marital_status: data?.marital_status,
      grade_id: data?.grade_id,
      grade_effective_date: data?.grade_effective_date,
      position_id: data?.position_id,
      institution_id: data?.institution_id,
      organization_id: data?.organization_id,
      work_unit_id: data?.work_unit_id,
      employment_status: data?.employment_status,
      residence_id: data?.residence_id,
      emergency_contact: data?.emergency_contact,
      type: data?.type,
      // Data that being updated
      employment_type_id: employeeStatusOptions.indexOf(employeeStatus) + 1,
      quit_date: date
    }
    console.log('PARAM: ', param)
    // API BARU
    handleSave(param)
    handleCancel()
  }

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setEmployeeStatus(data?.employmentStatus)
      }, 1000)
    }
  }, [data])

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      padding='2rem'
      width={'600px'}
      otherStyle={style?.containerModal}
    >
      <img
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '128px'
        }}
        src={SUCCESS_ICON}
        alt='img success'
      />
      <Typography
        sx={{
          width: '70%',
          margin: '16px 0 12px 0',
          fontSize: '20px',
          fontWeight: 600,
          textAlign: 'center',
          textTransform: 'uppercase'
        }}
      >
        Edit Status Pegawai
      </Typography>

      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 400
        }}
      >
        Apakah anda yakin akan mengedit status pegawai?
      </Typography>

      <Box
        sx={{
          width: '100%',
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
      >
        <Autocomplete
          label='Status Pegawai'
          options={employeeStatusOptions}
          name='employment_status'
          placeholder='Pilih Status Pegawai'
          value={employeeStatus}
          onChange={(val) => {
            if (val) setEmployeeStatusError('')

            setEmployeeStatus(val)
          }}
          error={employeeStatusError}
        />
      </Box>

      {!isActive && employeeStatus && (
        <Box
          sx={{
            width: '100%',
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }}
        >
          <DatePickerDay
            fullWidth
            value={date}
            name='date'
            label='Tanggal Terakhir Bekerja'
            placeholder='dd-mm-yyyy'
            error={dateError}
            onChange={(val) => {
              setDateError('')
              setDate(val)
            }}
          />
        </Box>
      )}

      <Box sx={style?.wrapperButton}>
        <Button
          text='Batal'
          variant={'outlined'}
          style={{ width: '100%' }}
          onClick={handleCancel}
        />
        <Button
          text='Simpan'
          style={{ width: '100%' }}
          onClick={updateEmployeeStatus}
        />
      </Box>
    </Modal>
  )
}

ModalEditEmploymentStatus.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.object,
  handleCancel: PropTypes.func,
  handleSave: PropTypes.func
}

export default ModalEditEmploymentStatus
