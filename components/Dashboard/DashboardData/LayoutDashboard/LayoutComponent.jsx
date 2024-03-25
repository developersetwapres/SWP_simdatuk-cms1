/* eslint-disable @next/next/no-img-element */
import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import AssideComponent from './AssideComponent'

function LayoutComponent({
  title,
  subtitle,
  nameDataLeft,
  nameDataRight,
  leftData,
  rightData,
  name }) {


  return (
    <Paper
      sx={{
        marginTop: '1rem',
        padding: '5rem',
        display: 'flex',
        justifyContent: 'center'

      }}
    >
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={5}
      >

        <Grid>
          <Box item>
            <Typography
              variant='h4'
              component='h4'
              fontSize={24}
              fontWeight='bold'
            >
              {title}
            </Typography>
            <Typography
              variant='h6'
              component='p'
              fontSize={14}
            >
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '5rem',
              marginTop: '20px'
            }}
          >
            <Box>
              <Typography
                variant='h6'
                component='h6'
                fontSize={14}
                marginBottom={2}
              >
                {nameDataLeft}
              </Typography>
              <Typography
                variant='h4'
                component='p'
                fontSize={24}
                fontWeight='bold'
                color='primary'
              >
                {leftData}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant='h6'
                component='h6'
                fontSize={14}
                marginBottom={2}
              >
                {nameDataRight}
              </Typography>
              <Typography
                variant='h4'
                component='p'
                fontSize={24}
                fontWeight='bold'
                color='primary'
              >
                {rightData}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <AssideComponent
          name={name}
        />
      </Grid>
    </Paper>
  )
}

LayoutComponent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  nameDataLeft: PropTypes.string,
  nameDataRight: PropTypes.string,
  leftData: PropTypes.string,
  rightData: PropTypes.string,
  name: PropTypes.string
}

export default LayoutComponent
