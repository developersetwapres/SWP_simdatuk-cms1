import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/styles'
import { Box, IconButton, Button as MuiButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { Input } from '@/components/shared'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const style = {
  textFile: {
    width: '220px',
    fontSize: '14px',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  font: {
    fontSize: '14px',
    fontWeight: 400
  },
  fontLabel: { marginBottom: '8px', fontSize: '14px', fontWeight: 500 },
  wrapper: {
    width: '100%'
  },
  wrapperUploadFile: {
    display: 'flex',
    alignItems: 'center',
    justiftContent: 'flex-start',
    gap: '12px'
  },
  wrapperUpload: {
    marginBottom: '14px',
    display: 'flex',
    alignItems: 'start',
    justiftContent: 'center',
    flexDirection: 'column'
  },
  wrapperFile: {
    height: '45px',
    minWidth: '300px',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '6px',
    transition: 'all .2s ease'
  },
  buttonDelete: {
    padding: 0
  },
  iconButton: {
    fontSize: '20px'
  }
}

const UploadFile = ({
  label,
  name,
  value,
  error,
  maxSize,
  dataUnit,
  formatFile = [],
  onChange = () => {},
  onDelete = () => {}
}) => {
  return (
    <Box sx={style?.wrapper}>
      {label && (
        <Typography component='p' sx={style?.fontLabel}>
          {label}
        </Typography>
      )}
      <Box sx={style?.wrapperUpload}>
        {!value ? (
          <Box sx={style?.wrapperUploadFile}>
            <MuiButton
              component='label'
              role={undefined}
              color='sidatukDraweBase'
              variant='contained'
              tabIndex={-1}
              name={name}
              onChange={(e) => onChange(e.target.files[0])}
              sx={{ textTransform: 'none' }}
            >
              Pilih File
              <VisuallyHiddenInput type='file' />
            </MuiButton>
            <Typography sx={style?.textFile}>
              Tidak Ada File yang Dipilih
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              ...style?.wrapperFile,
              background: error ? '#FFE6EC' : '#F6EBDA',
              color: error ? '#D32F2F' : '#895700'
            }}
          >
            <Typography sx={style?.textFile}>
              {typeof value == 'string' ? value : value?.name}
            </Typography>
            {typeof value == 'string' && (
              <Input
                name={name}
                style={{ width: 0, height: 0, visibility: 'hidden' }}
                styleWrapper={{ width: 0, height: 0, visibility: 'hidden' }}
              />
            )}
            <IconButton
              aria-label='delete'
              sx={style?.buttonDelete}
              onClick={onDelete}
            >
              <Close style={style?.iconButton} />
            </IconButton>
          </Box>
        )}
        {error && (
          <Typography
            component='p'
            sx={{ ...style?.font, marginTop: '3px', color: 'red' }}
          >
            {error}
          </Typography>
        )}
      </Box>
      {(formatFile || (dataUnit && maxSize)) && (
        <Box>
          {formatFile && (
            <Typography sx={style?.font}>{`Format File : ${
              formatFile && formatFile.join(', ')
            }`}</Typography>
          )}
          {maxSize && dataUnit && (
            <Typography
              sx={style?.font}
            >{`Maksimum Size : ${maxSize}${dataUnit}`}</Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

UploadFile.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  dataUnit: PropTypes.string,
  formatFile: PropTypes.array,
  maxSize: PropTypes.number,
  onChange: PropTypes.func,
  onDelete: PropTypes.func
}

export default UploadFile
