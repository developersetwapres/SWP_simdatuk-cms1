import { Box, Container, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import moment from 'moment'
import PropsType from 'prop-types'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Button } from '../shared'

const ExportLayout = ({
  children,
  summary
}) => {

  
  const exportData = () => {
    const addData = document.querySelector('.export-layout')

    html2canvas(addData).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const doc = new jsPDF()
      const pageWidth = 190
      const pageHeight = doc.internal.pageSize.getHeight()

      doc.addImage(imgData, 'PNG', 10, 10, pageWidth, pageHeight)

      doc.save('laporan.pdf')
    })
  }

  const date = new Date()
  return (
    <Container
      maxWidth='md'
    >
      <Button
        text='Export'
        onClick={exportData}
      />
      <Grid
        className='export-layout'
        container
        direction='column'
      >
        <Grid
          item
          alignSelf='start'
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            marginBottom: '20px'
          }}
        >
          <Image
            src='/simdatuk/Logo.png'
            width={50}
            height={50}
            alt='logo image'
          />
          <Box>
            <Typography
              color='primary'
              sx={{
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              Kementerian
            </Typography>
            <Typography
              color='primary'
              sx={{
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              Sekretariat Negara
            </Typography>
            <Typography
              color='primary'
              sx={{
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              Republik Indonesia
            </Typography>
          </Box>
        </Grid >
        <Grid
          justifyContent='center'
          textAlign='center'
        >
          <Typography
            fontWeight='bold'
            fontSize={16}
            paddingBottom={1}
          >
            {summary}
          </Typography>
          <Typography
            sx={{
              fontSize: 14
            }}
          >
            {`Per Tanggal ${moment(date).format('DD MMMM YYYY')}`}
          </Typography>
        </Grid>
        <Grid>
          {children}
        </Grid>
      </Grid >
    </Container >
  )
}

ExportLayout.propTypes = {
  children: PropsType.node.isRequired,
  summary: PropsType.string.isRequired
}

export default ExportLayout
