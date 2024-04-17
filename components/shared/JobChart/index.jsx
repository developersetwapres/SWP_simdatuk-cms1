/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import PetaJabatanLayout from '@/components/PetaJabatan/PetaJabatanLayout'
import StrukturPetaJabatan from '@/components/PetaJabatan/StrukturPetaJabatan'
import ModalEmployee from '../Modal/ModalEmployee'
import ModalJobs from '../Modal/ModalJobs'
import { CardTypes } from 'libs/types/CardTypes'

const JobChart = ({ datas }) => {
  const [isModal, setIsModal] = useState(false)
  const [isTypeModal, setIsTypeModal] = useState(null)
  const [data, setData] = useState(null)

  const handleModal = (type, data) => {
    setIsModal((isModal) => !isModal)
    setIsTypeModal(type)
    setData(data)
  }

  useEffect(() => {
    if (isTypeModal && !isModal) setIsTypeModal(null)
  }, [isModal, isTypeModal])

  return (
    <>
      <PetaJabatanLayout data={datas?.parent}>
        <StrukturPetaJabatan data={datas?.children} handleModal={handleModal} />
      </PetaJabatanLayout>
      {isTypeModal &&
        data &&
        (isTypeModal == CardTypes?.CARDJOBS ? (
          <ModalJobs isModal={isModal} handleModal={handleModal} data={data} />
        ) : (
          <ModalEmployee
            isModal={isModal}
            handleModal={handleModal}
            data={data}
          />
        ))}
    </>
  )
}

JobChart.propTypes = {
  datas: PropTypes.any
}

export default JobChart
