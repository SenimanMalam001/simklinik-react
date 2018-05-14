import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setItemKeluar } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';

class ItemKeluar extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      isSearch: false
    }
  }
  componentDidMount() {
    this.props.setItemKeluar()
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setItemKeluar(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setItemKeluar()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setItemKeluar(selected + 1)

  }

  render() {
    const { item_keluars, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Item Keluar"
        />
      <Link className="btn btn-primary" to="/item-keluar/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={item_keluars}
          thead={['No Trans','Produk','Jumlah','Keterangan','Aksi']}
          tbody={['no_trans','produk','jumlah','keterangan']}
          editUrl="/item-keluar/edit"
          pages={pages}
          handlePageClick={this.handlePageClick}
          deleteAction={(id) => {
            const token = localStorage.token
            const headers = {
              token,
              otoritas: 'delete_item_keluar'
            }
            axios.delete(`/item-keluar/${id}`, { headers }).then((res) => {
              this.props.setItemKeluar()
            }).catch(err => console.log(err))

          }}
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
    item_keluars: state.item_keluars,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setItemKeluar}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ItemKeluar)
