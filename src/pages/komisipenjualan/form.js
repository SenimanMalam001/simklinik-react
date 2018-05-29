import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'

const Form = (props) => {
  let {
    handleSubmit,
    handleChange,
    user,
    no_trans,
    produk,
    users,
    produks,
    jumlah
  } = props
  users = users.map(users => {
    return {
      value: users.id,
      label: users.name,
      target: {
        name: 'user',
        value: users.id
      }
    }
  })

  produks = produks.map(produk => {
    return {
      value: produk.id,
      label: produk.nama,
      target: {
        name: 'produk',
        value: produk.id
      }
    }
  })
  return (
    <form onSubmit={ handleSubmit}>
      <TextInputWithLabel
        label="No Trans"
        placeholder="Masukkan No Trans Penjualan"
        type="text"
        name="no_trans"
        value={no_trans}
        handleChange={handleChange}
      />
      <SelectBox
        label="User"
        placeholder="Pilih User"
        name="user"
        value={user}
        options={users}
        handleChange={handleChange}
      />
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
        placeholder="Masukkan Jumlah Komisi"
        type="text"
        name="jumlah"
        value={jumlah}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
