/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import UserRoleCreateFormComponent from './UserRoleCreateFormComponent'
import UserRoleCreateToolbar from './UserRoleCreateToolbar'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/'

function UserRoleCreateComponent({
  role,
  command,
  postRole = () => { }
}) {

  const [initialValues, setInitialValues] = useState({
    name: ''
  })

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

  const [menu, setMenu] = useState([])
  const [childMenu, setChildMenu] = useState([])
  const [bothMenu, setBothMenu] = useState([])

  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const handleMenuChecked = (e, val, child) => {
    if (e?.target?.name === 'CRU') {
      if (e?.target?.value === true) {
        setMenu(prevState => [...prevState, {
          id: val.id,
          text: val.text,
          access: val?.access[0]?.menu
        }])
      } else {
        setMenu(menu.filter((x, i) => x.id !== val?.id))
      }
    } else if (e?.target?.name === 'D') {
      if (e?.target?.value === true) {
        setChildMenu(prevState => [...prevState, {
          id: val.id,
          text: val.text,
          access: [1, 3]
        }])
      } else {
        setChildMenu(childMenu?.filter((y, i) => y.id !== val?.id))
      }
    }
  }

  useEffect(() => {
    if (menu.length > 0 || childMenu.length > 0) {
      const data = [...menu, ...childMenu]
      const result = []
      data?.forEach(d => {
        const exist = result.find(r => r.id == d.id)
        if (exist)
          return exist.access = exist.access.concat(d.access)
        result.push(d)
      })
      setBothMenu(result)
    }
  }, [menu, childMenu])

  const handleSubmit = () => {
    const takeParent = [...menu]
    const takeChild = [...childMenu]
    const takeBoth = [...bothMenu]
    const pushArr = []
    const pushParent = []
    const pushChild = []
    // if only parent
    if (takeParent.length > 0 && takeChild.length === 0) {
      takeParent?.map((p, _i) => {
        const obj = {
          id: p?.id,
          access: p?.access
        }
        pushParent.push(obj)

      })
    } else if (takeChild.length > 0 && takeParent.length === 0) {
      takeChild?.map((c, i) => {
        const obj = {
          id: c?.id,
          access: c?.access
        }
        pushChild.push(obj)
      })
    } else {
      takeBoth?.map((b, i) => {
        const obj = {
          id: b?.id,
          access: b?.access
        }
        pushArr.push(obj)
      })
    }

    if (validate()) {
      if (takeParent?.length > 0 && takeChild.length === 0) {
        const data = pushParent?.map(val => {
          return {
            id: val.id,
            access: val.access
          }
        })
        const payload = {
          name: values?.name,
          menu: data
        }
        postRole(payload)
      } else if (takeChild?.length > 0 && takeParent.length === 0) {
        const data = pushChild?.map(val => {
          return {
            id: val?.id,
            access: val?.access
          }
        })
        const payload = {
          name: values?.name,
          menu: data
        }
        postRole(payload)
      } else {
        const data = pushArr?.map(val => {
          return {
            id: val.id,
            access: [...new Set(val.access)]
          }
        })
        const payload = {
          name: values?.name,
          menu: data.sort()
        }
        postRole(payload)
      }
    }
  }

  return (
    <>
      <h3>Tambah Peran Pengguna</h3>
      <UserRoleCreateFormComponent
        values={values}
        errors={errors}
        cMenu={command?.menu}
        onChange={handleInputChange}
        handleMenuChecked={handleMenuChecked}
      />
      <UserRoleCreateToolbar
        handleSubmit={handleSubmit}
        loadingRole={role}
      />
    </>
  )
}

UserRoleCreateComponent.propTypes = {
  role: PropTypes.object,
  command: PropTypes.object,
  postRole: PropTypes.func
}

export default UserRoleCreateComponent