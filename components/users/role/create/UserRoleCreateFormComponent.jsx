import React from 'react'
import { Box, Grid } from '@mui/material'
import { Input, Checkbox } from '@/components/shared'
import PropTypes from 'prop-types'

function UserRoleCreateFormComponent({
  values,
  errors,
  cMenu,
  onChange = () => { },
  handleMenuChecked = () => { }
}) {
  return (
    <>
      <Grid
        container
        direction='column'
      >
        <Grid
          item
        >
          <Input
            fullWidth
            label='Nama Peran'
            placeholder='Masukan Nama Peran'
            name='name'
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
        </Grid>
      </Grid>
      {/* Start Checkbox */}
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
            cMenu?.slice(0, 11).map((val, index) => (
              <Box
                item
                key={index}
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
                }}>{val?.text ?? '-'}</p>
                {
                  val?.access?.map((child, i) => (
                    // child.id === 1 ? (
                    <Checkbox
                      key={i}
                      name={child.name}
                      label={child.text}
                      onChange={(e) => { handleMenuChecked(e, val, child) }}
                      color='warning'
                    />
                  ))
                }
              </Box>
            ))
          )
        }
      </Box>
    </>
  )
}

UserRoleCreateFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  cMenu: PropTypes.array,
  onChange: PropTypes.func,
  handleMenuChecked: PropTypes.func
}

export default UserRoleCreateFormComponent