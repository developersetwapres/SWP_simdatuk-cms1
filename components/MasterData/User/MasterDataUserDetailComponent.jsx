/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Paper from '@/components/shared/overrides/Paper'

const styles = {
  iconStyle: {
    fontSize: '20px'
  },
  iconButton: {
    margin: '0 8px 0 -4px',
    fontSize: '20px'
  },
  buttonAction: {
    width: 'fit-content',
    fontSize: '16px',
    textTransform: 'none'
  },
  wrapperItem: { display: 'flex', flexDirection: 'column', gap: '8px' },
  fontItem: { fontWeight: 600 }
}

const MasterDataUserDetailComponent = ({
  user,
  getUser = () => {},
  clearUserState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()

  const data = useMemo(() => {
    const detail = user?.detail

    if (detail) return detail

    return {}
  }, [user])

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: '12px' }}>
        <Button text='Nonaktifkan Pengguna' color='danger' />
        <Button
          text='Edit'
          color='sidatukDraweBase'
          icon={<Edit style={styles.iconButton} />}
          onClick={() =>
            router.push(`/master-data/user/edit/${router?.query?.id}`)
          }
        />
      </Box>
    )
  }, [])

  const handleClearState = () => {
    clearUserState()
  }

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) getUser(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', handleClearState)

    return () => {
      router.events.off('routeChangeComplete', handleClearState)
    }
  }, [router])

  useEffect(() => {
    const state = !user?.loading && Object.entries(user?.detail).length > 0
    onLoading(state)
  }, [user])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Data Pengguna'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>Username</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.username || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>Email</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.email || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>Nama / NIP</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.name && data?.employee_id_number
                  ? `${data?.name} / ${data?.employee_id_number}`
                  : '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>Role Pengguna</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.role?.name || '-'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </LayoutPages>
  )
}

MasterDataUserDetailComponent.propTypes = {
  user: PropTypes.object,
  getUser: PropTypes.func,
  clearUserState: PropTypes.func,
  onLoading: PropTypes.func
}

export default MasterDataUserDetailComponent
