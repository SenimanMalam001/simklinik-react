import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'

const Form = (props) => {
  let {
    handleSubmit,
    handleChange,
    user,
    produk,
    users,
    produks
  } = props
  users = users.map(users => {
    return {
      value: users.id,
      label: users.name,
      name: 'user'
    }
  })

  produks = produks.map(produk => {
    return {
      value: produk.id,
      label: produk.nama,
      name: 'produk'
    }
  })
  return (
    <form onSubmit={ handleSubmit}>
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
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
