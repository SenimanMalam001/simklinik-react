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
import CopyKomisi from './pages/komisi/CopyForm'
import KomisiPenjualan from './pages/komisipenjualan'
import KomisiPenjualanCreate from './pages/komisipenjualan/create'
import KomisiPenjualanEdit from './pages/komisipenjualan/edit'
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
import ItemKeluar from './pages/itemkeluar'
import ItemKeluarCreate from './pages/itemkeluar/create'
import ItemKeluarEdit from './pages/itemkeluar/edit'
import StokAwal from './pages/stokawal'
import StokAwalCreate from './pages/stokawal/create'
import StokAwalEdit from './pages/stokawal/edit'
import StokOpname from './pages/stokopname'
import StokOpnameCreate from './pages/stokopname/create'
import StokOpnameEdit from './pages/stokopname/edit'
import KasManual from './pages/kasmanual'
import KasManualCreate from './pages/kasmanual/create'
import KasManualEdit from './pages/kasmanual/edit'
import KasMutasi from './pages/kasmutasi'
import KasMutasiCreate from './pages/kasmutasi/create'
import KasMutasiEdit from './pages/kasmutasi/edit'
import Pembelian from './pages/pembelian'
import PembelianCreate from './pages/pembelian/create'
import PembelianEdit from './pages/pembelian/edit'
import Penjualan from './pages/penjualan'
import PenjualanCreate from './pages/penjualan/create'
import PenjualanEdit from './pages/penjualan/edit'
import LaporanPenjualan from './pages/penjualan/Laporan'
import Petugas from './pages/petugas'
import PetugasCreate from './pages/petugas/create'
import PetugasEdit from './pages/petugas/edit'
import PembayaranPiutang from './pages/pembayaranpiutang'
import PembayaranPiutangCreate from './pages/pembayaranpiutang/create'
import PembayaranHutang from './pages/pembayaranhutang'
import PembayaranHutangCreate from './pages/pembayaranhutang/create'
import TransaksiKas from './pages/transaksikas'
import RekamMedik from './pages/rekammedik'
import RekamMedikCreate from './pages/rekammedik/create'
import RekamMedikEdit from './pages/rekammedik/edit'
import Profil from './pages/profil'
import ProfilEdit from './pages/profil/edit'
import Persediaan from './pages/persediaan'

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
          <Route path="/komisi/create/copy" exact component={CopyKomisi} />
          <Route path="/komisipenjualan" exact component={KomisiPenjualan} />
          <Route path="/komisipenjualan/create" exact component={KomisiPenjualanCreate} />
          <Route path="/komisipenjualan/edit/:id" exact component={KomisiPenjualanEdit} />
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
          <Route path="/item-keluar" exact component={ItemKeluar} />
          <Route path="/item-keluar/create" exact component={ItemKeluarCreate} />
          <Route path="/item-keluar/edit/:id" exact component={ItemKeluarEdit} />
          <Route path="/stok-awal" exact component={StokAwal} />
          <Route path="/stok-awal/create" exact component={StokAwalCreate} />
          <Route path="/stok-awal/edit/:id" exact component={StokAwalEdit} />
          <Route path="/stok-opname" exact component={StokOpname} />
          <Route path="/stok-opname/create" exact component={StokOpnameCreate} />
          <Route path="/stok-opname/edit/:id" exact component={StokOpnameEdit} />
          <Route path="/kas-manual" exact component={KasManual} />
          <Route path="/kas-manual/create" exact component={KasManualCreate} />
          <Route path="/kas-manual/edit/:id" exact component={KasManualEdit} />
          <Route path="/kas-mutasi" exact component={KasMutasi} />
          <Route path="/kas-mutasi/create" exact component={KasMutasiCreate} />
          <Route path="/kas-mutasi/edit/:id" exact component={KasMutasiEdit} />
          <Route path="/pembelian" exact component={Pembelian} />
          <Route path="/pembelian/create" exact component={PembelianCreate} />
          <Route path="/pembelian/edit/:id" exact component={PembelianEdit} />
          <Route path="/penjualan" exact component={Penjualan} />
          <Route path="/penjualan/create" exact component={PenjualanCreate} />
          <Route path="/penjualan/edit/:id" exact component={PenjualanEdit} />
          <Route path="/laporan/penjualan" exact component={LaporanPenjualan} />
          <Route path="/petugas" exact component={Petugas} />
          <Route path="/petugas/create" exact component={PetugasCreate} />
          <Route path="/petugas/edit/:id" exact component={PetugasEdit} />
          <Route path="/pembayaranpiutang" exact component={PembayaranPiutang} />
          <Route path="/pembayaranpiutang/create" exact component={PembayaranPiutangCreate} />
          <Route path="/pembayaranhutang" exact component={PembayaranHutang} />
          <Route path="/pembayaranhutang/create" exact component={PembayaranHutangCreate} />
          <Route path="/transaksikas" exact component={TransaksiKas} />
          <Route path="/rekammedik" exact component={RekamMedik} />
          <Route path="/rekammedik/create" exact component={RekamMedikCreate} />
          <Route path="/rekammedik/edit/:id" exact component={RekamMedikEdit} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/profil/edit/:id" exact component={ProfilEdit} />
          <Route path="/persediaan" exact component={Persediaan} />
        </Switch>
      </div>
    );
  }
}

export default App;
