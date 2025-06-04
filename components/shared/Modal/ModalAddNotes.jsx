/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from '..'
import { Box, Typography } from '@mui/material'
import { CLOSE_ICON } from '@/utils/iconConstant'
import NotesForm from '@/components/DataPegawai/Form/NotesForm'
import moment from 'moment'
import { useRouter } from 'next/router'

const style = {
  containerModal: {
    padding: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'relative'
  },
  wrapperButton: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  }
}

const ModalAddNotes = ({
  open,
  data,
  handleModal = () => {},
  handleSave = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const updateNotes = async (values) => {
    const id = router?.query?.id || btoa(data?.id)
    const notes = values?.notes

    const payload = {
      notes: notes.map((itm) => {
        return {
          id: itm?.id || null,
          description: itm?.description
        }
      })
    }

    handleSave({
      id: atob(id),
      data: payload
    })
    handleModal()
  }

  useEffect(() => {
    const notes = data?.notes

    notes &&
      notes.map((itm, idx) => {
        formikRef.current?.setFieldValue(
          `notes[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `notes[${idx}].date`,
          itm?.created_at
            ? moment(itm?.created_at).format('DD-MM-YYYY hh:mm:ss')
            : '',
          false
        )
        formikRef.current?.setFieldValue(
          `notes[${idx}].inputer`,
          itm?.giver_name || '',
          false
        )
        formikRef.current?.setFieldValue(
          `notes[${idx}].description`,
          itm?.description || '',
          false
        )
      })
  }, [data])

  useEffect(() => {
    if (!open && formikRef.current) formikRef.current.resetForm()
  }, [open])

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
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography component='h6' variant='h6'>
          Catatan
        </Typography>
        <img
          style={{
            width: '20px',
            height: '20px',
            cursor: 'pointer'
          }}
          src={CLOSE_ICON}
          alt='img close'
          onClick={handleModal}
        />
      </Box>

      <Box
        sx={{
          width: '100%',
          margin: `20px 0 ${
            formikRef?.current?.values?.notes.length > 0 ? '30px' : 0
          } 0`,
          maxHeight: '60vh',
          overflow: 'auto'
        }}
      >
        <NotesForm
          ref={formikRef}
          {...{
            isAccordion: false,
            isEdit: true
          }}
        />
      </Box>

      <Box sx={style?.wrapperButton}>
        <Button
          color='primary'
          variant='outlined'
          text='Tambah Catatan Baru'
          sx={{
            width: '100%',
            fontSize: '14px',
            display: 'block',
            fontWeight: 'bold',
            textTransform: 'none'
          }}
          onClick={() =>
            formikRef?.current?.setFieldValue(
              'notes',
              [
                ...formikRef?.current?.values?.notes,
                { date: '', inputer: '', description: '' }
              ],
              false
            )
          }
        />
        <Button
          text='Simpan'
          style={{ width: '100%' }}
          onClick={() => updateNotes(formikRef?.current?.values)}
        />
      </Box>
    </Modal>
  )
}

ModalAddNotes.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.object,
  handleModal: PropTypes.func,
  handleSave: PropTypes.func
}

export default ModalAddNotes
