import React from 'react'
import Table from '../../components/TableWithAction'
import { connect } from 'react-redux'


class TableLaporan extends React.Component {
    handleLaporanPerJenisRegistrasi = (data) => {
        let registrasis = []
        data.forEach(element => {
            let jenis_registrasi 
            if (element.Registrasi) {
                jenis_registrasi = element.Registrasi.jenis_registrasi
            } else {
                jenis_registrasi = 'Tidak Registrasi'
            }
            if(this.checkIsJenisRegistrasiSudahAda(jenis_registrasi, registrasis)) {
                registrasis.push({
                    nama: jenis_registrasi,
                    jumlah_transaksi: 1,
                    total_nilai_transaksi: element.total_akhir
                })
            } else {
                registrasis = this.tambahKeJenisRegistrasiYangSudahAda(jenis_registrasi, 1, element.total_akhir, registrasis)
            }
        })
        let total_jumlah_transaksi = 0
        let total_nilai_transaksi_akhir = 0
        registrasis.forEach(data => {
            total_jumlah_transaksi += data.jumlah_transaksi
            total_nilai_transaksi_akhir += data.total_nilai_transaksi
        })
        registrasis.push({
            nama: 'Grand Total',
            jumlah_transaksi: total_jumlah_transaksi,
            total_nilai_transaksi: total_nilai_transaksi_akhir
        })
        return registrasis
    }
    handleLaporanPerPenjamin = (data) => {
        let penjamins = []
        data.forEach(element => {
            if (this.checkIsPenjaminSudahAda(element.Penjamin.nama, penjamins)) {
                penjamins.push({
                    nama: element.Penjamin.nama,
                    jumlah_transaksi: 1,
                    total_nilai_transaksi: element.total_akhir
                })
            } else {
                penjamins = this.tambahKePenjaminYangSudahAda(element.Penjamin.nama, 1, element.total_akhir, penjamins)
            }
        });
        let total_jumlah_transaksi = 0
        let total_nilai_transaksi_akhir = 0
        penjamins.forEach(data => {
            total_jumlah_transaksi += data.jumlah_transaksi
            total_nilai_transaksi_akhir += data.total_nilai_transaksi
        })
        penjamins.push({
            nama: 'Grand Total',
            jumlah_transaksi: total_jumlah_transaksi,
            total_nilai_transaksi: total_nilai_transaksi_akhir
        })
        return penjamins
    }

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
        let total_jumlah = 0
        let total_nilai_akhir = 0
        produks.forEach(data => {
            total_jumlah += data.jumlah
            total_nilai_akhir += data.total_akhir
        })
        produks.push({
            nama: 'Grand Total',
            jumlah: total_jumlah,
            total_akhir: total_nilai_akhir
        })
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
    checkIsJenisRegistrasiSudahAda = (nama, registrasis) => {
        for(let i = 0; i < registrasis.length; i++) {
            if (registrasis[i].nama === nama) {
                return false
            }
        }
        return true
    }
    checkIsProdukSudahAda = (nama, produks) => {
        for(let i = 0; i < produks.length; i++) {
            if (produks[i].nama === nama) {
                return false
            }
        }
        return true
    }
    tambahKeJenisRegistrasiYangSudahAda = (nama, jumlah_transaksi, total_nilai_transaksi, registrasis) => {
        for(let i = 0; i < registrasis.length; i++) {
            if (registrasis[i].nama === nama) {
                registrasis[i].jumlah_transaksi +=  jumlah_transaksi
                registrasis[i].total_nilai_transaksi += total_nilai_transaksi
            }
        }
        return registrasis
    }
    tambahKePenjaminYangSudahAda = (nama, jumlah_transaksi, total_nilai_transaksi, penjamins) => {
        for(let i = 0; i < penjamins.length; i++) {
            if (penjamins[i].nama === nama) {
                penjamins[i].jumlah_transaksi +=  jumlah_transaksi
                penjamins[i].total_nilai_transaksi += total_nilai_transaksi
            }
        }
        return penjamins
    }
    checkIsPenjaminSudahAda = (nama, penjamins) => {
        for(let i = 0; i < penjamins.length; i++) {
            if (penjamins[i].nama === nama) {
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
            if(this.props.jenis_laporan  === 'Rekap Per Penjamin') {
                laporan = this.handleLaporanPerPenjamin(this.props.penjualans)
            }
            if(this.props.jenis_laporan  === 'Rekap Per Jenis Registrasi') {
                laporan = this.handleLaporanPerJenisRegistrasi(this.props.penjualans)
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
