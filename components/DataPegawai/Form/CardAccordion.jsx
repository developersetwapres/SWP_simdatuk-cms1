import React from 'react'
import PropTypes from 'prop-types'
import Accordion from '@/components/shared/Accordion'
import { Box } from '@mui/material'
import { Button } from '@/components/shared'

const style = {
  footer: {
    width: '100%',
    marginTop: '26px'
  },
  button: {
    width: '100%',
    fontSize: '14px',
    display: 'block',
    fontWeight: 'bold',
    textTransform: 'none'
  }
}

const CardAccordion = ({
  title,
  children,
  footer,
  textAdd,
  isExpand,
  handleAdd = () => {}
}) => {
  return (
    <Accordion title={title} isExpand={isExpand}>
      {children}
      {footer && (
        <Box sx={style?.footer}>
          <Button
            color='primary'
            variant='outlined'
            text={textAdd}
            sx={style?.button}
            onClick={handleAdd}
          />
        </Box>
      )}
    </Accordion>
  )
}

CardAccordion.propTypes = {
  title: PropTypes.string,
  textAdd: PropTypes.string,
  footer: PropTypes.bool,
  footer: PropTypes.bool,
  handleAdd: PropTypes.func,
  children: PropTypes.node,
  isExpand: PropTypes.node
}

export default CardAccordion
