/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { Autocomplete, Checkbox, Input, Select } from '@/components/shared'
import EditorForm from '@/components/shared/form/editor/EditorForm'
import PropTypes from 'prop-types'
import DateSinglePicker from '@/components/shared/date/DatePicker'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  disabledDay: {
    backgroundColor: '#EDEDED'
  }
})
function CourseDetailFormComponent({
  course,
  command,
  filterCourse,
  filterCourseCategory = () => { }
}) {
  useEffect(() => {
    filterCourseCategory(course?.category.id)
  }, [filterCourseCategory, course])

  const classes = useStyles()
  const customRating = {
    id: course?.rating.value,
    name: course?.rating.value.toString()
  }
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
          fontWeight: '500',
          marginBottom: '10px'
        }}>Image</p>
        <img
          src={course?.photo || '/images/default-image.png'}
          alt='detail'
          style={{
            width: '360px',
            height: '240px',
            borderRadius: '6px',
            objectFit: 'cover'
          }}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Input
          fullWidth
          label='Nama Course'
          disabled
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
          value={course?.name}
        />
      </Grid>
      <Grid
        item
      >
        <Input
          fullWidth
          label='Nama Pelatih'
          disabled
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
          value={course?.coach}
        />
      </Grid>
      <Grid
        item
      >
        <Select
          label='Penyelenggara'
          disabled
          options={command?.organizer}
          value={course?.provider?.id}
        />
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
            md={12}
            sm={12}
            xs={12}
          >
            <Select
              disabled
              options={command?.category}
              label='Kategori'
              value={course?.category?.id}
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
              options={filterCourse || []}
              value={course?.topic}
              disabled
              label='Topik'
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
            md={12}
            sm={12}
            xs={12}
          >
            <Select
              disabled
              options={command?.courseLevel}
              label='Level'
              value={course?.level?.id}
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
              marginTop: '27px'
            }}
          >
            <Input
              fullWidth
              label='Durasi (JP)'
              disabled
              sx={{
                backgroundColor: '#EDEDED !important'
              }}
              value={course?.duration ? course?.duration : '0'}
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
            md={12}
            sm={12}
            xs={12}
          >
            <p>Bahasa</p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
              {
                command?.languages.length > 0 && (
                  command?.languages.map((val, i) => {
                    const getChecked = course?.language.find((v2) => v2.id === val.id) ? { status: true } : { status: false }
                    return (
                      <Checkbox
                        key={i}
                        label={val.text}
                        value={getChecked.status}
                        disabled
                        otherStyle={{
                          width: '30%'
                        }}
                      />
                    )
                  })
                )
              }
            </div>
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            <Select
              disabled
              options={command?.prices}
              label='Biaya'
              value={course?.price_name?.id}
            />
          </Grid>
        </Grid>
      </Grid>
      {
        course?.price_name?.id === 2 && (
          <Grid
            item
          >
            <Input
              label='Harga'
              fullWidth
              disabled
              sx={{
                backgroundColor: '#EDEDED !important'
              }}
              value={course?.price}
            />
          </Grid>
        )
      }
      {
        course?.price_name?.id === 3 && (
          <Grid
            item
            sx={{
              margin: '20px 0'
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
              >
                <Input
                  label='Harga'
                  fullWidth
                  disabled
                  sx={{
                    backgroundColor: '#EDEDED !important'
                  }}
                  value={course?.price || '0'}
                />
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={12}
              >
                <Input
                  label='Harga'
                  fullWidth
                  disabled
                  sx={{
                    backgroundColor: '#EDEDED !important'
                  }}
                  value={course?.freemium_code}
                />
              </Grid>
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
          direction='row'
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
              disabled={true}
              className={classes.disabledDay}
              selected={course?.date_course?.value === null ? null : new Date(course?.date_course?.value)}
              placeholder={course?.date_course?.value === null ? '-' : 'dd-mm-yyyy'}
              dateFormat='yyyy-MM-dd'
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
              disabled
              options={[
                { id: 1, text: '1', value: 1 },
                { id: 2, text: '2', value: 2 },
                { id: 3, text: '3', value: 3 },
                { id: 4, text: '4', value: 4 },
                { id: 5, text: '5', value: 5 }
              ]}
              label='Rating'
              placeholder={course?.rating.value === 0 ? '0' : 'Pilih Rating'}
              value={customRating || null}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <EditorForm
          disabled
          label='Deskripsi'
          value={course?.description}
        />
      </Grid>
      <Grid
        item
      >
        <Input
          label='Link Course'
          fullWidth
          disabled
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
          value={course?.url}
        />
      </Grid>
      <Grid
        item
      >
        <Checkbox
          label='Publikasi'
          text='Status'
          color='warning'
          checked={course?.status ? true : false}
          disabled
        />
      </Grid>
    </Grid>
  )
}

CourseDetailFormComponent.propTypes = {
  course: PropTypes.object,
  command: PropTypes.object,
  filterCourse: PropTypes.object,
  filterCourseCategory: PropTypes.func
}

export default CourseDetailFormComponent