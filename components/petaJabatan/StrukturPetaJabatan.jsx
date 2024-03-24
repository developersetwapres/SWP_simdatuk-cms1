import React from 'react'
import ProfileCard from '../core/card/ProfileCard'
import { Box, Grid, List, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { HiArrowsExpand } from 'react-icons/hi'

const styles = {
  jabatanFungsional: {
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: '#f6ebda',
    paddingY: 2,
    paddingX: 1,
    marginX: 2,
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
  styleBoxProfile,
  openModal = () => { }
}) => {


  const handleOpenModal = (item) => {
    openModal(item, true)
  }



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
      <Grid
        container
        item
        gutter={0}
        padding={0}
        justifyContent='center'
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
                item.id == '1' ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      padding: 0,
                      margin: 0
                    }}
                  >
                    <hr
                      style={{
                        width: '50.4%',
                        height: '2px',
                        border: 0,
                        margin: 0,
                        backgroundColor: '#394346'
                      }}
                    />
                  </Box>
                ) : item.id == data.length ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      padding: 0,
                      margin: 0
                    }}
                  >
                    <hr
                      style={{
                        width: '50.5%',
                        height: '2px',
                        border: 0,
                        margin: 0,
                        backgroundColor: '#394346'
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: 0,
                      margin: 0,
                      backgroundColor: '#394346'
                    }}
                  >
                    <hr
                      style={{
                        width: '100%',
                        height: '2px',
                        border: 0,
                        margin: 0,
                        backgroundColor: '#394346'
                      }}
                    />
                  </Box>
                )
              }
              {
                item.jabatan === 'Jabatan Fungsional' ? (
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
                    <Box
                      sx={styleBoxFungsional || styles.jabatanFungsional}
                    >
                      <Box
                        onClick={() => handleOpenModal(item)}
                        position='absolute'
                        right={15}
                        top={10}
                        fontSize={18}
                        sx={{
                          cursor: 'pointer'
                        }}
                      >
                        <HiArrowsExpand />
                      </Box>
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
                  !item.name ? (
                    <>
                      <hr
                        style={{
                          height: '50px',
                          width: '2px',
                          border: 0,
                          backgroundColor: '#394346',
                          margin: '0 auto'
                        }}
                      />
                      <Box
                        sx={{
                          padding: 2,

                          backgroundColor: '#fff',
                          width: '25vw'
                        }}
                      >
                        <Typography
                          textAlign={'center'}
                          fontWeight='bold'
                        >
                          {item.position}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <hr
                        style={{
                          height: '50px',
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
                      />
                    </>
                  )
                )
              }
            </Grid>
          )
        }
      </Grid >
    </>
  )
}


StrukturPetaJabatan.propTypes = {
  data: PropTypes.array,
  openModal: PropTypes.func,
  styleBoxFungsional: PropTypes.object,
  styleBoxProfile: PropTypes.object
}

export default StrukturPetaJabatan
