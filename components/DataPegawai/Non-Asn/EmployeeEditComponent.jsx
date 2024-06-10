/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import LayoutPages from '@/components/core/LayoutPages'
import { useRouter } from 'next/router'
import { Button } from '@/components/shared'
import { Box } from '@mui/material'
import FormComponent from '../Form/FormComponent'

const EmployeeEditComponent = () => {
  const router = useRouter()
  const action = useMemo(() => {
    return (
      <Box>
        <Button
          text='Simpan'
          color='primary'
          onClick={() => { }}
        />
      </Box>
    )
  }, [])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary={'Edit Pegawai Non-ASN'}
      action={action}
    >
      <FormComponent mode='edit' pageType='NON_ASN' />
    </LayoutPages>
  )
}

export default EmployeeEditComponent
