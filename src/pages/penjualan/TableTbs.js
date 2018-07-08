import React from 'react';
import { connect } from 'react-redux'
import axios from '../../axios'
import { bindActionCreators } from 'redux'
import {  setTbsPenjualan } from '../../store/actions'
import SweetAlert from 'sweetalert2-react';
import Currency from 'react-currency-format';


class TableTbs  extends React.Component {
  constructor() {
    super()
    this.state = {
      swalDelete: false,
      id: null
    }
  }
  componentDidMount() {
    this.props.setTbsPenjualan()
  }
  deleteAction = (id) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'create_penjualan'
    }
    axios.delete(`/tbs-penjualan/${id}`, { headers }).then((res) => {
      this.props.setTbsPenjualan()
    }).catch(err => console.log(err))
  }
  render () {
    const { tbs_penjualans } = this.props

    return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <td>Produk</td>
            <td>Harga Jual</td>
            <td>Jumlah</td>
            <td>Subtotal</td>
            <td>Diskon</td>
            <td>Total Akhir</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          {
            tbs_penjualans.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.produk}</td>
                  <td>
                    <Currency
                      value={data.harga_jual}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.jumlah}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.subtotal}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.diskon}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.total_akhir}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                      <button
                        className="btn btn-danger"
                        onClick={ () => {
                          this.setState({swalDelete: true, id: data.id})
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <SweetAlert
        show={this.state.swalDelete}
        type="warning"
        title="Yakin ingin Menghapus?"
        text="Data Yang DiHapus Tidak Akan Kembali"
        showCancelButton
        onConfirm={() => {
          this.setState({ swalDelete: false })
          this.deleteAction(this.state.id)
        }}
       />
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tbs_penjualans: state.tbs_penjualans
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({  setTbsPenjualan}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TableTbs)
