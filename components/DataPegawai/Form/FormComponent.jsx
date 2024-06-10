import React from 'react'
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import PropTypes from 'prop-types'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EmployeeForm from '../Form/EmployeeForm'
import EducationForm from '../Form/EducationForm'
import FamilyForm from '../Form/FamilyForm'
import PaidLeaveForm from '../Form/PaidLeaveForm'
import Card from '@/components/shared/Card/Index'
import NotesForm from '../Form/NotesForm'
import AssessmentForm from '../Form/AssessmentForm'
import CompetenceTestForm from '../Form/CompetenceTestForm'
import TalentPoolForm from '../Form/TalentPoolForm'
import PositionForm from '../Form/PositionForm'
import TypeForm from '../Form/TypeForm'
import StructuralTrainingForm from '../Form/StructuralTrainingForm'
import FunctionalTrainingForm from '../Form/FunctionalTrainingForm'
import TechnicalTrainingForm from '../Form/TechnicalTrainingForm'
import AwardForm from '../Form/AwardForm'
import SKPForm from '../Form/SKPForm'
import DisciplinaryForm from '../Form/DisciplinaryForm'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2
}
const accordionStyles = {
  padding: 'unset',
  margin: 'unset',
  boxShadow: 'none'
}
const accordionSummaryStyles = {
  fontWeight: 'bold',
  fontSize: '20px',
  padding: 'none',
  margin: 'unset',
  boxShadow: 'none'
}
const cardStyle = {
  padding: 'unset'
}

function FormComponent({ formType }) {
  return (
    <Box sx={containerStyles}>
      <Card otherStyle={cardStyle}>
        <Accordion defaultExpanded sx={accordionStyles}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
            sx={accordionSummaryStyles}
          >
            Data Pegawai
          </AccordionSummary>
          <AccordionDetails>
            <EmployeeForm />
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card otherStyle={cardStyle}>
        <Accordion sx={accordionStyles}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
            sx={accordionSummaryStyles}
          >
            Pendidikan
          </AccordionSummary>
          <AccordionDetails>
            <EducationForm />
          </AccordionDetails>
        </Accordion>
      </Card>

      {formType == 'edit' && (
        <>
          <Card otherStyle={cardStyle}>
            <Accordion sx={accordionStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
                sx={accordionSummaryStyles}
              >
                Jabatan
              </AccordionSummary>
              <AccordionDetails>
                <PositionForm />
              </AccordionDetails>
            </Accordion>
          </Card>

          <Card otherStyle={cardStyle}>
            <Accordion sx={accordionStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
                sx={accordionSummaryStyles}
              >
                Golongan
              </AccordionSummary>
              <AccordionDetails>
                <TypeForm />
              </AccordionDetails>
            </Accordion>
          </Card>

          <Card otherStyle={cardStyle}>
            <Accordion sx={accordionStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
                sx={accordionSummaryStyles}
              >
                Pelatihan Struktural
              </AccordionSummary>
              <AccordionDetails>
                <StructuralTrainingForm />
              </AccordionDetails>
            </Accordion>
          </Card>

          <Card otherStyle={cardStyle}>
            <Accordion sx={accordionStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
                sx={accordionSummaryStyles}
              >
                Pelatihan Fungsional
              </AccordionSummary>
              <AccordionDetails>
                <FunctionalTrainingForm />
              </AccordionDetails>
            </Accordion>
          </Card>

          <Card otherStyle={cardStyle}>
            <Accordion sx={accordionStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
                sx={accordionSummaryStyles}
              >
                Pelatihan Teknis
              </AccordionSummary>
              <AccordionDetails>
                <TechnicalTrainingForm />
              </AccordionDetails>
            </Accordion>
          </Card>

          <Card otherStyle={cardStyle}>
            <Accordion sx={accordionStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
                sx={accordionSummaryStyles}
              >
                Penghargaan
              </AccordionSummary>
              <AccordionDetails>
                <AwardForm />
              </AccordionDetails>
            </Accordion>
          </Card>

          <Card otherStyle={cardStyle}>
            <Accordion sx={accordionStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
                sx={accordionSummaryStyles}
              >
                SKP
              </AccordionSummary>
              <AccordionDetails>
                <SKPForm />
              </AccordionDetails>
            </Accordion>
          </Card>

          <Card otherStyle={cardStyle}>
            <Accordion sx={accordionStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
                sx={accordionSummaryStyles}
              >
                Hukuman Disiplin
              </AccordionSummary>
              <AccordionDetails>
                <DisciplinaryForm />
              </AccordionDetails>
            </Accordion>
          </Card>

          <Card otherStyle={cardStyle}>
            <Accordion sx={accordionStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
                sx={accordionSummaryStyles}
              >
                Penilaian Prestasi Kerja
              </AccordionSummary>
              <AccordionDetails>

              </AccordionDetails>
            </Accordion>
          </Card>
        </>
      )}

      <Card otherStyle={cardStyle}>
        <Accordion sx={accordionStyles}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
            sx={accordionSummaryStyles}
          >
            Keluarga
          </AccordionSummary>
          <AccordionDetails>
            <FamilyForm />
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card otherStyle={cardStyle}>
        <Accordion sx={accordionStyles}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
            sx={accordionSummaryStyles}
          >
            Cuti
          </AccordionSummary>
          <AccordionDetails>
            <PaidLeaveForm />
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card otherStyle={cardStyle}>
        <Accordion sx={accordionStyles}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
            sx={accordionSummaryStyles}
          >
            Catatan
          </AccordionSummary>
          <AccordionDetails>
            <NotesForm />
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card otherStyle={cardStyle}>
        <Accordion sx={accordionStyles}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
            sx={accordionSummaryStyles}
          >
            Hasil Assessment
          </AccordionSummary>
          <AccordionDetails>
            <AssessmentForm />
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card otherStyle={cardStyle}>
        <Accordion sx={accordionStyles}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
            sx={accordionSummaryStyles}
          >
            Hasil Uji Kompetensi
          </AccordionSummary>
          <AccordionDetails>
            <CompetenceTestForm />
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card otherStyle={cardStyle}>
        <Accordion sx={accordionStyles}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
            sx={accordionSummaryStyles}
          >
            Hasil Talent Pool
          </AccordionSummary>
          <AccordionDetails>
            <TalentPoolForm />
          </AccordionDetails>
        </Accordion>
      </Card>
    </Box>
  )
}

FormComponent.propTypes = {
  formType: PropTypes.string.isRequired
}

export default FormComponent