import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card/Index'
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

const style = {
  card: {
    padding: 'unset'
  },
  accordion: {
    padding: 'unset',
    margin: 'unset',
    boxShadow: 'none'
  },
  accordionSummary: {
    fontWeight: 'bold',
    fontSize: '20px',
    padding: 'none',
    margin: 'unset',
    boxShadow: 'none'
  }
}

const Accordion = ({
  children,
  title,
  isExpand = false,
  defaultExpanded = false,
  setExpand = () => { }
}) => {
  return (
    <Card otherStyle={style?.card}>
      <MuiAccordion
        defaultExpanded={defaultExpanded}
        expanded={isExpand}
        onChange={() => setExpand((isExpand) => !isExpand)}
        sx={style?.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel1-content'
          id='panel1-header'
          sx={style?.accordionSummary}
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </MuiAccordion>
    </Card>
  )
}

Accordion.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  isExpand: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  setExpand: PropTypes.func
}

export default Accordion
