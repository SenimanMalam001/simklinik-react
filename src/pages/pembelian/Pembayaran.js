import React from 'react';
import TextInputWithLabel from '../../components/TextInputWithLabel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  setAllKas, setAllSupplier, setTbsPembelian } from '../../store/actions'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Currency from 'react-currency-format';
import axios from '../../axios'
import AlertSuccess from '../../components/AlertSuccess'


class Pembayaran extends React.Component {
  constructor() {
    super()
    this.state = {
      total_akhir: 0,
      subtotal: 0,
      diskon: 0,
      cara_bayar: '',
      jumlah_bayar: 0,
      jumlah_kredit: 0,
      supplier: '',
      no_faktur_supplier: '',
      status_beli: '',
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
  handleSubmit = (event) => {
    const {error, swalSuccess, ...input} = this.state
    const token = localStorage.token
    if (this.props.jenis === 'create') {
      const headers = {
        token,
        otoritas: 'create_pembelian'
      }
      axios.post('/pembelian', input,{ headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/pembelian')
      }).catch((err) => {
        const message = err.response.data.message
        this.setState({
          error: {
            status: true,
            message: message
          }
        })
      })
    } else if(this.props.jenis === 'edit') {

      const { id } = this.props.match.params
      const headers = {
        token,
        otoritas: 'edit_pembelian'
      }
      axios.put(`/pembelian/${id}`, input, { headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/pembelian')
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
  getData = () => {
    const { id } = this.props.match.params
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'get_pembelian'
    }
    axios.get(`/pembelian/${id}`, { headers}).then((res) => {
      const { id, no_trans, userCreated, userEdited, createdAt, ...pembelian } = res.data.data
      this.setState(pembelian)
      this.props.setTbsPembelian()
    }).catch((err) => {
      console.log(err);
    })
  }
  componentDidMount() {
    if (this.props.jenis === 'edit') {
      this.getData()
    }
    this.props.setAllKas()
    this.props.setAllSupplier()
  }

  componentDidUpdate() {
    let { total_akhir, diskon, subtotal, jumlah_bayar, jumlah_kredit } = this.state
    const { tbs_pembelians } = this.props
    let total_tbs =  0
    tbs_pembelians.forEach(tbs => {
      total_tbs += tbs.total_akhir
    })
    total_tbs -= diskon
    let new_jumlah_kredit = total_tbs - Number(jumlah_bayar)
    if (total_akhir !== total_tbs) {
      this.setState({total_akhir: total_tbs,subtotal: Number(total_tbs) + Number(diskon) })
    }
    if (jumlah_kredit != new_jumlah_kredit) {
      this.setState({total_akhir: total_tbs, jumlah_kredit: new_jumlah_kredit})
      if (jumlah_kredit > 0) {
        this.setState({status_beli: 'hutang'})
      }
      if (jumlah_kredit == 0) {
        this.setState({status_beli: 'tunai'})
      }
    }
  }
  render() {
    const { total_akhir, jumlah_bayar, diskon, cara_bayar, supplier, no_faktur_supplier } = this.state
    let { kass, suppliers } = this.props
    kass = kass.map(kas => {
      return {
        value: kas.id,
        label: kas.nama,
        target: {name: 'cara_bayar', value: kas.id}
      }
    })
    suppliers = suppliers.map(supplier => {
      return {
        value: supplier.id,
        label: supplier.nama,
        target: {name: 'supplier', value: supplier.id}
      }
    })
    return (
      <div>
        <form onSubmit={ this.handleSubmit}>
          <label>Total Akhir </label>
          <h2>
            <Currency
              value={total_akhir}
              displayType={'text'}
              thousandSeparator={true}
              prefix="Rp. "
             />
          </h2>
          <TextInputWithLabel
            label="Diskon Per Faktur"
            placeholder="Diskon"
            type="text"
            name="diskon"
            value={diskon}
            handleChange={this.handleChange}
          />
          <label>Cara Bayar </label>
          <Select
            placeholder="Cara Bayar..."
            name={cara_bayar}
            className="mb-2 mr-sm-2"
            value={cara_bayar}
            onChange={this.handleChange}
            options={kass}
            ref={(ref) => { this.select = ref; }}
          />
          <div className="form-group">
            <label>Jumlah Bayar </label>
            <Currency
              value={jumlah_bayar}
              className="form-control"
              thousandSeparator={true}
              prefix={'Rp.'}
              onValueChange={(values) => {
              const {formattedValue, value} = values;
              this.setState({jumlah_bayar: value})
            }}/>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Supplier </label>
                <Select
                  placeholder="Supplier..."
                  name={supplier}
                  className="mb-2 mr-sm-2"
                  value={supplier}
                  onChange={this.handleChange}
                  options={suppliers}
                  ref={(ref) => { this.select = ref; }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <TextInputWithLabel
                label="No Faktur Supplier"
                placeholder="No Faktur Supplier"
                type="text"
                name="no_faktur_supplier"
                value={no_faktur_supplier}
                handleChange={this.handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Selesai</button>
        </form>
        <AlertSuccess
          type="create"
          status={this.state.swalSuccess}
        />
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    kass: state.kas,
    tbs_pembelians: state.tbs_pembelians,
    suppliers: state.supplier
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({  setAllKas, setAllSupplier, setTbsPembelian }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Pembayaran)
