import React, { useState } from 'react'
import { Box, InputLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PropsType from 'prop-types'


function Search({
  iconColor,
  onSearch = () => { },
  label,
  placeholder,
  inputParentClasses,
  inputClass
}) {
  const [search, setSearch] = useState('')

  return (
    <Box
      component='div'
      className={inputParentClasses}
    >
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
            sx={{
              color: `${iconColor}`,
              cursor: 'pointer',
              width: '50px',
              fontSize: '30px'
            }}
          />)
        }
      </InputLabel>
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
  iconColor: PropsType.string
}


export default Search