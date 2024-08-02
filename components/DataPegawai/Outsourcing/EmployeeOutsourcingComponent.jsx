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

const EmployeeOutsourcingComponent = ({
  employee,
  grade,
  position,
  employmentType,
  onLoading = () => {},
  onSearch = () => {},
  onFilter = () => {},
  clearPositionState = () => {},
  onPaginationChange = () => {},
  onRowsPerPageChange = () => {}
}) => {
  const router = useRouter()

  const handleRedirect = (type, id) => {
    if (type == 'add') {
      router.push(`${router.pathname}/add`)
    } else {
      router.push(`${router.pathname}/${type}/${id}`)
    }

    clearPositionState()
  }

  const handleMapOptions = (val) => {
    const arr = []

    val.map((itm) => {
      arr.push(itm?.name)
    })

    return arr
  }

  const options = useMemo(() => {
    const newPosition = handleMapOptions(position?.data)
    const newGrade = handleMapOptions(grade?.options)
    const newEmploymentType = handleMapOptions(employmentType?.data)

    return {
      positions: newPosition,
      grades: newGrade,
      educationLevel: employeeEducationLevelOptions,
      religion: religionOptions,
      months: monthOptions,
      status: employeeStatusOptions,
      employmentType: newEmploymentType
    }
  }, [position, grade, employmentType])

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
        Header: 'Jenis Outsourcing',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan',
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
          Header: 'Outsourcing',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.employment_type || '-'}</Typography>
        },
        {
          Header: 'Keterangan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.description || '-'}</Typography>
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {accessGranted(
                PermissionsIDs.EMPLOYEE_OUTSOURCING,
                Access.READ
              ) && (
                <Button
                  text='Detail'
                  color='primary'
                  icon={<Info style={styles.iconButton} />}
                  sx={styles.buttonAction}
                  onClick={() => handleRedirect('detail', btoa(item?.id))}
                />
              )}
              {accessGranted(
                PermissionsIDs.EMPLOYEE_OUTSOURCING,
                Access.UPDATE
              ) && (
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
    if (!accessGranted(PermissionsIDs.EMPLOYEE_OUTSOURCING, Access.CREATE))
      return null

    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
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
  }, [])

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
    const state =
      !employee?.loading &&
      !grade?.loading &&
      !position?.loading &&
      !employmentType?.loading
    onLoading(state)
  }, [employee, grade, position, employmentType])

  return (
    <LayoutPages summary={'Data Pegawai Outsourcing'} action={action}>
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

EmployeeOutsourcingComponent.propTypes = {
  employee: PropTypes.object,
  position: PropTypes.object,
  grade: PropTypes.object,
  employmentType: PropTypes.object,
  onLoading: PropTypes.func,
  onSearch: PropTypes.func,
  onFilter: PropTypes.func,
  clearPositionState: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
}

export default EmployeeOutsourcingComponent
