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
  setClearRegistrasi
} from '../../store/actions'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Currency from 'react-currency-format';
import axios from '../../axios'
import AlertSuccess from '../../components/AlertSuccess'
import HotKey from 'react-shortcut'
import Modal from 'react-modal';
import CardInfoPetugas from './CardInfoPetugas'

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
      total_akhir: 0,
      subtotal: 0,
      diskon: 0,
      cara_bayar: '',
      jumlah_bayar: 0,
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
      swalSuccess: false
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
    const {error, swalSuccess, ...input} = this.state
    const token = localStorage.token
    if (this.props.jenis === 'create') {
      const headers = {
        token,
        otoritas: 'create_penjualan'
      }
      axios.post('/penjualan', input,{ headers }).then((res) => {
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
      this.setState(penjualan)
      this.props.setTbsPenjualan()
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
    const {  no_reg, petugas, total_akhir, jumlah_bayar, diskon, cara_bayar, penjamin } = this.state
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
          <div className="form-group">
            <label>Penjamin </label>
            <Select
              placeholder="Penjamin..."
              name={penjamin}
              className="mb-2 mr-sm-2"
              value={penjamin}
              onChange={this.handleChange}
              options={penjamins}
              ref={(ref) => { this.select = ref; }}
            />
          </div>
          <button type="submit" className="btn btn-primary">Selesai</button>
        </form>
        <AlertSuccess
          type="create"
          status={this.state.swalSuccess}
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
          this.setState({show:false})
          e.preventDefault()
        }}>
          <div className="form-group">
            <label>Registrasi </label>
            <Select
              placeholder="Registrasi..."
              name={no_reg}
              className="mb-2 mr-sm-2"
              value={no_reg}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              options={users}
              ref={(ref) => { this.select = ref; }}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
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
    setClearRegistrasi
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Pembayaran)
