import React, { useState } from 'react'
import { Button } from '@/components/shared/'
import { Grid } from '@mui/material'
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


function OrganizerToolbarComponent({
  // eslint-disable-next-line no-unused-vars
  queries,
  onClearFilter = () => { },
  onSearch = () => { }
}) {
  const router = useRouter()
  const classes = useStyles()
  const [search, setSearch] = useState('')

  const handleClearFilter = () => {
    onClearFilter()
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
          sx={{
            marginBottom: '20px'
          }}
        >
          <Button
            text='Tambah Penyelenggara'
            sx={{
              textTransform: 'none',
              ...primaryButtonStyle
            }}
            color='warning'
            onClick={() => router.push('/manajemen-pengguna/penyelenggara/create')}
          />
        </Grid>
        <Grid
          item
        >
          <p style={{
            marginBottom: '8px'
          }}>Pencarian</p>
          <input
            type='text'
            onChange={(e) => { setSearch(e.target.value) }}
            name='search'
            className={classes.input}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearch(search)
              }
            }}
            placeholder='Masukan Pencarian : Nama Penyelenggara'
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
            onClick={handleClearFilter}
          />
        </Grid>
      </Grid>
    </>
  )
}

OrganizerToolbarComponent.propTypes = {
  queries: PropTypes.object,
  onClearFilter: PropTypes.func,
  onSearch: PropTypes.func
}

export default OrganizerToolbarComponent