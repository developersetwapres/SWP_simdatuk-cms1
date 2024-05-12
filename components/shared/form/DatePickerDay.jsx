import React, { useState, useEffect, Fragment } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import PropTypes from 'prop-types'
import { Input, Icon, Modal } from '@/components/shared'
import { CALENDAR_ICON } from '@/utils/iconConstant'
import { formatDate } from '@/utils/index'
import { Box, IconButton, Typography } from '@mui/material'
import { Cancel } from '@mui/icons-material'

function DatePickerDay({
  label,
  name,
  placeholder,
  value,
  handleValue = () => {}
}) {
  const [singleDay, setSingleDay] = useState(value || null)
  const [open, setOpen] = useState(false)

  const handleSelectedValue = (val) => {
    setSingleDay(val)
    if (open) setOpen((open) => !open)
  }

  useEffect(() => {
    handleValue(singleDay)
  }, [handleValue, singleDay])

  return (
    <Fragment>
      {label && (
        <Typography
          component='p'
          sx={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}
        >
          {label}
        </Typography>
      )}
      <Box sx={{ position: 'relative' }}>
        <Input
          fullWidth
          placeholder={placeholder}
          readOnly
          name={name}
          value={
            singleDay === null || typeof singleDay === 'undefined'
              ? ''
              : formatDate(singleDay)
          }
          onClick={() => setOpen((open) => !open)}
        />
        <Box
          sx={{
            width: '50px',
            height: '20px',
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          {singleDay && (
            <IconButton aria-label='clear' onClick={() => setSingleDay(null)}>
              <Cancel sx={{ fontSize: '20px' }} />
            </IconButton>
          )}
          <Icon
            path={CALENDAR_ICON}
            style={{ width: '20px', height: '20px', fontSize: '20px' }}
          />
        </Box>
      </Box>
      <Modal
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        width='350px'
        padding='1rem 1rem'
      >
        <DayPicker
          mode='single'
          defaultMonth={singleDay}
          selected={singleDay}
          onSelect={handleSelectedValue}
          style={{ margin: 0 }}
        />
      </Modal>
    </Fragment>
  )
}

DatePickerDay.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  handleValue: PropTypes.func
}

export default DatePickerDay
