import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPembayaranHutang } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { pembayaranhutang } from '../../const/access'

class PembayaranHutang extends React.Component {
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
    this.props.setPembayaranHutang()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(pembayaranhutang).forEach(function(key,index) {
      if (pembayaranhutang[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setPembayaranHutang(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setPembayaranHutang()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setPembayaranHutang(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_pembayaran_hutang'
    }
    axios.delete(`/pembayaranhutang/${id}`, { headers }).then((res) => {
      this.props.setPembayaranHutang()
    }).catch(err => console.log(err))
  }

  render() {
    const { pembayaranhutangs, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Pembayaran Hutang"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/pembayaranhutang/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={pembayaranhutangs}
          thead={['No Trans','Jumlah Pembayaran','Supplier','Tanggal Hutang','Aksi']}
          tbody={['no_trans','supplier','jumlah_bayar','interval']}
          pages={pages}
          handlePageClick={this.handlePageClick}
          deleteAction={ this.state.access.hapus ? (id) => this.handleDelete(id) : null  }
        />
        <p>*Hanya bisa melakukan pencarian terhadap No Transaksi. </p>
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
    pembayaranhutangs: state.pembayaranhutangs,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setPembayaranHutang}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PembayaranHutang)
