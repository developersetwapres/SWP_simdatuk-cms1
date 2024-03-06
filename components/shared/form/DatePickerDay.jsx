import React, { useState, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { Input, Icon, Modal } from '@/components/shared'
import { CALENDAR_ICON } from '@/utils/iconConstant'
import { dateTimeFormat } from '@/utils/index'

const css = `
  :root {
    --rdp-background-color: #FE9516
  }
 .my-selected:not([disabled]) { 
    font-weight: bold;
    color: #fff; 
    background-color: #2F2F2F;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: #FE9516;
    color: #000;
  }
`

function DatePickerDay({
  label,
  name,
  placeholder,
  dateDay,
  setDateDay = () => { }
}) {
  const [singleDay, setSingleDay] = useState(dateDay || null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setDateDay(singleDay)
  }, [setDateDay, singleDay])

  const footer = singleDay ? (
    <p>{format(singleDay, 'dd-MM-yyy')}.</p>
  ) : (
    <p>Please pick a day.</p>
  )

  return (
    <>
      <p style={{
        marginBottom: '0'
      }}>{label}</p>
      <div style={{
        position: 'relative'
      }}>
        <Input
          fullWidth
          placeholder={placeholder}
          readOnly
          name={name}
          value={singleDay === null || typeof singleDay === 'undefined' ? '' : dateTimeFormat(singleDay)}
          onClick={() => setOpen(open => !open)}
        />
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
      <Modal
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        width='350px'
        padding='1rem 1rem'
      >
        <style>{css}</style>
        <DayPicker
          mode='single'
          defaultMonth={singleDay}
          selected={singleDay}
          onSelect={setSingleDay}
          footer={footer}
        />
      </Modal>
    </>
  )
}

DatePickerDay.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  dateDay: PropTypes.any,
  setDateDay: PropTypes.func
}

export default DatePickerDay