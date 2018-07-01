import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setRekamMedik } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { rekammedik } from '../../const/access'

class RekamMedik extends React.Component {
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
    this.props.setRekamMedik()
    this.checkAccess()
  }
  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(rekammedik).forEach(function(key,index) {
      if (rekammedik[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setRekamMedik(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setRekamMedik()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setRekamMedik(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_rekam_medik'
    }
    axios.delete(`/rekammedik/${id}`, { headers }).then((res) => {
      this.props.setRekamMedik()
    }).catch(err => console.log(err))
  }

  render() {
    const { rekammedik, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Rekam Medik"
        />
      {
        this.state.access.tambah && (
        <Link className="btn btn-primary" to="/rekammedik/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={rekammedik}
          thead={['No Reg','No RM','Nama','Jenis','Aksi']}
          tbody={['no_reg','no_rm','nama','jenis']}
          editUrl={ this.state.access.edit ? "/rekammedik/edit": null}
          pages={pages}
          handlePageClick={this.handlePageClick}
          deleteAction={this.state.access.hapus ? (id) => this.handleDelete(id): null}
        />
      <p>*Pencarian Berdasarkan No RM Pasien</p>
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
    rekammedik: state.rekammedik,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setRekamMedik}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RekamMedik)
