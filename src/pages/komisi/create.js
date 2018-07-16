import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAllUsers, setAllProduk } from '../../store/actions'

class KomisiCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      user: '',
      produk: '',
      jumlah: '',
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
    const { user, produk, jumlah} = this.state
    if (!user) {
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
    const { user, produk, jumlah} = this.state
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_komisi'
      }

      axios.post('/komisi',{user, produk, jumlah},{ headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/komisi')
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
    this.props.setAllUsers()
    this.props.setAllProduk()
  }

  render() {
    const { user, produk, jumlah, error} = this.state
    const { users, produks} = this.props
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Komisi"
            thirdText="Tambah Komisi"
            secondUrl="/komisi"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            user={user}
            produk={produk}
            jumlah={jumlah}
            users={users}
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
    users: state.users,
    produks: state.produk
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setAllProduk, setAllUsers}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(KomisiCreate)
