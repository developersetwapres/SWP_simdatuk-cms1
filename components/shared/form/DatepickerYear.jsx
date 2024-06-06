/* eslint-disable indent */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import DatePicker from 'react-datepicker'

const DatepickerYear = ({
  value,
  label,
  name,
  error,
  placeholder,
  isClear = false,
  isQuarter = false,
  onChange = () => {}
}) => {
  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`
    return <span title={tooltipText}>{year}</span>
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
      <Box
        sx={{
          width: '100%',
          margin: 0,
          padding: 0,
          border: '1.2px solid',
          borderColor: error ? 'red' : '#394346',
          borderRadius: '6px',
          overflow: 'hidden',
          '& > div.react-datepicker-wrapper': {
            width: '100%'
          },
          '& input': {
            width: '100%',
            height: '100%',
            border: 'none',
            padding: '14px 12px',
            fontSize: '16px',
            '&:focus-visible': {
              outline: 'unset'
            }
          },
          '& .react-datepicker__close-icon::after': {
            background: '#394346'
          }
        }}
      >
        <DatePicker
          renderYearContent={renderYearContent}
          selected={value}
          name={name}
          dateFormat={isQuarter ? 'QQQ' : 'yyyy'}
          onChange={(date) => onChange(date)}
          placeholderText={placeholder}
          isClearable={isClear}
          {...(isQuarter
            ? {
                showQuarterYearPicker: true
              }
            : {
                showYearPicker: true
              })}
        />
      </Box>
      {error && (
        <Typography
          component='p'
          sx={{ marginTop: '4px', fontSize: '14px', color: '#d32f2f' }}
        >
          {error}
        </Typography>
      )}
    </Fragment>
  )
}

DatepickerYear.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  isClear: PropTypes.bool,
  isQuarter: PropTypes.bool,
  onChange: PropTypes.func
}

export default DatepickerYear
