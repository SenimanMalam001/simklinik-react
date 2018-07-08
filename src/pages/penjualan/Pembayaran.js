import React from 'react';
import TextInputWithLabel from '../../components/TextInputWithLabel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  setAllKas,
  setAllPenjamin,
  setTbsPenjualan,
  setAllUsers,
  setAllRegistrasi ,
  setAllPetugas,
  setClearRegistrasi,
  setPenjaminPenjualan,
} from '../../store/actions'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Currency from 'react-currency-format';
import axios from '../../axios'
import AlertSuccess from '../../components/AlertSuccess'
import HotKey from 'react-shortcut'
import Modal from 'react-modal';
import CardInfoPetugas from './CardInfoPetugas'
import SweetAlert from 'sweetalert2-react';
import ReactToPrint from "react-to-print";
import Print from './Print'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                  : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Pembayaran extends React.Component {
  constructor(props) {
    super()
    this.state = {
      penjualan: null,
      total_akhir: 0,
      subtotal: 0,
      diskon: 0,
      cara_bayar: '',
      jumlah_bayar: 0,
      kembalian: 0,
      keterangan: '',
      jumlah_kredit: 0,
      penjamin: '',
      status_jual: '',
      show: true,
      no_reg: '',
      petugas: [] ,
      error: {
        status: false,
        message: ''
      },
      swalSuccess: false,
      print: false
    }
  }
  handleChange = (e) => {

    if (Array.isArray(e)) {
      let value = []
      let name = e[0].target.name
      e.forEach(e => {
          value.push(e.target.value)
      })
      this.setState({[name]: value})
    } else {
      this.setState({[e.target.name]: e.target.value})
    }
  }
  handleSubmit = (event) => {
    const {error, swalSuccess, penjualan, ...input} = this.state
    const token = localStorage.token
    if (this.props.jenis === 'create') {
      const headers = {
        token,
        otoritas: 'create_penjualan'
      }
      axios.post('/penjualan', input,{ headers }).then((res) => {
        this.setState({ swalSuccess: true, penjualan: res.data.data})
        this.props.setTbsPenjualan()
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
        otoritas: 'edit_penjualan'
      }
      axios.put(`/penjualan/${id}`, input, { headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/penjualan')
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
  getPetugas = () => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'get_petugas'
    }
    axios.get(`/petugas/all`, { headers}).then((res) => {
      const { data } = res.data
      const petugasTetap = data.map(data => data.user)
      this.setState({petugas: petugasTetap})
    }).catch((err) => {
      console.log(err);
    })

  }
  getData = () => {
    const { id } = this.props.match.params
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'get_penjualan'
    }
    axios.get(`/penjualan/${id}`, { headers}).then((res) => {
      const { id, no_trans, userCreated, userEdited, createdAt, ...penjualan } = res.data.data
      const { PetugasPenjualans } = res.data.data
      const petugas = PetugasPenjualans.map(petugas =>  petugas.user)
      penjualan.petugas = petugas
      penjualan.kembalian = penjualan.jumlah_bayar - penjualan.total_akhir
      if (penjualan.kembalian < 0 ) {
        penjualan.kembalian = 0
      }
      this.setState(penjualan)
      this.props.setTbsPenjualan()
      this.props.setPenjaminPenjualan(penjualan.Penjamin)
    }).catch((err) => {
      console.log(err);
    })
  }
  componentDidMount() {

    this.props.setClearRegistrasi()
    if (this.props.jenis === 'edit') {
      this.getData()
    } else {
      this.getPetugas()
    }
    this.props.setAllKas()
    this.props.setAllPenjamin()
    this.props.setAllUsers()
    this.props.setAllRegistrasi()
  }

  componentDidUpdate() {
    let { total_akhir, diskon, subtotal, jumlah_bayar, jumlah_kredit } = this.state
    const { tbs_penjualans } = this.props
    let total_tbs =  0
    tbs_penjualans.forEach(tbs => {
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
        this.setState({status_jual: 'hutang'})
      }
      if (jumlah_kredit == 0) {
        this.setState({status_jual: 'tunai'})
      }
    }
  }
  render() {
    const {  no_reg, petugas, total_akhir, jumlah_bayar, kembalian, keterangan, diskon, cara_bayar, penjamin } = this.state
    let { kass, penjamins, users, registrasi } = this.props
    kass = kass.map(kas => {
      return {
        value: kas.id,
        label: kas.nama,
        target: {name: 'cara_bayar', value: kas.id}
      }
    })
    penjamins = penjamins.map(penjamin => {
      return {
        value: penjamin.id,
        label: penjamin.nama,
        target: {name: 'penjamin', value: penjamin.id}
      }
    })
    users = users.map(user => {
      return {
        value: user.id,
        label: user.name,
        target: {name: 'petugas', value: user.id}
      }
    })

    if (registrasi.length) {
      registrasi = registrasi.map(registrasi => {
          return {
            value: registrasi.id,
            label:`${registrasi.no_reg} | ${registrasi.no_rm} | ${registrasi.nama}`,
            target: {name: 'no_reg', value: registrasi.id}
          }
      })
    }
    return (
      <div>
        <CardInfoPetugas
          petugas={petugas}
          users={users}
          registrasi={registrasi}
          no_reg={no_reg}
          openModal={() => {
            this.setState({show:true})
          }}
        />
        <form onSubmit={ (e) => {
          if (this.state.cara_bayar === '') {
            this.setState({
              error: {
                status: true,
                message: 'Cara Bayar Wajib Di Isi'
              }
            })
          } else {
            this.handleSubmit(e)
          }
          e.preventDefault()
         }}>
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
            handleChange={(e) => {
              if (e) {
                this.handleChange(e)
              } else {
                this.setState({diskon: ''})
              }
            }}
          />
          <label>Cara Bayar </label>
          <Select
            placeholder="Cara Bayar..."
            name={cara_bayar}
            className="mb-2 mr-sm-2"
            value={cara_bayar}
            onChange={(e) => {
              if (e) {
                this.handleChange(e)
              } else {
                this.setState({diskon: ''})
              }
            }}
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
              let kembalian =  value - total_akhir
              if (kembalian < 0 ) {
                kembalian = 0
              }
              this.setState({jumlah_bayar: value, kembalian})
            }}/>
          </div>
          <div className="form-group">
            <label>Kembalian </label>
            <h3>
            <Currency
              value={kembalian}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp.'}
            /></h3>
          </div>
          <div className="form-group">
            <TextInputWithLabel
              label="Keterangan"
              placeholder="Keterangan"
              type="text"
              name="keterangan"
              value={keterangan}
              handleChange={(e) => {
                if (e) {
                  this.handleChange(e)
                } else {
                  this.setState({keterangan: ''})
                }
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">Selesai</button>
        </form>
        <SweetAlert
          show={this.state.swalSuccess}
          title="Berhasil"
          type="success"
          text="Data Berhasil Di Tambahkan"
          onConfirm={() => {
            this.setState({ swalSuccess: false, print: true })
          }}
        />
        <SweetAlert
          show={this.state.error.status}
          title="Error"
          type="error"
          text={this.state.error.message}
          onConfirm={() => {
            this.setState({ error: {
              status: false,
              message: ''
            } })
          }}
         />
        <HotKey
          keys={['f1']}
          onKeysCoincide={() => {
            alert(1)
          }}
        />
      <Modal
        isOpen={this.state.show}
        style={customStyles}
      >
        <p>*Langsung Klik Submit jika tidak perlu memilih registrasi dan petugas</p>
        <form onSubmit={(e) => {
          if (this.state.penjamin === '') {
            this.setState({
              error: {
                status: true,
                message: 'Penjamin Wajib Di Isi!'
              }
            })
          } else {
            this.setState({show:false})
          }
          e.preventDefault()
        }}>
          <div className="form-group">
            <label>Registrasi </label>
            <Select
              placeholder="Registrasi..."
              name="no_reg"
              className="mb-2 mr-sm-2"
              value={no_reg}
              onChange={(e) => {
                if (e) {
                  this.handleChange(e)
                  const penjamin =  this.props.registrasi.filter(data => data.id == e.value)[0].penjamin
                  console.log(penjamin);
                  this.setState({penjamin})
                  this.props.setPenjaminPenjualan(this.props.penjamins.filter(data => data.id == penjamin)[0])
                } else {
                  this.setState({no_reg: ''})
                }
              }}
              options={registrasi}
              ref={(ref) => { this.select = ref; }}
            />
          </div>
          <div className="form-group">
            <label>Petugas </label>
            <Select
              placeholder="Petugas..."
              name="petugas"
              className="mb-2 mr-sm-2"
              value={petugas}
              multi={true}
              onChange={(e) => {
                if (e.length) {
                  this.handleChange(e)
                } else {
                  this.setState({petugas: []})
                }
              }}
              options={users}
              ref={(ref) => { this.select = ref; }}
            />
          </div>
          <div className="form-group">
            <label>Penjamin </label>
            <Select
              placeholder="Penjamin..."
              name={penjamin}
              className="mb-2 mr-sm-2"
              value={penjamin}
              onChange={(e) => {
                if (e) {
                  this.handleChange(e)
                  this.props.setPenjaminPenjualan(this.props.penjamins.filter(data => data.id == e.value)[0])
                } else {
                  this.setState({penjamin: ''})
                }
              }}
              options={penjamins}
              ref={(ref) => { this.select = ref; }}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </Modal>
      <Modal
        isOpen={this.state.print}
        style={customStyles}
      >
        <ReactToPrint
          trigger={() => <a href="#" className="btn btn-primary"><i className="fas fa-print"></i> Print</a>}
          content={() => this.componentRef} />
        <button onClick={() => this.setState({print: false})}  className="btn btn-danger">Close </button>
        <Print  ref={el => (this.componentRef = el)} penjualan={this.state.penjualan} />
      </Modal>
      </div>

    )
  }
}


const mapStateToProps = (state) => {
  return {
    kass: state.kas,
    tbs_penjualans: state.tbs_penjualans,
    penjamins: state.penjamin,
    users: state.users,
    registrasi: state.registrasi,
    petugas: state.petugas,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setAllKas,
    setAllPenjamin,
    setTbsPenjualan,
    setAllUsers,
    setAllRegistrasi,
    setAllPetugas,
    setClearRegistrasi,
    setPenjaminPenjualan,
    setTbsPenjualan
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Pembayaran)
