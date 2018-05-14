import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  constructor() {
    super()
  }

  render() {
    const token = localStorage.token
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
              <Link to="/registrasi" className="nav-link">Registrasi</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Persediaan
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/pembelian">Pembelian</Link>
                <Link className="dropdown-item" to="/item-masuk">Item Masuk</Link>
                <Link className="dropdown-item" to="/item-keluar">Item Keluar</Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Master Data
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/user">User</Link>
                <Link className="dropdown-item" to="/kas">Kas</Link>
                <Link className="dropdown-item" to="/poli">Poli</Link>
                <Link className="dropdown-item" to="/komisi">Komisi</Link>
                <Link className="dropdown-item" to="/ruangan">Ruangan</Link>
                <Link className="dropdown-item" to="/penjamin">Penjamin</Link>
                <Link className="dropdown-item" to="/supplier">Supplier</Link>
                <Link className="dropdown-item" to="/produk">Produk</Link>
                <Link className="dropdown-item" to="/pasien">Pasien</Link>
                <Link className="dropdown-item" to="/kategori-transaksi">Kategori Transaksi</Link>
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
