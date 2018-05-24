import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAllUsers } from '../../store/actions'

class PetugasCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      user: '',
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
    const {  user} = this.state

    if (!user) {
      this.setState({
        error: {
          status: true,
          message: 'User is Required'
        }
      })
      return false
    }
    return true
  }

  handleSubmit = (event) => {
    const {  user} = this.state
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_petugas'
      }

      axios.post('/petugas',{ user},{ headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/petugas')
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
  }

  render() {
    const {  user, error} = this.state
    const { users } = this.props
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-6 offset-md-3">
          <BreadCrumb
            secondText="Petugas"
            thirdText="Tambah Petugas"
            secondUrl="/petugas"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            user={user}
            users={users}
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
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ setAllUsers}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PetugasCreate)
