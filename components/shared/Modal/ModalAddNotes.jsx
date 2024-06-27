/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from '..'
import { Box, Typography } from '@mui/material'
import { CLOSE_ICON } from '@/utils/iconConstant'
import NotesForm from '@/components/DataPegawai/Form/NotesForm'
import { v4 as uuidv4 } from 'uuid'

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
    gap: '14px',
    marginTop: '40px'
  }
}

const ModalAddNotes = ({
  open,
  data,
  handleCancel = () => { },
  handleSave = () => { }
}) => {
  const [notes, setNotes] = useState([
    ...(data?.notes || []).map(i => ({ ...i, content: i?.description })),
    {
      id: uuidv4(),
      giver_name: '',
      created_at: '',
      content: '',
      error: ''
    }
  ])

  const updateNotes = () => {
    console.log('NOTES: ', notes)
    if (notes.some(i => !i?.content)) {
      setNotes(
        notes.map(n => {
          if (!n?.content) {
            return {
              ...n,
              error: 'Catatan tidak boleh kosong'
            }
          }

          return n
        })
      )
      return
    }

    const param = {
      // Required params
      name: data?.name,
      employee_id_number: data?.employee_id_number,
      place_of_birth: data?.place_of_birth,
      date_of_birth: data?.date_of_birth,
      religion: data?.religion,
      gender: data?.gender,
      marital_status: data?.marital_status,
      grade_id: data?.grade_id,
      grade_effective_date: data?.grade_effective_date,
      position_id: data?.position_id,
      institution_id: data?.institution_id,
      organization_id: data?.organization_id,
      work_unit_id: data?.work_unit_id,
      employment_status: data?.employment_status,
      residence_id: data?.residence_id,
      emergency_contact: data?.emergency_contact,
      type: data?.type,
      employment_type_id: data?.employment_type_id,
      quit_date: data?.quit_date,
      // Data that being updated
      notes: notes.map(i => {
        if (i?.giver_name || i?.created_at) {
          return {
            id: i?.id,
            description: i?.content
          }
        }

        return { description: i?.content }
      })
    }
    console.log('PARAM: ', param)
    handleSave(param)
    handleCancel()
  }

  const addNote = () => {
    setNotes([
      ...notes,
      { id: uuidv4(), content: '' }
    ])
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id != id))
  }

  const handleInputChanges = (index, e) => {
    setNotes(
      notes.map((n, i) => {
        if (i === index) {
          return {
            ...n,
            content: e?.target?.value,
            error: ''
          }
        }

        return n
      })
    )
  }

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
        <Typography component='h6' variant='h6'>Catatan</Typography>
        <img
          style={{
            width: '20px',
            height: '20px'
          }}
          src={CLOSE_ICON}
          alt='img close'
          onClick={handleCancel}
        />
      </Box>

      <Box
        sx={{
          width: '100%',
          maxHeight: '60vh',
          overflow: 'auto',
          /* Hide scrollbar for Chrome, Safari and Opera */
          '::-webkit-scrollbar': {
            display: 'none'
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none'  /* Firefox */
        }}
      >
        {notes.map((note, index) => (
          <NotesForm
            fullWidth
            key={note?.id}
            note={note}
            index={index}
            handleDeleteNote={() => deleteNote(note?.id)}
            handleInputsChanged={handleInputChanges}
          />
        ))}
      </Box>

      <Button
        color='primary'
        variant='outlined'
        text='Tambah Catatan Baru'
        sx={{
          width: '100%',
          display: 'block',
          fontWeight: 'bold',
          marginTop: 2
        }}
        onClick={addNote}
      />

      <Box sx={style?.wrapperButton}>
        <Button
          text='Batal'
          variant={'outlined'}
          style={{ width: '100%' }}
          onClick={handleCancel}
        />
        <Button
          text='Simpan'
          style={{ width: '100%' }}
          onClick={updateNotes}
        />
      </Box>
    </Modal>
  )
}

ModalAddNotes.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.object,
  handleCancel: PropTypes.func,
  handleSave: PropTypes.func
}

export default ModalAddNotes
