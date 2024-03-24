
import React from 'react'
import PetaJabatanLayout from '../PetaJabatanLayout'
import StrukturPetaJabatan from '../StrukturPetaJabatan'
import EmployeeLayout from '@/components/Employee/EmployeeLayout'

const listPegawai = [
  {
    id: 1,
    jabatan: 'Jabatan Fungsional',
    name: [
      {
        childName: 'Arsiparis',
        type: [
          {
            id: 1,
            name: 'Ahli Muda',
            amount: '1/0'
          },
          {
            id: 2,
            name: 'Penyelia',
            amount: '1/0'
          },
          {
            id: 3,
            name: 'Mahir',
            amount: '1/0'
          },
          {
            id: 4,
            name: 'Terampil',
            amount: '1/0'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    position: 'Analis Tata Usaha / Pengolah Data / Pengadministrasi Umum'
  }
]



const style = {
  boxStyleFungsional: {
    marginX: 1,
    backgroundColor: '#f6ebda',
    width: '25vw',
    padding: 2,
    position: 'relative',
    justifyContent: 'center'
  },
  rootStyle: {
    height: 'auto'
  }
}

const KepalaSubBagianComponent = () => {
  return (
    <EmployeeLayout
      summary='Peta Jabatan'
      showExpButton={true}
    >
      <PetaJabatanLayout
        jabatan='Kepala Subbagian Dukungan Administrasi'
        name='Ayu Pudianingtias, S.E., M.P.A.'
        eselon='Es. IV, 02-05-2018'
        golongan='Penata Tingkat I (III/d), 01-04-2023'
        nip='1800005504 / 198806042010122004'
        imageSrc='/simdatuk/imagePegawai.png'
        profil='Lihat Profile'
      >
        <StrukturPetaJabatan
          styleBoxFungsional={style.boxStyleFungsional}
          data={listPegawai}
        />
      </PetaJabatanLayout>
    </EmployeeLayout>
  )
}

export default KepalaSubBagianComponent
