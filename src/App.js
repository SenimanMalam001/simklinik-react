import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import { Switch, Route, } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import User from './pages/user'
import UserCreate from './pages/user/create'
import UserEdit from './pages/user/edit'
import KategoriTransaksi from './pages/kategori_transaksi'
import KategoriTransaksiCreate from './pages/kategori_transaksi/create'
import KategoriTransaksiEdit from './pages/kategori_transaksi/edit'
import Poli from './pages/poli'
import PoliCreate from './pages/poli/create'
import PoliEdit from './pages/poli/edit'
import Ruangan from './pages/ruangan'
import RuanganCreate from './pages/ruangan/create'
import RuanganEdit from './pages/ruangan/edit'
import Kas from './pages/kas'
import KasCreate from './pages/kas/create'
import KasEdit from './pages/kas/edit'
import Penjamin from './pages/penjamin'
import PenjaminCreate from './pages/penjamin/create'
import PenjaminEdit from './pages/penjamin/edit'
import Supplier from './pages/supplier'
import SupplierCreate from './pages/supplier/create'
import SupplierEdit from './pages/supplier/edit'
import Produk from './pages/produk'
import ProdukCreate from './pages/produk/create'
import ProdukEdit from './pages/produk/edit'
import Komisi from './pages/komisi'
import KomisiCreate from './pages/komisi/create'
import KomisiEdit from './pages/komisi/edit'
import Pasien from './pages/pasien'
import PasienCreate from './pages/pasien/create'
import PasienEdit from './pages/pasien/edit'
import Registrasi from './pages/registrasi'
import RegistrasiCreate from './pages/registrasi/create'
import RegistrasiCreateBaru from './pages/registrasi/create_baru'
import RegistrasiEdit from './pages/registrasi/edit'
import ItemMasuk from './pages/itemmasuk'
import ItemMasukCreate from './pages/itemmasuk/create'
import ItemMasukEdit from './pages/itemmasuk/edit'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/user" exact component={User} />
          <Route path="/user/create" exact component={UserCreate} />
          <Route path="/user/edit/:id" exact component={UserEdit} />
          <Route path="/kategori-transaksi" exact component={KategoriTransaksi} />
          <Route path="/kategori-transaksi/create" exact component={KategoriTransaksiCreate} />
          <Route path="/kategori-transaksi/edit/:id" exact component={KategoriTransaksiEdit} />
          <Route path="/poli" exact component={Poli} />
          <Route path="/poli/create" exact component={PoliCreate} />
          <Route path="/poli/edit/:id" exact component={PoliEdit} />
          <Route path="/ruangan" exact component={Ruangan} />
          <Route path="/ruangan/create" exact component={RuanganCreate} />
          <Route path="/ruangan/edit/:id" exact component={RuanganEdit} />
          <Route path="/kas" exact component={Kas} />
          <Route path="/kas/create" exact component={KasCreate} />
          <Route path="/kas/edit/:id" exact component={KasEdit} />
          <Route path="/penjamin" exact component={Penjamin} />
          <Route path="/penjamin/create" exact component={PenjaminCreate} />
          <Route path="/penjamin/edit/:id" exact component={PenjaminEdit} />
          <Route path="/supplier" exact component={Supplier} />
          <Route path="/supplier/create" exact component={SupplierCreate} />
          <Route path="/supplier/edit/:id" exact component={SupplierEdit} />
          <Route path="/produk" exact component={Produk} />
          <Route path="/produk/create" exact component={ProdukCreate} />
          <Route path="/produk/edit/:id" exact component={ProdukEdit} />
          <Route path="/komisi" exact component={Komisi} />
          <Route path="/komisi/create" exact component={KomisiCreate} />
          <Route path="/komisi/edit/:id" exact component={KomisiEdit} />
          <Route path="/pasien" exact component={Pasien} />
          <Route path="/pasien/create" exact component={PasienCreate} />
          <Route path="/pasien/edit/:id" exact component={PasienEdit} />
          <Route path="/registrasi" exact component={Registrasi} />
          <Route path="/registrasi/create" exact component={RegistrasiCreate} />
          <Route path="/registrasi/create/baru" exact component={RegistrasiCreateBaru} />
          <Route path="/registrasi/edit/:id" exact component={RegistrasiEdit} />
          <Route path="/item-masuk" exact component={ItemMasuk} />
          <Route path="/item-masuk/create" exact component={ItemMasukCreate} />
          <Route path="/item-masuk/edit/:id" exact component={ItemMasukEdit} />
        </Switch>
      </div>
    );
  }
}

export default App;
