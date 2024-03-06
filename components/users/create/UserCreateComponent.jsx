import React, { useState } from 'react'
import Form from '@/components/shared/form/Form'
import UserCreateFormComponent from './UserCreateFormComponent'
import { useForm } from '@/hooks/index'
import UserCreateToolbarComponent from './UserCreateToolbarComponent'
import { getFileExtension, formatEmail } from '@/utils/index'
import PropTypes from 'prop-types'
import { notAllowedChar, regexPassword } from '@/utils/regex'


function UserCreateComponent({
  user,
  command,
  createUser = () => { }
}) {
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    photo: [],
    nip: '',
    name: '',
    email: '',
    password: '',
    roles: '',
    position: '',
    unit: '',
    level: '',
    category: '',
    progress: ''
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('photo' in fieldOfValues) {
      const extPhoto = fieldOfValues.photo.name
        ? getFileExtension(fieldOfValues.photo.name)
        : ''

      temp.photo = fieldOfValues.photo.length === 0
        ? 'Photo tidak boleh kosong'
        : (
          extPhoto !== 'png' && extPhoto !== 'jpg'
            ? 'Photo harus berupa file gambar dengan format png atau jpg'
            : (
              fieldOfValues.photo.size > 2097152
                ? 'Photo tidak boleh lebih dari 2 MB'
                : ''
            )
        )
    }

    if ('nip' in fieldOfValues) {
      temp.nip = fieldOfValues.nip
        ? (
          notAllowedChar(fieldOfValues.nip)
            ? (
              fieldOfValues.nip.length <= 18
                ? ''
                : 'NIP tidak boleh lebih dari 18'
            )
            : 'NIP tidak boleh mengandung  huruf'
        )
        : 'NIP tidak boleh kosong'
    }

    if ('name' in fieldOfValues)
      temp.name = fieldOfValues.name ? '' : 'Nama tidak boleh kosong'

    if ('email' in fieldOfValues) {
      temp.email = fieldOfValues.email.length === 0
        ? 'Email tidak boleh kosong.'
        : (
          formatEmail(fieldOfValues.email) === false
            ? 'Format Email yang Anda Masukan Tidak Sesuai'
            : ''
        )
    }

    if ('password' in fieldOfValues)
      temp.password = fieldOfValues.password
        ? (
          regexPassword(fieldOfValues.password)
            ? ''
            : 'Password harus mengandung minimal 8 huruf, huruf besar, huruf kecil, angka dan karakter'
        )
        : 'Password tidak boleh kosong'

    if ('roles' in fieldOfValues)
      temp.roles = fieldOfValues.roles ? '' : 'Peran Pengguna tidak boleh kosong'

    if ('position' in fieldOfValues)
      temp.position = fieldOfValues.position ? '' : 'Posisi tidak boleh kosong'

    if ('unit' in fieldOfValues)
      temp.unit = fieldOfValues.unit ? '' : 'Unit Kerja/Satuan Organisasi tidak boleh kosong'

    if ('level' in fieldOfValues)
      temp.level = fieldOfValues.level ? '' : 'Pangkat/Golongan tidak boleh kosong'

    if ('category' in fieldOfValues)
      temp.category = fieldOfValues.category ? '' : ''

    if ('progress' in fieldOfValues)
      temp.progress = fieldOfValues.progress ? '' : 'Level tidak boleh kosong'

    setErrors({
      ...temp
    })

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '')
  }

  const [category, setCategory] = useState([])
  const [selected, setSelected] = useState([])
  /**
   * Handle Category 
   * 
   * @param {*} newCategory 
   */
  const handleCategory = (newCategory) => {
    setCategory([...category, {
      id: newCategory.id,
      program: newCategory.text,
      topics: newCategory.topics.map(val => {
        return {
          id: val.id,
          category_id: newCategory.id,
          text: val.name
        }
      })
    }])
  }

  const uniqueCategory = []

  const unique = category.filter(element => {
    const isDuplicate = uniqueCategory.includes(element.id)

    if (!isDuplicate) {
      uniqueCategory.push(element.id)

      return true
    }

    return false
  })

  /**
   * Handle Delete Topic 
   * 
   * @param {*} idCategory
   */
  const handleDeleteCategory = (idCategory) => {
    setCategory(category.filter(item => item.id !== idCategory))
  }


  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const handleSubmit = () => {
    if (validate()) {
      const formData = new FormData()
      formData.append('nip', values.nip)
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('provider', 'email')
      formData.append('photo', values.photo)
      formData.append('status', true)
      formData.append('role_id', values.roles.id)
      formData.append('unit_id', values.unit.id)
      formData.append('level_id', values.level.id)
      formData.append('position_id', values.position.id)
      unique?.map((val, index) => {
        formData.append(`categories[${index}][category_id]`, val.id)
        selected.map((v, i) => {
          if (val.id === v.category_id) {
            formData.append(`categories[${index}][topic_id][${i}]`, v.id)
          }
        })
      })
      formData.append('level', values.progress.value)
      createUser(formData)
    }
  }


  return (
    <>
      <h3>Tambah Pengguna</h3>
      <Form>
        <UserCreateFormComponent
          values={values}
          errors={errors}
          handleInputChange={handleInputChange}
          command={command}
          handleCategory={handleCategory}
          handleDeleteCategory={handleDeleteCategory}
          setSelected={setSelected}
          selected={selected}
          unique={unique}
        />
        <UserCreateToolbarComponent
          onSubmit={handleSubmit}
          createLoading={user?.createLoading}
          loading={user?.loading}
        />
      </Form>
    </>
  )
}

UserCreateComponent.propTypes = {
  user: PropTypes.object,
  command: PropTypes.object,
  createUser: PropTypes.func
}

export default UserCreateComponent