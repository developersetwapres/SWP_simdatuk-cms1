/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { Button, Autocomplete, Icon, Modal, Input, Checkbox } from '@/components/shared/index'
import { useRouter } from 'next/router'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { CLOSE_ICON } from '@/utils/iconConstant'
import { useDispatch } from 'react-redux'
import { PATCH_BULK_COURSE_REQUESTED } from '@/store/constants'

const useStyles = makeStyles({
  input: {
    cursor: 'text',
    borderRadius: '4px',
    border: '1px solid #000',
    width: '100%',
    padding: '10px 14px',
    fontSize: '16px',
    '&:focus': {
      outline: 'none',
      border: '1px solid #878787'
    }
  },
  modal: {
    display: 'block',
    margin: '0 auto'
  },
  iconClose: {
    cursor: 'pointer',
    position: 'absolute',
    top: '40px',
    right: '30px'
  },
  forms: {
    maxWidth: '100% !important'
  },
  languageForms: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
})

function CourseToolbarComponent({
  // eslint-disable-next-line no-unused-vars
  queries,
  selected,
  command,
  childSelected,
  values,
  errors,
  course,
  handleInputChange = () => { },
  onSearch = () => { },
  filterCourseCategory = () => { },
  onProvider = () => { },
  onLevel = () => { },
  onPrice = () => { },
  handleClear = () => { },
  onCategory = () => { },
  onTopic = () => { },
  onDuration = () => { },
  onStatus = () => { },
  onLanguage = () => { },
  resetForm = () => { }
}) {
  const router = useRouter()
  const classes = useStyles()
  const [childSelectedModal, setChildSelectedModal] = useState(false)
  const dispatch = useDispatch()
  const [modalFinish, setModalFinish] = useState(false)
  const noOptions = {
    organizer: { id: 0, text: 'Tidak ada Penyelenggara' },
    level: { id: 0, text: 'Tidak ada Level' },
    prices: { id: 0, text: 'Tidak ada Biaya' },
    category: { id: 0, text: 'Tidak ada Kategori' },
    duration: { id: 0, text: 'Tidak ada Durasi' },
    topic: { id: 0, text: 'Tidak ada Topik' },
    language: { id: 0, text: 'Tidak ada Bahasa' }

  }

  const merge = {
    organizer: [noOptions.organizer, ...command?.organizer || []],
    level: [noOptions.level, ...command?.courseLevel || []],
    prices: [noOptions.prices, ...command?.prices || []],
    category: [noOptions.category, ...command?.category || []],
    duration: [noOptions.duration, ...command?.courseDuration || []],
    topic: [noOptions.topic, ...course?.filterCourse?.topic || []],
    languages: [noOptions.language, ...command?.languages || []]
  }

  const [languages, setLanguages] = useState([])
  // set state 
  const [filterProvider, setFilterProvider] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterDuration, setFilterDuration] = useState('')
  const [filterTopic, setFilterTopic] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterLanguages, setFilterLanguages] = useState('')
  const [filterSearch, setFilterSearch] = useState('')

  // onChange 
  const handleOnFilterProvider = (e) => {
    setFilterProvider(e)
    onProvider(e)
  }

  const handleOnFilterLevel = (e) => {
    setFilterLevel(e)
    onLevel(e)
  }

  const handleOnFilterPrice = (e) => {
    setFilterPrice(e)
    onPrice(e)
  }

  const handleOnFilterCategory = (e) => {
    setFilterCategory(e)
    onCategory(e)
  }

  const handleOnDuration = (e) => {
    setFilterDuration(e)
    onDuration(e)
  }

  const handleOnTopic = (e) => {
    setFilterTopic(e)
    onTopic(e)
  }

  const handleOnStatus = (e) => {
    setFilterStatus(e)
    onStatus(e)
  }

  const handleOnLanguages = (e) => {
    setFilterLanguages(e)
    onLanguage(e)
  }

  const handleCheckLanguages = (e, val) => {
    if (e.target.value === true) {
      setLanguages(prevState => [...prevState, val])
    } else {
      setLanguages([])
    }
  }

  const handleClearState = () => {
    handleClear('')
    setFilterProvider('')
    setFilterLevel('')
    setFilterPrice('')
    setFilterCategory('')
    setFilterDuration('')
    setFilterTopic('')
    setFilterStatus('')
    setFilterLanguages('')
    setFilterSearch('')
  }



  const handleEdit = () => {
    if (selected.length > 0 || childSelected.length > 0) {
      setChildSelectedModal(true)
    }
  }


  useEffect(() => {
    if (values.category !== '') {
      filterCourseCategory(values.category.id)
    }
  }, [filterCourseCategory, values.category])

  useEffect(() => {
    if (filterCategory !== '') {
      filterCourseCategory(filterCategory.id)
    }
  }, [filterCategory, filterCourseCategory])

  // * Reset Modal Finish 
  useEffect(() => {
    setModalFinish(false)
    if (course?.loadingBulk === 'SUCCESS') {
      setModalFinish(true)
      setChildSelectedModal(false)
    } else if (course?.loadingBulk === 'FAILED') {
      setModalFinish(true)
      setChildSelectedModal(false)
    }
  }, [course?.loadingBulk])

  const handleBulk = () => {
    dispatch({
      type: PATCH_BULK_COURSE_REQUESTED, payload: {
        course_id: selected.length > 0 ? selected.map(val => val.id) : childSelected?.map(val => val.id),
        duration: values.duration,
        provider_id: null,
        category_id: values.category.id,
        status: values.status,
        topic_id: values.topic.id,
        level_id: values.level.id,
        language_id: languages?.map((val) => val.id),
        date_course: null,
        rating: null,
        price_id: values.price.id,
        price: values.priceCourse,
        freemium_code: values.code
      }
    })
  }

  const handleCloseModal = () => {
    setChildSelectedModal(false)
    resetForm()
  }

  return (
    <>
      <Grid
        container
        direction='column'
      >
        <Grid
          item
        >
          <Grid
            container
            direction='row'
          >
            <Grid
              item
              sx={{
                marginRight: '20px'
              }}
            >
              <Button
                text='Tambah Course'
                color='warning'
                sx={{
                  textTransform: 'none',
                  ...primaryButtonStyle
                }}
                onClick={() => router.push('/manajemen-course/course/create')}
              />
            </Grid>
            <Grid
              item
            >
              <Button
                text='Edit Course'
                color={childSelected.length > 0 || selected.length > 0 ? 'primary' : 'secondary'}
                sx={{
                  textTransform: 'none',
                  cursor: childSelected.length > 0 || selected.length > 0 ? 'pointer' : 'not-allowed',
                  '&:hover': {
                    boxShadow: 'none'
                  }
                }}
                onClick={handleEdit}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xl={12}
          lg={12}
          sx={{
            marginTop: '20px'
          }}
        >
          <p style={{
            marginBottom: '8px'
          }}>Pencarian</p>
          <input
            type='text'
            onChange={(e) => { setFilterSearch(e.target.value) }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearch(filterSearch)
              }
            }}
            name='search'
            className={classes.input}
            placeholder='Masukan Pencarian: Nama Course, Nama Pelatih'
            value={filterSearch}
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
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <Autocomplete
                options={merge.organizer}
                placeholder='Pilih Penyelenggara'
                label='Penyelenggara'
                name='penyelenggara'
                onChange={(e) => { handleOnFilterProvider(e.target.value) }}
                value={filterProvider}
              />
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <Autocomplete
                options={merge.category}
                placeholder='Pilih Kategori'
                label='Kategori'
                value={filterCategory}
                onChange={(e) => { handleOnFilterCategory(e.target.value) }}
              />
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <Autocomplete
                options={merge.topic}
                placeholder='Pilih Topik'
                disabled={filterCategory === '' ? true : false}
                label='Topik'
                onChange={(e) => { handleOnTopic(e.target.value) }}
                value={filterTopic}
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
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <Autocomplete
                options={merge.level}
                placeholder='Pilih Level'
                label='Level'
                name='level'
                onChange={(e) => { handleOnFilterLevel(e.target.value) }}
                value={filterLevel}
              />
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <Autocomplete
                options={merge.duration}
                placeholder='Pilih Durasi'
                label='Durasi'
                name='duration'
                value={filterDuration}
                onChange={(e) => { handleOnDuration(e.target.value) }}
              />
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <Autocomplete
                options={merge.languages}
                placeholder='Pilih Bahasa'
                label='Bahasa'
                name='basaha'
                value={filterLanguages}
                onChange={(e) => { handleOnLanguages(e.target.value) }}
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
                placeholder='Pilih Biaya'
                options={merge.prices}
                label='Biaya'
                name='price'
                onChange={(e) => { handleOnFilterPrice(e.target.value) }}
                value={filterPrice}
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
                label='Status'
                placeholder='Pilih Status'
                options={[
                  { id: 1, text: 'Terpublikasi', value: true },
                  { id: 2, text: 'Tidak Terpublikasi', value: false }
                ]}
                onChange={(e) => { handleOnStatus(e.target.value) }}
                value={filterStatus}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Open Modal */}
        <Modal
          open={childSelectedModal}
          onClose={() => setChildSelectedModal(true)}
          width='600px'
          padding='.5rem 5rem'
          otherStyle={{
            overflowY: 'scroll',
            maxHeight: '605px'
          }}
        >
          <div className={classes.modal}>
            <Icon
              path={CLOSE_ICON}
              maxWidth={20}
              onClick={handleCloseModal}
              classes={classes.iconClose}
            />
            <div style={{
              textAlign: 'center'
            }}>
              <h3>Edit Course</h3>
              <p>Edit {childSelected.length || selected.length} Course yang sudah dipilih</p>
            </div>
            <Grid
              container
              direction='column'
            >
              <Grid
                item
                className={classes.forms}
              >
                <Autocomplete
                  label='Kategori'
                  placeholder='Pilih Kategori'
                  options={command?.category}
                  name='category'
                  error={errors.category}
                  value={values.category}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid
                item
                className={classes.forms}
              >
                <Autocomplete
                  label='Topik'
                  placeholder='Pilih Topik'
                  options={course?.filterCourse.topic || []}
                  name='topic'
                  value={values.topic}
                  error={errors.topic}
                  onChange={handleInputChange}
                  disabled={typeof values?.category?.id === 'undefined' ? true : false}
                />
              </Grid>
              <Grid
                item
                className={classes.forms}
              >
                <Autocomplete
                  label='Level'
                  placeholder='Pilih Level'
                  options={command?.courseLevel}
                  name='level'
                  value={values.level}
                  error={errors.level}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid
                item
                className={classes.forms}
                sx={{
                  marginTop: '20px'
                }}
              >
                <Input
                  label='Durasi (JP)'
                  placeholder='0'
                  fullWidth
                  name='duration'
                  value={values.duration}
                  error={errors.duration}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid
                item
                className={classes.forms}
              >
                <Autocomplete
                  label='Biaya'
                  placeholder='Pilih Biaya'
                  options={command?.prices}
                  name='price'
                  value={values.price}
                  error={errors.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid
                item
                className={classes.forms}
              >
                <p>Bahasa</p>
                <div className={classes.languageForms}
                >
                  {
                    command?.languages.length > 0 && (
                      command?.languages.map((val, index) => (
                        <Checkbox
                          key={index}
                          label={val.text}
                          name='languages'
                          color='warning'
                          onChange={(e) => { handleCheckLanguages(e, val) }}
                          otherStyle={{
                            width: '30%'
                          }}
                        />
                      ))
                    )
                  }
                </div>
              </Grid>
              {
                values.price.id === 2 && (
                  <Grid
                    item
                    className={classes.forms}
                  >
                    <Input
                      fullWidth
                      label='Harga'
                      placeholder='0'
                      name='priceCourse'
                      onChange={handleInputChange}
                      error={errors.priceCourse}
                      value={values.priceCourse}
                    />
                  </Grid>
                )
              }
              {
                values.price.id === 3 && (
                  <>
                    <Grid
                      item
                      className={classes.forms}
                      sx={{
                        marginTop: '10px'
                      }}
                    >
                      <Input
                        fullWidth
                        label='Harga'
                        placeholder='0'
                        name='priceCourse'
                        onChange={handleInputChange}
                        error={errors.priceCourse}
                        value={values.priceCourse}
                      />
                      <Grid
                        item
                        sx={{
                          marginTop: '15px'
                        }}
                      >
                        <Input
                          fullWidth
                          label='Kode Unik'
                          placeholder='Masukan Kode Unik'
                          name='code'
                          onChange={handleInputChange}
                          error={errors.code}
                          value={values.code}
                        />
                      </Grid>
                    </Grid>
                  </>

                )
              }
              <Grid
                item
                className={classes.forms}
              >
                <Checkbox
                  color='warning'
                  label='Publikasi'
                  text='Status'
                  name='status'
                  value={values.status}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid
                item
                className={classes.forms}
                sx={{
                  margin: '20px 0'
                }}
              >
                <Button
                  color='warning'
                  text='Submit'
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    ...primaryButtonStyle
                  }}
                  onClick={handleBulk}
                />
              </Grid>
            </Grid>
          </div>
        </Modal>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
        sx={{
          marginTop: '20px'
        }}
      >
        <Grid
          item
        >
          <Button
            variant='outline'
            text='Reset Filter'
            sx={{
              textTransform: 'none',
              border: '2px solid #FE9516',
              color: '#FE9516',
              padding: '10px 10px',
              fontWeight: 'bold'
            }}
            onClick={handleClearState}
          />
        </Grid>
      </Grid>
      {/* Modal Finish Patch Bulk */}
      <Modal
        open={modalFinish}
        padding='3rem 0'
        onClose={() => {
          setModalFinish(false)
        }}
      >
        <img
          src={course?.icon}
          alt='success'
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '128px',
            display: 'block',
            margin: '0 auto'
          }}
        />
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>{course?.message}</h2>
        <Box sx={{
          display: 'block',
          width: '500px',
          margin: '0 auto'
        }}>
          <p style={{
            textAlign: 'center'
          }}>{course?.error}</p>
        </Box>
        <div style={{
          marginRight: 'auto',
          marginLeft: 'auto',
          width: '100%',
          textAlign: 'center'
        }}>
          <Button
            text='Tutup'
            type='button'
            color='warning'
            sx={{
              padding: '12px',
              width: '540px',
              textTransform: 'none',
              ...primaryButtonStyle
            }}
            onClick={() => {
              window.location.reload()
            }}
          />
        </div>
      </Modal>
      {/* End Modal Finish Patch Bulk */}
    </>
  )
}

CourseToolbarComponent.propTypes = {
  queries: PropTypes.object,
  selected: PropTypes.array,
  command: PropTypes.object,
  childSelected: PropTypes.array,
  course: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  handleInputChange: PropTypes.func,
  onSearch: PropTypes.func,
  filterCourseCategory: PropTypes.func,
  onProvider: PropTypes.func,
  onLevel: PropTypes.func,
  onPrice: PropTypes.func,
  handleClear: PropTypes.func,
  onCategory: PropTypes.func,
  onTopic: PropTypes.func,
  onDuration: PropTypes.func,
  onStatus: PropTypes.func,
  onLanguage: PropTypes.func,
  resetForm: PropTypes.func
}

export default CourseToolbarComponent