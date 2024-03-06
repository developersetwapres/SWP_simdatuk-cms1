import React, { useState } from 'react'
import { Button } from '@/components/shared'
import { Grid } from '@mui/material'
import { primaryButtonStyle } from '@/utils/theme'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

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
      border: '1px solid #878787'
    },
    '&::placeholder': {
      color: '#878787'
    }
  }
})


function UserRoleToolbarComponent({
  // eslint-disable-next-line no-unused-vars
  queries,
  onClearState = () => { },
  onSearch = () => { }
}) {
  const [search, setSearch] = useState('')
  const handleClearState = () => {
    onClearState()
    setSearch('')
  }

  const router = useRouter()
  const classes = useStyles()
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
            text='Tambah Peran Pengguna'
            color='warning'
            sx={{
              textTransform: 'none',
              ...primaryButtonStyle
            }}
            onClick={() => router.push('/manajemen-pengguna/peran-pengguna/create')}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginTop: '20px'
          }}
        >
          <p style={{
            marginBottom: '8px'
          }}>Pencarian</p>
          <input
            type='text'
            onChange={(e) => { setSearch(e.target.value) }}
            name='search'
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearch(search)
              }
            }}
            className={classes.input}
            placeholder='Masukan Pencarian : Nama Peran'
            value={search}
          />
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
            onClick={handleClearState}
          />
        </Grid>
      </Grid>
    </>
  )
}

UserRoleToolbarComponent.propTypes = {
  onSearch: PropTypes.func,
  queries: PropTypes.object,
  onClearState: PropTypes.func
}

export default UserRoleToolbarComponent