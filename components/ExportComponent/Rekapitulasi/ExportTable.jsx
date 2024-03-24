import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PropsType from 'prop-types'


const ExportTable = ({ summary, data }) => {


  const [total, setTotal] = useState('')

  useEffect(() => {
    if (summary) {
      setTotal(data.reduce((acc, item) => acc + item.amount, 0))
    }
  }, [data, summary])


  return (

    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end'
          }}
        >
          <Typography
            fontWeight='500'
            fontSize={14}
            paddingTop='5px'
          >
            {summary}
          </Typography>
          {
            total && (
              <Typography
                fontWeight='500'
                fontSize={14}
              >
                Total: {total}
              </Typography>
            )
          }
        </Box>
        {
          data.map((item, index) =>
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '5px'
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 14
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: 14
                  }}
                >
                  {item.amount}
                </Typography>
              </Box>
            </Box>
          )
        }
      </Box >
    </>
  )
}

ExportTable.propTypes = {
  summary: PropsType.string,
  data: PropsType.array
}

export default ExportTable
