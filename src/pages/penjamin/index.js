import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPenjamin } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { penjamin } from '../../const/access'

class Penjamin extends React.Component {
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
    this.props.setPenjamin()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(penjamin).forEach(function(key,index) {
      if (penjamin[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setPenjamin(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setPenjamin()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setPenjamin(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_penjamin'
    }
    axios.delete(`/penjamin/${id}`, { headers }).then((res) => {
      this.props.setPenjamin()
    }).catch(err => console.log(err))

  }

  render() {
    const { penjamin, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Penjamin"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/penjamin/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={penjamin}
          thead={['Nama','Alamat','No Telp','Level','Aksi']}
          tbody={['nama','alamat','no_telp','level']}
          editUrl={ this.state.access.edit ? "/penjamin/edit" : null}
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
    penjamin: state.penjamin,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setPenjamin}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Penjamin)
