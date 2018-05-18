import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'

const Form = (props) => {
  let {
    handleSubmit,
    handleChange,
    jumlah,
    keterangan,
    kas,
    kategori,
    kass,
    kategori_transaksis,
    jenis
  } = props

  kass = kass.map(kas => {
    return {
      value: kas.id,
      label: kas.nama,
      target: {name: 'kas', value: kas.id}
    }
  })

  kategori_transaksis = kategori_transaksis.map(kategori => {
    return {
      value: kategori.id,
      label: kategori.name,
      target: {name: 'kategori', value: kategori.id}
    }
  })

  return (
    <form onSubmit={ handleSubmit}>
      <SelectBox
        label="Jenis Transaksi"
        placeholder="Pilih Jenis Transaksi"
        name="jenis"
        value={jenis}
        options={[
          {
            label: 'Kas Keluar', value: 'keluar', target: { name: 'jenis',value: 'keluar'}
          },
          {
            label: 'Kas Masuk', value: 'masuk', target: { name: 'jenis',value: 'masuk'}
          }
        ]}
        handleChange={handleChange}
      />
      <SelectBox
        label="Kas"
        placeholder="Pilih Kas"
        name="kas"
        value={kas}
        options={kass}
        handleChange={handleChange}
      />
      <SelectBox
        label="Kategori"
        placeholder="Pilih Kategori"
        name="kategori"
        value={kategori}
        options={kategori_transaksis}
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
