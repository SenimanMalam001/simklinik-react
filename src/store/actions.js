import {
  SET_TOKEN,
  SET_PETUGAS,
  SET_PRODUK,
  SET_STOK_AWAL,
  SET_PEMBELIAN,
  SET_TBS_PEMBELIAN,
  SET_PENJUALAN,
  SET_TBS_PENJUALAN,
  SET_KAS_MANUAL,
  SET_KAS_MUTASI,
  SET_STOK_OPNAME,
  SET_REGISTRASI,
  SET_ITEM_MASUK,
  SET_ITEM_KELUAR,
  SET_PASIEN_REGISTRASI,
  SET_KOMISI,
  SET_USERS,
  SET_KAS,
  SET_PASIEN,
  SET_PENJAMIN,
  SET_SUPPLIER,
  SET_RUANGANS,
  ERROR,
  LOADING,
  LOADING_FINISH,
  SEARCH_USERS,
  SET_PAGES,
  SET_KATEGORI_TRANSAKSI,
  SET_POLI
} from './actionTypes'
import axios from '../axios'

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token
  }
}

export const setPasienRegistrasi = (pasien) => {
  return {
    type: SET_PASIEN_REGISTRASI,
    payload: pasien
  }
}

export const setAllUsers = () => {
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/users/all`,{ headers: { token, otoritas: 'get_user' }}).then((res) => {
      const { data } = res.data
      dispatch({
        type: SET_USERS,
        payload: data
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setUsers = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/users?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_user' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_USERS,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setPetugas = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/petugas?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_petugas' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_PETUGAS,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setPembelian = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/pembelian?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_pembelian' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_PEMBELIAN,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setPenjualan = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/penjualan?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_penjualan' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_PENJUALAN,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setTbsPembelian = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/tbs-pembelian?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_pembelian' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_TBS_PEMBELIAN,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setTbsPenjualan = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/tbs-penjualan?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_penjualan' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_TBS_PENJUALAN,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setStokOpname = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/stok-opname?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_stok_opname' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_STOK_OPNAME,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}
export const setStokAwal = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/stok-awal?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_stok_awal' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_STOK_AWAL,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setItemMasuk = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/item-masuk?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_item_masuk' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_ITEM_MASUK,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setItemKeluar = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/item-keluar?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_item_keluar' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_ITEM_KELUAR,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setKasMutasi = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/kas-mutasi?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_kas_mutasi' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_KAS_MUTASI,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setKasManual = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/kas-manual?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_kas_manual' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_KAS_MANUAL,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setRegistrasi = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/registrasi?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_registrasi' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_REGISTRASI,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setAllRegistrasi = () => {
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/registrasi/all`,{ headers: { token, otoritas: 'get_registrasi' }}).then((res) => {
      const { data } = res.data
      dispatch({
        type: SET_REGISTRASI,
        payload: data
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setPasien = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/pasien?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_pasien' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_PASIEN,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setAllPasien = () => {
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/pasien/all`,{ headers: { token, otoritas: 'get_pasien' }}).then((res) => {
      const { data} = res.data
      dispatch({
        type: SET_PASIEN,
        payload: data
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setKomisi = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/komisi?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_komisi' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_KOMISI,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setProduk = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/produk?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_produk', redis_key: 'Produk' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_PRODUK,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setAllProduk = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/produk/all`,{ headers: { token, otoritas: 'get_produk', redis_key:'Produk' }}).then((res) => {
      const { data } = res.data
      dispatch({
        type: SET_PRODUK,
        payload: data
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setSupplier = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/supplier?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_supplier' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_SUPPLIER,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setAllSupplier = () => {
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/supplier/all`,{ headers: { token, otoritas: 'get_supplier' }}).then((res) => {
      const { data } = res.data
      dispatch({
        type: SET_SUPPLIER,
        payload: data
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setPenjamin = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/penjamin?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_penjamin' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_PENJAMIN,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setAllPenjamin = () => {
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/penjamin/all`,{ headers: { token, otoritas: 'get_penjamin' }}).then((res) => {
      const { data } = res.data
      dispatch({
        type: SET_PENJAMIN,
        payload: data
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setKas = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/kas?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_kas' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_KAS,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}
export const setAllKas = () => {
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/kas/all`,{ headers: { token, otoritas: 'get_kas' }}).then((res) => {
      const { data } = res.data
      dispatch({
        type: SET_KAS,
        payload: data
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setRuangans = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/ruangan?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_ruangan' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_RUANGANS,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setAllRuangans = () => {
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/ruangan/all`,{ headers: { token, otoritas: 'get_ruangan' }}).then((res) => {
      const { data } = res.data
      dispatch({
        type: SET_RUANGANS,
        payload: data
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setPoli = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/poli?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_poli' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_POLI,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}
export const setKategoriTransaksi = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/kategori-transaksi?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_kategori_transaksi' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_KATEGORI_TRANSAKSI,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setAllKategoriTransaksi = () => {
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/kategori-transaksi/all`,{ headers: { token, otoritas: 'get_kategori_transaksi' }}).then((res) => {
      const { data, pages } = res.data
      dispatch({
        type: SET_KATEGORI_TRANSAKSI,
        payload: data
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const loading  = { type: LOADING }
export const loadingFinish  = { type: LOADING_FINISH }
export const error  = { type: ERROR }
