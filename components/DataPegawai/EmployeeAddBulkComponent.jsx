/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
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
import { INFORMATION_ICON, PROCESSING, SUCCESS_ICON } from '@/utils/iconConstant'

const data = [
  {
    id: 123,
    nama: 'John',
    tanggal: '19-12-2023 13:31:19',
    aktifitas: 'Tambah Massal Data Pegawai'
  },
  {
    id: 123,
    nama: 'Chris',
    tanggal: '19-12-2023 13:31:19',
    aktifitas: 'Tambah Massal Data Pegawai'
  },
  {
    id: 123,
    nama: 'Evan',
    tanggal: '19-12-2023 13:31:19',
    aktifitas: 'Tambah Massal Data Pegawai'
  },
  {
    id: 123,
    nama: 'Martin',
    tanggal: '19-12-2023 13:31:19',
    aktifitas: 'Tambah Massal Data Pegawai'
  },
  {
    id: 123,
    nama: 'Emily',
    tanggal: '19-12-2023 13:31:19',
    aktifitas: 'Tambah Massal Data Pegawai'
  }
]

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
  employee,
  downloadTemplate = () => { },
  uploadTemplate = () => { },
  clearTemplate = () => { },
  clearEmployeeState = () => { },
  setLoading = () => { }
}) => {
  const router = useRouter()

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
    setSelectedFile(file)
  }

  const rows = useMemo(() => {
    const dataMapping = data.map((item) => {
      return [
        {
          Header: 'Tanggal',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tanggal}</Typography>
        },
        {
          Header: 'Nama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.nama}</Typography>
        },
        {
          Header: 'Aktifitas',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.aktifitas}</Typography>
        }
      ]
    })

    return dataMapping
  }, [data])

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
    const prefix = 'TEMPLATE_PEGAWAI'
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

  useEffect(() => {
    if (employee?.uploaded) {
      setModalMode(DynamicModalMode.INFO)
      setSelectedFile(null)
      clearEmployeeState()
    }

    if (employee?.error) {
      setModalMode(DynamicModalMode.CONFIRM)
      setModalOpen(false)
      clearEmployeeState()
    }

    if (employee?.template) {
      saveFile(employee?.template, getFileName(), SaveAs.XLS)
      clearTemplate()
    }
  }, [employee])

  useEffect(() => {
    setLoading(!(employee?.loading))
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
                onChange={handleFileChange}
                sx={{ textTransform: 'none' }}
              >
                Pilih File
                <VisuallyHiddenInput
                  type='file'
                  accept='application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                />
              </MuiButton>
              <Typography sx={style?.textFile}>
                {selectedFile?.name || 'Tidak Ada File yang Dipilih'}
              </Typography>
            </Box>
            <Box>
              <Typography sx={style?.font}>Format File : .csv, .xlsx</Typography>
              <Typography sx={style?.font}>Maksimum Size : 2 MB</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                text='Update File'
                color='success'
                onClick={() => uploadTemplateFile()}
                sx={{ textTransform: 'none' }}
              />
              <Button
                text='Reset File'
                color='danger'
                onClick={() => setSelectedFile(null)}
                sx={{ textTransform: 'none' }}
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
          <Table title='Riwayat Aktivitas' columns={columns} rows={rows} />
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
  handleCancel = () => { },
  handleConfirm = () => { }
}) => {
  const dynamicItems = useMemo(() => {
    let icon = INFORMATION_ICON
    let title = ''
    let copytext = ''

    if (mode === DynamicModalMode.CONFIRM) {
      icon = INFORMATION_ICON
      title = 'Tambah Data Pegawai'
      copytext = 'Apakah anda yakin akan menambah data pegawai secara massal? Pastikan anda berada dalam jaringan yang stabil sebelum melanjutkan proses ini'
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
    >
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          padding: '28px 0x 0px 0px'
        }}
      >
        <Image
          src={dynamicItems?.icon}
          width={112}
          height={112}
          alt='Info Icon'
        />

        <Typography
          fontWeight={600}
          fontSize={24}
          sx={{ marginTop: '16px' }}
        >
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
                variant={'outlined'}
                onClick={handleConfirm}
                style={{ width: '100%' }}
              />
            )}
            <Button
              text={mode === DynamicModalMode.INFO ? 'Tutup' : 'Tidak'}
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
  employee: PropTypes.object,
  downloadTemplate: PropTypes.func,
  uploadTemplate: PropTypes.func,
  clearTemplate: PropTypes.func,
  clearEmployeeState: PropTypes.func,
  setLoading: PropTypes.func
}

export default EmployeeAddBulkComponent
