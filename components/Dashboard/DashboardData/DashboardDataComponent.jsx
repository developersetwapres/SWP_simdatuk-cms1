import React from 'react'
import EmployeeCountComponent from './EmployeeCountComponent'
import EmployeeGenderComponent from './EmployeeGenderComponent'
import EmployeeTypeComponent from './EmployeeTypeComponent'
import ChartComponent from './LayoutDashboard/ChartComponent'

function DashboardDataComponent() {
  return (
    <>
      <EmployeeCountComponent />
      <EmployeeGenderComponent />
      <EmployeeTypeComponent />
      <ChartComponent />
    </>
  )
}

export default DashboardDataComponent