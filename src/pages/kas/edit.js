import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'

class KasEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      kode: '',
      nama: '',
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
    const { kode, nama} = this.state
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

    return true
  }

  handleSubmit = (event) => {
    const { kode, nama} = this.state
    const { id } = this.props.match.params
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'edit_kas'
      }

      axios.put(`/kas/${id}`,{ kode, nama},{ headers }).then((res) => {
        this.setState({swalSuccess: true})
        this.props.history.push('/kas')
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
      otoritas: 'get_kas'
    }
    axios.get(`/kas/${id}`, { headers}).then((res) => {
      const { kode, nama } = res.data.data
      this.setState({
        kode,
        nama,
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { kode, jumlah, nama, error} = this.state
    return (
      <div className="container" style={{ marginTop: '20px'}}>

        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Kas"
            thirdText="Edit Kas"
            secondUrl="/kas"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            kode={kode}
            nama={nama}
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

export default KasEdit
