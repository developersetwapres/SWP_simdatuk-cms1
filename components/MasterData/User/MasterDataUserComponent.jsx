/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import { Box, Typography } from '@mui/material'
import Search from '@/components/core/Search'
import { makeStyles } from '@mui/styles'
import { Edit, Info } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { Access, accessGranted, PermissionsIDs } from '@/utils/permissionManager'

const useStyles = makeStyles(() => ({
  inputParent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: '1px solid #878787',
    margin: '0 0 1rem 0',
    borderRadius: '4px',
    width: '30%',
    alignSelf: 'flex-end',
    padding: '0 10px'
  },
  input: {
    cursor: 'text',
    caretColor: '#000',
    color: '#000',
    border: 'none',
    borderRight: '1px solid #fff',
    width: '100%',
    padding: '15px 15px',
    backgroundColor: 'transparent',
    fontSize: '14px',
    '&:focus': {
      outline: 'none',
      borderRight: '1px solid #fff'
    }
  }
}))

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

const MasterDataUserComponent = ({
  user,
  onSearch = () => { },
  onLoading = () => { },
  onPaginationChange = () => { },
  onRowsPerPageChange = () => { }
}) => {
  const classes = useStyles()
  const router = useRouter()

  const columns = useMemo(
    () => [
      {
        Header: 'Username',
        width: 200,
        align: 'left'
      },
      {
        Header: 'NIP/NRP',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Role Pengguna',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Status',
        width: 200,
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
    const dataMapping = user?.data.map((item) => {
      return [
        {
          Header: 'Username',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.username}</Typography>
        },
        {
          Header: 'Nip',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{`${item?.employee_id_number}/${item?.employee_registration_number}`}</Typography>
          )
        },
        {
          Header: 'Role',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.role_name}</Typography>
        },
        {
          Header: 'Status',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.status}</Typography>
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {accessGranted(PermissionsIDs.MASTER_USER, Access.READ) && (
                <Button
                  text='Detail'
                  color='primary'
                  onClick={() =>
                    router.push(`${router.pathname}/detail/${btoa(item?.id)}`)
                  }
                  icon={<Info style={styles.iconButton} />}
                  sx={styles.buttonAction}
                />
              )}
              {accessGranted(PermissionsIDs.MASTER_USER, Access.UPDATE) && (
                <Button
                  text='Edit'
                  color='sidatukDraweBase'
                  onClick={() =>
                    router.push(`${router.pathname}/edit/${btoa(item?.id)}`)
                  }
                  icon={<Edit style={styles.iconButton} />}
                  sx={styles.buttonAction}
                />
              )}
            </Box>
          )
        }
      ]
    })

    return dataMapping
  }, [user])

  const action = useMemo(() => {
    return (
      <Box>
        {accessGranted(PermissionsIDs.MASTER_USER, Access.CREATE) && (
          <Button
            text='Tambah'
            onClick={() => router.push(`${router.pathname}/add`)}
          />
        )}
      </Box>
    )
  }, [])

  useEffect(() => {
    const state = !user?.loading
    onLoading(state)
  }, [user])

  return (
    <LayoutPages summary='Master Data Pengguna' action={action}>
      <Box
        sx={{
          width: '100%',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <Search
          inputParentClasses={classes.inputParent}
          inputClass={classes.input}
          iconStyle={classes.iconStyle}
          placeholder='Cari Username'
          onSearch={onSearch}
        />
      </Box>
      <Table
        columns={columns}
        rows={rows}
        pagination={user?.pagination}
        handlePagination={onPaginationChange}
        handleRows={onRowsPerPageChange}
      />
    </LayoutPages>
  )
}

MasterDataUserComponent.propTypes = {
  user: PropTypes.object,
  onSearch: PropTypes.func,
  onLoading: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
}

export default MasterDataUserComponent
