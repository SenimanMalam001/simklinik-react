import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPembayaranPiutang } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { pembayaranpiutang } from '../../const/access'

class PembayaranPiutang extends React.Component {
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
    this.props.setPembayaranPiutang()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(pembayaranpiutang).forEach(function(key,index) {
      if (pembayaranpiutang[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setPembayaranPiutang(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setPembayaranPiutang()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setPembayaranPiutang(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_pembayaran_piutang'
    }
    axios.delete(`/pembayaranpiutang/${id}`, { headers }).then((res) => {
      this.props.setPembayaranPiutang()
    }).catch(err => console.log(err))
  }

  render() {
    const { pembayaranpiutangs, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Pembayaran Piutang"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/pembayaranpiutang/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={pembayaranpiutangs}
          thead={['No Trans','Jumlah Pembayaran','Penjamin','Tanggal Piutang','Aksi']}
          tbody={['no_trans','penjamin','jumlah_bayar','interval']}
          pages={pages}
          handlePageClick={this.handlePageClick}
          deleteAction={this.state.access.hapus ? (id) => this.handleDelete(id) : null}
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
    pembayaranpiutangs: state.pembayaranpiutangs,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setPembayaranPiutang}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PembayaranPiutang)
