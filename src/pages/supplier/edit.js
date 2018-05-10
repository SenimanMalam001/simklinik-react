import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'

class SupplierEdit extends React.Component {
  constructor() {
    super()
    this.state = {
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
    const { alamat, no_telp, nama, } = this.state
    const { id } = this.props.match.params
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'edit_supplier'
      }

      axios.put(`/supplier/${id}`,{ alamat, no_telp, nama},{ headers }).then((res) => {
        this.setState({swalSuccess: true})
        this.props.history.push('/supplier')
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
      otoritas: 'get_supplier'
    }
    axios.get(`/supplier/${id}`, { headers}).then((res) => {
      const { alamat, nama, no_telp } = res.data.data
      this.setState({
        alamat,
        nama,
        no_telp,
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { alamat, no_telp, nama, error} = this.state
    return (
      <div className="container" style={{ marginTop: '20px'}}>

        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Supplier"
            thirdText="Edit Supplier"
            secondUrl="/supplier"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
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

export default SupplierEdit
