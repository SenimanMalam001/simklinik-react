import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'

const FormLama = (props) => {
  const {
    handleChange,
    nama,
    no_rm,
    tanggal_lahir,
    jenis_pasien
  } = props
  let { penjamins } = props
  return (
    <div>
      <TextInputWithLabel
        type="text"
        label="No RM"
        placeholder="No RM Yang Dicari"
        name="no_rm"
        value={no_rm}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        type="text"
        label="Nama"
        placeholder="Nama Pasien Yang Dicari"
        name="nama"
        value={nama}
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
      <button type="button" className="btn btn-primary">Cari Pasien</button>
    </div>
  )
}

export default FormLama
