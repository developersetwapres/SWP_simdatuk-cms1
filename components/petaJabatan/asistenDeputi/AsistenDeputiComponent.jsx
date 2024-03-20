import EmployeeLayout from '@/components/employee/EmployeeLayout'
import React from 'react'
import PetaJabatanLayout from '../PetaJabatanLayout'
import { Box } from '@mui/material'
import StrukturPetaJabatan from '../StrukturPetaJabatan'

const listPegawai = [
  {
    id: 1,
    jabatan: 'Jabatan Fungsional',
    name: [
      {
        childName: 'Analisis Kebijakan',
        type: [
          {
            id: 1,
            name: 'Ahli Madya',
            amount: '3/2'
          },
          {
            id: 2,
            name: 'Ahli Muda',
            amount: '5/2'
          },
          {
            id: 3,
            name: 'Ahli Pertama',
            amount: '2/0'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    position: 'Kepala Subbagian Dukungan Administrasi',
    name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
    image: '/simdatuk/imagePegawai.png',
    eselon: 'Es. IV. 02-05-2018',
    golongan: 'Penata Tingkat I (III/d), 01-04-2023',
    NIP: '1800005504 / 198806042010122004'
  }
]

const styles = {
  styleBoxFungsional: {
    backgroundColor: '#f6ebda',
    width: '30vw',
    padding: 2
  },
  styleBoxPrifleCard: {
    backgroundColor: '#fff',
    width: '30vw',
    padding: 2
  }
}

const AsistenDeputiComponent = () => {
  return (
    <EmployeeLayout
      summary='Peta Jabatan'
      showExpButton={true}
    >
      <Box
        marginBottom='10rem'
      >
        <PetaJabatanLayout
          jabatan='Asisten Deputi Ekonomi dan Keuangan'
          profil={true}
          imageSrc='/simdatuk/imagePegawai.png'
          name='Ahmad Erani Yustika, S.E., M.Sc., Ph.D.'
          eselon='Es. I.a., 25-01-2021'
          golongan='Pembina Utama Madya (IV/d), 01-04-2017'
          nip='197303221997021001'
        >
          <StrukturPetaJabatan
            data={listPegawai}
            styleBoxProfile={styles.styleBoxPrifleCard}
            styleBoxFungsional={styles.styleBoxFungsional}
          />
        </PetaJabatanLayout>
      </Box>
    </EmployeeLayout>
  )
}

export default AsistenDeputiComponent
