import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setRuangans } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { ruangan } from '../../const/access'

class Ruangan extends React.Component {
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
    this.props.setRuangans()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(ruangan).forEach(function(key,index) {
      if (ruangan[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setRuangans(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setRuangans()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setRuangans(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_user'
    }
    axios.delete(`/ruangan/${id}`, { headers }).then((res) => {
      this.props.setRuangans()
    }).catch(err => console.log(err))
  }

  render() {
    const { ruangan, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Ruangan"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/ruangan/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={ruangan}
          thead={['Kode','Nama','Jumlah','Aksi']}
          tbody={['kode','nama','jumlah']}
          editUrl={ this.state.access.edit ? "/ruangan/edit": null}
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
    ruangan: state.ruangan,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setRuangans}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Ruangan)
