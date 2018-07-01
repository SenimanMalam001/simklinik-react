import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setSupplier } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { supplier} from '../../const/access'

class Supplier extends React.Component {
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
    this.props.setSupplier()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(supplier).forEach(function(key,index) {
      if (supplier[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setSupplier(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setSupplier()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setSupplier(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_supplier'
    }
    axios.delete(`/supplier/${id}`, { headers }).then((res) => {
      this.props.setSupplier()
    }).catch(err => console.log(err))
  }

  render() {
    const { supplier, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Supplier"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/supplier/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={supplier}
          thead={['Nama','Alamat','No Telp','Aksi']}
          tbody={['nama','alamat','no_telp']}
          editUrl={ this.state.access.edit ? "/supplier/edit" : null}
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
    supplier: state.supplier,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setSupplier}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)
