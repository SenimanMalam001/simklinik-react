import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'

const Form = (props) => {
  let {
    handleSubmit,
    handleChange,
    jumlah,
    keterangan,
    dari_kas,
    ke_kas,
    kass,
  } = props

  const dari_kass = kass.map(kas => {
    return {
      value: kas.id,
      label: kas.nama,
      target: {name: 'dari_kas', value: kas.id}
    }
  })

  const ke_kass = kass.map(kas => {
    return {
      value: kas.id,
      label: kas.nama,
      target: {name: 'ke_kas', value: kas.id}
    }
  })
  return (
    <form onSubmit={ handleSubmit}>
      <SelectBox
        label="Dari Kas"
        placeholder="Pilih Kas"
        name="dari_kas"
        value={dari_kas}
        options={dari_kass}
        handleChange={handleChange}
      />
      <SelectBox
        label="Ke Kas"
        placeholder="Pilih Kas"
        name="ke_kas"
        value={ke_kas}
        options={ke_kass}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        label="Jumlah"
        placeholder="Jumlah"
        name="jumlah"
        value={jumlah}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        label="Keterangan"
        placeholder="Keterangan"
        name="keterangan"
        value={keterangan}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
