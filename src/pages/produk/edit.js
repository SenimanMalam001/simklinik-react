import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'

class PenjaminEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      harga_beli: '0',
      harga_jual_1: '0',
      harga_jual_2: '0',
      harga_jual_3: '0',
      harga_jual_4: '0',
      nama: '',
      kode: '',
      tipe: '',
      satuan: '',
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

  handleSubmit = (event) => {
    const { satuan, harga_beli, kode, nama, tipe, harga_jual_1, harga_jual_2, harga_jual_3, harga_jual_4} = this.state
    const { id } = this.props.match.params
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'edit_produk'
      }

      axios.put(`/produk/${id}`,{
        harga_jual_1,
        harga_jual_2,
        harga_jual_3,
        harga_jual_4,
        harga_beli,
        kode,
        nama,
        tipe,
        satuan
      },{ headers }).then((res) => {
        this.setState({swalSuccess: true})
        this.props.history.push('/produk')
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
      otoritas: 'get_produk'
    }
    axios.get(`/produk/${id}`, { headers}).then((res) => {
      const { harga_beli, nama, kode, tipe, harga_jual_1, harga_jual_2, harga_jual_3,harga_jual_4, satuan } = res.data.data
      this.setState({
        harga_beli,
        nama,
        kode,
        tipe,
        harga_jual_1,
        harga_jual_2,
        harga_jual_3,
        harga_jual_4,
        satuan
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { error, satuan,harga_beli, kode, nama, tipe, harga_jual_1, harga_jual_2, harga_jual_3,harga_jual_4} = this.state
    return (
      <div className="container" style={{ marginTop: '20px'}}>

        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Penjamin"
            thirdText="Edit Penjamin"
            secondUrl="/produk"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            harga_beli={harga_beli}
            nama={nama}
            tipe={tipe}
            satuan={satuan}
            kode={kode}
            harga_jual_1={harga_jual_1}
            harga_jual_2={harga_jual_2}
            harga_jual_3={harga_jual_3}
            harga_jual_4={harga_jual_4}
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

export default PenjaminEdit
