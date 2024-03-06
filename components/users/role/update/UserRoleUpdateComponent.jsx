
import React, { useState } from 'react'
import UserRoleUpdateFormComponent from './UserRoleUpdateFormComponent'
import UserRoleUpdateToolbar from './UserRoleUpdateToolbar'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/'
import { useEffect } from 'react'

function UserRoleUpdateComponent({
  role,
  command,
  updateRole = () => { }
}) {

  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    name: role?.detailData?.name
  })

  const [checkedMenu, setCheckedMenu] = useState([])
  const [childMenu, setChildMenu] = useState([])
  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('name' in fieldOfValues)
      temp.name = fieldOfValues.name ? '' : 'Nama Pengguna tidak boleh kosong'

    setErrors({
      ...temp
    })

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '')
  }

  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialValues, true, validate)

  //* Transform 
  function transform(array) {
    return Object.values(
      array.reduce((obj, { menu_id, menu_access, menu_name }) => {
        if (obj[menu_id]) {
          obj[menu_id].menu_access.push(menu_access)
        } else {
          obj[menu_id] = { menu_id, menu_name, menu_access: [menu_access] }
        }
        return obj
      }, {})
    )
  }


  // * Handle Menu Will checked 
  const handleMenuChecked = (e, val) => {
    if (e?.target.name === 'CRU') {
      if (e?.target.value === true) {
        val?.access.map(v => {
          if (v.id === 1) {
            v.menu?.map(x => {
              setCheckedMenu(prev => [...prev, {
                menu_id: val.id,
                menu_name: val.text,
                menu_access: x
              }])
            })
          }
        })
      } else {
        const m = [0, 1, 2]
        setCheckedMenu(checkedMenu.filter((x) => x.menu_id !== val.id && m.includes(x.menu_access)))
      }
    } else if (e.target.name === 'D') {
      if (e.target.value === true) {
        val?.access.map(v => {
          if (v.id === 2) {
            v.menu?.map(x => {
              setChildMenu(prev => [...prev, {
                menu_id: val.id,
                menu_name: val.text,
                menu_access: x
              }])
            })
          }
        })
      } else {
        const m = [3]
        setChildMenu(childMenu.filter((x) => x.menu_id !== val.id && m.includes(x.menu_access)))
      }
    }
  }

  useEffect(() => {
    const temp = []
    const tempChild = []
    role?.detailData?.menu?.map((v) => {
      if (v.menu_access === 3) {
        tempChild.push({
          menu_id: v.menu_id,
          menu_name: v.menu_name,
          menu_access: 3
        })
      } else {
        [0, 1, 2].map((b) => {
          temp.push({
            menu_id: v.menu_id,
            menu_name: v.menu_name,
            menu_access: b
          })
        })
      }
    })
    setCheckedMenu(temp)
    setChildMenu(tempChild)
  }, [role, command])

  const merge = [...checkedMenu, ...childMenu]
  const handleSubmit = () => {
    if (validate()) {

      const c = childMenu?.map(v => {
        return [1, 3].map((b) => {
          return {
            menu_id: v.menu_id,
            menu_name: v.menu_name,
            menu_access: b
          }
        })
      })
      const p = [...checkedMenu, ...c.flat()]
      const cnvrt = transform(p)
      const data = cnvrt?.map(v => {
        return {
          id: v.menu_id,
          access: [...new Set(v.menu_access)]
        }
      })
      const payload = {
        id: role?.detailData?.id,
        name: values?.name,
        menu: data
      }
      updateRole(payload)
    }
  }

  return (
    <>
      <h3>Edit Peran Pengguna</h3>
      <UserRoleUpdateFormComponent
        values={values}
        errors={errors}
        onChange={handleInputChange}
        cMenu={command?.menu}
        checkedMenu={merge}
        handleMenuChecked={handleMenuChecked}
      />
      <UserRoleUpdateToolbar
        handleSubmit={handleSubmit}
        loadingRole={role}
      />
    </>
  )
}

UserRoleUpdateComponent.propTypes = {
  role: PropTypes.object,
  command: PropTypes.object,
  updateRole: PropTypes.func
}

export default UserRoleUpdateComponent