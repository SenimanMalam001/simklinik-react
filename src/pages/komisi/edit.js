import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAllUsers, setAllProduk } from '../../store/actions'

class KomisiEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      user: '',
      produk: '',
      error: {
        status: false,
        message: ''
      },
      swalSuccess: false
    }
  }

  handleChange = (e) => {
      this.setState({[e.name]: e.value})
  }

  validate = () => {
    const { user, produk} = this.state
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
    return true
  }

  handleSubmit = (event) => {
    const { user, produk} = this.state
    const { id } = this.props.match.params
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'edit_komisi'
      }
      axios.put(`/komisi/${id}`,{ user, produk},{ headers }).then((res) => {
        this.setState({swalSuccess: true})
        this.props.history.push('/komisi')
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
      otoritas: 'get_komisi'
    }
    axios.get(`/komisi/${id}`, { headers}).then((res) => {
      const { user, produk } = res.data.data
      this.setState({
        user,
        produk,
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getData()
    this.props.setAllUsers()
    this.props.setAllProduk()
  }

  render() {
    const { user, produk, error} = this.state
    const { users, produks} = this.props
    return (
      <div className="container" style={{ marginTop: '20px'}}>

        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Komisi"
            thirdText="Edit Komisi"
            secondUrl="/komisi"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            user={user}
            users={users}
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
    users: state.users,
    produks: state.produk
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setAllProduk, setAllUsers}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(KomisiEdit)
