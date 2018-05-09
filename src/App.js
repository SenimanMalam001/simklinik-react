import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import { Switch, Route, } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import User from './pages/user'
import KategoriTransaksi from './pages/kategori_transaksi'
import KategoriTransaksiCreate from './pages/kategori_transaksi/create'
import KategoriTransaksiEdit from './pages/kategori_transaksi/edit'
import UserCreate from './pages/user/create'
import UserEdit from './pages/user/edit'

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
        </Switch>
      </div>
    );
  }
}

export default App;
