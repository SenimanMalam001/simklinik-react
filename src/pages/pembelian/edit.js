import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import BreadCrumb from '../../components/BreadCrumb'
import TableTbs from './TableTbs'
import FormTbs from './FormTbs'
import Pembayaran from './Pembayaran'

class PembelianEdit extends React.Component {
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

  render() {
    const {  error} = this.state
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-12 ">
          <BreadCrumb
            secondText="Pembelian"
            thirdText="Edit"
            secondUrl="/pembelian"
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
              <Pembayaran
                jenis="edit"
                history={this.props.history}
                match={this.props.match}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default PembelianEdit
