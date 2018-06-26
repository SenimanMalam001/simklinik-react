import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'


const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    kode,
    tipe,
    harga_beli,
    nama,
    harga_jual_1,
    harga_jual_2,
    harga_jual_3,
    harga_jual_4
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
        label="Tipe"
        placeholder="Pilih Tipe Produk"
        value={tipe}
        name={tipe}
        handleChange={handleChange}
        options={[
          {
          value: 'barang', label:'Barang'
          },
          {
          value: 'jasa', label:'Jasa'
          },
        ]}
      />
      <TextInputWithLabel
        type="text"
        label="Harga Beli"
        placeholder="Harga Beli"
        name="harga_beli"
        value={harga_beli}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        type="text"
        label="Harga Jual 1"
        placeholder="Harga Jual 1"
        name="harga_jual_1"
        value={harga_jual_1}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        type="text"
        label="Harga Jual 2"
        placeholder="Harga Jual 2"
        name="harga_jual_2"
        value={harga_jual_2}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        type="text"
        label="Harga Jual 3"
        placeholder="Harga Jual 3"
        name="harga_jual_3"
        value={harga_jual_3}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        type="text"
        label="Harga Jual 4"
        placeholder="Harga Jual 4"
        name="harga_jual_4"
        value={harga_jual_4}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
