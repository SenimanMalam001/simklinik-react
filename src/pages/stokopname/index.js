import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setStokOpname } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import { BarLoader } from 'react-spinners';
import Print from './print'
import ReactToPrint from "react-to-print";
import Modal from 'react-modal';

class StokOpname extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      isSearch: false,
      dari_tanggal: '',
      sampai_tanggal: '',
      print: false,
      stokOpnameFilter: []
    }
  }
  componentDidMount() {
    this.props.setStokOpname()
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setStokOpname(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setStokOpname()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  handleChangeFilter = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmitFilter = (e) => {
    const { dari_tanggal, sampai_tanggal} = this.state
    const token = localStorage.token
    axios.get(`/stok-opname/interval?dari_tanggal=${dari_tanggal}&sampai_tanggal=${sampai_tanggal}`,{ headers: { token, otoritas: 'get_stok_opname' }}).then((res) => {
      const { data } = res.data
      this.setState({stokOpnameFilter: data})
      console.log(data);
    }).catch((err) => {
      console.log(err)
    })
    e.preventDefault()
  }


  handlePageClick = (data) => {
    const { selected } = data
    this.props.setStokOpname(selected + 1)

  }

  render() {
    const { stok_opnames, pages, loading } = this.props
    const { query, dari_tanggal, sampai_tanggal, stokOpnameFilter } = this.state
    return (
      <div className="container">
        <BreadCrumb
          secondText="Stok Opname"
        />
      <Link className="btn btn-primary" to="/stok-opname/create" style={{ marginBottom: 10}} ><i className="fas fa-plus"></i> Tambah</Link>
        <form className="form-inline" onSubmit={this.handleSubmitFilter}>
          <input type="date" value={dari_tanggal} onChange={this.handleChangeFilter} className="form-control mb-2 mr-sm-2" name="dari_tanggal" placeholder="Dari Tanggal"/>
          <input type="date" value={sampai_tanggal} onChange={this.handleChangeFilter} className="form-control mb-2 mr-sm-2" name="sampai_tanggal" placeholder="Sampai Tanggal"/>
          <button type="submit" className="btn btn-primary mb-2" onClick={()=> this.setState({ print: true})}>Filter</button>
        </form>
        <Modal
          isOpen={this.state.print}
        >
          <ReactToPrint
            trigger={() => <a href="#" className="btn btn-primary"><i className="fas fa-print"></i> Print</a>}
            content={() => this.componentRef}
          />
        <button className="btn btn-danger" onClick={ ()=> this.setState({print: false})}><i className="fas fa-times"></i> Close </button>
          <Print data={ stokOpnameFilter} ref={el => (this.componentRef = el)} style={{ display: 'none'}} />
        </Modal>
        <SearchInput
          query={query}
          handleChange={this.handleChange}
        />
        <Table
          data={stok_opnames}
          thead={['No Trans','Produk','Stok Akhir','Stok Komputer','Selisih','Nilai','Aksi']}
          tbody={['no_trans','produk','stok_komputer','stok_akhir','selisih','nilai_selisih']}
          pages={pages}
          handlePageClick={this.handlePageClick}
          deleteAction={(id) => {
            const token = localStorage.token
            const headers = {
              token,
              otoritas: 'delete_stok_opname'
            }
            axios.delete(`/stok-opname/${id}`, { headers }).then((res) => {
              this.props.setStokOpname()
            }).catch(err => console.log(err))

          }}
        />
        <p>*Hanya bisa melakukan pencarian terhadap No Transaksi. </p>
        <p>*Nilai sama dengan selisih di kali harga beli produk. </p>
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
    stok_opnames: state.stok_opnames,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setStokOpname}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StokOpname)
