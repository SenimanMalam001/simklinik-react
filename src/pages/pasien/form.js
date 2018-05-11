import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'


const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    alamat,
    no_telp,
    nama,
    tanggal_lahir,
    gender,
    penjamin
  } = props
  let { penjamins } = props
  penjamins = penjamins.map(penjamin => {
    return {
      label: penjamin.nama, value: penjamin.id, target: { name: 'penjamin', value: penjamin.id}
    }
  })

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
      <SelectBox
        label="Gender"
        placeholder="Pilih Gender"
        name="gender"
        value={gender}
        options={[
          {
          value: 'laki-laki', label:'Laki-laki',target: { value: 'laki-laki',name: 'gender'},
          },
          {
          value: 'perempuan', label:'Perempuan',target: { value: 'perempuan',name: 'gender'},
          },
        ]}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        label="Tanggal Lahir"
        placeholder="Masukkan Tanggal Lahir"
        type="date"
        name="tanggal_lahir"
        value={tanggal_lahir}
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
      <TextInputWithLabel
        label="Alamat"
        placeholder="Masukkan Alamat"
        type="text"
        name="alamat"
        value={alamat}
        handleChange={handleChange}
      />
      <SelectBox
        label="Penjamin"
        placeholder="Pilih Penjamin"
        name="penjamin"
        value={penjamin}
        options={penjamins}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
