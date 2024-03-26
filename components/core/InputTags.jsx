/* eslint-disable no-unused-vars */
import * as React from 'react'
import PropTypes from 'prop-types'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import { Box, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Root = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
  font-size: 14px;
  position: relative;
`,
)

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  font-weight: 500;
`

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#aeaeae'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
)

function Tag(props) {
  const { label, onDelete, ...other } = props
  return (
    <div {...other}>
      <Typography
        sx={{
          color: 'white',
          fontSize: '16px'
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#fff',
          borderRadius: '50%',
          ml: '10px'
        }}
      >
        <CloseIcon
          onClick={onDelete}
          fontSize='large'
          fontWeight='bold'
          color='primary'
        />
      </Box>
    </div >
  )
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
}

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 25px;
  margin: 5px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? '#000' : '#895700'
    };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 20px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
)

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
)

function InputTags({
  inputLabel,
  listValue,
  placeholder
}) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: listValue,
    getOptionLabel: (option) => option.title
  })

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>{inputLabel}</Label>
        <InputWrapper ref={setAnchorEl} sx={{
          outline: 'none',
          '&:hover': {
            outline: '#000'
          }
        }}
        >
          {value.map((option, index) => (
            <StyledTag key={index} label={option.title} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} placeholder={placeholder} />
          {
            groupedOptions.length ? <ExpandMoreIcon /> : <ChevronRightIcon />
          }
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li key={index} {...getOptionProps({ option, index })}>
              <span>{option.title}</span>
              <CheckIcon fontSize='small' />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  )
}

InputTags.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  listValue: PropTypes.array,
  placeholder: PropTypes.string
}

export default InputTags

