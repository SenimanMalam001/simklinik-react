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

class ItemKeluarEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      jumlah: '',
      produk: '',
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
    const { jumlah, produk} = this.state
    if (!jumlah) {
      this.setState({
        error: {
          status: true,
          message: 'User is Required'
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
    const { jumlah, produk, keterangan} = this.state
    const { id } = this.props.match.params
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'edit_item_keluar'
      }
      axios.put(`/item-keluar/${id}`,{ jumlah, produk, keterangan},{ headers }).then((res) => {
        this.setState({swalSuccess: true})
        this.props.history.push('/item-keluar')
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
      otoritas: 'get_item_keluar'
    }
    axios.get(`/item-keluar/${id}`, { headers}).then((res) => {
      const { jumlah, produk, keterangan } = res.data.data
      this.setState({
        jumlah,
        produk,
        keterangan
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getData()
    this.props.setAllProduk()
  }

  render() {
    const { jumlah, produk, error} = this.state
    const { produks} = this.props
    return (
      <div className="container" style={{ marginTop: '20px'}}>

        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Item Keluar"
            thirdText="Edit"
            secondUrl="/komisi"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            jumlah={jumlah}
            produk={produk}
            produks={produks}

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
    produks: state.produk
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setAllProduk }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ItemKeluarEdit)
