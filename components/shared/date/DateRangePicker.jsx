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

CustomInput.propTypes = {
  props: PropTypes.object,
  ref: PropTypes.any
}


function DateRangePicker({
  label,
  placeholder,
  name,
  // onChange = () => { },
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
        customInput={<CustomInput ref={inputRef} />}
        name={name}
        // onChange={(e, v) => onChange(convertParams(name, v))}
        selectsRange
        {...otherProps}
      />
    </>
  )
}

DateRangePicker.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string
}

export default DateRangePicker
