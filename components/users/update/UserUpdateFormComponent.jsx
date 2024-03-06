/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
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
    top: '57px',
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
  },
  labelChips: {
    fontSize: '16px',
    // fontWeight: '500',
    lineHeight: '24px',
    marginBottom: '10px'
  },
  chipWrapper: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: '6px',
    padding: '12px 12px',
    border: '1px solid #BABABA',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'stretch'
    }
  }
}))

function UserUpdateFormComponent({
  user,
  values,
  errors,
  command,
  category,
  topic,
  handleCategory = () => { },
  handleDeleteCategory = () => { },
  handleInputChange = () => { },
  setTopic = () => { }
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
          marginBottom: '20px'
        }}>Foto Profil</p>
        <img
          src={user?.detail?.photo || '/images/default-image.png'}
          alt='preview'
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%'
          }}
        />
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
          value={user?.detail?.nip || ''}
          name='nip'
          fullWidth
          disabled
          sx={{
            backgroundColor: '#EDEDED'
          }}
        />
      </Grid>
      <Grid
        item
      >
        <Input
          placeholder='Masukan Nama'
          label='Nama'
          classesLabel={classes.label}
          value={user?.detail?.name || ''}
          name='name'
          fullWidth
          disabled
          sx={{
            backgroundColor: '#EDEDED'
          }}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginTop: {
            xl: '10px',
            lg: '10px',
            md: 0,
            sm: 0,
            xs: 0
          }
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
              label='Jabatan'
              placeholder='Pilih Jabatan'
              options={command?.userPosition}
              name='position'
              value={user?.detail?.position || []}
              disabled
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              marginTop: {
                xl: '0',
                lg: '0',
                md: '-20px',
                sm: '-20px',
                xs: '-20px'
              }
            }}
          >
            <Autocomplete
              label='Unit Kerja/Satuan Organisasi'
              placeholder='Pilih Unit Kerja/Satuan Organisasi'
              options={command?.userUnit}
              name='unit'
              value={user?.detail?.unit || []}
              disabled
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          marginTop: {
            xl: '-10px',
            lg: '-10px',
            md: '5px',
            sm: '5px',
            xs: '5px'
          }
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
              value={user?.detail?.level || []}
              disabled
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              marginTop: {
                xl: 0,
                lg: 0,
                md: '-10px',
                sm: '-10px',
                xs: '-10px'
              }
            }}
          >
            <Autocomplete
              label='Peran Pengguna'
              placeholder='Pilih Peran Pengguna'
              options={command?.roles}
              name='roles'
              value={values.roles}
              onChange={handleInputChange}
            // disabled
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
            sx={{
              position: 'relative'
            }}
          >
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
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
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
              marginTop: {
                xl: errors.category ? '15px' : '44px',
                lg: errors.category ? '15px' : '44px',
                md: errors?.category ? '15px' : '30px',
                sm: errors?.category ? '15px' : '30px',
                xs: errors?.category ? '15px' : '30px'
              }
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
                  xs: 0
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
          category?.length > 0 && (
            category?.map((val, index) => (
              command?.categoryTopic?.map((cTopic, cIndex) => (
                val.category_id === cTopic.id && (
                  <Box
                    key={index}
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
                        label={val.category_name}
                        classParent={classes.chipParent}
                        items={val?.category_topic}
                        color='warning'
                        sx={{
                          margin: '0 8px',
                          padding: '10px 12px',
                          height: '35px'
                        }}
                        setSelected={setTopic}
                        selected={topic}
                      />
                      {
                        topic?.map((v) => v.category_id).includes(val.category_id)
                          ? (
                            <p></p>
                          ) : (
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
                        onClick={() => handleDeleteCategory(val.category_id)}
                      />
                    </Box>
                  </Box>
                )
              ))
            ))
          )
        }
      </Grid>
      <Grid
        item
        sx={{
          marginTop: {
            xl: '10px',
            lg: '10px',
            md: '20px',
            sm: '20px',
            xs: '20px'
          }
        }}
      >
        <Autocomplete
          label='Level'
          placeholder='Pilih Level'
          options={[
            { id: 0, text: '0' },
            { id: 1, text: '1' },
            { id: 2, text: '2' },
            { id: 3, text: '3' },
            { id: 4, text: '4' },
            { id: 5, text: '5' }
          ]}
          name='level'
          value={values.level}
          error={errors.level}
          onChange={handleInputChange}
        />
      </Grid>
    </Grid >
  )
}

UserUpdateFormComponent.propTypes = {
  user: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  command: PropTypes.object,
  category: PropTypes.array,
  topic: PropTypes.array,
  handleInputChange: PropTypes.func,
  handleCategory: PropTypes.func,
  handleDeleteCategory: PropTypes.func,
  setTopic: PropTypes.func
}

export default UserUpdateFormComponent