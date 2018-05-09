import React from 'react';

const TextInput = (props) => {
  const { value, handleChange,name, placeholder,type } = props
  return (
    <input
      type={type}
      className="form-control"
      placeholder={ placeholder}
      name={name}
      value={value}
      onChange={ handleChange}
    />

  )
}

export default TextInput
