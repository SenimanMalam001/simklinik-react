import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                  : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const ModalRegistrasi = (props) => {
  const { show, handleSubmit, handleChange, no_reg, registrasi, petugas, users  } = props

  return (
    <ModalRegistrasi
      isOpen={show}
      style={customStyles}
    >
      <p>*Langsung Klik Submit jika tidak perlu memilih registrasi dan petugas</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Registrasi </label>
          <Select
            placeholder="Registrasi..."
            name={no_reg}
            className="mb-2 mr-sm-2"
            value={no_reg}
            onChange={handleChange}
            options={registrasi}
          />
        </div>
        <div className="form-group">
          <label>Petugas </label>
          <Select
            placeholder="Petugas..."
            name="petugas"
            className="mb-2 mr-sm-2"
            value={petugas}
            multi={true}
            onChange={handleChange}
            options={users}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </ModalRegistrasi>
  )
}

export default ModalRegistrasi
