import React from 'react'
import { Box, Grid } from '@mui/material'
import { Input, Checkbox } from '@/components/shared'
import PropTypes from 'prop-types'

function UserRoleUpdateFormComponent({
  values,
  errors,
  cMenu,
  checkedMenu,
  onChange = () => { },
  handleMenuChecked = () => { }
}) {

  //* Transform 
  function transform(array) {
    return Object.values(
      array.reduce((obj, { menu_id, menu_access, menu_name }) => {
        if (obj[menu_id]) {
          obj[menu_id].menu_access.push(menu_access)
        } else {
          obj[menu_id] = { menu_id, menu_name, menu_access: [menu_access] }
        }
        return obj
      }, {})
    )
  }

  const convert = transform(checkedMenu)
  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
      >
        <Input
          fullWidth
          name='name'
          label='Nama Peran'
          placeholder='Masukan Nama Peran'
          value={values.name}
          error={errors.name}
          onChange={onChange}
        />
      </Grid>
      <Grid
        item
      >
        <p style={{
          fontWeight: '500',
          fontSize: '16px',
          color: '#2F2F2F'
        }}>Akses Admin Panel</p>
        <Box
          component='div'
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: {
              xl: 'row',
              lg: 'row',
              md: 'column',
              sm: 'column',
              xs: 'column'
            },
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}
        >
          {
            cMenu?.length > 0 && (
              cMenu?.slice(0, 11).map((val, index) => {
                return (
                  <Box
                    key={index}
                    item
                    sx={{
                      width: {
                        xl: '49%',
                        lg: '49%',
                        // xl: '520px',
                        // lg: '520px',
                        md: '100%',
                        sm: '100%',
                        xs: '100%'
                      },
                      height: '110px',
                      borderRadius: '6px',
                      padding: '12px',
                      border: '1px solid #BABABA',
                      marginBottom: '20px'
                    }}
                  >
                    <p style={{
                      marginTop: '0'
                    }}>{val.text ?? '-'}</p>
                    {
                      //* Iterate the acces
                      val?.access.map((c, i) => {
                        let checked = { status: false }
                        c.menu.forEach((m) => {
                          if (convert.find((v2) => v2.menu_id === c.menu_id && v2.menu_access.includes(m))) {
                            checked = { status: true }
                          }
                        })
                        return (
                          <Checkbox
                            key={i}
                            label={c.text}
                            name={c.name}
                            color='warning'
                            value={checked.status}
                            onChange={(e) => { handleMenuChecked(e, val) }}
                          />
                        )
                      })
                    }
                  </Box>
                )
              }
              )
            )
          }
        </Box>
      </Grid>
    </Grid>
  )
}

UserRoleUpdateFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  cMenu: PropTypes.array,
  checkedMenu: PropTypes.any,
  onChange: PropTypes.func,
  handleMenuChecked: PropTypes.func
}

export default UserRoleUpdateFormComponent