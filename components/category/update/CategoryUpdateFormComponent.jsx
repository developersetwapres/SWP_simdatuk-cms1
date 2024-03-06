/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react'
import { Input, Button, ButtonUpload, Icon, Autocomplete } from '@/components/shared'
import { Box, Grid } from '@mui/material'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add'
import { primaryButtonStyle } from '@/utils/theme'
import { TRASH_WHITE_ICON } from '@/utils/iconConstant'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  iconButton: {
    backgroundColor: '#D32F2F',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
})

function CategoryUpdateFormComponent({
  category,
  values,
  errors,
  image,
  topic,
  // customError,
  handleInputChange = () => { },
  handleDeleteTopic = () => { },
  handleTopic = () => { }
}) {
  const classes = useStyles()
  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <p style={{
          marginBottom: '20px'
        }}>Image</p>

        <img
          src={image || '/images/default-image.png'}
          alt='image'
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '200px'
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ButtonUpload
            text='Choose File'
            name='photo'
            onChange={handleInputChange}
            value={values.photo}
            error={errors.photo}
          />
          <p style={{
            paddingLeft: '20px',
            // fontWeight: '300'
            color: '#444444'
          }}>{values.photo.name || 'No File Choosen'}</p>
        </div>
        <div style={{
          fontSize: '14px',
          color: '#444444'
        }}>
          <p>Format File: .png, .jpg</p>
          <p style={{ marginTop: '-15px' }}>Maksimum Size: 2 MB</p>
          <p style={{ marginTop: '-15px' }}>Dimensi: 400 px x 160 px</p>
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
        sx={{
          marginBottom: '10px'
        }}
      >
        <Input
          label='Kategori'
          placeholder='Masukan Kategori'
          name='category'
          value={values.category}
          error={errors.category}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '30px'
        }}
      >
        <Autocomplete
          label='Program PKASN'
          placeholder='Masukan Program PKASN'
          name='program'
          value={values.program}
          onChange={handleInputChange}
          error={errors.program}
          options={category?.pkasn}
        />
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
          <Box sx={{
            width: '90%'
          }}>
            <Input
              label='Topik'
              placeholder='Masukan Topik'
              fullWidth
              name='topic'
              value={values.topic}
              error={errors.topic}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{
            width: '10%',
            marginTop: errors.topic ? '0' : '28px'
          }}>
            <Button
              text='Tambah'
              startIcon={<AddIcon />}
              color='warning'
              sx={{
                width: '90px',
                padding: '12px 10px',
                textTransform: 'none',
                marginLeft: '20px',
                ...primaryButtonStyle
              }}
              onClick={() => handleTopic(values.topic)}
            />
          </Box>
        </Box>
        <Grid
          container
          spacing={2}
          direction='row'
          alignItems='end'
          justifyContent='space-between'
        >
          {
            topic?.length > 0 && (
              topic.map((value, index) => (
                <Fragment
                  key={index}
                >
                  <Grid
                    item
                    xl={11}
                    lg={11}
                    md={12}
                    sm={12}
                    xs={12}
                  >
                    <Input
                      fullWidth
                      value={value.name}
                    />
                  </Grid>
                  <Grid
                    item
                    xl={1}
                    lg={1}
                    md={12}
                    sm={12}
                    xs={12}
                  >
                    <Icon
                      path={TRASH_WHITE_ICON}
                      maxWidth={40}
                      classes={classes.iconButton}
                      onClick={() => { handleDeleteTopic(value.id) }}
                    />
                  </Grid>
                </Fragment>
              ))
            )
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

CategoryUpdateFormComponent.propTypes = {
  category: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  image: PropTypes.string,
  customError: PropTypes.object,
  topic: PropTypes.array,
  handleInputChange: PropTypes.func,
  handleDeleteTopic: PropTypes.func,
  handleTopic: PropTypes.func
}

export default CategoryUpdateFormComponent