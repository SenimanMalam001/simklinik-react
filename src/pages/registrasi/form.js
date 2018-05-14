import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'
import FormBaru from './form_baru'
import FormLama from './form_lama'


const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    alamat,
    no_telp,
    nama,
    tanggal_lahir,
    gender,
    penjamin,
    jenis_pasien,
    pasien,
    no_rm,
  } = props
  let { penjamins } = props
  penjamins = penjamins.map(penjamin => {
    return {
      label: penjamin.nama, value: penjamin.id, target: { name: 'penjamin', value: penjamin.id}
    }
  })

  return (
    <form onSubmit={ handleSubmit}>
    </form>
  )

}

export default Form
