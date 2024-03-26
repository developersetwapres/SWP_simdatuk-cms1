import * as React from 'react'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import PropTypes from 'prop-types'


function CheckboxCard({
  children,
  checkedParent,
  checkIndeterminate,
  label,
  getChekAll = () => { }
}) {

  const handleChange1 = () => {
    getChekAll()
  }


  console.log(checkedParent)


  // const children = (
  //   <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
  //     <FormControlLabel
  //       label='Child 1'
  //       control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
  //     />
  //     <FormControlLabel
  //       label='Child 2'
  //       control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
  //     />
  //   </Box>
  // )

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginY: 5
        }}
      >
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              checked={checkedParent}
              indeterminate={checkIndeterminate}
              onChange={handleChange1}
            />
          }
        />
      </Box>
      {children}
    </Box>
  )
}

CheckboxCard.propTypes = {
  children: PropTypes.node.isRequired,
  checkedParent: PropTypes.bool,
  checkIndeterminate: PropTypes.bool,
  getChekAll: PropTypes.func,
  label: PropTypes.string
}

export default CheckboxCard