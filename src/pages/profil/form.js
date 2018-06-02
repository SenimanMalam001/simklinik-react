import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'


const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    alamat,
    no_telp,
    nama,
  } = props
  return (
    <form onSubmit={ handleSubmit}>
      <TextInputWithLabel
        type="text"
        label="Nama"
        placeholder="Masukkan Nama"
        name="nama"
        value={nama}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        label="Alamat"
        placeholder="Masukkan Alamat"
        type="text"
        name="alamat"
        value={alamat}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        type="text"
        label="No Telp"
        placeholder="No Telp"
        name="no_telp"
        value={no_telp}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
