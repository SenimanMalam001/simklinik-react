import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setKomisiPenjualan } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import Filter from './filter'


class KomisiPenjualan extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      isSearch: false
    }
  }
  componentDidMount() {
    this.props.setKomisiPenjualan()
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setKomisiPenjualan(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setKomisiPenjualan()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setKomisiPenjualan(selected + 1)

  }

  render() {
    const { komisipenjualan, pages, loading } = this.props
    const { query } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="KomisiPenjualan"
        />
        <Filter />
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={komisipenjualan}
          thead={['No Trans','User','Produk','Jumlah','Nilai','Total']}
          tbody={['no_trans','user','produk','jumlah','nilai_komisi','total_komisi']}
          pages={pages}
          handlePageClick={this.handlePageClick}
          actionNotDisplay={true}
        />
        <p>*Hanya bisa melakukan pencarian terhadap nama produk. </p>
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
    komisipenjualan: state.komisipenjualans,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setKomisiPenjualan}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(KomisiPenjualan)
