import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'

const Form = (props) => {
  let {
    handleSubmit,
    handleChange,
    stok_akhir,
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
        label="Stok Akhir"
        placeholder="Stok Akhir"
        name="stok_akhir"
        value={stok_akhir}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
