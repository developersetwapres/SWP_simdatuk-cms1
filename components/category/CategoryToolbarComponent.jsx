import React, { useState } from 'react'
import { Button } from '@/components/shared/'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'

const useStyles = makeStyles({
  label: {
    marginBottom: '0'
  },
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
  }
})

function CategoryToolbarComponent({
  // eslint-disable-next-line no-unused-vars
  queries,
  onClearState = () => { },
  onSearch = () => { }
}) {
  const classes = useStyles()
  const router = useRouter()
  const [search, setSearch] = useState('')

  const handleClearState = () => {
    onClearState()
    setSearch('')
  }
  return (
    <>
      <Button
        text='Tambah Kategori'
        color='warning'
        sx={{
          marginBottom: '20px',
          textTransform: 'none',
          ...primaryButtonStyle
        }}
        onClick={() => router.push('/category/create')}
      />
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
        placeholder='Masukan Pencarian : Kategori, Program PKASN'
        value={search}
      />
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

CategoryToolbarComponent.propTypes = {
  queries: PropTypes.object,
  onClearState: PropTypes.func,
  onSearch: PropTypes.func
}

export default CategoryToolbarComponent