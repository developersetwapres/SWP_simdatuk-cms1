import React, { useState } from 'react'
import { Box, IconButton, InputLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PropsType from 'prop-types'
import { Close } from '@mui/icons-material'

function Search({
  onSearch = () => {},
  label,
  placeholder,
  inputParentClasses,
  inputClass,
  iconStyle
}) {
  const [search, setSearch] = useState('')

  return (
    <Box
      component='div'
      className={inputParentClasses}
      sx={{ position: 'relative' }}
    >
      <InputLabel
        htmlFor='search'
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {label || <SearchIcon htmlFor='search' sx={iconStyle} />}
      </InputLabel>
      <input
        type='text'
        id='search'
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        name='search'
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch(search)
        }}
        className={inputClass}
        placeholder={placeholder}
        value={search}
      />
      {search && (
        <IconButton
          aria-label='delete'
          onClick={() => {
            setSearch('')
            onSearch('')
          }}
          sx={{
            padding: '4px',
            fontSize: '20px',
            position: 'absolute',
            right: 6,
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <Close />
        </IconButton>
      )}
    </Box>
  )
}

Search.propTypes = {
  value: PropsType.string,
  onSearch: PropsType.func,
  label: PropsType.string,
  placeholder: PropsType.string,
  inputParentClasses: PropsType.any,
  inputClass: PropsType.any,
  iconStyle: PropsType.any
}

export default Search
