import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  setAllProduk, setTbsPembelian } from '../../store/actions'
import SweetAlert from 'sweetalert2-react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from '../../axios'

class FormTbs  extends React.Component {
  constructor() {
    super()
    this.state = {
      jumlah: 1,
      produk: '',
      harga_beli: '',
      subtotal: 0,
      diskon: 0,
      total_akhir: 0,
      error: {
        status: false,
        message: ''
      },
      swalSuccess: false,
    }
  }
  validate = () => {
    const { jumlah, produk} = this.state
    if (!jumlah) {
      this.setState({
        error: {
          status: true,
          message: 'Jumlah is Required'
        }
      })
      return false
    }
    if (!produk) {
      this.setState({
        error: {
          status: true,
          message: 'Produk is Required'
        }
      })
      return false
    }
    return true
  }
  handleChange = (e) => {
    if (e) {
      this.setState({[e.target.name]: e.target.value})
    }
  }
  handleSubmit = (event) => {
    const { jumlah, produk, harga_beli} = this.state
    let { subtotal, diskon, total_akhir} = this.state
    subtotal = Number(harga_beli) * Number(jumlah)
    total_akhir = Number(subtotal) - Number(diskon)
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_pembelian'
      }
      const input = {
        produk,
        harga_beli,
        jumlah,
        subtotal,
        diskon,
        total_akhir
      }
      axios.post('/tbs-pembelian', input, { headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.setTbsPembelian()
        this.clearInput()
        this.focusStateSelect()
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
  clearInput = () => {
    this.setState({
      produk: '',
      harga_beli: '',
      jumlah: ''
    })
  }
  componentDidMount() {
    this.props.setAllProduk()
  }
  focusStateSelect =  () => {
		this.select.focus();
  }
  render () {
    const { jumlah, produk, harga_beli, error, diskon} = this.state
    let { users, produks} = this.props
    produks = produks.map(produk => {
      return {
        value: produk.id,
        label: produk.nama,
        target: {name: 'produk', value: produk.id},
        harga_beli: produk.harga_beli
      }
    })
    return (
      <div>
        <form className="form-inline" onSubmit={this.handleSubmit} >
           <Select
            placeholder="Produk..."
            name={produk}
            className="mb-2 mr-sm-2"
            value={produk}
            onChange={(e) => {
              this.handleChange(e)
              this.setState({harga_beli: e.harga_beli})
            }}
            options={produks}
            wrapperStyle={{ width: '15%'}}
            ref={(ref) => { this.select = ref; }}
          />
          <input
            type="text"
            value={harga_beli}
            onChange={this.handleChange}
            className="form-control mb-2 mr-sm-2"
            name="harga_beli"
            style={{ width: '15%'}}
            placeholder="Harga Beli"/>
          <input
            type="text"
            value={jumlah}
            onChange={this.handleChange}
            className="form-control mb-2 mr-sm-2"
            name="jumlah"
            style={{ width: '10%'}}
            placeholder="Jumlah Beli"/>
          <input
            type="text"
            value={diskon}
            onChange={this.handleChange}
            className="form-control mb-2 mr-sm-2"
            name="jumlah"
            style={{ width: '10%'}}
            placeholder="Diskon"/>
          <button type="submit" className="btn btn-primary mb-2">Beli</button>
        </form>
        <SweetAlert
          show={this.state.error.status}
          type="error"
          title="Error"
          text={this.state.error.message}
         />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    produks: state.produk
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({  setAllProduk, setTbsPembelian}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FormTbs)
