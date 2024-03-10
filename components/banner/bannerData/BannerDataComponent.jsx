import React from 'react'
import EmployeeCountComponent from './EmployeeCountComponent'
import EmployeeGenderComponent from './EmployeeGenderComponent'
import EmployeeTypeComponent from './EmployeeTypeComponent'
import ChartComponent from './LayoutBanner/ChartComponent'

function BannerDataComponent() {
  return (
    <>
      <EmployeeCountComponent />
      <EmployeeGenderComponent />
      <EmployeeTypeComponent />
      <ChartComponent />
    </>
  )
}

export default BannerDataComponent