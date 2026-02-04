/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { Button } from '../shared'
import JobChart from '../shared/JobChart'
import { useRouter } from 'next/router'
import LayoutPages from '../core/LayoutPages'
import ButtonExport from '../core/ButtonExport'
import { SaveAs, saveFile } from '@/utils/fileSaver'
import { useDispatch } from 'react-redux'
import { CLEAR_DIAGRAMS_EXPORT_STATE } from '@/store/constants'
import { createShortUuidUrl, extractIdFromShortUuidUrl } from '@/utils'

const styles = {
  headerMap: {
    width: '100%',
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
    flexDirection: 'row',
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
          isLoading={exportDiagram?.loading}
        />
      </Box>
    )
  }, [exportDiagram?.loading])

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
    const staffId = extractIdFromShortUuidUrl(router?.query)

    if (staffId && isStaff) onFetch(staffId)

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
        <Grid
          container
          spacing={3}
          alignItems={'end'}
          justifyContent={'center'}
        >
          {datas &&
            datas.map((item, index) =>
              item?.entity == 2 && !isDetail ? (
                <Grid item xs={index + 1 == datas.length ? 4 : 3} key={index}>
                  <CardEmployment
                    title={item?.name}
                    path={createShortUuidUrl(`/rekapitulasi/peta-jabatan`, item?.id)}
                  />
                </Grid>
              ) : (
                <Grid item xs={staffParams ? 12 : 6} key={index}>
                  <JobChart datas={item} />
                </Grid>
              )
            )}
        </Grid>
      </Box>
    </LayoutPages>
  )
}

const CardEmployment = ({ title, path }) => {
  const router = useRouter()
  return (
    <Box borderRadius={3} sx={styles.headerMap}>
      <Typography textAlign='center' fontWeight='bold' width={'100%'}>
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
