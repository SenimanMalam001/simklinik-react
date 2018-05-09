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

class Ruangan extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      isSearch: false
    }
  }
  componentDidMount() {
    this.props.setRuangans()
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

  render() {
    const { ruangan, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Ruangan"
        />
      <Link className="btn btn-primary" to="/ruangan/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={ruangan}
          thead={['Kode','Nama','Jumlah','Aksi']}
          tbody={['kode','nama','jumlah']}
          editUrl="/ruangan/edit"
          pages={pages}
          handlePageClick={this.handlePageClick}
          deleteAction={(id) => {
            const token = localStorage.token
            const headers = {
              token,
              otoritas: 'delete_user'
            }
            axios.delete(`/ruangan/${id}`, { headers }).then((res) => {
              this.props.setRuangans()
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
    ruangan: state.ruangan,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setRuangans}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Ruangan)
