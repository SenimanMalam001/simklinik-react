import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAllProduk } from '../../store/actions'

class StokAwalCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      jumlah: '',
      produk: '',
      importExcell: false,
      error: {
        status: false,
        message: ''
      },
      swalSuccess: false
    }
  }


  handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  validate = () => {
    const { jumlah, produk} = this.state
    if (!jumlah) {
      this.setState({
        error: {
          status: true,
          message: 'Jumlah is Required'
        }
      })
      return false
    }


    if (!produk) {
      this.setState({
        error: {
          status: true,
          message: 'Produk is Required'
        }
      })
      return false
    }

    return true
  }

  handleSubmit = (event) => {
    const { jumlah, produk} = this.state
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_stok_awal'
      }

      axios.post('/stok-awal',{jumlah, produk},{ headers }).then((res) => {
        this.setState({ swalSuccess: true})
        this.props.history.push('/stok-awal')
      }).catch((err) => {
        const message = err.response.data.message
        this.setState({
          error: {
            status: true,
            message: message
          }
        })
      })
    }
    event.preventDefault()
  }

  handleSubmitImport = (event) => {
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'create_stok_awal',
      'content-type': 'multipart/form-data'
    }
    var data = new FormData();
    data.append('file', document.getElementById('file').files[0]);
    axios.post('/stok-awal',data,{ headers }).then((res) => { this.setState({ swalSuccess: true})
      this.props.history.push('/stok-awal')
    }).catch((err) => {
      const message = err.response.data.message
      this.setState({
        error: {
          status: true,
          message: message
        }
      })
    })
    event.preventDefault()
  }

  componentDidMount() {
    this.props.setAllProduk()
  }

  render() {
    const { jumlah, produk, error, importExcell} = this.state
    const { users, produks} = this.props
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Stok Awal"
            thirdText="Tambah"
            secondUrl="/stok-awal"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className={ !importExcell ? `nav-link active`: 'nav-link'} onClick={ ()=> this.setState({ importExcell: false})} href="#">Form</a>
            </li>
            <li className="nav-item">
              <a className={ importExcell ? `nav-link active`: 'nav-link'} onClick={ ()=> this.setState({ importExcell: true})} href="#">Import</a>
            </li>
          </ul>
          <br/>

          { !importExcell ? (
              <Form
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                jumlah={jumlah}
                produk={produk}
                produks={produks}
              />
            )
            : (
              <div>
                <form onSubmit={ this.handleSubmitImport}>
                  <div className="form-group">
                    <input type="file" className="form-control" id="file"/>
                    <span>*Hanya Menerima File Excell</span>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <br/>
                <p>Contoh Format File Excell yang di Import</p>
                <table className="table table-bordered">
                  <tr>
                    <td>OB1(kode produk)</td>
                    <td>12(jumlah stok awal)</td>
                  </tr>
                  <tr>
                    <td>OB2(kode produk)</td>
                    <td>10(jumlah stok awal)</td>
                  </tr>
                </table>
              </div>
            )
          }
        </div>
        <AlertSuccess
          type="create"
          status={this.state.swalSuccess}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    produks: state.produk
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setAllProduk}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StokAwalCreate)
