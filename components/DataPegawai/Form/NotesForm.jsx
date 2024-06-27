import React from 'react'
import { Button, TextArea, Input } from '@/components/shared'
import { Box, Typography, Divider, Grid } from '@mui/material'
import PropTypes from 'prop-types'

function NotesForm({
  note,
  index,
  fullWidth = false,
  handleDeleteNote = () => { },
  handleInputsChanged = () => { }
}) {
  return (
    <>
      <Box
        sx={{
          width: fullWidth ? '100%' : 'unset',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography color='#895700' fontWeight={700}>Catatan</Typography>

        <Button
          text='Hapus'
          color='danger'
          onClick={handleDeleteNote}
          sx={{ textTransform: 'none' }}
        />
      </Box>

      <Divider sx={{ width: '100%', border: '1px solid #929292', margin: '10px 0px' }} />

      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: '20px'
        }}
      >
        {(note?.giver_name || note?.created_at) && (
          <>
            <Grid item xs={6}>
              <Input
                disabled
                label='Tanggal'
                placeholder='dd-mm-yyyy'
                name='input_date'
                value={note?.created_at}
                error={''}
                onChange={(val) => console.log(val)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                disabled
                label='Inputer'
                placeholder='dd-mm-yyyy'
                name='inputer'
                value={note?.giver_name}
                error={''}
                onChange={(val) => console.log(val)}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <TextArea
            label='Catatan *'
            placeholder='Masukkan Catatan'
            rows={3}
            name='notes'
            value={note?.content}
            onChange={(e) => handleInputsChanged(index, e)}
            error={note?.error || ''}
          />
        </Grid>
      </Grid>
    </>
  )
}

NotesForm.propTypes = {
  index: PropTypes.number,
  note: PropTypes.object,
  fullWidth: PropTypes.bool,
  handleDeleteNote: PropTypes.func,
  handleInputsChanged: PropTypes.func
}

export default NotesForm