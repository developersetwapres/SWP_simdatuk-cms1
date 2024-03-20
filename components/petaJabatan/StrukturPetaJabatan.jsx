import React from 'react'
import ProfileCard from '../core/card/ProfileCard'
import { Box, Grid, List, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const styles = {
  jabatanFungsional: {
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
  }
}


const StrukturPetaJabatan = ({
  data,
  styleBoxFungsional,
  styleBoxProfile
}) => {

  console.log(data.length)
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
      {
        data.length == 2 && (
          <hr
            style={{
              width: '42.4%',
              height: '2px',
              border: 0,
              margin: 0,
              backgroundColor: '#394346'
            }}
          />
        )
      }
      {
        data.length > 2 && (
          <hr
            style={{
              width: '71.1%',
              height: '2px',
              border: 0,
              margin: 0,
              backgroundColor: '#394346'
            }}
          />
        )
      }
      <Grid
        container
        item
        gutter={0}
        padding={0}
        justifyContent='center'
        gap={3}
        sx={{
          position: 'relative',
          width: '100%'
          // backgroundColor: 'blue',
        }}
      >
        {
          data.map((item, index) =>
            <Grid
              item
              key={index + 1}

            >
              {
                item.jabatan === 'Jabatan Fungsional' ? (
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
                      sx={styleBoxFungsional || styles.jabatanFungsional}
                    >
                      <Typography
                        textAlign='center'
                        fontWeight='500'
                      >
                        {item.jabatan}
                      </Typography>
                      {
                        item.name.map((childItem, indexChild) =>
                          <Box
                            key={indexChild + 1}
                            marginTop={1}
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
                              {childItem.childName}
                            </Typography>
                            <List>
                              {
                                childItem.type.map((grandChildItem, indexGrandChild) =>
                                  <Typography
                                    key={indexGrandChild + 1}
                                    fontWeight='600'
                                  >
                                    {`${grandChildItem.id}. ${grandChildItem.name} (${grandChildItem.amount})`}
                                  </Typography>
                                )
                              }
                            </List>
                          </Box>
                        )
                      }
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
                      rootStyle={styleBoxProfile}
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
  data: PropTypes.array,
  styleBoxFungsional: PropTypes.object,
  styleBoxProfile: PropTypes.object
}

export default StrukturPetaJabatan
