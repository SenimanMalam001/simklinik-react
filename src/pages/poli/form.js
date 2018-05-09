import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'


const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    name,
  } = props
  return (
    <form onSubmit={ handleSubmit}>
      <TextInputWithLabel
        type="text"
        label="Nama"
        placeholder="Masukkan Nama"
        name="name"
        value={name}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
