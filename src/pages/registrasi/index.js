import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setRegistrasi } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';

class Registrasi extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      isSearch: false
    }
  }
  componentDidMount() {
    this.props.setRegistrasi()
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setRegistrasi(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setRegistrasi()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setRegistrasi(selected + 1)

  }

  render() {
    const { registrasi, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Registrasi"
        />
      <Link className="btn btn-primary" to="/registrasi/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Pasien Lama</Link>
      <Link className="btn btn-primary" to="/registrasi/create/baru" style={{ marginBottom: 10, marginLeft: 10}} ><i className="fas fa-plus"></i> Pasien Baru</Link>
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={registrasi.filter(data => data.status_registrasi == 0)}
          thead={['No RM','Nama','Dokter','Poli','Antrian','Aksi']}
          tbody={['no_rm','nama','dokter','poli','no_antrian']}
          editUrl="/registrasi/edit"
          pages={pages}
          handlePageClick={this.handlePageClick}
          deleteAction={(id) => {
            const token = localStorage.token
            const headers = {
              token,
              otoritas: 'delete_registrasi'
            }
            axios.delete(`/registrasi/${id}`, { headers }).then((res) => {
              this.props.setRegistrasi()
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
    registrasi: state.registrasi,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setRegistrasi}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Registrasi)
