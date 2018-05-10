import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'

class ProdukCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      harga_beli: '0',
      harga_jual_1: '0',
      harga_jual_2: '0',
      harga_jual_3: '0',
      nama: '',
      kode: '',
      tipe: '',
      error: {
        status: false,
        message: ''
      },
      swalSuccess: false
    }
  }

  handleChange = (e) => {
    if (e.value) {
      this.setState({tipe: e.value})
    } else {
      this.setState({[e.target.name]: e.target.value})
    }
  }

  validate = () => {
    const { harga_beli, kode, nama, tipe, harga_jual_1} = this.state
    if (!harga_beli) {
      this.setState({
        error: {
          status: true,
          message: 'Harga Beli is Required'
        }
      })
      return false
    }

    if (!harga_jual_1) {
      this.setState({
        error: {
          status: true,
          message: 'Harga Jual 1 is Required'
        }
      })
      return false
    }


    if (!nama) {
      this.setState({
        error: {
          status: true,
          message: 'Nama Produk is Required'
        }
      })
      return false
    }

    if (!kode) {
      this.setState({
        error: {
          status: true,
          message: 'Kode Produk is Required'
        }
      })
      return false
    }

    if (!tipe) {
      this.setState({
        error: {
          status: true,
          message: 'Tipe Produk is Required'
        }
      })
      return false
    }

    return true
  }

  handleSelect = (select) => {
    this.setState({tipe: select.value})
  }

  handleSubmit = (event) => {
    const { harga_beli, kode, nama, tipe, harga_jual_1, harga_jual_2, harga_jual_3} = this.state
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_produk'
      }

      axios.post('/produk',{
        harga_jual_1,
        harga_jual_2,
        harga_jual_3,
        harga_beli,
        kode,
        nama,
        tipe
      },{ headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/produk')
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
    const { error, harga_beli, kode, nama, tipe, harga_jual_1, harga_jual_2, harga_jual_3} = this.state
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Produk"
            thirdText="Tambah Produk"
            secondUrl="/produk"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            harga_beli={harga_beli}
            harga_jual_1={harga_jual_1}
            harga_jual_2={harga_jual_2}
            harga_jual_3={harga_jual_3}
            kode={kode}
            nama={nama}
            tipe={tipe}
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

export default ProdukCreate
