import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { Grid, List } from '@mui/material'
import { Button } from '../shared'

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
  }
}

function ModalEmployeeList({
  openModal,
  data,
  closeModal = () => { }
}) {

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
              <Box
                sx={style.closeButton}
                onClick={closeModal}
              >
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
              <Box
                sx={{
                  display: 'flex',
                  gap: '2rem',
                  marginTop: '20px'
                }}
              >
                {
                  data?.name?.map((item, index) =>
                    <Grid
                      key={index + 1}
                      container
                      item
                      border='1px solid black'
                      padding={2}
                      borderRadius={3}
                      direction='column'
                      width='30vw'
                      backgroundColor='background.paper'
                    >
                      <Grid
                        item
                        paddingBottom={2}
                      >
                        <Typography
                          textAlign='center'
                          fontWeight='bold'
                          color='primary'
                        >
                          {item.childName}
                        </Typography>
                        <List>
                          {
                            item.type.map((grandChildItem, indexGrandChild) =>
                              <Typography
                                key={indexGrandChild + 1}
                                fontWeight='600'
                              >
                                {`${grandChildItem.id}. ${grandChildItem.name} (${grandChildItem.amount})`}
                              </Typography>
                            )
                          }
                        </List>
                      </Grid>
                      <Button
                        text='Lihat Detail'
                      />
                    </Grid>
                  )
                }
              </Box>
            </Box>
          </Grid>
        </>
      </Modal>
    </div >
  )
}

ModalEmployeeList.propTypes = {
  openModal: PropTypes.bool,
  data: PropTypes.object,
  closeModal: PropTypes.func
}

export default ModalEmployeeList