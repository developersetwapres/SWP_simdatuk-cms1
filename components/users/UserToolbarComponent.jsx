import React from 'react'
import { Button } from '@/components/shared'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { blackButtonStyle, successButtonStyle, primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'


function UserToolbarComponent({
  exportExcel,
  exportFileExcelUserList = () => { }
}) {
  const router = useRouter()
  return (
    <Grid
      direction='row'
      container
      spacing={2}
    >
      <Grid
        item
      >
        <Button
          sx={{
            ...primaryButtonStyle,
            textTransform: 'none'
          }}
          text='Tambah Pengguna'
          color='warning'
          onClick={() => router.push('/manajemen-pengguna/pengguna/create')}
        />
      </Grid>
      <Grid
        item
      >
        <Button
          sx={{
            ...blackButtonStyle,
            textTransform: 'none'
          }}
          text='Tambah Pengguna by Spreadsheet'
          onClick={() => router.push('/manajemen-pengguna/pengguna/create/spreadsheet')}
        />
      </Grid>
      <Grid
        item
      >
        <Button
          sx={{
            ...primaryButtonStyle,
            textTransform: 'none'
          }}
          text='Update Level Pengguna'
          color='warning'
          onClick={() => router.push('/manajemen-pengguna/pengguna/update/level')}
        />
      </Grid>
      <Grid
        item
      >
        <Button
          sx={{
            ...successButtonStyle,
            textTransform: 'none',
            '&:disabled': {
              width: '100%'
            }
          }}
          text='Export'
          color='success'
          onClick={exportFileExcelUserList}
          isBusy={exportExcel.downloadTemplate.userList}
          isLoading={exportExcel.loading}
        />
      </Grid>
    </Grid>
  )
}

UserToolbarComponent.propTypes = {
  exportExcel: PropTypes.object,
  exportFileExcelUserList: PropTypes.func
}

export default UserToolbarComponent