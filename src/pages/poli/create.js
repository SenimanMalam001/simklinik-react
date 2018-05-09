import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'

class PoliCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
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
    const {  name} = this.state

    if (!name) {
      this.setState({
        error: {
          status: true,
          message: 'Nama is Required'
        }
      })
      return false
    }
    return true
  }

  handleSubmit = (event) => {
    const {  name} = this.state
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_poli'
      }

      axios.post('/poli',{ name},{ headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/poli')
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
    const {  name, error} = this.state
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-6 offset-md-3">
          <BreadCrumb
            secondText="Poli"
            thirdText="Tambah Poli"
            secondUrl="/kategori-transaksi"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            name={name}
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

export default PoliCreate
