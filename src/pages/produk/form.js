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
    harga_jual_4,
    satuan
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
        handleChange={(e) => {
          if (e) {
            handleChange(e)
          } else {
            handleChange({ target: { name: 'tipe', value: ''}})
          }
        }}
        options={[
          {
          value: 'barang', label:'Barang', target: { name: 'tipe', value: 'barang'}
          },
          {
          value: 'jasa', label:'Jasa', target: { name: 'tipe', value: 'jasa'}
          },
        ]}
      />
      <SelectBox
        label="Satuan"
        placeholder="Pilih Satuan Produk"
        value={satuan}
        name={satuan}
        handleChange={(e) => {
          if (e) {
            handleChange(e)
          } else {
            handleChange({ target: { name: 'satuan', value: ''}})
          }
        }}
        options={[
          {
          value: 'Pcs', label:'Pcs', target: { name: 'satuan', value: 'Pcs'}
          },
          {
          value: 'Tablet', label:'Tablet', target: { name: 'satuan', value: 'Tablet'}
          },
          {
          value: 'Botol', label:'Botol', target: { name: 'satuan', value: 'Botol'}
          },
          {
          value: 'Tube', label:'Tube', target: { name: 'satuan', value: 'Tube'}
          },
          {
          value: 'Sachet', label:'Sachet', target: { name: 'satuan', value: 'Sachet'}
          },
          {
          value: 'Strip', label:'Strip', target: { name: 'satuan', value: 'Strip'}
          },
          {
          value: 'Gelas', label:'Gelas', target: { name: 'satuan', value: 'Gelas'}
          },
          {
          value: 'Pack', label:'Pack', target: { name: 'satuan', value: 'Pack'}
          },
          {
          value: 'Box', label:'Box', target: { name: 'satuan', value: 'Box'}
          },
          {
          value: 'Capsul', label:'Capsul', target: { name: 'satuan', value: 'Capsul'}
          },
          {
          value: 'Kaplet', label:'Kaplet', target: { name: 'satuan', value: 'Kaplet'}
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
