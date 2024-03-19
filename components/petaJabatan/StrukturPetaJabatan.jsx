import React from 'react'
import ProfileCard from '../core/card/ProfileCard'
import { Box, Grid, List, ListItem, Typography } from '@mui/material'
import PropTypes from 'prop-types'
const StrukturPetaJabatan = ({data}) => {
  return (
    <>
      <hr
        style={{
          height: '50px',
          backgroundColor: '#394346',
          width: '2px',
          border: 0,
          margin: '0 auto'
        }}
      />
      <hr
        style={{
          width: '71.1%',
          height: '2px',
          border: 0,
          margin: 0,
          backgroundColor: '#394346'
        }}
      />
      <Grid
        container
        item
        gutter={0}
        padding={0}
        justifyContent='center'
        gap={3}
      >
        {
          data.map((item, index) =>
            <Grid
              item
              key={index + 1}

            >
              {
                item.name === 'Jabatan Fungsional' ? (
                  <>
                    <hr
                      style={{
                        height: '10%',
                        width: '2px',
                        border: 0,
                        backgroundColor: '#394346',
                        margin: '0 auto'
                      }}
                    />
                    <Box
                      sx={{
                        borderRadius: '5px',
                        backgroundColor: '#f6ebda',
                        paddingY: 2,
                        paddingX: 1,
                        width: {
                          lg: '16vw',
                          md: '18vw',
                          sm: '25vw',
                          xs: '50vw'
                        }
                      }}
                    >
                      <Typography
                        textAlign='center'
                        fontWeight='500'
                      >
                        Jabatan Fungsional
                      </Typography>
                      <Box
                        backgroundColor='#FFF'
                        border='1px solid #000'
                        borderRadius='10px'
                        padding={1}
                      >
                        <Typography
                          textAlign='center'
                          fontWeight='600'
                          color='primary'
                        >
                          Analisis Kebijakan
                        </Typography>
                        <List>
                          <ListItem
                            fontWeight='500'
                          >
                            <Typography
                              fontWeight='500'
                            >
                              1. Ahli Utama (1/0)
                            </Typography>
                          </ListItem>
                        </List>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    <hr
                      style={{
                        height: '10%',
                        width: '2px',
                        border: 0,
                        backgroundColor: '#394346',
                        margin: '0 auto'
                      }}
                    />
                    <ProfileCard
                      summary={item.position}
                      name={item.name}
                      imageSource={item.image}
                      eselon={item.eselon}
                      golongan={item.golongan}
                      nip={item.NIP}
                      lihatProfile='Lihat Profil'
                      lihatDetail='Lihat Detail'
                    /></>
                )
              }
            </Grid>
          )
        }
      </Grid>
    </>
  )
}

StrukturPetaJabatan.propTypes = {
  data: PropTypes.array
}

export default StrukturPetaJabatan
