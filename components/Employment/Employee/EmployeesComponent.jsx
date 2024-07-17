import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import CardProfile from '../../shared/Card/CardProfile'
import LayoutPages from '../../core/LayoutPages'

const EmployeesComponent = ({
  employeesRecap,
  onLoading = () => {},
  getEmployeesRecap = () => {},
  clearEmployeesRecap = () => {}
}) => {
  const router = useRouter()

  const getFlattenedObject = (item) => {
    const itemObject = {
      available: 0,
      childs: [],
      entity: 1,
      filled: 1,
      has_child: false,
      id: item?.id,
      name: item?.position_name,
      type: item?.type,
      users: [
        {
          echelon_name: item?.echelon_name,
          echelon_effective_date: item?.echelon_effective_date,
          employee_id_number: item?.employee_id_number,
          employee_registration_number: item?.employee_registration_number,
          grade_code: item?.grade_code,
          grade_name: item?.grade_name,
          grade_effective_date: item?.grade_effective_date,
          id: item?.id,
          name: item?.name,
          photo_profile: item?.photo_profile,
          position_effective_date: item?.position_effective_date,
          position_name: item?.position_name,
          title_prefix: item?.title_prefix,
          title_suffix: item?.title_suffix,
          type: item?.type
        }
      ]
    }

    return itemObject
  }

  const datas = useMemo(() => {
    const response = employeesRecap?.data
    const category = router?.query?.category
    let positionName = ''

    if (category) {
      const params = JSON.parse(atob(category))
      positionName = params?.name
    }

    const data = {
      ...response,
      positionName,
      employees:
        (response?.items &&
          response?.items.map((item) => getFlattenedObject(item))) ||
        []
    }

    return data
  }, [employeesRecap, router])

  useEffect(() => {
    const category = router?.query?.category

    if (category) {
      const params = JSON.parse(atob(category))
      const payload = {
        page: params?.page,
        categoryId: params?.categoryId,
        sectionId: params?.sectionId,
        cardId: params?.cardId
      }
      getEmployeesRecap(payload)
    }

    router.events.on('routeChangeComplete', clearEmployeesRecap)

    return () => {
      router.events.off('routeChangeComplete', clearEmployeesRecap)
    }
  }, [router])

  useEffect(() => {
    onLoading(!employeesRecap?.loading)
  }, [employeesRecap])

  return (
    <LayoutPages
      summary={datas?.positionName}
      handleBack={() => router.back()}
      count={`Total Keseluruhan : ${datas?.total || 0}`}
    >
      <Grid container spacing={3}>
        {datas?.employees &&
          datas?.employees?.map((item) => {
            return (
              <Grid item xs={12} sm={3} key={item?.id}>
                <CardProfile key={item?.id} data={item} />
              </Grid>
            )
          })}
      </Grid>
    </LayoutPages>
  )
}

EmployeesComponent.propTypes = {
  employeesRecap: PropTypes.object,
  onLoading: PropTypes.func,
  getEmployeesRecap: PropTypes.func,
  clearEmployeesRecap: PropTypes.func
}

export default EmployeesComponent
