import React, { useState } from 'react'
import { Box, InputLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PropsType from 'prop-types'


function Search({
  onSearch = () => { },
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
        {
          label ||
          (<SearchIcon
            htmlFor='search'
            sx={iconStyle}
          />)
        }
      </InputLabel>
      <input
        type='text'
        id='search'
        onChange={(e) => { setSearch(e.target.value) }}
        name='search'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch(search)
          }
        }}
        className={inputClass}
        placeholder={placeholder}
      // value={search}
      />
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