import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'
import axios from '../../axios'
import { connect } from 'react-redux'
import { setPasienRegistrasi } from '../../store/actions'
import { bindActionCreators } from 'redux'
import Alert from '../../components/Alert'


class FormBaru extends React.Component {
  constructor() {
    super()
    this.state = {
      alamat: '',
      no_telp: '',
      nama: '',
      tanggal_lahir: '',
      gender: '',
      penjamin: '',
      error: {
        status: false,
        message: ''
      },
    }
  }

  validate = () => {
    const { nama, penjamin,} = this.state

    if (!nama) {
      this.setState({
        error: {
          status: true,
          message: 'Nama is Required'
        }
      })
      return false
    }

    if (!penjamin) {
      this.setState({
        error: {
          status: true,
          message: 'Penjamin is Required'
        }
      })
      return false
    }
    return true
  }

  handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (event) => {
    const { alamat, no_telp, nama, tanggal_lahir, gender, penjamin,} = this.state
    const { closeModal } = this.props
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_pasien'
      }
      axios.post('/pasien',{alamat, no_telp, nama,tanggal_lahir, gender, penjamin,},{ headers }).then((res) => {
        this.props.setPasienRegistrasi(res.data.data)
        closeModal()
      }).catch((err) => {
        const message = err.response.data.message
        this.setState({
          error: {
            status: true,
            message: message
          }
        })
      })
    }
    event.preventDefault()
  }
  render() {
    const { error, alamat, no_telp, nama, tanggal_lahir, gender, penjamin,} = this.state
    let { penjamins } = this.props
    const { handleChange } = this
    penjamins = penjamins.map(penjamin => {
      return {
        label: penjamin.nama, value: penjamin.id, target: { name: 'penjamin', value: penjamin.id}
      }
    })
    return (
      <div className="col-md-4 offset-md-4">
        {
          error.status && <Alert type="danger" text={error.message} />
        }
        <form onSubmit={this.handleSubmit}>
          <TextInputWithLabel
            type="text"
            label="Nama"
            placeholder="Masukkan Nama"
            name="nama"
            value={nama}
            handleChange={this.handleChange}
          />
          <SelectBox
            label="Gender"
            placeholder="Pilih Gender"
            name="gender"
            value={gender}
            options={[
              {
              value: 'laki-laki', label:'Laki-laki',target: { value: 'laki-laki',name: 'gender'},
              },
              {
              value: 'perempuan', label:'Perempuan',target: { value: 'perempuan',name: 'gender'},
              },
            ]}
            handleChange={handleChange}
          />
          <TextInputWithLabel
            label="Tanggal Lahir"
            placeholder="Masukkan Tanggal Lahir"
            type="date"
            name="tanggal_lahir"
            value={tanggal_lahir}
            handleChange={handleChange}
          />
          <TextInputWithLabel
            type="text"
            label="No Telp"
            placeholder="No Telp"
            name="no_telp"
            value={no_telp}
            handleChange={handleChange}
          />
          <TextInputWithLabel
            label="Alamat"
            placeholder="Masukkan Alamat"
            type="text"
            name="alamat"
            value={alamat}
            handleChange={handleChange}
          />
          <SelectBox
            label="Penjamin"
            placeholder="Pilih Penjamin"
            name="penjamin"
            value={penjamin}
            options={penjamins}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setPasienRegistrasi}, dispatch)

export default connect(null, mapDispatchToProps)(FormBaru)
