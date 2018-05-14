import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'
import { connect } from 'react-redux'
import { setAllPenjamin, setPoli, setAllUsers, setAllRuangans } from '../../store/actions'
import { bindActionCreators } from 'redux'
import ModalPasien from './modalPasien'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'
import FormPasien from '../pasien/form'

class RegistrasiCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      penjamin: '',
      pasien: '',
      pasien_registrasi: null,
      poli: '',
      dokter: '',
      ruangan: '',
      jenis_registrasi: '',
      suhu: '',
      sistole_diastole: '',
      berat_badan: '',
      tinggi_badan: '',
      nama: '',
      gender:'',
      no_telp:'',
      alamat:'',
      pasiens: [],
      tanggal_lahir:'',
      error: {
        status: false,
        message: ''
      },
      swalSuccess: false
    }
  }

  handleChange = (e) => {
    console.log(e);
    if (e) {
      this.setState({[e.target.name]: e.target.value})
    }
  }

  validate = () => {
    const { pasien, penjamin, jenis_registrasi, dokter, poli} = this.state

    if (!penjamin) {
      this.setState({
        error: {
          status: true,
          message: 'Penjamin is Required'
        }
      })
      return false
    }

    if (!jenis_registrasi) {
      this.setState({
        error: {
          status: true,
          message: 'Jenis Registrasi is Required'
        }
      })
      return false
    }

    if (!dokter) {
      this.setState({
        error: {
          status: true,
          message: 'Dokter Registrasi is Required'
        }
      })
      return false
    }

    if (!poli) {
      this.setState({
        error: {
          status: true,
          message: 'Poli Registrasi is Required'
        }
      })
      return false
    }

    return true
  }

  handleSubmit = (event) => {
    const {
      pasien,
      poli,
      jenis_registrasi,
      dokter,
      penjamin,
      suhu,
      sistole_diastole,
      tinggi_badan,
      berat_badan,
      alamat,
      no_telp,
      gender,
      nama,
      tanggal_lahir
    } = this.state
    let { ruangan } = this.state
    if (ruangan == '') {
      ruangan = null
    }
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_registrasi'
      }
      const inputRegistrasi = {
        pasien,
        poli,
        jenis_registrasi,
        dokter,
        ruangan,
        penjamin,
        suhu,
        tinggi_badan,
        berat_badan,
        sistole_diastole,
      }
      const inputPasien = {
        alamat,
        no_telp,
        gender,
        nama,
        tanggal_lahir,
        penjamin
      }
      axios.post('/pasien',inputPasien,{ headers }).then((res) => {
        inputRegistrasi.pasien = res.data.data.no_rm
        console.log(inputRegistrasi);
        return inputRegistrasi
      }).then(input => {
        return axios.post('/registrasi', input, { headers })
      }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/registrasi')
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

  handleSubmitSearch = (event) => {
    const { no_rm,nama, tanggal_lahir,} = this.state
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'get_pasien'
      }
      axios.post('/pasien/search',{no_rm, nama,tanggal_lahir},{ headers }).then((res) => {
        console.log(res.data.data);
        this.setState({
          pasiens: res.data.data
        })
      }).catch((err) => {
        const message = err.response.data.message
        this.setState({
          error: {
            status: true,
            message: message
          }
        })
      })
    event.preventDefault()
  }

  pilihPasien = (pasien) => {
    this.setState({
      pasien: pasien.no_rm,
      pasien_registrasi: pasien,
      pasiens: []
    })
  }

  componentDidMount() {
    this.props.setAllPenjamin()
    this.props.setPoli()
    this.props.setAllUsers()
    this.props.setAllRuangans()

  }

  render() {
    const {
      ruangan,
      dokter,
      poli,
      pasien,
      penjamin,
      jenis_registrasi,
      sistole_diastole,
      suhu,
      tinggi_badan,
      berat_badan,
      nama,
      gender,
      alamat,
      no_telp,
      tanggal_lahir,
      pasiens,
      pasien_registrasi,
      error
    } = this.state
    const { penjamins, users, polis, ruangans  } = this.props
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-8 offset-md-2">
          <BreadCrumb
            secondText="Registrasi"
            thirdText="Pasien Baru"
            secondUrl="/registrasi"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <form onSubmit={this.handleSubmit}>
            <SelectBox
              value={jenis_registrasi}
              name="jenis_registrasi"
              label="Jenis Registrasi"
              handleChange={this.handleChange}
              options={[
                {
                  label: 'Rawat Jalan',value:'rawat_jalan', target: { value: 'rawat_jalan',name: 'jenis_registrasi'},
                },
                {
                  label: 'Rawat Inap',value:'rawat_inap', target: { value: 'rawat_inap',name: 'jenis_registrasi'},
                }
              ]}
            />
          <div className="row">
            <div className="col-md-6">
              <TextInputWithLabel
                label="Nama"
                value={nama}
                name="nama"
                placeholder="Nama Pasien"
                type="text"
                handleChange={this.handleChange}
              />
            </div>
            <div className="col-md-6">
              <SelectBox
                value={gender}
                name="gender"
                label="Gender"
                handleChange={this.handleChange}
                options={[
                  {
                    label: 'Laki-laki',value:'laki-laki', target: { value: 'laki-laki',name: 'gender'},
                  },
                  {
                    label: 'Perempuan',value:'perempuan', target: { value: 'perempuan',name: 'gender'},
                  }
                ]}
              />
            </div>
            <div className="col-md-6">
              <TextInputWithLabel
                label="Tanggal Lahir"
                value={tanggal_lahir}
                name="tanggal_lahir"
                placeholder="Tanggal Lahir Pasien"
                type="date"
                handleChange={this.handleChange}
              />
            </div>
            <div className="col-md-6">
              <TextInputWithLabel
                label="No Telp / Hp"
                value={no_telp}
                name="no_telp"
                placeholder="No Telp / Hp Pasien"
                type="text"
                handleChange={this.handleChange}
              />
            </div>
          </div>
          <TextInputWithLabel
            label="Alamat Pasien"
            value={alamat}
            name="alamat"
            placeholder="Alamat Pasien"
            type="text"
            handleChange={this.handleChange}
          />
          <div className="row">
            <div className="col-md-6">
              <SelectBox
                value={poli}
                name="poli"
                label="Poli"
                handleChange={this.handleChange}
                options={ polis.map( poli => {
                  return {
                    label: poli.display_name, value: poli.id, target: { name: 'poli', value: poli.id}
                  }
                })}
              />
            </div>
            <div className="col-md-6">
              <SelectBox
                value={dokter}
                name="dokter"
                label="Dokter"
                handleChange={this.handleChange}
                options={ users.map( user => {
                  return {
                    label: user.name, value: user.id, target: { name: 'dokter', value: user.id}
                  }
                })}
              />
            </div>
          </div>
            <SelectBox
              value={penjamin}
              name="penjamin"
              label="Penjamin"
              handleChange={this.handleChange}
              options={ penjamins.map( penjamin => {
                return {
                  label: penjamin.nama, value: penjamin.id, target: { name: 'penjamin', value: penjamin.id}
                }
              })}
            />
          {
            jenis_registrasi == 'rawat_inap' && (
              <SelectBox
                value={ruangan}
                name="ruangan"
                label="Ruangan (Ranap)"
                handleChange={this.handleChange}
                options={ ruangans.map( ruangan => {
                  return {
                    label: ruangan.nama, value: ruangan.id, target: { name: 'ruangan', value: ruangan.id}
                  }
                })}
              />
            )
          }
          <div className="row">
            <div className="col-md-6">
              <TextInputWithLabel
                label="Tinggi Badan"
                value={tinggi_badan}
                name="tinggi_badan"
                placeholder="Tinggi Badan"
                type="text"
                handleChange={this.handleChange}
              />
            </div>
            <div className="col-md-6">
              <TextInputWithLabel
                label="Berat Badan"
                value={berat_badan}
                name="berat_badan"
                placeholder="Berat Badan"
                type="text"
                handleChange={this.handleChange}
              />
            </div>
            <div className="col-md-6">
              <TextInputWithLabel
                label="Sistole Diastole"
                value={sistole_diastole}
                name="sistole_diastole"
                placeholder="Sistole Diastole"
                type="text"
                handleChange={this.handleChange}
              />
            </div>
            <div className="col-md-6">
              <TextInputWithLabel
                label="Suhu"
                value={suhu}
                name="suhu"
                placeholder="Suhu"
                type="text"
                handleChange={this.handleChange}
              />
            </div>
          </div>
        <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <AlertSuccess
          type="create"
          status={this.state.swalSuccess}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    penjamins: state.penjamin,
    polis: state.poli,
    ruangans: state.ruangan,
    users: state.users,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setAllPenjamin,
    setPoli,
    setAllUsers,
    setAllRuangans
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(RegistrasiCreate)
