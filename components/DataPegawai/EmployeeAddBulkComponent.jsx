/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import LayoutPages from '@/components/core/LayoutPages'
import { useRouter } from 'next/router'
import { Button, Modal, Table } from '@/components/shared'
import {
  Box,
  Typography,
  Button as MuiButton,
  List,
  ListItem
} from '@mui/material'
import Paper from '@/components/shared/overrides/Paper'
import { styled } from '@mui/styles'
import { FiberManualRecord } from '@mui/icons-material'
import PropTypes from 'prop-types'
import { SaveAs, saveFile } from '@/utils/fileSaver'
import Image from 'next/image'
import {
  INFORMATION_ICON,
  PROCESSING,
  SUCCESS_ICON
} from '@/utils/iconConstant'

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
  font: {
    fontSize: '14px',
    fontWeight: 400
  },
  textFile: {
    width: '220px',
    fontSize: '14px',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  dot: {
    marginRight: '6px',
    fontSize: '8px'
  },
  listItem: {
    padding: '2px 12px'
  },
  listTextTitle: {
    margin: 'unset',
    fontSize: '14px',
    fontWeight: 600
  },
  listText: {
    margin: 'unset',
    fontSize: '14px',
    display: 'flex'
  },
  listTextBold: {
    margin: '0 4px',
    fontSize: '14px',
    fontWeight: 600
  }
}

const EmployeeAddBulkComponent = ({
  queries,
  employee,
  onSetQueries = () => {},
  onFetchHistories = () => {},
  downloadTemplate = () => {},
  uploadTemplate = () => {},
  clearTemplate = () => {},
  clearTemplateUpload = () => {},
  onPaginationChange = () => {},
  onRowsPerPageChange = () => {},
  setLoading = () => {}
}) => {
  const router = useRouter()
  const inputRef = useRef(null)

  const [selectedFile, setSelectedFile] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState(DynamicModalMode.CONFIRM)

  const columns = useMemo(
    () => [
      {
        Header: 'Tanggal',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Nama Pengguna',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Detail Aktivitas',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      event.target.value = null
    }
  }

  const rows = useMemo(() => {
    const data = employee?.activities?.data || []
    const dataMapping = data?.map((item) => {
      return [
        {
          Header: 'Tanggal',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.created_at || '-'}</Typography>
        },
        {
          Header: 'Nama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'Aktifitas',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.description || '-'}</Typography>
        }
      ]
    })

    return dataMapping
  }, [employee])

  const employeeType = useMemo(() => {
    const path = router?.asPath
    let employeeType = 1

    if (path?.includes('/data-pegawai/asn')) {
      employeeType = 1
    } else if (path?.includes('/data-pegawai/non-asn')) {
      employeeType = 2
    } else {
      employeeType = 3
    }

    return employeeType
  }, [router])

  const downloadTemplateFile = () => {
    downloadTemplate(employeeType)
  }

  const getFileName = () => {
    let employeeTypeLabel = 'ASN'

    if (employeeType === 1) {
      employeeTypeLabel = 'ASN'
    } else if (employeeType === 2) {
      employeeTypeLabel = 'NON_ASN'
    } else {
      employeeTypeLabel = 'OUTSOURCE'
    }

    const prefix = `TEMPLATE_PEGAWAI_${employeeTypeLabel}`
    return prefix + '.xlsx'
  }

  const uploadTemplateFile = () => {
    if (!selectedFile) return

    setModalOpen(true)
  }

  const handleSubmit = () => {
    setModalMode(DynamicModalMode.UPLOAD)

    const formData = new FormData()
    formData.append('file', selectedFile, selectedFile?.name)
    formData.append('type', employeeType)

    uploadTemplate(formData)
  }

  const handleChangePage = (e, page) => {
    onPaginationChange(page + 1)
  }

  const handleChangeRowsPerPage = (e) => {
    const row = e?.target?.value
    onRowsPerPageChange(row)
  }

  useEffect(() => {
    const payload = {
      ...queries,
      type: employeeType
    }

    if (payload && payload !== queries) {
      onSetQueries(payload)
      onFetchHistories(payload)
    }
  }, [employeeType])

  useEffect(() => {
    if (employee?.error || employee?.uploaded) {
      setModalMode(DynamicModalMode.CONFIRM)
      setModalOpen(false)
      clearTemplateUpload()
    }

    // EXPORT
    if (employee?.template) {
      saveFile(employee?.template, getFileName(), SaveAs.XLS)
      clearTemplate()
    }

    setLoading(!employee?.loading)
  }, [employee])

  return (
    <>
      <LayoutPages
        handleBack={() => router.back()}
        summary={'Tambah Massal Data Pegawai'}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 1
              }}
            >
              <Button
                text='Download File Template'
                color='sidatukDraweBase'
                onClick={downloadTemplateFile}
                sx={{ textTransform: 'none' }}
              />
              <MuiButton
                component='label'
                role={undefined}
                variant='contained'
                tabIndex={-1}
                sx={{ textTransform: 'none' }}
              >
                Pilih File
                <VisuallyHiddenInput
                  ref={inputRef}
                  onChange={handleFileChange}
                  type='file'
                  accept='application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                />
              </MuiButton>
              <Typography sx={style?.textFile}>
                {selectedFile?.name || 'Tidak Ada File yang Dipilih'}
              </Typography>
            </Box>
            <Box>
              <Typography sx={style?.font}>
                Format File : .csv, .xlsx
              </Typography>
              <Typography sx={style?.font}>Maksimum Size : 2 MB</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                text='Update File'
                color='success'
                onClick={() => uploadTemplateFile()}
                sx={{ textTransform: 'none' }}
                isBusy={!selectedFile}
              />
              <Button
                text='Reset File'
                color='danger'
                onClick={() => setSelectedFile(null)}
                sx={{ textTransform: 'none' }}
                isBusy={!selectedFile}
              />
            </Box>
            <Box>
              <Typography sx={style?.listTextTitle}>
                Cara Tambah Data Pegawai Secara Massal
              </Typography>
              <List>
                <ListItem sx={style?.listItem}>
                  <FiberManualRecord style={style?.dot} />
                  <Typography sx={style?.listText}>
                    Klik tombol
                    <Typography component='span' sx={style?.listTextBold}>
                      Download File Template
                    </Typography>
                  </Typography>
                </ListItem>
                <ListItem sx={style?.listItem}>
                  <FiberManualRecord style={style?.dot} />
                  <Typography sx={style?.listText}>
                    Isi data sesuai dengan
                    <Typography component='span' sx={style?.listTextBold}>
                      Format File Template
                    </Typography>
                    yang sudah di download
                  </Typography>
                </ListItem>
                <ListItem sx={style?.listItem}>
                  <FiberManualRecord style={style?.dot} />
                  <Typography sx={style?.listText}>
                    Isi data sesuai dengan
                    <Typography component='span' sx={style?.listTextBold}>
                      Format File Template
                    </Typography>
                    yang sudah di download
                  </Typography>
                </ListItem>
                <ListItem sx={style?.listItem}>
                  <FiberManualRecord style={style?.dot} />
                  <Typography sx={style?.listText}>
                    Klik tombol Pilih File, kemudian pilih File Template yang
                    sudah di isi
                  </Typography>
                </ListItem>
                <ListItem sx={style?.listItem}>
                  <FiberManualRecord style={style?.dot} />
                  <Typography sx={style?.listText}>
                    Jika sudah sesuai, anda bisa klik tombol
                    <Typography component='span' sx={style?.listTextBold}>
                      Update File
                    </Typography>
                  </Typography>
                </ListItem>
                <ListItem sx={style?.listItem}>
                  <FiberManualRecord style={style?.dot} />
                  <Typography sx={style?.listText}>
                    Jika belum sesuai, anda bisa klik tombol
                    <Typography component='span' sx={style?.listTextBold}>
                      Reset File
                    </Typography>
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Paper>
          <Table
            title='Riwayat Aktivitas'
            columns={columns}
            rows={rows}
            pagination={employee?.activities?.data?.pagination}
            handlePagination={handleChangePage}
            handleRows={handleChangeRowsPerPage}
          />
        </Box>
      </LayoutPages>

      <DynamicModal
        open={modalOpen}
        mode={modalMode}
        handleConfirm={handleSubmit}
        handleCancel={() => setModalOpen(false)}
      />
    </>
  )
}

const DynamicModalMode = {
  CONFIRM: 'CONFIRM',
  UPLOAD: 'UPLOAD',
  INFO: 'INFO'
}

const DynamicModal = ({
  open = true,
  mode = DynamicModalMode.CONFIRM,
  handleCancel = () => {},
  handleConfirm = () => {}
}) => {
  const dynamicItems = useMemo(() => {
    let icon = INFORMATION_ICON
    let title = ''
    let copytext = ''

    if (mode === DynamicModalMode.CONFIRM) {
      icon = INFORMATION_ICON
      title = 'Tambah Data Pegawai'
      copytext =
        'Apakah anda yakin akan menambah data pegawai secara massal? Pastikan anda berada dalam jaringan yang stabil sebelum melanjutkan proses ini'
    } else if (mode === DynamicModalMode.UPLOAD) {
      icon = PROCESSING
      title = 'Tambah Data Pegawai Sedang Diproses'
      copytext = 'Mohon tunggu proses ini hingga selesai'
    } else {
      icon = SUCCESS_ICON
      title = 'Data Pegawai Berhasil Ditambah'
      copytext = 'Anda telah berhasil menambah data pegawai'
    }

    return { icon, title, copytext }
  }, [mode])

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      width={'600px'}
      otherStyle={{ paddingTop: '40px' }}
    >
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          padding: mode == DynamicModalMode.UPLOAD ? '30px 0' : 0
        }}
      >
        <Image
          src={dynamicItems?.icon}
          width={112}
          height={112}
          alt='Info Icon'
        />

        <Typography fontWeight={600} fontSize={24} sx={{ marginTop: '16px' }}>
          {dynamicItems?.title}
        </Typography>

        <Typography
          fontWeight={400}
          fontSize={16}
          sx={{
            marginTop: '4px',
            wordWrap: 'break-word'
          }}
        >
          {dynamicItems?.copytext}
        </Typography>

        {mode !== DynamicModalMode.UPLOAD && (
          <Box sx={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            {mode === DynamicModalMode.CONFIRM && (
              <Button
                text='Ya'
                onClick={handleConfirm}
                style={{ width: '100%' }}
              />
            )}
            <Button
              text={mode === DynamicModalMode.INFO ? 'Tutup' : 'Tidak'}
              variant={'outlined'}
              style={{ width: '100%' }}
              onClick={handleCancel}
            />
          </Box>
        )}
      </Box>
    </Modal>
  )
}

DynamicModal.propTypes = {
  open: PropTypes.bool,
  mode: PropTypes.string,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func
}

EmployeeAddBulkComponent.propTypes = {
  queries: PropTypes.object,
  employee: PropTypes.object,
  onSetQueries: PropTypes.func,
  onFetchHistories: PropTypes.func,
  downloadTemplate: PropTypes.func,
  uploadTemplate: PropTypes.func,
  clearTemplate: PropTypes.func,
  clearTemplateUpload: PropTypes.func,
  setLoading: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
}

export default EmployeeAddBulkComponent
