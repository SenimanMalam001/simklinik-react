import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavAccess from './NavAccess'
import {
  registrasi,
  rekammedik,
  penjualan,
  pembayaranhutang,
  pembayaranpiutang,
  komisipenjualan,
  kaskeluarmasuk,
  kasmutasi,
  aruskas,
  pembelian,
  itemmasuk,
  itemkeluar,
  stokawal,
  stokopname,
  kartustok,
  user,
  kas,
  poli,
  komisi,
  ruangan,
  penjamin,
  supplier,
  produk,
  pasien,
  kategoritransaksi,
  petugas,
  profil
} from '../const/access'

class Navbar extends Component {
  constructor() {
    super()
  }


  render() {
    const token = localStorage.token
    const role = localStorage.role
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">SimKlinik</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item active">
              <NavAccess
                to="registrasi"
                label="Registrasi"
                role={role}
                roles={registrasi.lihat} />
            </li>
            <li className="nav-item active">
              <NavAccess
                to="rekammedik"
                label="Rekam Medik"
                role={role}
                roles={rekammedik.lihat} />
            </li>
            <li className="nav-item active">
              <NavAccess
                to="penjualan"
                label="Penjualan"
                role={role}
                roles={penjualan.lihat} />
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pembayaran
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavAccess
                  to="pembayaranpiutang"
                  label="Pembayaran Piutang"
                  role={role}
                  roles={pembayaranpiutang.lihat} />
                <NavAccess
                  to="pembayaranhutang"
                  label="Pembayaran Hutang"
                  role={role}
                  roles={pembayaranhutang.lihat} />
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Laporan
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavAccess
                  to="komisipenjualan"
                  label="Komisi Penjualan"
                  role={role}
                  roles={komisipenjualan.lihat} />
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Kas
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavAccess
                  to="kas-manual"
                  label="Kas Masuk / Keluar"
                  role={role}
                  roles={kaskeluarmasuk.lihat} />
                <NavAccess
                  to="kas-mutasi"
                  label="Kas Mutasi"
                  role={role}
                  roles={kasmutasi.lihat} />
                <NavAccess
                  to="transaksikas"
                  label="Arus Kas"
                  role={role}
                  roles={aruskas.lihat} />
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Persediaan
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavAccess
                  to="pembelian"
                  label="Pembelian"
                  role={role}
                  roles={pembelian.lihat} />
                <NavAccess
                  to="item-masuk"
                  label="Item Masuk"
                  role={role}
                  roles={itemmasuk.lihat} />
                <NavAccess
                  to="item-keluar"
                  label="Item Keluar"
                  role={role}
                  roles={itemkeluar.lihat} />
                <NavAccess
                  to="stok-awal"
                  label="Stok Awal"
                  role={role}
                  roles={stokawal.lihat} />
                <NavAccess
                  to="stok-opname"
                  label="Stok Opname"
                  role={role}
                  roles={stokopname.lihat} />
                <NavAccess
                  to="persediaan"
                  label="Kartu Stok"
                  role={role}
                  roles={kartustok.lihat} />
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Master Data
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavAccess
                  to="user"
                  label="User"
                  role={role}
                  roles={user.lihat} />
                <NavAccess
                  to="kas"
                  label="Kas"
                  role={role}
                  roles={kas.lihat} />
                <NavAccess
                  to="poli"
                  label="Poli"
                  role={role}
                  roles={poli.lihat} />
                <NavAccess
                  to="komisi"
                  label="Komisi"
                  role={role}
                  roles={komisi.lihat} />
                <NavAccess
                  to="ruangan"
                  label="Ruangan"
                  role={role}
                  roles={ruangan.lihat} />
                <NavAccess
                  to="penjamin"
                  label="Penjamin"
                  role={role}
                  roles={penjamin.lihat} />
                <NavAccess
                  to="supplier"
                  label="Supplier"
                  role={role}
                  roles={supplier.lihat} />
                <NavAccess
                  to="produk"
                  label="Produk"
                  role={role}
                  roles={produk.lihat} />
                <NavAccess
                  to="pasien"
                  label="Pasien"
                  role={role}
                  roles={pasien.lihat} />
                <NavAccess
                  to="kategori-transaksi"
                  label="Kategori Transaksi"
                  role={role}
                  roles={kategoritransaksi.lihat} />
                <NavAccess
                  to="petugas"
                  label="Petugas"
                  role={role}
                  roles={petugas.lihat} />
                <NavAccess
                  to="profil"
                  label="Profil"
                  role={role}
                  roles={profil.lihat} />
              </div>
            </li>
            {
              !token && (
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              )
            }
            {

              token && (
              <li className="nav-item">
                <Link to="/logout" className="nav-link">Logout</Link>
              </li>

              )
            }
          </ul>
        </div>
    </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(Navbar)
