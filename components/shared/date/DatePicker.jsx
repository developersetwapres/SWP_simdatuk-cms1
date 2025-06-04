import React, { useRef, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'
import Input from '../form/Input'
import Icon from '../Icon'
import { CALENDAR_ICON } from '@/utils/iconConstant'

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef((props, ref) => {
  return (
    <div style={{
      position: 'relative'
    }}>
      <Input fullWidth {...props} ref={ref} />
      <div
        style={{
          position: 'absolute',
          top: '17px',
          right: '10px'
        }}
      >
        <Icon
          path={CALENDAR_ICON}
          maxWidth={20}
        />
      </div>
    </div>
  )
})

function DateSinglePicker({
  label,
  placeholder,
  name,
  error = '',
  ...otherProps
}) {
  const inputRef = useRef(null)

  return (
    <>
      <p style={{
        marginBottom: '0'
      }}>{label}</p>
      <DatePicker
        placeholderText={placeholder}
        customInput={<CustomInput ref={inputRef} error={error} />}
        name={name}
        // onChange={(e, v) => onChange(convertParams(name, v))}
        {...otherProps}
      />
    </>
  )
}

DateSinglePicker.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.any
}

export default DateSinglePicker