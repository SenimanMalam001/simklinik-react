import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setProduk } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { produk } from '../../const/access'
import DownloadExcell from './DownloadExcell'

class Produk extends React.Component {
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
    this.props.setProduk()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(produk).forEach(function(key,index) {
      if (produk[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setProduk(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setProduk()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setProduk(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_produk'
    }
    axios.delete(`/produk/${id}`, { headers }).then((res) => {
      this.props.setProduk()
    }).catch(err => console.log(err))
  }

  render() {
    const { produk, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Produk"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/produk/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <DownloadExcell />
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={produk}
          thead={['Kode', 'Nama','Tipe','Harga Beli','Harga Jual','Aksi']}
          tbody={['kode','nama','tipe','harga_beli','harga_jual_1']}
          editUrl={ this.state.access.edit ? "/produk/edit": null}
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
    produk: state.produk,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setProduk}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Produk)
