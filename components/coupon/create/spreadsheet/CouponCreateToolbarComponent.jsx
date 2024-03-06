/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { Button, ButtonUpload, Modal, ModalConfirm } from '@/components/shared'
import PropTypes from 'prop-types'
import { blackButtonStyle, dangerButtonStyle, primaryButtonStyle, successButtonStyle } from '@/utils/theme'
import { useRouter } from 'next/router'

function UserCreateSpreadsheetToolbarComponent({
  values,
  errors,
  importExcel,
  exportExcel,
  handleInputChange = () => { },
  handleImportCoupon = () => { },
  handleClearFile = () => { },
  exportExcelCoupon = () => { }
}) {
  const [confirmModal, setConfirmModal] = useState(false)
  const [bulkModal, setBulkModal] = useState(false)
  const [finishModal, setFinishModal] = useState(false)
  const router = useRouter()

  const handleConfirmModal = () => {
    setConfirmModal(true)
  }

  const handleCancelModal = () => {
    setConfirmModal(false)
  }

  useEffect(() => {
    setFinishModal(false)
    if (importExcel.loading === false) {
      setBulkModal(false)
      setFinishModal(true)
    } else if (importExcel.loading === true) {
      setBulkModal(true)
      setConfirmModal(false)
    }
  }, [importExcel])

  useEffect(() => {
    setFinishModal(false)
  }, [])

  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
      >
        <Grid
          container
          direction='row'
          spacing={2}
        >
          <Grid
            item
          >
            <Button
              text='Download File Template'
              sx={{
                textTransform: 'none',
                ...blackButtonStyle,
                '&:disabled': {
                  width: '100%'
                }
              }}
              onClick={exportExcelCoupon}
              isBusy={exportExcel.downloadTemplate.coupon}
              isLoading={exportExcel.loading}
            />
            <p style={{
              color: '#444444',
              marginTop: '8px'
            }}>Format File : .xlsx</p>
          </Grid>
          <Grid
            item
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row'
            }}>
              <ButtonUpload
                text='Choose File'
                name='coupon'
                onChange={handleInputChange}
                value={values.coupon}
                error={errors.coupon}
                accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              />
              <p style={{
                paddingLeft: '20px',
                color: '#444444',
                fontWeight: '400',
                fontSize: '14px'
              }}>{values.coupon.name || 'No File Choosen'}</p>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
      >
        <Grid
          container
          direction='row'
          spacing={2}
        >
          <Grid
            item
          >
            <Button
              text='Update File'
              sx={{
                textTransform: 'none',
                ...successButtonStyle
              }}
              color='success'
              onClick={handleConfirmModal}
            />
          </Grid>
          <Grid
            item
          >
            <Button
              sx={{
                textTransform: 'none',
                ...dangerButtonStyle
              }}
              color='danger'
              text='Reset File'
              onClick={handleClearFile}
            />
          </Grid>
        </Grid>
        {
          errors.coupon && (
            <p style={{
              color: '#D32F2F',
              fontSize: '16px'
            }}>{errors.coupon}</p>
          )
        }
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '20px'
        }}
      >
        <div
          style={{
            fontWeight: '500'
          }}
        >
          <p>Cara menambahkan Kupon by Spreadsheet</p>
          <ul>
            <li>Klik button <span style={{ color: '#FE9516' }}>Download File Template</span></li>
            <li>Isi data sesuai dengan format <span style={{ color: '#FE9516' }}>File Template</span> yang sudah di download</li>
            <li>Klik button <span style={{ color: '#FE9516' }}>Choose File</span>, kemudian pilih File Template yang sudah diisi</li>
            <li>Jika sudah sesuai, anda bisa klik button <span style={{ color: '#FE9516' }}>Update File</span></li>
            <li>Jika belum sesuai, anda bisa klik button <span style={{ color: '#FE9516' }}>Reset File</span></li>
          </ul>
        </div>
      </Grid>
      {/* Confirm Modal */}
      <ModalConfirm
        open={confirmModal}
      >
        <img
          src='/images/information-circle.png'
          alt='logo'
          style={{
            width: '100%',
            maxWidth: '160px',
            height: '160px',
            display: 'block',
            margin: '0 auto'
          }}
        />
        <p style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '22px',
          marginTop: '30px'
        }}>
          <span
            style={{
              fontSize: '18px'
            }}
          >Harap hapus sheet daftar pembelajaran sebelum update file</span>,
          Apakah anda yakin akan menambah Kupon?
        </p>
        <Box
          component='div'
          sx={{
            display: 'flex',
            alignItems: 'center',
            // flexWrap: 'nowrap',
            flexDirection: {
              xl: 'row',
              lg: 'row',
              md: 'column',
              sm: 'column',
              xs: 'column'
            },
            justifyContent: 'space-evenly'
          }}
        >
          <Button
            text='Ya'
            color='warning'
            sx={{
              width: '100%',
              maxWidth: '240px',
              textTransform: 'none',
              marginBottom: {
                xl: 0,
                lg: 0,
                md: '10px',
                sm: '10px',
                xs: '10px'
              },
              ...primaryButtonStyle
            }}
            onClick={handleImportCoupon}
          />
          <Button
            text='Tidak'
            sx={{
              width: '100%',
              maxWidth: '240px',
              textTransform: 'none',
              ...blackButtonStyle
            }}
            onClick={handleCancelModal}
          />
        </Box>
      </ModalConfirm>
      {/* ModalBylk */}
      <Modal
        open={bulkModal}
        onClose={() => { setBulkModal(false) }}
        width='740px'
      >
        <div style={{
          display: 'block',
          margin: '0 auto'
        }}>
          <div>
            <img
              src='/images/UPLOAD_FILE.png'
              alt='logo'
              style={{
                width: '100%',
                maxWidth: '460px',
                margin: '0 auto',
                display: 'block'
              }}
            />
            <div style={{
              textAlign: 'center',
              marginTop: '40px'
            }}>
              <h2>Tambah Kupon sedang diproses</h2>
              <p>Mohon tunggu proses ini hingga selesai</p>
            </div>
          </div>
        </div>
      </Modal>
      {/* End Modal Bulk */}
      {/* Modal Success */}
      <Modal
        open={finishModal}
        padding='3rem 0'
        onClose={() => {
          setFinishModal(false)
          router.push('/manajemen-kupon/kupon')
        }}
        width='700px'
      >
        <img
          src={importExcel.icon}
          alt='success'
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '128px',
            display: 'block',
            margin: '0 auto'
          }}
        />
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          {importExcel.message}
        </h2>
        <p style={{ textAlign: 'center' }}>{importExcel.error}</p>
        <div style={{
          marginRight: 'auto',
          marginLeft: 'auto',
          width: '100%',
          textAlign: 'center'
        }}>
          <Button
            text='Tutup'
            type='button'
            color='warning'
            sx={{
              padding: '12px',
              width: '540px',
              textTransform: 'none',
              ...primaryButtonStyle
            }}
            onClick={() => {
              setFinishModal(false)
              router.push('/manajemen-kupon/kupon')
            }}
          />
        </div>
      </Modal>
      {/* Modal End */}
    </Grid>
  )
}

UserCreateSpreadsheetToolbarComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  importExcel: PropTypes.object,
  exportExcel: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleImportCoupon: PropTypes.func,
  handleClearFile: PropTypes.func,
  exportExcelCoupon: PropTypes.func
}

export default UserCreateSpreadsheetToolbarComponent