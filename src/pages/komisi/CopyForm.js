import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import BreadCrumb from '../../components/BreadCrumb'
import AlertSuccess from '../../components/AlertSuccess'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAllUsers } from '../../store/actions'
import SelectBox from '../../components/SelectBox'

class KomisiCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      user_copy: '',
      user_paste: '',
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
    const { user_paste, user_copy} = this.state
    if (!user_copy || !user_paste) {
      this.setState({
        error: {
          status: true,
          message: 'User is Required'
        }
      })
      return false
    }
    if (user_copy === user_paste) {
      this.setState({
        error: {
          status: true,
          message: 'User Tidak Boleh Sama'
        }
      })
      return false
    }
    return true
  }

  handleSubmit = (event) => {
    const { user_copy, user_paste} = this.state
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_komisi'
      }

      axios.post('/komisi/copy',{user_copy, user_paste},{ headers }).then((res) => {
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
  }

  render() {
    const { user_copy, user_paste, error} = this.state
    const { users} = this.props
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Komisi"
            thirdText="Copy Komisi"
            secondUrl="/komisi"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
           <form onSubmit={this.handleSubmit}>
            <SelectBox
                label="User Copy"
                placeholder="Pilih User"
                name="user_copy"
                value={user_copy}
                options={users.map(users => {
                        return {
                        value: users.id,
                        label: users.name,
                        target: {
                            name: 'user_copy',
                            value: users.id
                        }
                        }
                    })
                }
                handleChange={ (e) => {
                  if (e) {
                    this.handleChange(e)
                  } else {
                    this.setState({user_copy: ''})
                  }
                 }}
            />
            <SelectBox
                label="User Paste"
                placeholder="Pilih User"
                name="user_paste"
                value={user_paste}
                options={users.map(users => {
                        return {
                        value: users.id,
                        label: users.name,
                        target: {
                            name: 'user_paste',
                            value: users.id
                        }
                        }
                    })
                }
                handleChange={ (e) => {
                  if (e) {
                    this.handleChange(e)
                  } else {
                    this.setState({user_paste: ''})
                  }
                 }}
            />
             <button type="submit" className="btn btn-primary">Submit</button>
           </form>
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

const mapDispatchToProps = dispatch => bindActionCreators({  setAllUsers}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(KomisiCreate)
