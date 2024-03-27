import React, { useEffect, useState } from 'react'
import CheckboxCard from '../core/CheckboxCard'
import { Box } from '@mui/material'
import ProfileCard from '../core/card/ProfileCard'
import { eselon1 } from '../Employee/AsnActive/dummiData'
import PropTypes from 'prop-types'


const ListPegawai = ({
  checkAmount=()=>{}
}) => {
  const [checkList, setCheckList] = useState([])
  const [checkAll, setCheckAll] = useState(false)


  const getCheckValue = (value) => {
    if (checkList.length > 0) {
      setCheckAll(false)
      setCheckList([...checkList, value[0]])
    } else {
      setCheckAll(false)
      setCheckList(value)
    }
  }

  const deleteValueCheck = (id) => {
    if (checkList.includes(id)) {
      const index = checkList.indexOf(id)
      if (index !== -1) {
        const newArray = [...checkList]
        newArray.splice(index, 1)
        setCheckList(newArray)
      }
    }
  }

  const hanldeChekAll = () => {
    setCheckAll(!checkAll)
  }
  
  
  useEffect(() => {
    checkAmount(checkList)
  }, [checkAmount, checkList])

  return (
    <>
      <CheckboxCard
        checkedParent={checkAll}
        checkIndeterminate={checkAll == false}
        getChekAll={hanldeChekAll}
        label='Pilih Semua'
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3 }}>
          {
            eselon1.map((item, index) => {
              return (
                <ProfileCard
                  name={item.name}
                  eselon={item.eselon}
                  golongan={item.golongan}
                  nip={item.NIP}
                  imageSource={item.image}
                  check={true}
                  key={index}
                  id={item.id}
                  chekValue={getCheckValue}
                  deleteValue={deleteValueCheck}
                  chekedAll={checkAll}
                />
              )
            })
          }
        </Box>
      </CheckboxCard>
    </>
  )
}

ListPegawai.propTypes = {
  checkAmount: PropTypes.func
}

export default ListPegawai
