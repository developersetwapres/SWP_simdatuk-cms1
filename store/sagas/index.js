/**
 *
 * Root Sagas
 *
 */
import { all } from '@redux-saga/core/effects'

import authSaga from './authenticationSaga'

// Master Data
import decreeSaga from './masterData/decreeSaga'
import residenceSaga from './masterData/residenceSaga'
import userSaga from './masterData/userSaga'
import roleSaga from './masterData/roleSaga'
import echelonSaga from './masterData/echelonSaga'
import institutionSaga from './masterData/institutionSaga'
import employmentTypeSaga from './masterData/employmentTypeSaga'
import positionSaga from './masterData/positionSaga'
import groupSaga from './masterData/groupSaga'

// Dashboard
import dashboardSaga from './dashboardSaga'

// Recap
import notesSaga from './recap/notesSaga'
import compositionSaga from './recap/compositionSaga'
import asnSaga from './recap/asnSaga'
import nonASNSaga from './recap/nonASNSaga'
import outsourceSaga from './recap/outsourceSaga'
import promotionSaga from './recap/promotionSaga'
import diagramSaga from './recap/diagramSaga'
import employeesRecapSaga from './recap/employeesRecapSaga'

// Employee
import employeeSaga from './employeeSaga'

// History
import positionHistoriesSaga from './histories/positionSaga'
import gradeSaga from './histories/gradeSaga'
import recognitionSaga from './histories/recognitionSaga'
import trainingSaga from './histories/trainingSaga'
import targetSaga from './histories/targetSaga'
import performanceSaga from './histories/performanceSaga'
import disciplinarySaga from './histories/disciplinarySaga'

// Export
import exportDRHSaga from './export/exportDRHSaga'
import exportRecapSaga from './export/exportRecapSaga'
import exportEmployeeSaga from './export/exportEmployeeSaga'
import exportComparisonSaga from './export/exportComparisonSaga'
import exportPromotionSaga from './export/exportPromotionSaga'
import exportDiagramSaga from './export/exportDiagramSaga'

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    roleSaga(),
    echelonSaga(),
    employeeSaga(),
    dashboardSaga(),
    notesSaga(),
    compositionSaga(),
    asnSaga(),
    nonASNSaga(),
    outsourceSaga(),
    promotionSaga(),
    positionHistoriesSaga(),
    gradeSaga(),
    recognitionSaga(),
    decreeSaga(),
    trainingSaga(),
    targetSaga(),
    performanceSaga(),
    disciplinarySaga(),
    institutionSaga(),
    employmentTypeSaga(),
    residenceSaga(),
    exportDRHSaga(),
    exportRecapSaga(),
    exportEmployeeSaga(),
    exportComparisonSaga(),
    exportPromotionSaga(),
    positionSaga(),
    groupSaga(),
    diagramSaga(),
    employeesRecapSaga(),
    exportDiagramSaga()
  ])
}
