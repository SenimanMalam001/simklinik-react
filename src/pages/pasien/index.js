import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPasien } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { pasien } from '../../const/access'

class Pasien extends React.Component {
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
    this.props.setPasien()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(pasien).forEach(function(key,index) {
      if (pasien[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setPasien(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setPasien()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setPasien(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_pasien'
    }
    axios.delete(`/pasien/${id}`, { headers }).then((res) => {
      this.props.setPasien()
    }).catch(err => console.log(err))
  }

  render() {
    const { pasien, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Pasien"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/pasien/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={pasien}
          thead={['No RM','Nama','Alamat','No Telp','Aksi']}
          tbody={['no_rm','nama','alamat','no_telp']}
          editUrl={ this.state.access.edit ? "/pasien/edit": null}
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
    pasien: state.pasien,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setPasien}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Pasien)
