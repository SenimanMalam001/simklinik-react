import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'

class RuanganEdit extends React.Component {
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
    const { id } = this.props.match.params
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'edit_ruangan'
      }

      axios.put(`/ruangan/${id}`,{ kode, jumlah, nama},{ headers }).then((res) => {
        this.setState({swalSuccess: true})
        this.props.history.push('/ruangan')
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
      otoritas: 'get_ruangan'
    }
    axios.get(`/ruangan/${id}`, { headers}).then((res) => {
      const { kode, nama, jumlah } = res.data.data
      this.setState({
        kode,
        nama,
        jumlah,
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
            secondText="Ruangan"
            thirdText="Edit Ruangan"
            secondUrl="/ruangan"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            kode={kode}
            nama={nama}
            jumlah={jumlah}
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

export default RuanganEdit
