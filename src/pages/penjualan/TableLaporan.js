import React from 'react'
import Table from '../../components/TableWithAction'
import { connect } from 'react-redux'


class TableLaporan extends React.Component {

    handleLaporanPerJenisProduk = (data, jenis) => {
        let produks = []
        data.forEach(data => {
            data.DetailPenjualans.forEach(detail => {
                if (detail.Produk.tipe === jenis) {
                    if (this.checkIsProdukSudahAda(detail.Produk.nama, produks)) {
                        produks.push({
                            nama: detail.Produk.nama,
                            jumlah: detail.jumlah,
                            total_akhir: detail.total_akhir
                        })
                    } else {
                        produks = this.tambahKeProdukYangSudahAda(detail.Produk.nama, detail.jumlah, detail.total_akhir, produks)
                    }
                }
            })
        })
        console.log(produks)
        return produks
    }

    tambahKeProdukYangSudahAda = (nama, jumlah, total_akhir, produks) => {
        for(let i = 0; i < produks.length; i++) {
            if (produks[i].nama === nama) {
                produks[i].jumlah +=  jumlah
                produks[i].total_akhir += total_akhir
            }
        }
        return produks
    }
    checkIsProdukSudahAda = (nama, produks) => {
        for(let i = 0; i < produks.length; i++) {
            if (produks[i].nama === nama) {
                return false
            }
        }
        return true
    }
    render() {
        let laporan = []
        if (this.props.penjualans.length) {
            if(this.props.jenis_laporan  === 'Rekap Per Jenis Produk Jasa') {
                laporan = this.handleLaporanPerJenisProduk(this.props.penjualans,'jasa')
            }
            if(this.props.jenis_laporan  === 'Rekap Per Jenis Produk Barang') {
                laporan = this.handleLaporanPerJenisProduk(this.props.penjualans,'barang')
            }
        }
        if (laporan.length) {
            return (
            <Table
            data={laporan}
            thead={Object.keys(laporan[0]).map(data => {
                return data.replace("_", " ")
            })}
            tbody={Object.keys(laporan[0]).map(data => {
                return data
            })}
            withoutPagination={true}
            actionNotDisplay={true}
            />
            )
        } else {
            return <div></div>
        }
    }
}

const mapStateToProps = (state) => {
  return {
    penjualans: state.penjualans,
    jenis_laporan: state.jenis_laporan
  }
}
export default connect(mapStateToProps)(TableLaporan)
