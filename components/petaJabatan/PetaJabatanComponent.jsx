import React from 'react'
import EmployeeLayout from '../employee/EmployeeLayout'
import PetaJabatanLayout from './PetaJabatanLayout'
import { Box, Typography } from '@mui/material'
import { Button } from '../shared'
import StrukturPetaJabatan from './StrukturPetaJabatan'


const styles = {
  headerMap: {
    backgroundColor: '#fff',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '15px'
  },
  boxParent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6rem',
    marginBottom: '10rem'
  }
}


const PetaJabatanComponent = () => {


  const data = [
    {
      id: 1,
      position: 'Kepala Sekretariat Wakil Presiden',
      name: 'Dr. Ir. Suprayoga Hadi, M.S.P.'
    },
    {
      id: 2,
      position: 'Asisten Deputi Ekonomi dan Keuangan',
      name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
      image: '/simdatuk/imagePegawai.png',
      eselon: 'Es. I.a., 25-01-2021',
      golongan: 'Pembina Utama (IV/e), 01-04-2017',
      NIP: '1965053019991031002'
    },
    {
      id: 3,
      position:
        'Asisten Deputi Industri, Perdagangan, Pariwisata, dan Ekonomi Kreatif ',
      name: 'Dr. Velix Vernando Wanggai S.IP., MPA',
      image: '/simdatuk/imagePegawai.png',
      eselon: 'Es. I.a, 23-08-2022',
      golongan: 'Pembina Utama Muda (IV/c), 01-10-2019',
      NIP: '197202161998031005'
    },
    {
      id: 4,
      position: 'Kepala Subbagian Dukungan Administrasi',
      name: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.',
      image: '/simdatuk/imagePegawai.png',
      eselon: 'Es. I.a, 01-03-2023',
      golongan: 'Pembina Utama (IV/e), 01-03-2023',
      NIP: '180004061 / 197010271995031001'
    }
  ]


  return (
    <EmployeeLayout
      summary='Peta Jabatan'
      showExpButton={true}
    >
      <Box
        sx={styles.boxParent}
      >
        <PetaJabatanLayout
          imageSrc='/simdatuk/imagePegawai.png'
          jabatan='Kepala Sekretariat Wakil Presiden'
          name='Ahmad Erani Yustika, S.E., M.Sc., Ph.D.'
          eselon='Es. I.a., 25-01-2021'
          golongan='Pembina Utama Madya (IV/d), 01-04-2017'
          nip='197303221997021001'
          profil={true}
          detail={true}
        >

          {/* Struktur jabatan */}
          <StrukturPetaJabatan
            data={data}
          />
          {/* End Struktur jabatan */}

        </PetaJabatanLayout>

        <Box
          width='40vw'
          borderRadius={3}
          sx={styles.headerMap}
        >
          <Typography
            textAlign='center'
            fontWeight='bold'
          >
            Pejabat Kemensetneg yang Diperbantukan
            di Sekretariat Wakil Presiden
          </Typography>
          <Button
            text='Lihat Detail'
          />
        </Box>
      </Box>
    </EmployeeLayout >
  )
}

export default PetaJabatanComponent
