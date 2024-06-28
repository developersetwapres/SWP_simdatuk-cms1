/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Autocomplete } from '..'
import { Box, Typography } from '@mui/material'
import { SUCCESS_ICON } from '@/utils/iconConstant'
import { employeeStatusOptions } from 'libs/types/options'
import DatePickerDay from '../form/DatePickerDay'
import moment from 'moment'

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
    const active = [
      'Aktif',
      'Aktif Perbantuan Setneg',
      'CLTN',
      'TBLN',
      'Hukdis'
    ]

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
      id: data?.id,
      employment_status: employeeStatusOptions.indexOf(employeeStatus) + 1
    }

    if (!isActive)
      param.quit_date = moment(date).format('YYYY-MM-DD')

    handleSave(param)
    handleModalClose()
  }

  const handleModalClose = () => {
    setEmployeeStatus('')
    setEmployeeStatusError('')
    setDate('')
    setDateError('')
    handleCancel()
  }

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setEmployeeStatus(data?.employmentStatus)
        setDate(new Date(data?.quit_date) || '')
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
          onClick={handleModalClose}
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
