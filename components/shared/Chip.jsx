/* eslint-disable no-unused-vars */
import React from 'react'
import { Chip as MuiChip } from '@mui/material'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: '16px',
    // fontWeight: '500',
    lineHeight: '24px',
    marginBottom: '10px'
  },
  chipWrapper: {
    height: '100%',
    backgroundColor: '#EDEDED',
    borderRadius: '6px',
    padding: '12px 12px',
    border: '1px solid #BABABA',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'stretch'
    }
  }
}))

function Chip({
  color,
  items,
  size,
  label,
  classParent,
  selected,
  setSelected,
  ...others
}) {
  const classes = useStyles()

  const filteredOptions = (topic) => {
    items.filter(x => x.id === topic && setSelected(prevState => [...prevState, x]))
  }

  const deletedOptions = (val) => {
    setSelected((item) => item.filter((it) => it.id !== val.id))
  }

  return (
    <>
      <p className={classes.label}>{label}</p>
      <div className={classParent || classes.chipWrapper}>
        {
          items?.length > 0 && (
            items.map((value, index) => (
              <MuiChip
                label={value.text}
                key={index}
                color={color || 'primary'}
                size={size || 'small'}
                onClick={() => filteredOptions(value.id)}
                variant={`${selected?.map(i => i.id).includes(value.id) ? 'filled' : 'outlined'}`}
                onDelete={() => deletedOptions(value)}
                {...others}
              />
            ))
          )
        }
      </div>
    </>
  )
}

Chip.propTypes = {
  color: PropTypes.string,
  items: PropTypes.array,
  size: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.array,
  setSelected: PropTypes.any,
  classParent: PropTypes.string
}

export default Chip