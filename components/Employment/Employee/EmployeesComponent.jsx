import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import CardProfile from '../../shared/Card/CardProfile'
import LayoutPages from '../../core/LayoutPages'

const EmployeesComponent = ({ data }) => {
  const router = useRouter()

  const totalCount = useMemo(() => {
    return data?.children.reduce((acc, child) => {
      return acc + child.slot
    }, 0)
  }, [data])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary={data?.title}
      count={`Total Keseluruhan : ${totalCount}`}
    >
      <Grid container spacing={3}>
        {data?.children.map((item, index) => (
          <Grid item xs={3} key={index}>
            <CardProfile data={item} />
          </Grid>
        ))}
      </Grid>
    </LayoutPages>
  )
}

EmployeesComponent.propTypes = {
  data: PropTypes.object
}

export default EmployeesComponent
