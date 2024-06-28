/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from '..'
import { Box, Typography } from '@mui/material'
import { CLOSE_ICON } from '@/utils/iconConstant'
import NotesForm from '@/components/DataPegawai/Form/NotesForm'
import { v4 as uuidv4 } from 'uuid'
import { religionOptions } from 'libs/types/options'
import { dmyToYmd } from '@/utils/index'

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
  useEffect(() => {
    setTimeout(() => {
      setNotes([
        ...(data?.notes || []).map(i => ({ ...i, content: i?.description })),
        ...notes
      ])
    }, 1000)
  }, [data])

  const [notes, setNotes] = useState([
    {
      id: uuidv4(),
      giver_name: '',
      created_at: '',
      content: '',
      error: ''
    }
  ])

  const updateNotes = async () => {
    if (notes.some(i => !i?.content)) {
      setNotes(
        notes.map(n => {
          if (!n?.content)
            return {
              ...n,
              error: 'Catatan tidak boleh kosong'
            }

          return n
        })
      )
      return
    }

    const formData = new FormData()
    formData.append('photo_profile', '')
    formData.append('name', data?.name || '')
    formData.append('title_prefix', data?.title_prefix || '')
    formData.append('title_suffix', data?.title_suffix || '')
    formData.append('employee_id_number', data?.employee_id_number?.substring(0, 10) || '')
    formData.append('employee_registration_number', data?.employee_registration_number?.substring(0, 10) || '')
    formData.append('place_of_birth', data?.place_of_birth)
    formData.append('date_of_birth', dmyToYmd(data?.date_of_birth))
    formData.append('religion', religionOptions.indexOf(data?.religion) + 1)
    formData.append('gender', data?.gender)
    formData.append('marital_status', data?.marital_status)
    formData.append('employment_type_id', data?.employment_type_id)
    formData.append('cpns_effective_date', dmyToYmd(data?.cpns_effective_date))
    formData.append('position_id', data?.position_id)
    formData.append('position_effective_date', dmyToYmd(data?.position_effective_date))
    formData.append('grade_id', data?.grade_id)
    formData.append('grade_effective_date', dmyToYmd(data?.grade_effective_date))
    formData.append('echelon_id', data?.echelon_id)
    formData.append('echelon_effective_date', dmyToYmd(data?.echelon_effective_date))
    formData.append('institution_id', data?.institution_id || '1')
    formData.append('education_level', data?.education_level)
    formData.append('education_name', data?.education_name)
    formData.append('education_year', data?.education_year)
    formData.append('employee_id_card_number', data?.employee_id_card_number)
    formData.append('employee_id_card', '')
    formData.append('karisu_number', data?.karisu_number?.replace(' ', '') || '')
    formData.append('id_tax', data?.id_tax)
    formData.append('employment_status', data?.employment_status)
    formData.append('family_registration_number', data?.family_registration_number || '')
    formData.append('id_number', data?.id_number)
    formData.append('residence_id', data?.residence_id)
    formData.append('residence_description', data?.residence_description)
    formData.append('current_address', data?.current_address)
    formData.append('home_phone_number', data?.home_phone_number || '')
    formData.append('mobile_phone', data?.mobile_phone)
    formData.append('office_address', data?.office_address)
    formData.append('office_phone_number', data?.office_phone_number || '')
    formData.append('email', data?.email || '')
    formData.append('emergency_contact', data?.emergency_contact)
    formData.append('office_email', data?.office_email || '')
    formData.append('description', data?.description || '')
    formData.append('type', data?.type)
    formData.append('delete_employee_id_card', 0)

    if (notes?.length > 0) {
      notes.forEach((n, i) => {
        if (i?.giver_name || i?.created_at) {
          formData.append(`notes[${i}][id]`, n?.id)
        }
        formData.append(`notes[${i}][description]`, n?.content)
      })
    } else {
      formData.append('notes[]', '')
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    handleSave({
      id: data?.id,
      data: formData
    })
    closeModal()
  }

  const closeModal = () => {
    setNotes([
      {
        id: uuidv4(),
        giver_name: '',
        created_at: '',
        content: '',
        error: ''
      }
    ])
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
        if (i === index)
          return {
            ...n,
            content: e?.target?.value,
            error: ''
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
          onClick={closeModal}
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
          onClick={closeModal}
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
