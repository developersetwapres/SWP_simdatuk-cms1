/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import UserUpdateFormComponent from './UserUpdateFormComponent'
import UserUpdateToolbarComponent from './UserUpdateToolbarComponent'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/index'
import { formatEmail, getFileExtension } from '@/utils/index'
import { regexPassword } from '@/utils/regex'

function UserUpdateComponent({
  user,
  command,
  updateUser = () => { }
}) {
  const [initialValues, setInitialValues] = useState({
    photo: [],
    email: user?.detail?.email === null ? '' : user?.detail?.email,
    password: '',
    level: user?.detail?.user_level === null ? '' :
      {
        id: user?.detail?.user_level,
        name: user?.detail?.user_level?.toString()
      },
    roles: Object.assign({}, ...user?.detail?.roles)
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('photo' in fieldOfValues) {
      const extPhoto = fieldOfValues.photo.name
        ? getFileExtension(fieldOfValues.photo.name)
        : ''

      temp.photo = fieldOfValues.photo.length === 0
        ? ''
        : (
          extPhoto !== 'png' && extPhoto !== 'jpg'
            ? 'Photo harus berupa file gambar dengan format png atau jpg'
            : (
              fieldOfValues.photo.size > 2097152
                ? 'Photo tidak boleh lebih dari 2mb'
                : ''
            )
        )
    }

    if ('email' in fieldOfValues) {
      temp.email = fieldOfValues.email.length === 0
        ? 'Email tidak boleh kosong'
        : (
          formatEmail(fieldOfValues.email) === false
            ? 'Format Email yang anda masukan tidak sesuai'
            : ''
        )
    }

    if ('password' in fieldOfValues)
      temp.password = fieldOfValues.password === ''
        ? ''
        : (
          regexPassword(fieldOfValues.password)
            ? ''
            : 'Password harus mengandung minimal 8 huruf, huruf besar, huruf kecil, angka dan karakter'
        )

    if ('level' in fieldOfValues)
      temp.level = fieldOfValues.level ? '' : 'Level tidak boleh kosong'

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

  const [category, setCategory] = useState([])
  const [selected, setSelected] = useState([])
  const [topic, setTopic] = useState([])



  useEffect(() => {
    function swapArr() {
      const cat = command.categoryTopic.map((e) => {
        const found = user?.detail?.user_categories.find(b => b.category_id === e.id)
        if (found) {
          return {
            category_id: found.category_id,
            category_name: found.category_name,
            // pkasn_program: e.pkasn,
            category_topic: e.topics?.map(x => {
              return {
                category_id: found.category_id,
                id: x.id,
                text: x.name
              }
            })
          }
        }
      }).filter(e => typeof e !== 'undefined')

      const tops = command?.categoryTopic?.map((e) => {
        const found = user?.detail?.user_categories?.find(b => b.category_id === e.id)
        if (found) {
          return found?.topics?.map((n) => {
            return {
              category_id: found.category_id,
              id: n.topic_id,
              text: n.topic_name
            }
          })
        }
      }).filter(e => typeof e !== 'undefined')

      let temp = []
      for (let i = 0; i < tops.length; i++) {
        temp.push(...tops[i])
      }
      setCategory(cat)
      setTopic(temp)
    }

    swapArr()
  }, [command, user])


  /**
 * Handle Category 
 * 
 * @param {*} newCategory
 */
  const handleCategory = (newCategory) => {
    setCategory([...category, {
      category_id: newCategory.id,
      category_name: newCategory.text,
      // pkasn_program: newCategory.pkasn,
      category_topic: newCategory.topics?.map(x => {
        return {
          category_id: newCategory.id,
          id: x.id,
          text: x.name
        }
      })
    }])
  }

  /**
 * Handle Delete Category
 * 
 * @param {*} idCategory 
 */
  const handleDeleteCategory = (idCategory) => {
    setCategory(category.filter(item => item.category_id !== idCategory))
  }
  const handleSubmit = () => {
    if (validate()) {
      const formData = new FormData()
      formData.append('nip', user?.detail?.nip)
      formData.append('name', user?.detail?.name)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('provider', 'email')
      if (values.photo.length !== 0) {
        formData.append('photo', values.photo)
      }
      formData.append('status', true)
      // formData.append('role_id', user?.detail?.roles[0].id)
      formData.append('role_id', values.roles.id)
      formData.append('unit_id', user?.detail?.unit?.id)
      formData.append('level_id', user?.detail?.level.id)
      formData.append('position_id', user?.detail?.position?.id)
      category?.map((val, index) => {
        formData.append(`categories[${index}][category_id]`, val.category_id)
        topic.map((v, i) => {
          if (val.category_id === v.category_id) {
            formData.append(`categories[${index}][topic_id][${i}]`, v.id)
          }
        })
      })
      formData.append('level', values.level.id)
      updateUser(user?.detail?.id, formData)
    }
  }



  return (
    <>
      <h3>Edit Pengguna</h3>
      <UserUpdateFormComponent
        user={user}
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
        command={command}
        handleCategory={handleCategory}
        handleDeleteCategory={handleDeleteCategory}
        category={category}
        topic={topic}
        setTopic={setTopic}
      />
      <UserUpdateToolbarComponent
        handleSubmit={handleSubmit}
        updateLoading={user?.updateLoading}
        loading={user?.loading}
      />
    </>
  )
}

UserUpdateComponent.propTypes = {
  user: PropTypes.object,
  command: PropTypes.object,
  updateUser: PropTypes.func
}

export default UserUpdateComponent