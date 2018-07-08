import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setKasManual } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { kaskeluarmasuk } from '../../const/access'

class KasManual extends React.Component {
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
    this.props.setKasManual()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(kaskeluarmasuk).forEach(function(key,index) {
      if (kaskeluarmasuk[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setKasManual(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setKasManual()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setKasManual(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_kas_manual'
    }
    axios.delete(`/kas-manual/${id}`, { headers }).then((res) => {
      this.props.setKasManual()
    }).catch(err => console.log(err))
  }

  render() {
    const { kas_manuals, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Kas Manual"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/kas-manual/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={kas_manuals}
          thead={['No Trans', 'Jenis','Kas','Kategori','Jumlah','Waktu','Keterangan','Aksi']}
          tbody={['no_trans','jenis','kas','kategori','jumlah','waktu','keterangan']}
          editUrl={this.state.access.edit ? "/kas-manual/edit": null}
          pages={pages}
          handlePageClick={this.handlePageClick}
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
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    kas_manuals: state.kas_manuals,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setKasManual}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(KasManual)
