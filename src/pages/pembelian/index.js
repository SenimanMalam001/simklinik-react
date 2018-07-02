import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPembelian } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { pembelian } from '../../const/access'
import ModalDetailPembelian from './ModalDetailPembelian'

class Pembelian extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      isSearch: false,
      access: {
        tambah: false,
        edit: false,
        hapus: false
      },
      detail: false,
      DetailPembelians: []
    }
  }
  componentDidMount() {
    this.props.setPembelian()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(pembelian).forEach(function(key,index) {
      if (pembelian[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setPembelian(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setPembelian()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setPembelian(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_pembelian'
    }
    axios.delete(`/pembelian/${id}`, { headers }).then((res) => {
      this.props.setPembelian()
    }).catch(err => console.log(err))
  }

  getDetailPembelian = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'get_pembelian'
    }
    axios.get(`/pembelian/${id}`, { headers}).then((res) => {
      console.log(res.data.data);
      this.setState({DetailPembelians: res.data.data.DetailPembelians})
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    const { pembelians, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Pembelian"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/pembelian/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={pembelians}
          thead={['No Trans','Supplier','Total Akhir','Aksi']}
          tbody={['no_trans','supplier','total_akhir']}
          editUrl={this.state.access.edit ?"/pembelian/edit": null }
          pages={pages}
          handlePageClick={this.handlePageClick}
          deleteAction={ this.state.access.hapus ? (id) => this.handleDelete(id) : null }
          customAction={(id) => {
            return (
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.setState({detail: true})
                  this.getDetailPembelian(id)
                }}
              >
                Detail
              </button>
            )
          }}
        />
        <p>*Hanya bisa melakukan pencarian terhadap No Transaksi. </p>
        <center>
          <BarLoader
            color={'#123abc'}
            loading={loading}
            className="middle-center"
          />
        </center>
        <ModalDetailPembelian
          show={this.state.detail}
          closeModal={() => this.setState({detail: false})}
          DetailPembelians={this.state.DetailPembelians}
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    pembelians: state.pembelians,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setPembelian}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Pembelian)
