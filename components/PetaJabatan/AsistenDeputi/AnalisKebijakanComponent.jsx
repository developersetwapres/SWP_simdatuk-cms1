
import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import JabatanFungsionalDetail from '../JabatanFungsionalComponent.jsx/JabtanFungsionalDetail'
import ProfileCard from '@/components/core/card/ProfileCard'
import ModalAnalis from '@/components/core/ModalAnalis'
import EmployeeLayout from '@/components/Employee/EmployeeLayout'

const listPegawai = [
  {
    id: 1,
    jabatan: 'Ahli Madya',
    pegawai: [
      {
        id: 1,
        position: 'Kepala Subbagian Dukungan Administrasi',
        name: 'Sri Komsiyatun, S.E., MAk.',
        image: '/simdatuk/imagePegawai.png',
        eselon: '',
        golongan: 'Pembina Tingkat I (IV/b), 01-04-2022',
        NIP: '180005043 / 198109032006042003'
      }
    ]
  },
  {
    id: 2,
    jabatan: 'Ahli Muda',
    pegawai: [
      {
        id: 1,
        position: 'Kepala Subbagian Dukungan Administrasi',
        name: 'Sri Komsiyatun, S.E., MAk.',
        image: '/simdatuk/imagePegawai.png',
        eselon: '',
        golongan: 'Pembina Tingkat I (IV/b), 01-04-2022',
        NIP: '180005043 / 198109032006042003'
      }
    ]
  },
  {
    id: 3,
    jabatan: 'Ahli Pertama',
    pegawai: []
  }
]


const style = {
  boxStyleFungsional: {
    marginX: 1,
    backgroundColor: '#fff',
    width: '25vw',
    paddingY: 2,
    position: 'relative',
    justifyContent: 'center'
  },
  rootStyle: {
    height: 'auto'
  }
}

const AnalisKebijakanComponent = () => {
  const [modalData, setModalData] = useState({})
  const [openModal, setOpenModal] = useState(false)

  const getModalData = (data, modal) => {
    setModalData(data)
    setOpenModal(modal)
  }


  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <EmployeeLayout
      summary='Peta Jabatan'
      showExpButton={true}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >

        <Box
          sx={{
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            width: '30%',
            p: 2
          }}
        >
          <Typography
            fontWeight='600'
            textAlign='center'

          >
            Analis Kebijakan
          </Typography>
        </Box>

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
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >

          {
            listPegawai.map((item, index) =>
              <Box
                key={index + 1}
              >
                <JabatanFungsionalDetail
                  styleBoxFungsional={style.boxStyleFungsional}
                  jabatan={item.jabatan}
                  amount={item.pegawai.length}
                  dataLength={listPegawai}
                  data={item}
                  openModal={getModalData}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {
                      item.pegawai.map((data, index) =>
                        <Box
                          key={index + 1}
                          backgroundColor='#FFF'
                          border='1px solid #000'
                          borderRadius='10px'
                          width='80%'
                          sx={{
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                        >
                          <ProfileCard
                            rootStyle={style.rootStyle}
                            imageSource={data.image}
                            name={data.name}
                            position={data.position}
                            eselon={data.eselon}
                            golongan={data.golongan}
                            nip={data.NIP}
                          />
                        </Box>
                      )
                    }
                  </Box>
                </JabatanFungsionalDetail>
              </Box>
            )
          }
          <ModalAnalis
            openModal={openModal}
            closeModal={handleCloseModal}
            data={modalData}
          />
        </Box>
      </Box>

    </EmployeeLayout>
  )
}

export default AnalisKebijakanComponent
