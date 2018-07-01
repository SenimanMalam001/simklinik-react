import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setStokAwal } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { stokawal } from '../../const/access'

class StokAwal extends React.Component {
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
    this.props.setStokAwal()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(stokawal).forEach(function(key,index) {
      if (stokawal[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setStokAwal(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setStokAwal()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setStokAwal(selected + 1)

  }

  render() {
    const { stok_awals, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Stok Awal"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/stok-awal/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={stok_awals}
          thead={['No Trans','Produk','Jumlah','Aksi']}
          tbody={['no_trans','produk','jumlah',]}
          pages={pages}
          handlePageClick={this.handlePageClick}
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
    stok_awals: state.stok_awals,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setStokAwal}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StokAwal)
