import React, { useState, Fragment, useMemo } from 'react'
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
  error,
  onChange = () => {},
  ...other
}) {
  const [open, setOpen] = useState(false)

  const valueDate = useMemo(() => {
    return value || null
  }, [value])

  const handleSelectedValue = (val) => {
    onChange(val)
    if (open) setOpen((open) => !open)
  }

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
          value={valueDate ? formatDate(valueDate) : ''}
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
        width='350px'
        padding='1rem 1rem'
      >
        <DayPicker
          mode='single'
          defaultMonth={valueDate || new Date()}
          selected={valueDate || new Date()}
          // fromYear={valueDate || new Date()}
          // toYear={valueDate || new Date()}
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
  error: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
}

export default DatePickerDay
