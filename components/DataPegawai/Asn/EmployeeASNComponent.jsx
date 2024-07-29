/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '../../core/LayoutPages'
import { Box } from '@mui/system'
import { Button, Table } from '@/components/shared'
import { Edit, Info } from '@mui/icons-material'
import { Typography } from '@mui/material'
import EmployeeFilterComponent from '../EmployeeFilterComponent'
import { useRouter } from 'next/router'
import {
  employeeEducationLevelOptions,
  employeeStatusOptions,
  monthOptions,
  religionOptions
} from 'libs/types/options'
import {
  Access,
  accessGranted,
  PermissionsIDs
} from '@/utils/permissionManager'

const styles = {
  iconStyle: {
    fontSize: '20px'
  },
  iconButton: {
    margin: '0 8px 0 -4px',
    fontSize: '20px'
  },
  buttonAction: {
    width: '100px',
    fontSize: '16px',
    textTransform: 'none'
  }
}

const EmployeeASNComponent = ({
  employee,
  grade,
  position,
  clearPositionState = () => {},
  synchronizeEmployees = () => {},
  onLoading = () => {},
  onSearch = () => {},
  onFilter = () => {},
  onPaginationChange = () => {},
  onRowsPerPageChange = () => {}
}) => {
  const router = useRouter()

  const handleMapOptions = (val) => {
    const arr = []

    val.map((itm) => {
      arr.push(itm?.name)
    })

    return arr
  }

  const handleRedirect = (type, id) => {
    if (type == 'add') {
      router.push(`${router.pathname}/add`)
    } else {
      router.push(`${router.pathname}/${type}/${id}`)
    }

    clearPositionState()
  }

  const options = useMemo(() => {
    const newPosition = handleMapOptions(position?.data)
    const newGrade = handleMapOptions(grade?.options)

    return {
      positions: newPosition,
      grades: newGrade,
      educationLevel: employeeEducationLevelOptions,
      religion: religionOptions,
      months: monthOptions,
      status: employeeStatusOptions,
      employmentType: []
    }
  }, [position, grade])

  const columns = useMemo(
    () => [
      {
        Header: 'Foto',
        width: 80,
        align: 'left'
      },
      {
        Header: 'Nama',
        width: 200,
        align: 'left'
      },
      {
        Header: 'NIP / NRP',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jabatan Terakhir',
        width: 240,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 80,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = employee?.data
    const dataMapping = data.map((item) => {
      return [
        {
          Header: 'Foto',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box
              sx={{
                width: '90px',
                height: '120px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={item?.photo_profile}
                alt='Image'
                style={{ width: 'fit-content', height: '100%' }}
              />
            </Box>
          )
        },
        {
          Header: 'Nama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'NIP',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => {
            const nip = item?.employee_id_number
            const nrp = item?.employee_registration_number
            return <Typography>{`${nip}${nrp ? ` / ${nrp}` : ''}`}</Typography>
          }
        },
        {
          Header: 'Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.grade_name || '-'}</Typography>
        },
        {
          Header: 'Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.position_name || '-'}</Typography>
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {accessGranted(PermissionsIDs.EMPLOYEE_ASN, Access.READ) && (
                <Button
                  text='Detail'
                  color='primary'
                  icon={<Info style={styles.iconButton} />}
                  sx={styles.buttonAction}
                  onClick={() => handleRedirect('detail', btoa(item?.id))}
                />
              )}
              {accessGranted(PermissionsIDs.EMPLOYEE_ASN, Access.UPDATE) && (
                <Button
                  text='Edit'
                  color='sidatukDraweBase'
                  icon={<Edit style={styles.iconButton} />}
                  sx={styles.buttonAction}
                  onClick={() => handleRedirect('edit', btoa(item?.id))}
                />
              )}
            </Box>
          )
        }
      ]
    })

    return dataMapping
  }, [employee])

  const action = useMemo(() => {
    const createPermission = accessGranted(
      PermissionsIDs.EMPLOYEE_ASN,
      Access.CREATE
    )

    if (!createPermission) return

    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          text='Sinkronisasi Data'
          sx={{ backgroundColor: '#F16637' }}
          onClick={() => synchronizeEmployees()}
        />
        <Button
          text='Tambah Massal'
          color='sidatukDraweBase'
          onClick={() => router.push(`${router.pathname}/add-bulk`)}
        />
        <Button
          text='Tambah'
          color='primary'
          onClick={() => handleRedirect('add', null)}
        />
      </Box>
    )
  }, [router])

  const handleGetValueID = (type, val) => {
    if (val) {
      if (type == 'position') {
        const item =
          position?.data && position?.data.find((itm) => itm?.name == val)?.id
        return item
      } else if (type == 'grade') {
        const item =
          grade?.options && grade?.options.find((itm) => itm?.name == val)?.id
        return item
      } else if (type == 'employmentType') {
        const item =
          (employmentType?.data &&
            employmentType?.data.find((itm) => itm?.name == val)?.id) ||
          null
        return item
      } else {
        const item = options[type].findIndex((itm) => itm == val) + 1
        return item
      }
    } else {
      return val
    }
  }

  const handleFilter = (val) => {
    const newFilter = Object.fromEntries(
      Object.entries(val).map(([key, value]) => {
        if (key !== 'age') {
          return [key, handleGetValueID(key, value)]
        } else {
          return [key, value]
        }
      })
    )

    onFilter(newFilter)
  }

  useEffect(() => {
    const state = !(employee?.loading || grade?.loading || position?.loading)
    onLoading(state)
  }, [employee, grade, position])

  return (
    <LayoutPages summary={'Data Pegawai ASN'} action={action}>
      <EmployeeFilterComponent
        onFilter={handleFilter}
        onSearch={onSearch}
        options={options}
      />
      <Table
        columns={columns}
        rows={rows}
        pagination={employee?.pagination}
        handlePagination={onPaginationChange}
        handleRows={onRowsPerPageChange}
      />
    </LayoutPages>
  )
}

EmployeeASNComponent.propTypes = {
  employee: PropTypes.object,
  position: PropTypes.object,
  grade: PropTypes.object,
  onLoading: PropTypes.func,
  clearPositionState: PropTypes.func,
  synchronizeEmployees: PropTypes.func,
  onSearch: PropTypes.func,
  onFilter: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
}

export default EmployeeASNComponent
