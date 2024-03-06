import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { Button, Autocomplete } from '@/components/shared'
import { useRouter } from 'next/router'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  input: {
    cursor: 'text',
    borderRadius: '6px',
    border: '1px solid #BABABA',
    width: '100%',
    padding: '10px 14px',
    fontSize: '16px',
    '&:focus': {
      outline: 'none',
      border: '1px solid #000'
    },
    '&::placeholder': {
      color: '#878787'
    }
  }
})
function UserBlacklistToolbarComponent({
  command,
  // eslint-disable-next-line no-unused-vars
  queries,
  onSearch = () => { },
  onPosition = () => { },
  onUnit = () => { },
  onLevel = () => { },
  onRole = () => { },
  onClearState = () => { }
}) {
  const router = useRouter()
  const classes = useStyles()
  const [position, setPosition] = useState('')
  const [unit, setUnit] = useState('')
  const [level, setLevel] = useState('')
  const [role, setRole] = useState('')
  const [search, setSearch] = useState('')

  const handleChangePosition = (e) => {
    setPosition(e?.target?.value)
    onPosition(e?.target?.value?.id)
  }

  const handleChangeUnit = (e) => {
    setUnit(e?.target?.value)
    onUnit(e?.target?.value?.id)
  }

  const handleChangeLevel = (e) => {
    setLevel(e?.target?.value)
    onLevel(e?.target?.value?.id)
  }

  const handleChangeRole = (e) => {
    setRole(e?.target?.value)
    onRole(e?.target?.value?.id)
  }

  const handleClearAllState = () => {
    onClearState()
    setPosition('')
    setUnit('')
    setLevel('')
    setRole('')
    setSearch('')
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
          <Button
            text='Tambah Blacklist'
            sx={{
              textTransform: 'none',
              ...primaryButtonStyle
            }}
            color='warning'
            onClick={() => router.push('/manajemen-pengguna/blacklist/create')}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginTop: '32px',
            marginBottom: '20px'
          }}
        >
          <p style={{
            marginBottom: '8px'
          }}>Pencarian</p>
          <input
            type='text'
            name='saerch'
            className={classes.input}
            placeholder='Masukan Pencarian : NIP, Nama'
            onChange={(e) => { setSearch(e.target.value) }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearch(search)
              }
            }}
            value={search}
          />
        </Grid>
        <Grid
          item
        >
          <Grid
            container
            spacing={2}
            direction='row'
          >
            <Grid
              item
              xl={3}
              lg={3}
              md={12}
              sm={12}
              xs={12}
            >
              <Autocomplete
                label='Jabatan'
                placeholder='Pilih Jabatan'
                options={command?.userPosition}
                onChange={(e) => { handleChangePosition(e) }}
                value={position}
              />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              md={12}
              sm={12}
              xs={12}
            >
              <Autocomplete
                label='Unit Kerja/Satuan Organisasi'
                placeholder='Pilih Unit Kerja/Satuan Organisasi'
                options={command?.userUnit}
                onChange={(e) => { handleChangeUnit(e) }}
                value={unit}
              />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              md={12}
              sm={12}
              xs={12}
            >
              <Autocomplete
                label='Pangkat/Golongan'
                placeholder='Pilih Pangkat/Golongan'
                options={command?.userLevel}
                onChange={(e) => { handleChangeLevel(e) }}
                value={level}
              />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              md={12}
              sm={12}
              xs={12}
            >
              <Autocomplete
                label='Peran Pengguna'
                placeholder='Pilih Peran Pengguna'
                options={command?.roles}
                onChange={(e) => { handleChangeRole(e) }}
                value={role}
              />
            </Grid>
          </Grid>
        </Grid>
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
            onClick={handleClearAllState}
          />
        </Grid>
      </Grid>
    </>
  )
}

UserBlacklistToolbarComponent.propTypes = {
  command: PropTypes.object,
  queries: PropTypes.object,
  onSearch: PropTypes.func,
  onPosition: PropTypes.func,
  onUnit: PropTypes.func,
  onLevel: PropTypes.func,
  onRole: PropTypes.func,
  onClearState: PropTypes.func
}

export default UserBlacklistToolbarComponent