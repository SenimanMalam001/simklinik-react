import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'
import { connect } from 'react-redux'
import { setAllPenjamin } from '../../store/actions'
import { bindActionCreators } from 'redux'

class PasienEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      gender: '',
      tanggal_lahir: '',
      penjamin: '',
      alamat: '',
      nama: '',
      no_telp: '',
      error: {
        status: false,
        message: ''
      },
      swalSuccess: false
    }
  }

  handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  validate = () => {
    const { alamat, no_telp, nama, } = this.state
    if (!alamat) {
      this.setState({
        error: {
          status: true,
          message: 'Alamat is Required'
        }
      })
      return false
    }


    if (!nama) {
      this.setState({
        error: {
          status: true,
          message: 'Nama is Required'
        }
      })
      return false
    }

    if (!no_telp) {
      this.setState({
        error: {
          status: true,
          message: 'No Telp is Required'
        }
      })
      return false
    }
    return true
  }

  handleSubmit = (event) => {
    const { alamat, no_telp, nama, tanggal_lahir, gender, penjamin,} = this.state
    const { id } = this.props.match.params
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'edit_pasien'
      }

      axios.put(`/pasien/${id}`,{ alamat, no_telp, nama,tanggal_lahir, gender, penjamin,},{ headers }).then((res) => {
        this.setState({swalSuccess: true})
        this.props.history.push('/pasien')
      }).catch((err) => {
        console.log(err)
      })
    }
    event.preventDefault()
  }

  getData = () => {
    const { id } = this.props.match.params
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'get_pasien'
    }
    axios.get(`/pasien/${id}`, { headers}).then((res) => {
      const { alamat, nama, no_telp, gender, penjamin, tanggal_lahir } = res.data.data
      this.setState({
        alamat,
        nama,
        no_telp,
        gender,
        penjamin,
        tanggal_lahir
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getData()
    this.props.setAllPenjamin()
  }

  render() {
    const { alamat , no_telp, nama, tanggal_lahir, gender, penjamin, error} = this.state
    const { penjamins } = this.props
    return (
      <div className="container" style={{ marginTop: '20px'}}>

        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Pasien"
            thirdText="Edit Pasien"
            secondUrl="/pasien"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            tanggal_lahir={tanggal_lahir}
            gender={gender}
            penjamin={penjamin}
            penjamins={penjamins}
            alamat={alamat}
            nama={nama}
            no_telp={no_telp}
          />
        </div>
        <AlertSuccess
          type="edit"
          status={this.state.swalSuccess}
        />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    penjamins: state.penjamin,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setAllPenjamin}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PasienEdit)
