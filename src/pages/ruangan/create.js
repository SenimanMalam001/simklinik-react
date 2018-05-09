import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'

class RuanganCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      kode: '',
      nama: '',
      jumlah: '',
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
    const { kode, jumlah, nama} = this.state
    if (!kode) {
      this.setState({
        error: {
          status: true,
          message: 'Kode is Required'
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

    if (!jumlah) {
      this.setState({
        error: {
          status: true,
          message: 'Jumlah is Required'
        }
      })
      return false
    }

    return true
  }

  handleSubmit = (event) => {
    const { kode, jumlah, nama} = this.state
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_ruangan'
      }

      axios.post('/ruangan',{kode, jumlah, nama},{ headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/ruangan')
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
    const { kode , jumlah, nama,   error} = this.state
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Ruangan"
            thirdText="Tambah Ruangan"
            secondUrl="/ruangan"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            kode={kode}
            jumlah={jumlah}
            nama={nama}
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

export default RuanganCreate
