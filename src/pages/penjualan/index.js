import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPenjualan } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { penjualan } from '../../const/access'
import ModalDetailPenjualan from './ModalDetailPenjualan'

class Penjualan extends React.Component {
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
      DetailPenjualans: []
    }
  }
  componentDidMount() {
    this.props.setPenjualan()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(penjualan).forEach(function(key,index) {
      if (penjualan[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setPenjualan(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setPenjualan()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setPenjualan(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_penjualan'
    }
    axios.delete(`/penjualan/${id}`, { headers }).then((res) => {
      this.props.setPenjualan()
    }).catch(err => console.log(err))
  }

  getDetailPenjualan = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'get_penjualan'
    }
    axios.get(`/penjualan/${id}`, { headers}).then((res) => {
      this.setState({DetailPenjualans: res.data.data.DetailPenjualans})
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    const { penjualans, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Penjualan"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/penjualan/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={penjualans}
          thead={['No Trans','Penjamin','Total Akhir','Aksi']}
          tbody={['no_trans','penjamin','total_akhir']}
          editUrl={ this.state.access.edit ?"/penjualan/edit" : null }
          pages={pages}
          handlePageClick={this.handlePageClick}
          customAction={(id) => {
            return (
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.setState({detail: true})
                  this.getDetailPenjualan(id)
                }}
              >
                Detail
              </button>
            )
          }}
          deleteAction={ this.state.access.hapus ? (id) => this.handleDelete(id) : null }
        />
        <p>*Hanya bisa melakukan pencarian terhadap No Transaksi. </p>
        <center>
          <BarLoader
            color={'#123abc'}
            loading={loading}
            className="middle-center"
          />
        </center>
        <ModalDetailPenjualan
          show={this.state.detail}
          closeModal={() => this.setState({detail: false})}
          DetailPenjualans={this.state.DetailPenjualans}
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    penjualans: state.penjualans,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setPenjualan}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Penjualan)
