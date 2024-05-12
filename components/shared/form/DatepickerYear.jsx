import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import DatePicker from 'react-datepicker'

const DatepickerYear = ({
  value,
  label,
  placeholder,
  isClear = false,
  handleValue = () => {}
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
          border: '1.2px solid #394346',
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
          showYearPicker
          dateFormat='yyyy'
          onChange={(date) => handleValue(date)}
          placeholderText={placeholder}
          isClearable={isClear}
        />
      </Box>
    </Fragment>
  )
}

DatepickerYear.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isClear: PropTypes.bool,
  handleValue: PropTypes.any
}

export default DatepickerYear
