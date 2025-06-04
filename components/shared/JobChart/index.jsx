/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react'
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

  const employee = useMemo(() => {
    if (`${datas?.id}` == '4') {
      const payload = {
        ...datas,
        childs:
          datas?.childs &&
          datas?.childs.map((item) => {
            return {
              ...item,
              users: item?.users.map((itm) => {
                return {
                  ...itm,
                  type: 4
                }
              }),
              has_child: false
            }
          })
      }

      return payload
    } else if (datas?.id.toString() == '1' || datas?.id.toString() == '3') {
      const payload = {
        ...datas,
        childs:
          datas?.childs &&
          datas?.childs.map((item) => {
            return {
              ...item,
              users: item?.users.map((itm) => {
                return {
                  ...itm,
                  type: 3
                }
              })
            }
          })
      }

      return payload
    } else if (datas?.type.toString() == '2') {
      const payload = {
        ...datas,
        childs:
          datas?.childs &&
          datas?.childs.map((item) => {
            return {
              ...item,
              users: item?.users.map((itm) => {
                return {
                  ...itm,
                  type: 2
                }
              })
            }
          })
      }

      return payload
    }

    return datas
  }, [datas])

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
      <PetaJabatanLayout data={datas}>
        <StrukturPetaJabatan
          data={employee?.childs || []}
          isModal={isModal}
          handleModal={handleModal}
        />
      </PetaJabatanLayout>
      {isTypeModal &&
        data &&
        (isTypeModal == CardTypes?.FUNGSIONAL ? (
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
