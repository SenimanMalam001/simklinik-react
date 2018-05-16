import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAllProduk } from '../../store/actions'

class StokOpnameCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      stok_akhir: '',
      produk: '',
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
    const { stok_akhir, produk} = this.state
    if (!stok_akhir) {
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

  handleSubmit = (event) => {
    const { stok_akhir, produk} = this.state
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_stok_opname'
      }

      axios.post('/stok-opname',{stok_akhir, produk},{ headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/stok-opname')
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
    this.props.setAllProduk()
  }

  render() {
    const { stok_akhir, produk, error, } = this.state
    const { users, produks} = this.props
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Stok Opname"
            thirdText="Tambah"
            secondUrl="/stok-opname"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            stok_akhir={stok_akhir}
            produk={produk}
            produks={produks}
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
    produks: state.produk
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setAllProduk}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StokOpnameCreate)
