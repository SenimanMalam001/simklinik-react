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

class KasMutasiEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      jumlah: '',
      kas: '',
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
    const { jumlah, dari_kas, ke_kas, } = this.state
    if (!dari_kas) {
      this.setState({
        error: {
          status: true,
          message: 'Dari Kas is Required'
        }
      })
      return false
    }
    if (!ke_kas) {
      this.setState({
        error: {
          status: true,
          message: 'Ke Kas is Required'
        }
      })
      return false
    }

    if (ke_kas == dari_kas) {
      this.setState({
        error: {
          status: true,
          message: 'Kas Tidak Boleh Sama'
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
    const { jumlah, dari_kas,ke_kas, keterangan, } = this.state
    const { id } = this.props.match.params
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'edit_kas_mutasi'
      }
      axios.put(`/kas-mutasi/${id}`,{ jumlah, dari_kas, ke_kas, keterangan, },{ headers }).then((res) => {
        this.setState({swalSuccess: true})
        this.props.history.push('/kas-mutasi')
      }).catch((err) => {
        console.log(err)
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
      otoritas: 'get_kas_mutasi'
    }
    axios.get(`/kas-mutasi/${id}`, { headers}).then((res) => {
      const { jumlah, dari_kas, ke_kas, keterangan,  } = res.data.data
      this.setState({
        jumlah,
        dari_kas,
        ke_kas,
        keterangan,
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getData()
    this.props.setAllKas()
  }

  render() {
    const { jumlah, dari_kas, ke_kas, error, keterangan} = this.state
    const { kass, kategori_transaksis} = this.props
    return (
      <div className="container" style={{ marginTop: '20px'}}>

        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Kas Mutasi"
            thirdText="Edit"
            secondUrl="/kas-mutasi"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            jumlah={jumlah}
            dari_kas={dari_kas}
            ke_kas={ke_kas}
            kass={kass}
            keterangan={keterangan}

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

const mapStateToProps = (state) => {
  return {
    kass: state.kas,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setAllKas,setAllKategoriTransaksi }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(KasMutasiEdit)
