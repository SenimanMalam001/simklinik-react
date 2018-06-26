import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'


const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    alamat,
    level,
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
    <SelectBox
      label="Level Harga"
      placeholder="Pilih Level Harga"
      value={level}
      name={level}
      handleChange={handleChange}
      options={[
        {
        value: '1', label:'Level 1'
        },
        {
        value: '2', label:'Level 2'
        },
        {
        value: '3', label:'Level 3'
        },
        {
        value: '4', label:'Level 4'
        },
      ]}
    />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
