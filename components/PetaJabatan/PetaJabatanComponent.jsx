import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { Button } from '../shared'
import JobChart from '../shared/JobChart'
import { useRouter } from 'next/router'
import LayoutPages from '../core/LayoutPages'
import ButtonExport from '../core/ButtonExport'

const styles = {
  headerMap: {
    backgroundColor: '#fff',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px'
  },
  boxParent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem'
  }
}

const PetaJabatanComponent = ({ data }) => {
  const router = useRouter()

  const staffParams = useMemo(() => {
    return router?.query?.staff
  }, [router])

  const action = useMemo(() => {
    return (
      <Box>
        <ButtonExport data={[{ name: 'PDF', action: () => {} }]} />
      </Box>
    )
  }, [])

  return (
    <LayoutPages
      handleBack={staffParams ? () => router.back() : null}
      summary='Peta Jabatan'
      action={action}
    >
      <Box sx={styles.boxParent}>
        {!staffParams && (
          <CardEmployment
            title='Pejabat Kemensetneg yang Diperbantukan di Sekretariat Wakil Presiden'
            path={`${router.asPath}/${btoa('staff-khusus-wakil-presiden')}`}
          />
        )}
        <JobChart datas={data} />
        {!staffParams && (
          <CardEmployment
            title='Pejabat Kemensetneg yang Diperbantukan di Sekretariat Wakil Presiden'
            path={`${router.asPath}/${btoa('pejabat-kemensetneg-perbantuan')}`}
          />
        )}
      </Box>
    </LayoutPages>
  )
}

const CardEmployment = ({ title, path }) => {
  const router = useRouter()
  return (
    <Box width='600px' borderRadius={3} sx={styles.headerMap}>
      <Typography textAlign='center' fontWeight='bold' width={'60%'}>
        {title}
      </Typography>
      <Button
        onClick={() => router.push(path)}
        text='Lihat Detail'
        sx={{
          width: '100%'
        }}
      />
    </Box>
  )
}

CardEmployment.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string
}

PetaJabatanComponent.propTypes = {
  data: PropTypes.object
}

export default PetaJabatanComponent
