import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'

const Form = (props) => {
  let {
    handleSubmit,
    handleChange,
    jumlah,
    produk,
    produks
  } = props

  produks = produks.map(produk => {
    return {
      value: produk.id,
      label: produk.nama,
      target: {name: 'produk', value: produk.id}
    }
  })
  return (
    <form onSubmit={ handleSubmit}>
      <SelectBox
        label="Produk"
        placeholder="Pilih Produk"
        name="produk"
        value={produk}
        options={produks}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        label="Jumlah"
        placeholder="Jumlah Masuk"
        name="jumlah"
        value={jumlah}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
