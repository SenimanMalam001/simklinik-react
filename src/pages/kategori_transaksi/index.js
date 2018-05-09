import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setKategoriTransaksi } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';

class KategoriTransaksi extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      isSearch: false
    }
  }
  componentDidMount() {
    this.props.setKategoriTransaksi()
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setKategoriTransaksi(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setKategoriTransaksi()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setKategoriTransaksi(selected + 1)

  }

  render() {
    const { kategori_transaksi, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Kategori Transaksi"
        />
        <Link className="btn btn-primary" to="/kategori-transaksi/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={kategori_transaksi}
          thead={['Nama','Aksi']}
          tbody={['name']}
          editUrl="/kategori-transaksi/edit"
          pages={pages}
          handlePageClick={this.handlePageClick}
          deleteAction={(id) => {
            const token = localStorage.token
            const headers = {
              token,
              otoritas: 'delete_user'
            }
            axios.delete(`/kategori-transaksi/${id}`, { headers }).then((res) => {
              this.props.setKategoriTransaksi()
            }).catch(err => console.log(err))

          }}
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
    kategori_transaksi: state.kategori_transaksi,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setKategoriTransaksi}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(KategoriTransaksi)
