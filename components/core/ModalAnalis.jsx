import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import ProfileCard from '../shared/Card/CardProfile'

const style = {
  closeButton: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    right: 10,
    cursor: 'pointer',
    backgroundColor: '#dadada',
    width: 25,
    height: 25,
    borderRadius: '50%'
  },
  modalGrid: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#f6ebda',
    boxShadow: 24,
    borderRadius: '20px'
  },
  rootStyle: {
    height: 'auto'
  }
}

function ModalAnalis({ openModal, data, closeModal = () => {} }) {
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openModal}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <>
          <Grid sx={style.modalGrid}>
            <Box
              sx={{
                position: 'relative',
                p: 4
              }}
            >
              <Box sx={style.closeButton} onClick={closeModal}>
                <CloseSharpIcon />
              </Box>
              <Typography
                id='transition-modal-title'
                variant='h6'
                component='h2'
                textAlign='center'
              >
                {data?.jabatan}
              </Typography>

              <Typography
                id='transition-modal-title'
                variant='h6'
                component='h2'
                textAlign='center'
              >
                {data?.pegawai?.length}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: '2rem',
                  marginTop: '20px'
                }}
              >
                {data?.pegawai?.map((item, index) => (
                  <Grid
                    key={index + 1}
                    container
                    item
                    border='1px solid black'
                    overflow='hidden'
                    borderRadius={3}
                    direction='column'
                    backgroundColor='background.paper'
                  >
                    <ProfileCard
                      lihatProfile={true}
                      rootStyle={style.rootStyle}
                      name={item.name}
                      eselon={item.eselon}
                      golongan={item.golongan}
                      nip={item.nip}
                      imageSource={item.image}
                    />
                  </Grid>
                ))}
              </Box>
            </Box>
          </Grid>
        </>
      </Modal>
    </div>
  )
}

ModalAnalis.propTypes = {
  openModal: PropTypes.bool,
  data: PropTypes.object,
  closeModal: PropTypes.func
}

export default ModalAnalis
