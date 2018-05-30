import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import axios from '../../axios'

class PembayaranPiutangCreate extends React.Component {
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

  componentDidMount() {
  }

  render() {
    const { error} = this.state
    return (
      <div className="container" style={{ marginTop: '20px'}}>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <BreadCrumb
                secondText="PembayaranPiutang "
                thirdText="Tambah"
                secondUrl="/pembayaranpiutang"
              />
            <Form history={this.props.history} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default PembayaranPiutangCreate
