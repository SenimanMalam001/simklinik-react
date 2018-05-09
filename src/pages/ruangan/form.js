import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'


const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    kode,
    jumlah,
    nama,
  } = props
  return (
    <form onSubmit={ handleSubmit}>
      <TextInputWithLabel
        label="Kode"
        placeholder="Masukkan Kode"
        type="text"
        name="kode"
        value={kode}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        type="text"
        label="Nama"
        placeholder="Masukkan Nama"
        name="nama"
        value={nama}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        type="text"
        label="Jumlah"
        placeholder="Jumlah"
        name="jumlah"
        value={jumlah}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
