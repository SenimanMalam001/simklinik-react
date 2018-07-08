import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setKasMutasi } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { kasmutasi } from '../../const/access'

class KasMutasi extends React.Component {
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
    this.props.setKasMutasi()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(kasmutasi).forEach(function(key,index) {
      if (kasmutasi[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setKasMutasi(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setKasMutasi()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setKasMutasi(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_kas_mutasi'
    }
    axios.delete(`/kas-mutasi/${id}`, { headers }).then((res) => {
      this.props.setKasMutasi()
    }).catch(err => console.log(err))
  }

  render() {
    const { kas_mutasis, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Kas Mutasi"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/kas-mutasi/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={kas_mutasis}
          thead={['No Trans', 'Dari Kas','Ke Kas','Jumlah','Waktu','Keterangan','Aksi']}
          tbody={['no_trans','dari_kas','ke_kas','jumlah','waktu','keterangan']}
          editUrl={this.state.access.edit ?"/kas-mutasi/edit": null }
          pages={pages}
          handlePageClick={this.handlePageClick}
          deleteAction={this.state.access.hapus ? (id) => this.handleDelete(id) : null }
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
    kas_mutasis: state.kas_mutasis,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setKasMutasi}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(KasMutasi)
