import React from 'react';


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
              return (
                <tr key={index}>
                  <td>{data.no_trans} </td>
                  <td>{data.user} </td>
                  <td>{data.produk} </td>
                  <td>{data.jumlah} </td>
                  <td>{data.nilai_komisi} </td>
                  <td>{data.total_komisi} </td>
                </tr>
              )
            }) : rekapans.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.user} </td>
                  <td>{data.produk} </td>
                  <td>{data.jumlah} </td>
                  <td>{data.nilai_komisi} </td>
                  <td>{data.total_komisi} </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

export default DisplayFilter
