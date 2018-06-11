import React from 'react';
import axios from '../../axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  setProfil
} from '../../store/actions'
import Currency from 'react-currency-format';
import moment from 'moment';

class Print extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.setProfil()
  }
  render() {
    let { profil } = this.props
    const { penjualan } = this.props
    profil = profil[0]
    if (profil) {
      return (
        <div>
          {profil.nama} <br/>
          {profil.alamat} <br/>
        =========================
          <table>
            <tr>
              <td>No Penjualan</td>
              <td>: { penjualan.no_trans}</td>
            </tr>
          </table>
        =========================
          <table>
            <tr>
              <td>Subtotal</td>
              <td>:
                <Currency
                  value={penjualan.subtotal}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix=" Rp. "
                 />
               </td>
            </tr>
            <tr>
              <td>Diskon</td>
              <td>:
                <Currency
                  value={penjualan.diskon}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix=" Rp. "
                 />
               </td>
            </tr>
            <tr>
              <td>Total Akhir</td>
              <td>:
                <Currency
                  value={penjualan.total_akhir}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix=" Rp. "
                 />
               </td>
            </tr>
            <tr>
              <td>Tunai</td>
              <td>:
                <Currency
                  value={penjualan.jumlah_bayar}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix=" Rp. "
                 />
               </td>
            </tr>
            <tr>
              <td>Kembalian</td>
              <td>:
                <Currency
                  value={penjualan.jumlah_bayar > penjualan.total_akhir ? penjualan.jumlah_bayar - penjualan.total_akhir : 0}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix=" Rp. "
                 />
               </td>
            </tr>
          </table>
        ========================= <br />
          Tanggal: { moment(penjualan.createdAt).format('DD-MM-YYYY') } <br/>
          Terima Kasih <br/>
          Semoga Lekas Sembuh
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    profil: state.profil,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setProfil
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Print)
