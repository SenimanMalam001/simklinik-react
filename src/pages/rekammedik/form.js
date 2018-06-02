import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'


const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    no_reg,
    sistole_diastole,
    frekuensi_pernapasan,
    suhu,
    nadi,
    berat_badan,
    tinggi_badan,
    anamnesa,
    pemeriksaan_fisik,
    keadaan_umum,
    kesadaran,
    diagnosis_utama,
    keadaan_pulang,
  } = props
  return (
    <form onSubmit={ handleSubmit}>
      <TextInputWithLabel
        type="text"
        label="No Reg"
        placeholder="Masukkan No Reg"
        name="no_reg"
        value={no_reg}
        handleChange={handleChange}
      />
      <div className="row">
        <div className="col-md-6">
        <TextInputWithLabel
          type="text"
          label="Berat Badan"
          placeholder="Berat Badan"
          name="berat_badan"
          value={berat_badan}
          handleChange={handleChange}
        />
        </div>
        <div className="col-md-6">
        <TextInputWithLabel
          type="text"
          label="Tinggi Badan"
          placeholder="Masukkan Tinggi Badan"
          name="tinggi_badan"
          value={tinggi_badan}
          handleChange={handleChange}
        />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
        <TextInputWithLabel
          type="text"
          label="Suhu"
          placeholder="Suhu"
          name="suhu"
          value={suhu}
          handleChange={handleChange}
        />
        </div>
        <div className="col-md-6">
        <TextInputWithLabel
          type="text"
          label="Sistole Diastole"
          placeholder="Masukkan Sistole Diastole"
          name="sistole_diastole"
          value={sistole_diastole}
          handleChange={handleChange}
        />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
        <TextInputWithLabel
          type="text"
          label="Pernapasan"
          placeholder="Pernapasan"
          name="frekuensi_pernapasan"
          value={frekuensi_pernapasan}
          handleChange={handleChange}
        />
        </div>
        <div className="col-md-6">
        <TextInputWithLabel
          type="text"
          label="Nadi"
          placeholder="Masukkan Nadi"
          name="nadi"
          value={nadi}
          handleChange={handleChange}
        />
        </div>
      </div>
      <TextInputWithLabel
        type="text"
        label="Anamnesa"
        placeholder="Anamnesa"
        name="anamnesa"
        value={anamnesa}
        handleChange={handleChange}
      />
      <TextInputWithLabel
        type="text"
        label="Pemeriksaan Fisik"
        placeholder="Pemeriksaan Fisik"
        name="pemeriksaan_fisik"
        value={pemeriksaan_fisik}
        handleChange={handleChange}
      />
      <SelectBox
        label="Keadaan Umum"
        placeholder="Pilih Keadaan Umum"
        name="keadaan_umum"
        value={keadaan_umum}
        options={[
          {
          value: 'Tampak Normal', label:'Tampak Normal',target: { value: 'Tampak Normal',name: 'keadaan_umum'},
          },
          {
          value: 'Pucat dan Lemas', label:'Pucat dan Lemas',target: { value: 'Pucat dan Lemas',name: 'keadaan_umum'},
          },
          {
          value: 'Sadar dan Cedera', label:'Sadar dan Cedera',target: { value: 'Sadar dan Cedera',name: 'keadaan_umum'},
          },
          {
          value: 'Pingsan / Tidak Sadar', label:'Pingsan / Tidak Sadar',target: { value: 'Pingsan / Tidak Sadar',name: 'keadaan_umum'},
          },
          {
          value: 'Meninggal Sebelum Tiba', label:'Meninggal Sebelum Tiba',target: { value: 'Meninggal Sebelum Tiba',name: 'keadaan_umum'},
          },
        ]}
        handleChange={(e) => {
          if (e) {
            handleChange(e)
          } else {

          }
        }}
      />
      <SelectBox
        label="Kesadaran"
        placeholder="Pilih Kesadaran"
        name="kesadaran"
        value={kesadaran}
        options={[
          {
          value: 'Compos Mentis', label:'Compos Mentis',target: { value: 'Compos Mentis',name: 'kesadaran'},
          },
          {
          value: 'Apatis', label:'Apatis',target: { value: 'Apatis',name: 'kesadaran'},
          },
          {
          value: 'Somnolent', label:'Somnolent',target: { value: 'Somnolent',name: 'kesadaran'},
          },
          {
          value: 'Sopor', label:'Sopor',target: { value: 'Sopor',name: 'kesadaran'},
          },
          {
          value: 'Sopora Coma', label:'Sopora Coma',target: { value: 'Sopora Coma',name: 'kesadaran'},
          },
          {
          value: 'Coma', label:'Coma',target: { value: 'Coma',name: 'kesadaran'},
          },
        ]}
        handleChange={(e) => {
          if (e) {
            handleChange(e)
          } else {

          }
        }}
      />
      <TextInputWithLabel
        type="text"
        label="Diagnosis"
        placeholder="Diagnosis"
        name="diagnosis_utama"
        value={diagnosis_utama}
        handleChange={handleChange}
      />
      <SelectBox
        label="Keadaan Pulang"
        placeholder="Pilih Keadaan Pulang"
        name="keadaan_pulang"
        value={keadaan_pulang}
        options={[
          {
          value: 'Sehat / Sembuh', label:'Sehat / Sembuh',target: { value: 'Sehat / Sembuh',name: 'keadaan_pulang'},
          },
          {
          value: 'Pulang dan Proses penyembuhan', label:'Pulang dan Proses penyembuhan',target: { value: 'Pulang dan Proses penyembuhan',name: 'keadaan_pulang'},
          },
          {
          value: 'Masuk Rawat Inap / ICU / OK', label:'Masuk Rawat Inap / ICU / OK',target: { value: 'Masuk Rawat Inap / ICU / OK',name: 'keadaan_pulang'},
          },
          {
          value: 'Di Rujuk dengan pertolongan pertama', label:'Di Rujuk dengan pertolongan pertama',target: { value: 'Di Rujuk dengan pertolongan pertama',name: 'keadaan_pulang'},
          },
          {
          value: 'Di Rujuk tanpa perotolongan pertama', label:'Di Rujuk tanpa perotolongan pertama',target: { value: 'Di Rujuk tanpa perotolongan pertama',name: 'keadaan_pulang'},
          },
          {
          value: 'Meninggal Dunia', label:'Meninggal Dunia',target: { value: 'Meninggal Dunia',name: 'keadaan_pulang'},
          },
          {
          value: 'Tidak Diketahui Kondisinya', label:'Tidak Diketahui Kondisinya',target: { value: 'Tidak Diketahui Kondisinya',name: 'keadaan_pulang'},
          },
        ]}
        handleChange={(e) => {
          if (e) {
            handleChange(e)
          } else {

          }
        }}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
