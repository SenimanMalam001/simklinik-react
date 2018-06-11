import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setTransaksiKas, setAllKas } from '../../store/actions'
import { bindActionCreators } from 'redux'
import axios from '../../axios'
import { BarLoader } from 'react-spinners';
import {DatetimeRangePickerTrigger} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.min.css'
import moment from 'moment';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DisplayData from './DisplayData'
import ReactToPrint from "react-to-print";

class TransaksiKas extends React.Component {
  constructor() {
    super()
    this.state = {
      dari_tanggal: moment(),
      sampai_tanggal: moment(),
      kas: '',
      jenis: 'Rekap'
    }
  }
  componentDidMount() {
    this.props.setAllKas()
  }

  validate = () => {
    return true
  }
  handleSubmit = (e) => {
    if (this.validate()) {
      const { dari_tanggal, sampai_tanggal, kas} = this.state
      const query = `dari_tanggal=${dari_tanggal}&sampai_tanggal=${sampai_tanggal}&kas=${kas}`
      this.props.setTransaksiKas(query)
    }
    e.preventDefault()
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { transaksikas, loading, posisikas } = this.props
    let { kass } = this.props
    const { dari_tanggal, sampai_tanggal, kas, jenis } = this.state
    kass = kass.map(kass => {
      return {
        value: kass.id,
        label: kass.nama,
        target: {
          name: 'kas',
          value: kass.id
        }
      }
    })
    return (
      <div className="container">
        <BreadCrumb
          secondText="Transaksi Kas / Arus Kas"
        />
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <DatetimeRangePickerTrigger
            moment={{ start: dari_tanggal, end: sampai_tanggal}}
            onChange={(e) => {
              this.setState({dari_tanggal: e.start,sampai_tanggal: e.end})
            }}
            showTimePicker={true}
            splitPanel={true}>
              <input
                type="text"
                value={`${dari_tanggal.format('YYYY-MM-DD HH:mm')} / ${sampai_tanggal.format('YYYY-MM-DD HH:mm')}`}
                readOnly
                className="form-control mb-2 mr-sm-2"
                style={{width: '100%'}}
              />
          </DatetimeRangePickerTrigger >
             <Select
              placeholder="Pilih Kas..."
              name="kas"
              className="mb-2 mr-sm-2"
              value={kas}
              multi={false}
              onChange={(e) => {
                if (e) {
                  this.handleChange(e)
                } else {
                  this.setState({kas: ''})
                }
              }}
              options={kass}
              wrapperStyle={{ width: '15%',marginLeft: 12}}
            />
            <select
              className="form-control mb-2 mr-sm-2"
              style={{ marginLeft: 12}}
              value={jenis}
              onChange={(e) => {
                this.setState({jenis: e.target.value})
              }}
            >
              <option>Rekap</option>
              <option>Detail</option>
            </select>
          <button type="submit" className="btn btn-primary mb-2" onClick={()=> this.setState({ print: true})}>Filter</button>
            <ReactToPrint
              trigger={() => <a href="#" className="btn btn-primary"><i className="fas fa-print"></i> Print</a>}
              content={() => this.componentRef}
            />
        </form>
        <DisplayData
          posisikas={posisikas}
          transaksikas={transaksikas}
          jenis={jenis}
          ref={el => (this.componentRef = el)}
          kas={kas}
         />
        <center>
          <BarLoader
            color={'#123abc'}
            loading={loading}
            className="middle-center"
          />
        </center>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    transaksikas: state.transaksikas,
    pages: state.pages,
    loading: state.loading,
    kass: state.kas,
    posisikas: state.posisikas
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setTransaksiKas, setAllKas}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TransaksiKas)
