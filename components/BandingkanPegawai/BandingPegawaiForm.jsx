import React, { useMemo } from 'react'
import { Box, Grid } from '@mui/material'
import { Button } from '../shared'
import PropTypes from 'prop-types'
import { Autocomplete, Input } from '../shared'
import { Formik } from 'formik'
import { employeeEducationLevelOptions, predicateOptions } from 'libs/types/options'
import { useRouter } from 'next/router'
import { useRef } from 'react'

const style = {
  rootStyle: {
    display: 'flex',
    flexDirection: 'column'
  },
  displayHide: {
    display: 'none'
  }
}

const InitValue = {
  education: null,
  echelon: null,
  grade: null,
  group: null,
  disciplinary: null,
  predicate: null,
  maxAge: '',
  credits: '',
  competences: ''
}

const BandingPegawaiForm = ({
  expand,
  echelons,
  groups,
  grades,
  disciplinaries,
  handleSubmit = () => { }
}) => {
  const router = useRouter()
  const formRef = useRef()

  const path = useMemo(() => {
    return {
      BANDINGKAN: router.asPath?.includes('/rekapitulasi/bandingkan-pegawai'),
      PROMOTION: router.asPath?.includes('/rekapitulasi/promosi-pegawai')
    }
  }, [router])

  const doFilter = (type, values) => {
    if (type == 'reset') {
      formRef.current.resetForm()
      handleSubmit(InitValue)
    } else {
      handleSubmit(values)
    }
  }

  return (
    <Formik innerRef={formRef} initialValues={InitValue} onSubmit={() => { }}>
      {({ values, setFieldValue = () => { } }) => (
        <Box sx={expand ? style.rootStyle : style.displayHide}>
          <Grid
            container
            item
            justifyContent='flex-start'
            spacing={2}
          >
            {path.PROMOTION && (
              <Grid
                item
                lg={4}
                md={6}
                sm={12}
              >
                <Autocomplete
                  label='Rumpun'
                  options={groups?.map(i => i?.name)}
                  name='group'
                  placeholder='Pilih Rumpun'
                  multiple={false}
                  value={values?.group}
                  onChange={(val) => {
                    setFieldValue('group', val, false)
                  }}
                  error={''}
                />
              </Grid>
            )}
            <Grid
              item
              lg={4}
              md={6}
              sm={12}
            >
              <Autocomplete
                label='Eselon'
                options={echelons?.map(i => i?.name)}
                name='echelon'
                placeholder='Pilih Eselon'
                multiple={false}
                value={values?.echelon}
                onChange={(val) => {
                  setFieldValue('echelon', val, false)
                }}
                error={''}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              sm={12}
            >
              <Autocomplete
                label='Golongan'
                options={grades?.map(i => i?.name)}
                name='grade'
                placeholder='Pilih Golongan'
                multiple={false}
                value={values?.grade}
                onChange={(val) => {
                  setFieldValue('grade', val, false)
                }}
                error={''}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              sm={12}
            >
              <Autocomplete
                label='Riwayat Pendidikan'
                options={employeeEducationLevelOptions}
                name='education'
                placeholder='Pilih Riwayat Pendidikan'
                multiple={false}
                value={values?.education}
                onChange={(val) => {
                  setFieldValue('education', val, false)
                }}
                error={''}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              sm={12}
            >
              <Input
                label='Umur Maksimal'
                placeholder='0'
                name='maxAge'
                value={values?.maxAge}
                type='number'
                inputProps={{ min: 0 }}
                onChange={(e) => {
                  const val = e?.target?.value
                  setFieldValue('maxAge', val, false)
                }}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              sm={12}
            >
              <Autocomplete
                label='Riwayat Hukuman Disiplin'
                options={disciplinaries?.map(i => i?.name)}
                name='disciplinary'
                placeholder='Pilih Riwayat Hukuman Disiplin'
                multiple={false}
                value={values?.disciplinary}
                onChange={(val) => {
                  setFieldValue('disciplinary', val, false)
                }}
                error={''}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              sm={12}
            >
              <Autocomplete
                label='Predikat Kinerja Pegawai'
                options={predicateOptions}
                name='predicate'
                placeholder='Pilih Predikat Kinerja Pegawai'
                multiple={false}
                value={values?.predicate}
                onChange={(val) => {
                  setFieldValue('predicate', val, false)
                }}
                error={''}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              sm={12}
            >
              <Input
                label='Angka Kredit'
                placeholder='0'
                name='credits'
                value={values?.credits}
                inputProps={{ min: 0 }}
                error={''}
                onChange={(e) => {
                  const val = e?.target?.value
                  setFieldValue('credits', val, false)
                }}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              sm={12}
            >
              <Input
                label='Uji Kompetensi'
                placeholder='0'
                name='competences'
                value={values?.competences}
                inputProps={{
                  min: 0
                }}
                error={''}
                onChange={(e) => {
                  const val = e?.target?.value
                  setFieldValue('competences', val, false)
                }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '5px',
              marginTop: '12px'
            }}
          >
            <Button
              text='Reset Filter'
              sx={{
                backgroundColor: '#d32f2f'
              }}
              onClick={() => doFilter('reset', {})}
            />
            <Button
              text='Selesai'
              onClick={() => doFilter('filter', values)}
            />
          </Box>
        </Box>
      )}
    </Formik>
  )
}

BandingPegawaiForm.propTypes = {
  expand: PropTypes.bool,
  echelons: PropTypes.array,
  grades: PropTypes.array,
  groups: PropTypes.array,
  disciplinaries: PropTypes.array,
  handleSubmit: PropTypes.func
}

export default BandingPegawaiForm
