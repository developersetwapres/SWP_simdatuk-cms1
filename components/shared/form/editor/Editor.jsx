/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import 'react-quill/dist/quill.snow.css'
import { } from 'react'

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false

const Quill = ({ children, ...otherProps }) => {
  if (typeof window !== 'undefined') {
    return <ReactQuill
      {...otherProps}
    >
      {children}
    </ReactQuill>
  }

  return null
}

Quill.propTypes = {
  children: PropTypes.node
}

const Editor = ({
  placeholder,
  value,
  label,
  disabled = false,
  setValue = () => { }
}) => {
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function prerender() {
        setMounted(true)
      }

      prerender()
    }
  }, [])


  const handleValue = (content, delta, source, editor) => {
    if (editor.getLength() === 1 || editor.getLength() < 1) {
      setError('Tidak boleh kosong')
    } else {
      setError('')
      setValue(editor.getHTML())
    }
  }

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
  }

  /*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ]

  const Components = () => {
    return <>
      <p style={{
        marginBottom: '10px'
      }}>{label}</p>
      <div className='text-editor'>
        <Quill
          modules={modules}
          formats={formats}
          theme='snow'
          value={value}
          id='editor'
          placeholder={placeholder}
          onChange={handleValue}
          readOnly={disabled}
        >
          <div
            className='my-editing-area'
            style={{
              backgroundColor: disabled ? '#EDEDED' : ''
            }}
          />
        </Quill>
        {
          error && (
            <p style={{ color: '#D32F2F', fontSize: '14px' }}>{error}</p>
          )
        }
      </div>
    </>
  }
  return mounted ? <Components /> : null
}

Editor.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  setValue: PropTypes.func
}

export default Editor
