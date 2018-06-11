import React from 'react';
import Currency from 'react-currency-format';
import moment from 'moment'



class DisplayData extends React.Component {
  constructor() {
    super()
  }
  onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
  }
  render() {

    const { persediaan, produk, stok_akhir } = this.props
    const data = persediaan
    let saldo =  stok_akhir
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <td>Waktu</td>
              <td>No Trans</td>
              <td>Kategori</td>
              <td>Produk</td>
              <td>Masuk</td>
              <td>Keluar</td>
              <td>Saldo</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6">
                Saldo Awal
              </td>
              <td>{saldo}</td>
            </tr>
            {
              data.map((data, index) => {
                if (data.masuk > 0) {
                  saldo += data.masuk
                } else {
                  saldo -= data.keluar
                }
                return (
                  <tr key={index}>
                    <td>{ moment(data.createdAt).format('DD-MM-YYYY') }</td>
                    <td>{ data.no_trans}</td>
                    <td>{ data.jenis_transaksi}</td>
                    <td>{ data.produk}</td>
                    <td>
                      <Currency
                        value={data.masuk}
                        displayType={'text'}
                        thousandSeparator={true}
                       />
                    </td>
                    <td>
                      <Currency
                        value={data.keluar}
                        displayType={'text'}
                        thousandSeparator={true}
                       />
                    </td>
                    <td>
                      <Currency
                        value={saldo}
                        displayType={'text'}
                        thousandSeparator={true}
                       />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default DisplayData
