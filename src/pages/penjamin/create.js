import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'

class PenjaminCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      alamat: '',
      nama: '',
      no_telp: '',
      level: '',
      error: {
        status: false,
        message: ''
      },
      swalSuccess: false
    }
  }

  handleChange = (e) => {
    if (e.value) {
      this.setState({level: e.value})
    } else {
      this.setState({[e.target.name]: e.target.value})
    }
  }

  validate = () => {
    const { alamat, no_telp, nama, level} = this.state
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

    if (!level) {
      this.setState({
        error: {
          status: true,
          message: 'Level Harga  is Required'
        }
      })
      return false
    }

    return true
  }

  handleSelect = (select) => {
    this.setState({level: select.value})
  }

  handleSubmit = (event) => {
    const { alamat, no_telp, nama, level} = this.state
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_penjamin'
      }

      axios.post('/penjamin',{alamat, no_telp, nama, level},{ headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/penjamin')
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
    const { alamat , no_telp, nama, level,  error} = this.state
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Penjamin"
            thirdText="Tambah Penjamin"
            secondUrl="/penjamin"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            alamat={alamat}
            no_telp={no_telp}
            nama={nama}
            level={level}
          />
        </div>
        <AlertSuccess
          type="create"
          status={this.state.swalSuccess}
        />
      </div>
    )
  }
}

export default PenjaminCreate
