import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { Button } from '../shared'
import PropTypes from 'prop-types'
import { Autocomplete, Input } from '../shared'
import { employeeEducationLevelOptions, predicateOptions } from 'libs/types/options'

const style = {
  rootStyle: {
    display: 'flex',
    flexDirection: 'column'
  },
  displayHide: {
    display: 'none'
  }
}

const BandingPegawaiForm = ({
  expand,
  echelons,
  grades,
  disciplinaries,
  handleSubmit = () => { }
}) => {
  const [education, setEducation] = useState('')
  const [echelon, setEchelon] = useState('')
  const [grade, setGrade] = useState('')
  const [disciplinary, setDisciplinary] = useState('')
  const [predicate, setPredicate] = useState('')
  const [maxAge, setMaxAge] = useState('')
  // const [workPeriod, setWorkPeriod] = useState('')
  // const [perGradeWorkPeriod, setPerGradeWorkPeriod] = useState('')
  const [credits, setCredits] = useState('')
  const [competences, setCompetences] = useState('')

  const resetFilter = () => {
    setEducation('')
    setEchelon('')
    setGrade('')
    setDisciplinary('')
    setPredicate('')
    setMaxAge('')
    // setWorkPeriod('')
    // setPerGradeWorkPeriod('')
    setCredits('')
    setCompetences('')
  }

  const doFilter = () => {
    handleSubmit({
      education,
      echelon,
      grade,
      disciplinary,
      predicate,
      maxAge,
      // workPeriod,
      // perGradeWorkPeriod,
      credits,
      competences
    })
  }

  return (
    <Box
      sx={expand ? style.rootStyle : style.displayHide}
    >
      <Grid
        container
        item
        justifyContent='flex-start'
        spacing={2}
      >
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
            value={echelon}
            onChange={(val) => setEchelon(val)}
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
            value={grade}
            onChange={(val) => setGrade(val)}
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
            value={education}
            onChange={(val) => setEducation(val)}
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
            name='age'
            value={maxAge}
            type='number'
            inputProps={{
              min: 0
            }}
            onChange={(e) => setMaxAge(e?.target?.value)}
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
            value={disciplinary}
            onChange={(val) => setDisciplinary(val)}
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
            name='work_predicate'
            placeholder='Pilih Predikat Kinerja Pegawai'
            multiple={false}
            value={predicate}
            onChange={(val) => setPredicate(val)}
            error={''}
          />
        </Grid>
        {/* <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <Input
            label='Masa Kerja Keseluruhan'
            placeholder='0'
            name='working_experience'
            value={workPeriod}
            error={''}
            onChange={(e) => setWorkPeriod(e?.target?.value)}
          />
        </Grid> */}
        {/* <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <Input
            label='Masa Kerja Golongan'
            placeholder='0'
            name='group_working_experience'
            value={perGradeWorkPeriod}
            error={''}
            onChange={(e) => setPerGradeWorkPeriod(e?.target?.value)}
          />
        </Grid> */}
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
            value={credits}
            error={''}
            onChange={(e) => setCredits(e?.target?.value)}
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
            name='competents'
            value={competences}
            error={''}
            onChange={(e) => setCompetences(e?.target?.value)}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        <Button
          text='Reset Filter'
          sx={{
            backgroundColor: '#d32f2f'
          }}
          onClick={resetFilter}
        />
        <Button
          text='Selesai'
          onClick={doFilter}
        />
      </Box>
    </Box>
  )
}

BandingPegawaiForm.propTypes = {
  expand: PropTypes.bool,
  echelons: PropTypes.array,
  grades: PropTypes.array,
  disciplinaries: PropTypes.array,
  handleSubmit: PropTypes.func
}

export default BandingPegawaiForm
