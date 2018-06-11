import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPersediaan, setAllProduk } from '../../store/actions'
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

class Persediaan extends React.Component {
  constructor() {
    super()
    this.state = {
      dari_tanggal: moment(),
      sampai_tanggal: moment(),
      produk: '',
    }
  }
  componentDidMount() {
    this.props.setAllProduk()
  }

  validate = () => {
    return true
  }
  handleSubmit = (e) => {
    if (this.validate()) {
      const { dari_tanggal, sampai_tanggal, produk} = this.state
      const query = `dari_tanggal=${dari_tanggal}&sampai_tanggal=${sampai_tanggal}&produk=${produk}`
      this.props.setPersediaan(query)
    }
    e.preventDefault()
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { persediaan, loading, stok_akhir} = this.props
    let { produks } = this.props
    const { dari_tanggal, sampai_tanggal, produk, jenis } = this.state
    produks = produks.map(produks => {
      return {
        value: produks.id,
        label: produks.nama,
        target: {
          name: 'produk',
          value: produks.id
        }
      }
    })
    return (
      <div className="container">
        <BreadCrumb
          secondText="Persediaan"
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
              placeholder="Pilih Produk..."
              name="produk"
              className="mb-2 mr-sm-2"
              value={produk}
              multi={false}
              onChange={(e) => {
                if (e) {
                  this.handleChange(e)
                } else {
                  this.setState({produk: ''})
                }
              }}
              options={produks}
              wrapperStyle={{ width: '15%',marginLeft: 12}}
            />
          <button type="submit" className="btn btn-primary mb-2" onClick={()=> this.setState({ print: true})}>Filter</button>
        </form>
        <DisplayData
          persediaan={persediaan}
          ref={el => (this.componentRef = el)}
          produk={produk}
          stok_akhir={stok_akhir}
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
    persediaan: state.persediaan,
    stok_akhir: state.stok_akhir,
    pages: state.pages,
    loading: state.loading,
    produks: state.produk,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setPersediaan, setAllProduk}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Persediaan)
