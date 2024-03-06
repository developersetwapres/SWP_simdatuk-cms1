/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { Input, Autocomplete, Checkbox, ButtonUpload } from '@/components/shared'
import EditorForm from '@/components/shared/form/editor/EditorForm'
import PropTypes from 'prop-types'
import DateSinglePicker from '@/components/shared/date/DatePicker'

function CourseEditFormComponent({
  values,
  errors,
  command,
  editor,
  image,
  languages,
  dateDay,
  course,
  category,
  statusCourse,
  setDateDay = () => { },
  setEditor = () => { },
  handleInputChange = () => { },
  handleLanguages = () => { },
  filterCourseCategory = () => { },
  handleStatusCourse = () => { },
  customError,
  handleCategory = () => { }
}) {
  useEffect(() => {
    if (category !== '') {
      filterCourseCategory(category.id)
    }
  }, [filterCourseCategory, category])
  const [startDate, setStartDate] = useState(dateDay)
  const handleDate = (dates) => {
    setStartDate(dates)
    setDateDay(dates)
  }

  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
        sx={{
          marginBottom: '30px'
        }}
      >
        <p style={{
          marginBottom: '10px'
        }}>Image</p>
        <img
          src={image || '/images/default-image.png'}
          alt='image'
          style={{
            width: '100%',
            maxWidth: '360px'
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ButtonUpload
            text='Choose File'
            name='image'
            onChange={handleInputChange}
            value={values.image}
            error={errors.image}
          />
          <p style={{
            paddingLeft: '20px'
          }}>{values.image.name || 'No File Choosen'}</p>
        </Box>
        <div
          style={{
            color: '#444444',
            fontWeight: '400',
            fontSize: '14px'
          }}
        >
          <p style={{ marginBottom: '-10px' }}>Format File : .png, .jpg</p>
          <p style={{ marginBottom: '-10px' }}>Maksimum Size : 5 MB</p>
          <p style={{ marginBottom: '-10px' }}>Dimensi 360 px x 240 px</p>
        </div>
        {
          errors?.image && (
            <p style={{
              fontSize: '14px',
              color: '#D32F2F',
              fontWeight: '400'
            }}>{errors?.image}</p>
          )
        }
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '30px',
          marginBottom: '20px'
        }}
      >
        <Input
          label='Nama Course'
          placeholder='Masukan Nama Course'
          fullWidth
          name='course_name'
          value={values.course_name}
          error={errors.course_name}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '10px'
        }}
      >
        <Input
          label='Nama Pelatih'
          placeholder='Masukan Nama Pelatih'
          fullWidth
          name='coach_name'
          value={values.coach_name}
          error={errors.coach_name}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '10px'
        }}
      >
        <Autocomplete
          label='Penyelenggara'
          placeholder='Pilih Penyelenggara'
          options={command?.organizer}
          name='provider'
          value={values.provider}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '10px'
        }}
      >
        <Grid
          container
          direction='row'
          spacing={2}
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
              label='Kategori'
              placeholder='Pilih Kategori'
              options={command?.category}
              value={category}
              name='category'
              error={customError.category}
              onChange={(e) => { handleCategory(e) }}
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
              label='Topik'
              placeholder='Pilih Topik'
              options={course?.filterCourse.topic || []}
              value={values.topic}
              name='topic'
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
      >
        <Grid
          container
          direction='row'
          spacing={2}
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
              label='Level'
              placeholder='Pilih Level'
              options={command?.courseLevel}
              value={values.level}
              onChange={handleInputChange}
              name='level'
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
              marginTop: '16.5px'
            }}
          >
            <Input
              label='Durasi (JP)'
              placeholder='0'
              fullWidth
              value={values.duration}
              error={errors.duration}
              onChange={handleInputChange}
              name='duration'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
      >
        <Grid
          container
          direction='row'
          spacing={2}
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <p>Bahasa</p>
            <Box
              sx={{
                display: 'flex',
                flexWrap: {
                  xl: 'wrap',
                  lg: 'wrap',
                  md: 'wrap',
                  sm: 'wrap',
                  xs: 'wrap'
                }
              }}
            >
              {
                command?.languages.length > 0 && (
                  command?.languages.map((val, i) => {
                    const getChecked = languages?.find((v2) => v2.id === val.id) ? { status: true } : { status: false }
                    return (
                      <Checkbox
                        label={val.text}
                        onChange={(e) => { handleLanguages(e, val) }}
                        name='languages'
                        color='warning'
                        checked={getChecked.status}
                        key={i}
                        sx={{
                          color: customError?.language ? '#d32f2f' : ''
                        }}
                        otherStyle={{
                          width: '30%'
                        }}
                      />
                    )
                  })
                )
              }
            </Box>
            {
              customError?.language && (
                <p style={{
                  color: '#d32f2f',
                  fontSize: '14px',
                  margin: 0
                }}>{customError?.language}</p>
              )
            }
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
              label='Biaya'
              placeholder='Pilih Biaya'
              options={command?.prices}
              name='type_price'
              value={values.type_price}
              error={errors.type_price}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Grid>
      {
        values.type_price?.id === 2 && (
          <Grid
            item
            sx={{
              marginTop: '10px'
            }}
          >
            <Input
              label='Harga'
              fullWidth
              placeholder='0'
              name='price'
              onChange={handleInputChange}
              value={values.price}
              error={errors.price}
            />
          </Grid>
        )
      }
      {
        values.type_price?.id === 3 && (
          <Grid
            container
            direction='row'
            spacing={2}
            sx={{
              marginTop: '20px'
            }}
          >
            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              xs={12}
              sm={12}
            >
              <Input
                label='Harga'
                fullWidth
                placeholder='0'
                name='price'
                onChange={handleInputChange}
                value={values.price}
                error={errors.price}
              />
            </Grid>
            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              xs={12}
              sm={12}
            >
              <Input
                label='Kode Unik'
                fullWidth
                placeholder='Masukan Kode Unik'
                name='code'
                value={values.code}
                error={errors.code}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        )
      }
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
            sx={{
              marginTop: '10px'
            }}
          >
            <DateSinglePicker
              label='Jadwal Mulai'
              placeholder='dd-mm-yyyy'
              name='course'
              selected={startDate}
              value={startDate}
              withPortal
              onChange={handleDate}
              // error={customError.periodCoupon}
              dateFormat='dd-MM-yyyy'
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
            sx={{
              marginTop: '10px'
            }}
          >
            <Autocomplete
              options={[
                { id: 1, text: '1', value: 1 },
                { id: 2, text: '2', value: 2 },
                { id: 3, text: '3', value: 3 },
                { id: 4, text: '4', value: 4 },
                { id: 5, text: '5', value: 5 }
              ]}
              label='Rating'
              placeholder={values.rating.value === 0 ? '0' : 'Pilih Rating'}
              name='rating'
              value={values.rating}
              error={errors.rating}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '30px'
        }}
      >
        <EditorForm
          label='Deskripsi'
          placeholder='Masukan Deskripsi'
          value={editor}
          setValue={setEditor}
        />
        {
          customError?.editorError && (
            <p style={{ color: '#D32F2F', fontSize: '14px' }}>{customError?.editorError}</p>
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
          label='Link Course'
          fullWidth
          placeholder='Masukan Link Course'
          name='link'
          value={values.link}
          error={errors.link}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        item
      >
        <Checkbox
          label='Publikasi'
          text='Status'
          color='warning'
          name='status'
          onChange={handleStatusCourse}
          value={statusCourse}
        />
      </Grid>
    </Grid >
  )
}

CourseEditFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  command: PropTypes.object,
  image: PropTypes.string,
  course: PropTypes.object,
  category: PropTypes.object,
  languages: PropTypes.array,
  editor: PropTypes.any,
  dateDay: PropTypes.any,
  setDateDay: PropTypes.func,
  setEditor: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleLanguages: PropTypes.func,
  filterCourseCategory: PropTypes.func,
  handleStatusCourse: PropTypes.func,
  statusCourse: PropTypes.bool,
  customError: PropTypes.object,
  handleCategory: PropTypes.func
}

export default CourseEditFormComponent