/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { Button } from '../shared'
import JobChart from '../shared/JobChart'
import { useRouter } from 'next/router'
import LayoutPages from '../core/LayoutPages'
import ButtonExport from '../core/ButtonExport'
import { SaveAs, saveFile } from '@/utils/fileSaver'
import { useDispatch } from 'react-redux'
import { CLEAR_DIAGRAMS_EXPORT_STATE } from '@/store/constants'

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

const PetaJabatanComponent = ({
  diagram,
  exportDiagram,
  onFetch = () => {},
  exportDiagrams = () => {}
}) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const isDetail = useMemo(() => {
    return router?.pathname.includes('[staff]')
  }, [router])

  const datas = useMemo(() => {
    const diagramData = diagram?.data
    if (Array.isArray(diagramData)) {
      return diagramData
    } else {
      return [diagramData]
    }
  }, [diagram?.data])

  const staffParams = useMemo(() => {
    return router?.query?.staff
  }, [router])

  const action = useMemo(() => {
    return (
      <Box>
        <ButtonExport
          data={[{ name: 'PDF', action: () => exportDiagrams() }]}
        />
      </Box>
    )
  }, [])

  const getFileName = (type) => {
    const prefix = 'PETA_JABATAN'
    let ext = '.pdf'

    if (type?.includes('pdf')) {
      ext = '.pdf'
    } else if (type?.includes('sheet')) {
      ext = '.xlsx'
    } else {
      ext = '.csv'
    }

    return `${prefix}${ext}`
  }

  useEffect(() => {
    const isStaff = router?.pathname.includes('[staff]')
    const staffId = router?.query?.staff

    if (staffId && isStaff) onFetch(atob(staffId))

    if (!isStaff) onFetch('')
  }, [router])

  useEffect(() => {
    const exportFile = exportDiagram?.data
    if (exportFile) {
      saveFile(exportFile, getFileName(exportFile?.type), SaveAs?.PDF)
      dispatch({ type: CLEAR_DIAGRAMS_EXPORT_STATE })
    }
  }, [exportDiagram?.data])

  return (
    <LayoutPages
      handleBack={staffParams ? () => router.back() : null}
      summary='Peta Jabatan'
      action={action}
    >
      <Box sx={styles.boxParent}>
        {datas &&
          datas.map((item, index) =>
            item?.entity == 2 && !isDetail ? (
              <CardEmployment
                title={item?.name}
                path={`${router.asPath}/${btoa(item?.id)}`}
                key={index}
              />
            ) : (
              <JobChart datas={item} key={index} />
            )
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
  diagram: PropTypes.object,
  exportDiagrams: PropTypes.object,
  onFetch: PropTypes.func,
  exportDiagrams: PropTypes.func
}

export default PetaJabatanComponent
