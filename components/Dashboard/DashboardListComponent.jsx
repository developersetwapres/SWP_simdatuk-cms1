/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'


function DashboardListComponent({
  // deleteListBanner = () => { },
  // onPaginationChange = () => { }
}) {

  // const selector = useSelector((state) => state.responserReducer)
  const [id, setId] = useState('')


  const data = Array.from({ length: 8 }, (_, index) => index + 1)


  return (
    <Grid container
      spacing={2}
      sx={{
        width: 'auto',
        // overflowX: 'scroll',
        marginTop: '20px'
      }}
    >
      {
        data.map((data, i) =>
          <Grid
            key={i}
            container
            item
            alignItems='center'
            justifyContent='center'
            maxWidth={250}
            lg={3}
            md={4}
            sm={6}
          >
            <Grid
              item
              height={200}
              sx={{
                borderRadius: '15px',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: '#000',
                overflow: 'hidden'
              }}
            >
              <Image
                src='/simdatuk/imagePegawai.png'
                height={200}
                width={150}
                alt='image'
              />
            </Grid>
            <Grid
              textAlign='center'
              paddingTop={2}
              item>
              <Typography
                variant='p'
                color='primary'
                sx={{
                  fontWeight: 'bold',
                  marginBottom: '14px'
                }}
              >
                Dr. Ir. Suprayoga Hadi, M.S.P.
              </Typography>
              <Typography
                paddingTop={3}
              >
                12-12-1974
              </Typography>
            </Grid>
          </Grid>
        )
      }
    </Grid>
  )
}

export default DashboardListComponent