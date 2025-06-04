/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Button, Modal } from '..'
import { Box, Typography } from '@mui/material'

const style = {
  containerModal: {
    padding: '32px',
    minHeight: '320px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'relative'
  },
  wrapperText: {
    width: '100%',
    margin: '26px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  wrapperButton: {
    width: '100%',
    display: 'flex',
    gap: '14px'
  }
}

const ModalConfirmDelete = ({
  label,
  title,
  copytext,
  value,
  options,
  isLoading,
  open = true,
  handleModal = () => {},
  handleDelete = () => {},
  handleSetValue = () => {}
}) => {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      padding='2rem'
      width={'600px'}
      otherStyle={style?.containerModal}
    >
      <Box
        sx={{
          width: '112px',
          height: '112px',
          backgroundImage: 'url("/icons/information.svg")',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      />
      <Box sx={style?.wrapperText}>
        <Typography
          sx={{ fontSize: '24px', fontWeight: 600, textAlign: 'center' }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            width: '380px',
            margin: '6px 0 16px 0',
            fontSize: '14px',
            fontWeight: 400,
            textAlign: 'center'
          }}
        >
          {copytext}
        </Typography>
        {options && (
          <Autocomplete
            label={label}
            options={options}
            name='options-delete'
            placeholder={`Pilih ${label}`}
            multiple={false}
            value={value}
            onChange={(val) => handleSetValue(val)}
          />
        )}
      </Box>
      <Box sx={style?.wrapperButton}>
        <Button
          text='Ya'
          isLoading={isLoading}
          onClick={handleDelete}
          isBusy={(!value && options) || isLoading}
          style={{ width: '100%' }}
        />
        <Button
          text='Tidak'
          variant={'outlined'}
          style={{ width: '100%' }}
          onClick={handleModal}
        />
      </Box>
    </Modal>
  )
}

ModalConfirmDelete.propTypes = {
  isLoading: PropTypes.bool,
  open: PropTypes.bool,
  title: PropTypes.string,
  copytext: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  label: PropTypes.string,
  handleSetValue: PropTypes.func,
  handleDelete: PropTypes.func,
  handleModal: PropTypes.func
}

export default ModalConfirmDelete
