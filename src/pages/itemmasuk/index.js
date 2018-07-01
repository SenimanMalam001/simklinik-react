import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setItemMasuk } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import { itemmasuk } from '../../const/access'

class ItemMasuk extends React.Component {
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
    this.props.setItemMasuk()
    this.checkAccess()
  }

  checkAccess = () => {
    const role = localStorage.role
    const access = {
      tambah: false,
      edit: false,
      hapus: false
    }
    Object.keys(itemmasuk).forEach(function(key,index) {
      if (itemmasuk[key].indexOf(role) >= 0) {
        access[key] = true
      }
    });
    this.setState({access})
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setItemMasuk(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setItemMasuk()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setItemMasuk(selected + 1)

  }

  handleDelete = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'delete_item_masuk'
    }
    axios.delete(`/item-masuk/${id}`, { headers }).then((res) => {
      this.props.setItemMasuk()
    }).catch(err => console.log(err))
  }

  render() {
    const { item_masuks, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Item Masuk"
        />
      {
        this.state.access.tambah && (
          <Link className="btn btn-primary" to="/item-masuk/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        )
      }
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={item_masuks}
          thead={['No Trans','Produk','Jumlah','Keterangan','Aksi']}
          tbody={['no_trans','produk','jumlah','keterangan']}
          editUrl={this.state.access.edit ?"/item-masuk/edit": null }
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
    item_masuks: state.item_masuks,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setItemMasuk}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ItemMasuk)
