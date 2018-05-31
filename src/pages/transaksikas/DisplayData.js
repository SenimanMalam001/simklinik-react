import React from 'react';
import Currency from 'react-currency-format';



class DisplayData extends React.Component {
  constructor() {
    super()
  }
  onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
  }
  render() {

    const { transaksikas, jenis, posisikas } = this.props
    const rekapans = []
    let total_masuk = 0
    let total_keluar = 0

    transaksikas.forEach((data) => {
      total_masuk += data.masuk
      total_keluar += data.keluar
    })
    const perubahankas = total_masuk - total_keluar
    const kasakhir =  posisikas + perubahankas
    if (jenis == 'Rekap') {
      const kategoris = transaksikas.map(data => {
        return data.kategori
      }).filter(this.onlyUnique)
      kategoris.forEach((kategori) => {
        let masuk = 0
        let keluar = 0
        let kas = 0
        let user
        transaksikas.filter(data => data.kategori == kategori).forEach(data => {
            masuk += data.masuk
            keluar += data.keluar
            kas = data.kas
        })
        const rekap = {
          kategori: kategori,
          masuk,
          keluar,
          kas,
        }
        rekapans.push(rekap)
      })
    }
    let data
    if (jenis == 'Rekap') {
      data = rekapans
    } else {
      data = transaksikas
    }

    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
            {
              jenis != 'Rekap' && <td>No Trans</td>
            }
              <td>Kategori</td>
              <td>Kas</td>
              <td>Masuk</td>
              <td>Keluar</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((data, index) => {
                return (
                  <tr key={index}>
                    {
                      jenis != 'Rekap' &&  <td>{ data.no_trans}</td>
                    }
                    <td>{ data.kategori}</td>
                    <td>{ data.kas}</td>
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
                  </tr>
                )
              })
            }
            <tr >
              {
                jenis != 'Rekap' &&  <td>{ data.no_trans}</td>
              }
              <td></td>
              <td>Total : </td>
              <td>
                <Currency
                  value={total_masuk}
                  displayType={'text'}
                  thousandSeparator={true}
                 />
              </td>
              <td>
                <Currency
                  value={total_keluar}
                  displayType={'text'}
                  thousandSeparator={true}
                 />
              </td>
            </tr>
          </tbody>
        </table>
        <h5>
          Kas Sebelumnya
          <Currency
            value={posisikas}
            displayType={'text'}
            thousandSeparator={true}
            prefix=" Rp. "
           />
        </h5>
        <h5>
          Perubahan Kas
          <Currency
            value={perubahankas}
            displayType={'text'}
            thousandSeparator={true}
            prefix=" Rp. "
           />
        </h5>
        <h5>
          Kas Akhir
          <Currency
            value={kasakhir}
            displayType={'text'}
            thousandSeparator={true}
            prefix=" Rp. "
           />
        </h5>
      </div>
    )
  }
}

export default DisplayData
