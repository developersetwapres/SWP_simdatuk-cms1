import React, { useState, useEffect } from 'react'
import { addDays, format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import PropTypes from 'prop-types'
import { Input, Icon } from '@/components/shared'
import { CALENDAR_ICON } from '@/utils/iconConstant'
import { Modal } from '@/components/shared'
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

function DateRangePicker({
  label,
  name,
  placeholder,
  dateRange,
  setDateRange
}) {
  // const start_date = !dateRange?.start_date ? null : Date.parse(dateRange.start_date)
  // const end_date = !dateRange?.end_date ? null : Date.parse(dateRange.end_date)


  const [range, setRange] = useState({
    from: dateRange?.start_date || null,
    to: addDays(dateRange?.end_date || null, 0)
  })

  // useEffect(() => {
  //   if (typeof window === 'undefined') {
  //     function watchChange() {
  //       setDateRange([
  //         ...range
  //       ])
  //     }
  //     watchChange()
  //   }
  // }, [range, setDateRange])

  useEffect(() => {
    setDateRange(range)
  }, [setDateRange, range])

  const [open, setOpen] = useState(false)

  let footer = <p>Please pick the first day.</p>
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'dd-MM-yyy')}</p>
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'dd-MM-yyy')}–{format(range.to, 'dd-MM-yyy')}
        </p>
      )
    }
  }
  return (
    <>
      <p
        style={{
          marginBottom: '0'
        }}
      >{label}</p>
      <div
        style={{
          position: 'relative'
        }}
      >
        <Input
          fullWidth
          placeholder={placeholder}
          readOnly
          name={name}
          value={range?.from === null || typeof range?.to === 'undefined' ? '' : `${dateTimeFormat(range?.from)} - ${dateTimeFormat(range?.to)}`}
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
          mode='range'
          defaultMonth={range?.from}
          selected={range}
          footer={footer}
          onSelect={setRange}
          showOutsideDays
          fromYear={2015} toYear={2025} captionLayout='dropdown'
          modifiersClassNames={{
            selected: 'my-selected',
            today: 'my-today'
          }}
        />
      </Modal>
    </>
  )
}

DateRangePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  dateRange: PropTypes.any,
  setDateRange: PropTypes.func
}

export default DateRangePicker