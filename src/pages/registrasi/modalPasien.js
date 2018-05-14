import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux'
import { setPasien, setAllPenjamin } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import Table from '../../components/TableWithAction'
import SearchInput from '../../components/SearchInput'
import FormLama from './form_lama'
import FormBaru from './form_baru'

class ModalPasien extends React.Component {
  constructor() {
    super()
    this.state = {
      modalPasien: false,
      query: '',
      isSearch: false,
      jenis_pasien: 'lama',
    }
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.setState({isSearch: true})
      this.props.setPasien(1, e.target.value)
    } else {
      this.setState({isSearch: false})
      this.props.setPasien()
    }
    this.setState({[e.target.name]: e.target.value})

  }

  openModal = () => {
    this.setState({modalPasien: true})
  }

  closeModal = () => {
    this.setState({modalPasien: false})
  }
  componentDidMount() {
    this.props.setPasien()
  }

  handlePageClick = (data) => {
    const { selected } = data
    this.props.setPasien(selected + 1)

  }
  render() {
    const { modalPasien, query, isSearch, jenis_pasien } = this.state
    const {pasiens, pages, loading, penjamins } = this.props
    return (
      <div>
        <button className="btn btn-primary" onClick={this.openModal} >Cari Pasien</button>
        <Modal
         isOpen={ modalPasien}
         contentLabel="Cari Pasien"
       >
          <div className="container">
            <button onClick={this.closeModal} className="btn btn-danger" >close</button>
            <br/>
            <br/>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button className={`nav-link ${jenis_pasien == 'lama' ? 'active': ''}`} onClick={()=> this.setState({jenis_pasien: 'lama'})}>Pasien Lama</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${jenis_pasien == 'baru' ? 'active': ''}`} onClick={()=> this.setState({jenis_pasien: 'baru'})}>Pasien Baru</button>
              </li>
            </ul>
            <br/>
            {
              jenis_pasien == 'lama' && (
                <div>
                  <SearchInput
                    query={query}
                    handleChange={this.handleChange}
                  />
                  <Table
                    data={pasiens}
                    thead={['No RM','Nama','Tanggal Lahir','Alamat']}
                    tbody={['no_rm','nama','alamat','tanggal_lahir']}
                    pages={pages}
                    handlePageClick={this.handlePageClick}
                    actionNotDisplay={true}
                  />
                </div>
              )
            }
            { jenis_pasien == 'baru' && (
              <FormBaru
                penjamins={penjamins}
                closeModal={this.closeModal}
               />
            )}
          </div>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    pasiens: state.pasien,
    penjamins: state.penjamin,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setPasien}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ModalPasien)
