import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Input, Autocomplete, Button, ButtonUpload, Icon, Chip } from '@/components/shared'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add'
import { EYE_OPEN_ICON, EYE_CLOSE_ICON, TRASH_WHITE_ICON } from '@/utils/iconConstant'
import { primaryButtonStyle } from '@/utils/theme'

const useStyles = makeStyles(theme => ({
  label: {
    marginBottom: '0'
  },
  icon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '42px',
    right: '10px'
  },
  chipParent: {
    height: '200px',
    overflow: 'scroll',
    backgroundColor: '#FFF',
    borderRadius: '6px',
    padding: '12px 12px',
    border: '1px solid #BABABA',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '20px 0',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'stretch'
    }
  },
  iconButton: {
    backgroundColor: '#D32F2F',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
}))

function UserCreateFormComponent({
  values,
  errors,
  command,
  selected,
  unique,
  handleCategory = () => { },
  handleDeleteCategory = () => { },
  handleInputChange = () => { },
  setSelected = () => { }
}) {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(showPassword => !showPassword)
  }
  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
      >
        <p style={{
          marginBottom: '2px'
        }}>Foto Profil</p>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <ButtonUpload
            name='photo'
            value={values.photo}
            onChange={handleInputChange}
            text='Choose File'
            sx={{
              ...primaryButtonStyle
            }}
          />
          <p style={{ paddingLeft: '20px' }}>{`${values.photo.name ?? 'No File Choosen'}`}</p>
        </div>
        <div style={{
          fontSize: '14px',
          color: '#444444'
        }}>
          <p>Format File: .png, .jpg</p>
          <p style={{ marginTop: '-15px' }}>Maksimum Size: 2 MB</p>
          <p style={{ marginTop: '-15px' }}>Dimensi: 240 px x 240 px</p>
        </div>
        {
          errors?.photo && (
            <p style={{
              fontSize: '14px',
              color: '#D32F2F',
              fontWeight: '400'
            }}>{errors?.photo}</p>
          )
        }
      </Grid>
      <Grid
        item
      >
        <Input
          placeholder='Masukan NIP'
          label='NIP'
          classesLabel={classes.label}
          value={values.nip}
          name='nip'
          onChange={handleInputChange}
          error={errors.nip}
          fullWidth
        />
      </Grid>
      <Grid
        item
      >
        <Input
          placeholder='Masukan Nama'
          label='Nama'
          classesLabel={classes.label}
          value={values.name}
          name='name'
          onChange={handleInputChange}
          fullWidth
          error={errors?.name}
        />
      </Grid>
      <Grid
        item
      >
        <Grid
          container
          spacing={3}
          direction='row'
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Jabatan'
              placeholder='Pilih Jabatan'
              options={command?.userPosition}
              name='position'
              value={values.position}
              error={errors.position}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Unit Kerja/Satuan Organisasi'
              placeholder='Pilih Unit Kerja/Satuan Organisasi'
              options={command?.userUnit}
              name='unit'
              value={values.unit}
              error={errors.unit}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '-10px'
        }}
      >
        <Grid
          container
          spacing={3}
          direction='row'
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Pangkat/Golongan'
              placeholder='Pilih Pangkat/Golongan'
              options={command?.userLevel}
              name='level'
              value={values.level}
              error={errors.level}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Peran Pengguna'
              placeholder='Pilih Peran Pengguna'
              options={command?.roles}
              name='roles'
              value={values.roles}
              onChange={handleInputChange}
              error={errors.roles}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '10px'
        }}
      >
        <Grid
          container
          direction='row'
          spacing={2}
          alignItems='baseline'
          justifyContent='space-between'
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <Input
              label='Email'
              placeholder='Masukan Email'
              classesLabel={classes.label}
              name='email'
              value={values.email}
              onChange={handleInputChange}
              error={errors?.email}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <div style={{
              position: 'relative'
            }}>
              <Input
                label='Password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={values.password}
                onChange={handleInputChange}
                placeholder='Masukan Password'
                error={errors?.password}
                fullWidth
              />
              <Icon
                path={showPassword ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
                maxWidth={20}
                onClick={togglePassword}
                classes={classes.icon}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '10px'
        }}
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xl: 'row',
              lg: 'row',
              md: 'row',
              sm: 'column',
              xs: 'column'
            }
          }}
        >
          <Box
            sx={{
              width: {
                xl: '90%',
                lg: '90%',
                md: '100%',
                sm: '100%',
                xs: '100%'
              }
            }}
          >
            <Autocomplete
              label='Kategori'
              placeholder='Pilih Kategori'
              options={command?.categoryTopic}
              name='category'
              value={values.category}
              error={errors.category}
              onChange={handleInputChange}
            />
          </Box>
          <Box
            sx={{
              width: {
                xl: '10%',
                lg: '10%',
                md: '100%',
                sm: '100%',
                xs: '100%'
              },
              marginTop: errors.category ? '15px' : '44px'
            }}
          >
            <Button
              text='Tambah'
              startIcon={<AddIcon />}
              color='warning'
              sx={{
                width: '90px',
                padding: '10px 10px',
                textTransform: 'none',
                marginLeft: {
                  xl: '20px',
                  lg: '20px',
                  md: '0',
                  sm: '0',
                  xs: '0'
                },
                ...primaryButtonStyle
              }}
              onClick={() => handleCategory(values.category)}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
      >
        {
          unique.length > 0 && (
            unique.map((val, index) => (
              <Box key={index}
                sx={{
                  display: 'flex',
                  alignItems: {
                    xl: 'center',
                    lg: 'center',
                    md: 'initial',
                    sm: 'initial',
                    xs: 'initial'
                  },
                  justifyContent: 'space-between',
                  flexDirection: {
                    xl: 'row',
                    lg: 'row',
                    md: 'column',
                    sm: 'column',
                    xs: 'column'
                  }
                }}
              >
                <Box
                  sx={{
                    width: '95%'
                  }}
                >
                  <Chip
                    label={val.program}
                    classParent={classes.chipParent}
                    items={val.topics}
                    color='warning'
                    key={index}
                    sx={{
                      margin: '0 8px',
                      padding: '10px 12px',
                      height: '35px'
                    }}
                    setSelected={setSelected}
                    selected={selected}
                  />
                  {
                    selected.length === 0 && (
                      <p
                        style={{
                          fontSize: '14px',
                          color: '#D32F2F',
                          fontWeight: '400'
                        }}
                      >Pilih minimal 1 topik</p>
                    )
                  }
                </Box>
                <Box
                  sx={{
                    marginTop: '30px'
                  }}
                >
                  <Icon
                    path={TRASH_WHITE_ICON}
                    maxWidth={38}
                    classes={classes.iconButton}
                    onClick={() => handleDeleteCategory(val.id)}
                  />
                </Box>
              </Box>
            ))
          )
        }

      </Grid>
      <Grid
        item
        sx={{
          marginTop: '20px'
        }}
      >
        <Autocomplete
          label='Level'
          placeholder='Pilih Level'
          options={[
            { id: 1, text: '0', value: 0 },
            { id: 2, text: '1', value: 1 },
            { id: 3, text: '2', value: 2 },
            { id: 4, text: '3', value: 3 },
            { id: 5, text: '4', value: 4 },
            { id: 6, text: '5', value: 5 }
          ]}
          name='progress'
          value={values.progress}
          error={errors.progress}
          onChange={handleInputChange}
        />
      </Grid>
    </Grid >
  )
}

UserCreateFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  command: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleCategory: PropTypes.func,
  handleDeleteCategory: PropTypes.func,
  selected: PropTypes.any,
  setSelected: PropTypes.func,
  unique: PropTypes.array
}

export default UserCreateFormComponent