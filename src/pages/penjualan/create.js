import React from 'react';
import Alert from '../../components/Alert'
import BreadCrumb from '../../components/BreadCrumb'
import TableTbs from './TableTbs'
import FormTbs from './FormTbs'
import Pembayaran from './Pembayaran'
import axios from '../../axios'

class PenjualanCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      error: {
        status: false,
        message: ''
      },
      swalSuccess: false
    }
  }

  deleteAllTbs = () => {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_penjualan'
      }
      axios.delete('/tbs-penjualan/all',{ headers }).then((res) => {
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

  componentDidMount() {
    this.deleteAllTbs()
  }

  render() {
    const { error} = this.state
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-12">
          <BreadCrumb
            secondText="Penjualan "
            thirdText="Tambah"
            secondUrl="/penjualan"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <div className="row">
            <div className="col-md-8">
              <FormTbs />
              <TableTbs />
            </div>
            <div className="col-md-4">
              <Pembayaran jenis="create" history={this.props.history} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default PenjualanCreate
