import React from 'react';
import BreadCrumb from './BreadCrumbIndex'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUsers } from '../../store/actions'
import { bindActionCreators } from 'redux'
import SweetAlert from 'sweetalert2-react';
import axios from '../../axios'

class User extends React.Component {
  constructor() {
    super()
    this.state = {
      swalDelete: false,
      users: []
    }
  }
  componentDidMount() {
    this.props.setUsers()
  }
  render() {
    const { users } = this.props
    return (
      <div className="container">
        <BreadCrumb />
        <Link className="btn btn-primary" to="/" style={{ marginBottom: 10}} ><i class="fas fa-plus"></i> Tambah</Link>
        <table className="table">
          <thead className="thead-dark">
            <tr>
             <th scope="col">#</th>
             <th scope="col">Username</th>
             <th scope="col">Nama</th>
             <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => {
                return (
                  <tr>
                    <th scope="row">{ index + 1}</th>
                    <td>{ user.username}</td>
                    <td>{ user.name}</td>
                    <td>
                      <Link className="btn btn-warning" to="/edit"> <i class="fas fa-edit"></i> </Link>
                      <button className="btn btn-danger" onClick={ () => this.setState({swalDelete: true})} > <i class="fas fa-trash"></i> </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <SweetAlert
          show={this.state.swalDelete}
          type="warning"
          title="Yakin ingin Menghapus?"
          text="Data Yang DiHapus Tidak Akan Kembali"
          showCancelButton
          onConfirm={() => this.setState({ swalDelete: false })}
         />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setUsers}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(User)
