import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import CardProfile from '../../shared/Card/CardProfile'
import LayoutPages from '../../core/LayoutPages'

const EmployeesComponent = ({
  datas
}) => {
  const router = useRouter()

  const totalCount = useMemo(() => {
    return datas?.employees?.reduce((acc, child) => {
      return acc + (child?.slot || 0)
    }, 0)
  }, [datas])

  return (
    <LayoutPages
      summary='Posisi'
      handleBack={() => router.back()}
      count={`Total Keseluruhan : ${totalCount}`}
    >
      <Grid container spacing={3}>
        {datas?.employees?.map((item, index) => (
          <Grid item xs={3} key={index}>
            <CardProfile
              data={{
                ...item,
                children: [
                  ...item.children.map(
                    c => ({
                      ...c,
                      pathProfil: router.asPath + `/${btoa(index + 1)}`
                    })
                  )
                ]
              }}
            />
          </Grid>
        ))}
      </Grid>
    </LayoutPages>
  )
}

EmployeesComponent.propTypes = {
  datas: PropTypes.object
}

export default EmployeesComponent
