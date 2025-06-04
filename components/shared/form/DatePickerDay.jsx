/* eslint-disable indent */
import React, { useState, useMemo } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import PropTypes from 'prop-types'
import { Input, Icon, Modal } from '@/components/shared'
import { CALENDAR_ICON } from '@/utils/iconConstant'
import { formatDate } from '@/utils/index'
import { Box, IconButton, Typography } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import moment from 'moment'

function DatePickerDay({
  label,
  name,
  placeholder,
  value,
  error,
  disabled = false,
  fullWidth = false,
  mode = 'single',
  onChange = () => {},
  ...other
}) {
  const [open, setOpen] = useState(false)

  const handleFormatDate = (value, format) => {
    return moment(value).format(format)
  }

  const valueDate = useMemo(() => {
    return value || null
  }, [value])

  const defaultMonth = useMemo(() => {
    if (valueDate) {
      const date = mode === 'single' ? valueDate : valueDate?.from

      return new Date(
        handleFormatDate(date, 'YYYY'),
        handleFormatDate(date, 'M') - 1
      )
    }

    return new Date()
  }, [valueDate, mode])

  const handleSelectedValue = (val) => {
    if (val?.from && val?.to) {
      const fromDate = new Date(val?.from)
      const toDate = new Date(val?.to)

      let newVal = {
        from: val?.from,
        to: val?.to
      }

      if (fromDate > toDate) {
        let temp = val?.from
        newVal.from = val?.to
        newVal.to = temp
      }

      onChange(newVal)
    } else {
      onChange(val)
    }

    if ((mode == 'single' || (mode == 'range' && val?.from && val?.to)) && open)
      setOpen((open) => !open)
  }

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'unset' }}>
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
          disabled={disabled}
          placeholder={placeholder}
          readOnly
          name={name}
          value={
            valueDate
              ? mode == 'range'
                ? `${formatDate(valueDate?.from)} - ${formatDate(
                    valueDate?.to
                  )}`
                : formatDate(valueDate)
              : ''
          }
          onClick={() => setOpen((open) => !open)}
          error={error}
          {...other}
        />
        <Box
          sx={{
            width: 'fit-content',
            height: '50px',
            position: 'absolute',
            top: 0,
            right: 0
          }}
        >
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
            {valueDate && (
              <IconButton
                disabled={disabled}
                aria-label='clear'
                onClick={() => handleSelectedValue(null)}
              >
                <Cancel sx={{ fontSize: '20px' }} />
              </IconButton>
            )}
            <Icon
              path={CALENDAR_ICON}
              style={{ width: '20px', height: '20px', fontSize: '20px' }}
            />
          </Box>
        </Box>
      </Box>
      <Modal
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        width='fit-content'
        padding='1rem 1rem'
      >
        <DayPicker
          key={defaultMonth}
          defaultMonth={defaultMonth}
          captionLayout='dropdown'
          mode={mode}
          selected={valueDate}
          onDayClick={(day) => {
            if (mode == 'range' && valueDate?.from && !valueDate?.to) {
              handleSelectedValue({ from: valueDate?.from, to: day })
              return
            }

            if (
              mode == 'range' &&
              (!valueDate?.from || (valueDate?.from && valueDate?.to))
            ) {
              handleSelectedValue({ from: day, to: undefined })
              return
            }

            handleSelectedValue(day)
          }}
        />
      </Modal>
    </Box>
  )
}

DatePickerDay.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  mode: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
}

export default DatePickerDay
