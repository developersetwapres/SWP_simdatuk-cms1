import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'

const PermissionRoleCheckbox = ({
  data,
  dataFormik,
  values,
  isChecked = true,
  handleField = () => {}
}) => {
  return (
    <Box
      sx={{
        height: '100%',
        padding: '12px',
        border: '1px solid #394346',
        borderRadius: '6px'
      }}
    >
      <Typography
        sx={{
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: 600
        }}
      >
        {data?.name}
      </Typography>
      <CheckboxItem
        data={data?.permitted_actions}
        values={values?.permitted_actions}
        isChecked={isChecked}
        handleField={(val) => {
          const datas = dataFormik
          const id = data?.id
          const checked = datas.some((itm) => itm?.id == id)
          const index = datas.findIndex((itm) => itm.id == id)

          if (!checked && val) {
            // SetValue Jika terdapat value permission & belum terdapat pada value formik
            handleField(
              `permissions[${datas.length}]`,
              { id, permitted_actions: val, value: val },
              false
            )
          } else if (checked && val) {
            // SetValue Jika terdapat value permission & terdapat index pada value formik
            handleField(`permissions[${index}].value`, val, false)
          } else {
            // Remove index pada value formik jika value permission tidak ada
            const newPermissions = datas.filter((_, idx) => idx !== index)
            handleField('permissions', newPermissions, false)
          }
        }}
      />
    </Box>
  )
}

const CheckboxItem = ({ data, values, isChecked, handleField = () => {} }) => {
  const [permissions, setPermissions] = useState('')

  const item = useMemo(() => {
    const newData = []

    if (data) {
      const check = (val) => newData?.some((itm) => itm?.title === val)

      data
        .toLowerCase()
        .split('')
        .forEach((item) => {
          if (/[cu]/.test(item) && !check('Tambah / Edit'))
            newData.push({ title: 'Tambah / Edit', value: 'cu' })

          if (item === 'r') newData.push({ title: 'View', value: 'r' })

          if (item === 'd') newData.push({ title: 'Hapus', value: 'd' })
        })
    }

    return newData
  }, [data])

  const handleGetChecked = (val) => {
    const valuesIncludes = []
    const newVal = val.split('')

    newVal.map((i) => {
      if (permissions.includes(i)) {
        valuesIncludes.push(true)
      } else {
        valuesIncludes.push(false)
      }
    })

    return !valuesIncludes.some((itm) => itm == false)
  }

  const handleChecked = (checked, val) => {
    let valuePermission = ''

    if (checked) {
      valuePermission = `${permissions}${val}`
    } else {
      val?.split('')?.map((v) => {
        const regex = new RegExp(`[${val}]`, 'g')
        valuePermission = permissions.replace(regex, '')
      })
    }

    setPermissions(valuePermission)
    handleField(valuePermission)
  }

  useEffect(() => {
    if (values) setPermissions(values)
  }, [values])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'flex-start'
      }}
    >
      {item &&
        item?.map((itm, idx) => {
          return (
            <FormControlLabel
              key={idx}
              label={
                <Typography sx={{ fontSize: '14px' }}>{itm?.title}</Typography>
              }
              disabled={!isChecked}
              control={<Checkbox checked={handleGetChecked(itm?.value)} />}
              sx={{ height: '34px' }}
              onChange={(e) => handleChecked(e?.target?.checked, itm?.value)}
            />
          )
        })}
    </Box>
  )
}

CheckboxItem.propTypes = {
  data: PropTypes.string,
  values: PropTypes.string,
  isChecked: PropTypes.bool,
  handleField: PropTypes.func
}

PermissionRoleCheckbox.propTypes = {
  data: PropTypes.object,
  dataFormik: PropTypes.object,
  values: PropTypes.object,
  isChecked: PropTypes.bool,
  handleField: PropTypes.func
}

export default PermissionRoleCheckbox
