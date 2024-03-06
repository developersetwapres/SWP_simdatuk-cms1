import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { Autocomplete, Button } from '@/components/shared/index'
import { useRouter } from 'next/router'
import { primaryButtonStyle, blackButtonStyle } from '@/utils/theme'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

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
  }
})


function BannerToolbarComponent({
  // eslint-disable-next-line no-unused-vars
  queries,
  onSearch = () => { },
  onStatus = () => { },
  onType = () => { },
  onClearFilter = () => { }
}) {
  const router = useRouter()
  const classes = useStyles()
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')
  const [search, setSearch] = useState('')

  const handleChangeStatus = (e) => {
    setFilterStatus(e.target.value)
    onStatus(e.target.value)
  }

  const handleChangeType = (e) => {
    setFilterType(e.target.value)
    onType(e.target.value)
  }

  const handleClearAll = () => {
    onClearFilter()
    setFilterStatus('')
    setFilterType('')
    setSearch('')
  }
  return (
    <>
      <Grid
        container
        direction='column'
      >
        <Grid
          container
          direction='row'
        >
          <Grid
            item
          >
            <Button
              text='Tambah Banner'
              color='warning'
              sx={{
                ...primaryButtonStyle,
                textTransform: 'none'
              }}
              onClick={() => router.push('/banner/create')}
            />
          </Grid>
          <Grid
            item
          >
            <Button
              text='Sort Banner'
              sx={{
                marginLeft: '20px',
                ...blackButtonStyle,
                textTransform: 'none'
              }}
              onClick={() => router.push('/banner/sort-banner')}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            marginTop: '30px'
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
            placeholder='Masukan Pencarian: Nama Banner'
            value={search}
          />
        </Grid>
        <Grid
          item
        >
          <Grid
            container
            direction='row'
            justifyContent='space-between'
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
                label='Tipe'
                options={[
                  {
                    id: 0, text: 'Pembelajaran', value: 0
                  },
                  {
                    id: 1, text: 'Pengumuman', value: 1
                  },
                  {
                    id: 2, text: 'Link', value: 2
                  }
                ]}
                name='tipe'
                placeholder='Pilih Tipe'
                onChange={(e) => { handleChangeType(e) }}
                value={filterType}
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
                placeholder='Pilih Status'
                label='Status'
                name='status'
                options={[
                  { id: 0, text: 'Terpublikasi', status: true },
                  { id: 1, text: 'Tidak Terpublikasi', status: false }
                ]}
                onChange={(e) => { handleChangeStatus(e) }}
                value={filterStatus}
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
            onClick={handleClearAll}
          />
        </Grid>
      </Grid>
    </>
  )
}

BannerToolbarComponent.propTypes = {
  queries: PropTypes.object,
  onSearch: PropTypes.func,
  onStatus: PropTypes.func,
  onType: PropTypes.func,
  onClearFilter: PropTypes.func
}

export default BannerToolbarComponent