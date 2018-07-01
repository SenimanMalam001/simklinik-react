import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setProfil } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { profil } from '../../const/access'

class Profil extends React.Component {
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
    this.props.setProfil()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(profil).forEach(function(key,index) {
      if (profil[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setProfil(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setProfil()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setProfil(selected + 1)

  }

  render() {
    const { profil, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Profil"
        />
        <Table
          data={profil}
          thead={['Nama','Alamat','No Telp','Aksi']}
          tbody={['nama','alamat','no_telp']}
          editUrl={ this.state.access.edit ? "/profil/edit": null}
          pages={pages}
          withoutPagination={true}
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
    profil: state.profil,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setProfil}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profil)
