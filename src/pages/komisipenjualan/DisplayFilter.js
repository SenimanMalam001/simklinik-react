import React from 'react';
import Currency from 'react-currency-format';


class DisplayFilter extends React.Component {
  constructor() {
    super()
  }
  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }
  render() {
    const { data, jenis } = this.props
    const rekapans = []
    if (jenis == 'Rekap') {
      const produks = data.map(data => {
        return data.produk
      }).filter(this.onlyUnique)
      produks.forEach((produk) => {
        let jumlah = 0
        let nilai_komisi = 0
        let total_komisi = 0
        let user
        data.filter(data => data.produk == produk).forEach(data => {
            user = data.user
            jumlah += data.jumlah
            nilai_komisi = data.nilai_komisi
            total_komisi += data.total_komisi
        })
        const rekap = {
          produk: produk,
          jumlah,
          nilai_komisi,
          total_komisi,
          user
        }
        rekapans.push(rekap)
      })
    }
    let total_seluruh_komisi = 0
    return (
      <table>
        <thead>
          <tr>
            {
              jenis != 'Rekap' && <td>No Trans </td>
            }
            <td>User </td>
            <td>Produk </td>
            <td>Jumlah </td>
            <td>Nilai </td>
            <td>Total </td>
          </tr>
        </thead>
        <tbody>
          {
            jenis != 'Rekap' ? data.map((data, index) => {
              total_seluruh_komisi += data.total_komisi
              return (
                <tr key={index}>
                  <td>{data.no_trans} </td>
                  <td>{data.user} </td>
                  <td>{data.produk} </td>
                  <td>
                    <Currency
                      value={data.jumlah}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.nilai_komisi}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.total_komisi}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                </tr>
              )
            }) : rekapans.map((data, index) => {
              total_seluruh_komisi += data.total_komisi
              return (
                <tr key={index}>
                  <td>{data.user} </td>
                  <td>{data.produk} </td>
                  <td>
                    <Currency
                      value={data.jumlah}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.nilai_komisi}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.total_komisi}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                </tr>
              )
            })
          }
          <tr>
            <td colSpan="4"><b>Grand Total Komisi:</b> </td>
            <td>
              <Currency
                value={total_seluruh_komisi}
                displayType={'text'}
                thousandSeparator={true}
               />
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default DisplayFilter
