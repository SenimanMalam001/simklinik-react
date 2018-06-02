import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'


const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    kode,
    nama,
    default_kas
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
      <SelectBox
        label="Default Kas"
        placeholder="Pilih Default Kas"
        name="default_kas"
        value={default_kas}
        options={[
          {
          value: '0', label:'Tidak', target: { value: '0', name: 'default_kas'}
          },
          {
          value: '1', label:'Ya', target: { value: '1', name: 'default_kas'}
          },
        ]}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
