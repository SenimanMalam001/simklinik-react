import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPetugas } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { petugas } from '../../const/access'

class Petugas extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      isSearch: false,
      access: {
        tambah: false,
        edit: false,
        hapus: false
      }
    }
  }
  componentDidMount() {
    this.props.setPetugas()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(petugas).forEach(function(key,index) {
      if (petugas[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setPetugas(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setPetugas()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setPetugas(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_petugas'
    }
    axios.delete(`/petugas/${id}`, { headers }).then((res) => {
      this.props.setPetugas()
    }).catch(err => console.log(err))
  }

  render() {
    const { petugas, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Petugas"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/petugas/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={petugas}
          thead={['Petugas','Aksi']}
          tbody={['user']}
          editUrl={ this.state.access.edit ? "/petugas/edit": null}
          pages={pages}
          handlePageClick={this.handlePageClick}
          deleteAction={this.state.access.hapus ? (id) => this.handleDelete(id) : null }
        />
        <center>
          <BarLoader
            color={'#123abc'}
            loading={loading}
            className="middle-center"
          />
        </center>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    petugas: state.petugas,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setPetugas}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Petugas)
