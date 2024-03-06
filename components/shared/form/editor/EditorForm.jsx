import dynamic from 'next/dynamic'
import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')

    // eslint-disable-next-line react/display-name, react/prop-types
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />
  },
  {
    ssr: false
  }
)


function EditorForm({
  placeholder,
  value,
  label,
  disabled = false,
  setValue = () => { }
}) {
  // const [value, setValue] = useState('')
  const quillRef = useRef()
  const [error, setError] = useState('')


  const handleValue = (content, delta, source, editor) => {
    const length = editor.getSelection()
    const getLength = editor.getLength()
    if (length?.index >= 1 || length === null) {
      setValue(content)
      setError('')
    } else {
      if (getLength > 1) {
        setError('')
        setValue(content)
      } else {
        setError('Deskripsi Tidak boleh kosong')
        setValue(content)
      }
    }
  }

  useEffect(() => {
    setError('')
  }, [])

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

  useEffect(() => {
    const check = () => {
      if (quillRef.current) {
        return
      }
      setTimeout(check, 200)
    }
    check()
  }, [quillRef])

  return (
    <div>
      <p style={{
        marginBottom: '10px'
      }}>{label}</p>
      <ReactQuill
        forwardedRef={quillRef}
        theme='snow'
        value={value || ''}
        onChange={handleValue}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={disabled}
      >
        <div
          className='my-editing-area'
          style={{
            backgroundColor: disabled ? '#EDEDED' : '',
            border: error && '1px solid #D32F2F '
          }}
        />
      </ReactQuill>
      {
        error && (
          <p style={{ color: '#D32F2F', fontSize: '14px' }}>{error}</p>
        )
      }
    </div >
  )
}

EditorForm.propTypes = {
  forwardedRef: PropTypes.any,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  setValue: PropTypes.func
}

export default EditorForm