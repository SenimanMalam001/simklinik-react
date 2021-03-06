import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAllKas, setAllKategoriTransaksi } from '../../store/actions'

class KasManualCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      jumlah: '',
      kas: '',
      kategori: '',
      jenis: '',
      keterangan: '',
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
    const { jumlah, kas, jenis, kategori} = this.state
    if (!kas) {
      this.setState({
        error: {
          status: true,
          message: 'Kas is Required'
        }
      })
      return false
    }
    if (!kategori) {
      this.setState({
        error: {
          status: true,
          message: 'Kategori is Required'
        }
      })
      return false
    }
    if (!jenis) {
      this.setState({
        error: {
          status: true,
          message: 'Jenis Transaksi is Required'
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
    const { jumlah, kas, keterangan, jenis, kategori} = this.state
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_kas_manual'
      }

      axios.post('/kas-manual',{jumlah, kas, keterangan, jenis, kategori},{ headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/kas-manual')
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

  componentDidMount() {
    this.props.setAllKas()
    this.props.setAllKategoriTransaksi()
  }

  render() {
    const { jumlah, kas, keterangan, jenis, kategori, error} = this.state
    const {  kass, kategori_transaksis} = this.props
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Kas Manual"
            thirdText="Tambah"
            secondUrl="/kas-manual"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            keterangan={keterangan}
            jumlah={jumlah}
            kas={kas}
            kategori={kategori}
            jenis={jenis}
            kass={kass}
            kategori_transaksis={kategori_transaksis}
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

const mapStateToProps = (state) => {
  return {
    kass: state.kas,
    kategori_transaksis: state.kategori_transaksi
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setAllKas,
    setAllKategoriTransaksi
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(KasManualCreate)
