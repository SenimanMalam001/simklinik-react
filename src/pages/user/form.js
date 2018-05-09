import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'


const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    username,
    password,
    name,
    role
  } = props
  return (
    <form onSubmit={ handleSubmit}>
      <TextInputWithLabel
        label="Username"
        placeholder="Masukkan Username"
        type="text"
        name="username"
        value={username}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        type="password"
        label="Password"
        placeholder="Password"
        name="password"
        value={password}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        type="text"
        label="Nama"
        placeholder="Masukkan Nama"
        name="name"
        value={name}
        handleChange={handleChange}
      />
      <SelectBox
        label="Role"
        placeholder="Pilih Role"
        name="role"
        value={role}
        options={[
          {
          value: 'dokter', label:'Dokter'
          },
          {
          value: 'paramedik', label:'Paramedik'
          },
          {
          value: 'farmasi', label:'Farmasi'
          },
          {
          value: 'non_medis', label:'Non Medis'
          },
        ]}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
