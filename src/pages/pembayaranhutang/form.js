import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import Alert from '../../components/Alert'
import SelectBox from '../../components/SelectBox'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAllKas, setAllSupplier } from '../../store/actions'
import moment from 'moment';
import {DatetimeRangePickerTrigger} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.min.css'
import AlertSuccess from '../../components/AlertSuccess'
import axios from '../../axios'

class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      error: {
        status: false,
        message: ''
      },
      cara_bayar: '',
      supplier: '',
      dari_tanggal: moment(),
      sampai_tanggal: moment(),
      swalSuccess: false
    }
  }

  handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  validate = () => {
    const { supplier, cara_bayar} = this.state
    if (!supplier) {
      this.setState({
        error: {
          status: true,
          message: 'Supplier is Required'
        }
      })
      return false
    }
    if (!cara_bayar) {
      this.setState({
        error: {
          status: true,
          message: 'Cara Bayar is Required'
        }
      })
      return false
    }
    return true
  }

  handleSubmit = (e) => {
    const { cara_bayar, supplier, dari_tanggal, sampai_tanggal} = this.state
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'create_pembayaran_hutang'
      }

      axios.post('/pembayaranhutang',{cara_bayar, supplier, dari_tanggal, sampai_tanggal},{ headers }).then((res) => {
        this.props.history.push('/pembayaranhutang')
        this.setState({ swalSuccess: true})
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
    e.preventDefault()
  }

  componentDidMount() {
    this.props.setAllKas()
    this.props.setAllSupplier()
  }
  render() {
    let {
      kass,
      suppliers,
    } = this.props
    const { cara_bayar,  supplier, dari_tanggal, sampai_tanggal, error} = this.state

    kass = kass.map(kas => {
      return {
        value: kas.id,
        label: kas.nama,
        target: {name: 'cara_bayar', value: kas.id}
      }
    })
    suppliers = suppliers.map(supplier => {
      return {
        value: supplier.id,
        label: supplier.nama,
        target: {name: 'supplier', value: supplier.id}
      }
    })

    return (
      <div>
          {
            error.status && <Alert type="danger" text={error.message} />
          }
      <form onSubmit={ this.handleSubmit}>
        <SelectBox
          label="Supplier"
          placeholder="Pilih Supplier"
          name="supplier"
          value={supplier}
          options={suppliers}
          handleChange={this.handleChange}
        />
        <div className="form-group">
          <label>Interval </label>
        <DatetimeRangePickerTrigger
          moment={{ start: dari_tanggal, end: sampai_tanggal}}
          onChange={(e) => {
            this.setState({dari_tanggal: e.start,sampai_tanggal: e.end})
          }}
          showTimePicker={true}
          className="form-date"
          splitPanel={true}>
            <input
              type="text"
              value={`${dari_tanggal.format('YYYY-MM-DD HH:mm')} / ${sampai_tanggal.format('YYYY-MM-DD HH:mm')}`}
              readOnly
              className="form-control "
              style={{width: '100%'}}
            />
        </DatetimeRangePickerTrigger >
        </div>
        <SelectBox
          label="Cara Bayar"
          placeholder="Pilih Cara Bayar"
          name="cara_bayar"
          value={cara_bayar}
          options={kass}
          handleChange={this.handleChange}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
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
    kass: state.kas,
    suppliers: state.supplier,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setAllKas,
    setAllSupplier
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Form)
