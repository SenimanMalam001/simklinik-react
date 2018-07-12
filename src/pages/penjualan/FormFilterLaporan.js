import React from 'react'
import {DatetimeRangePickerTrigger} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.min.css'
import moment from 'moment';
import { connect } from 'react-redux'
import { setClearLaporanPenjualan, setLaporanPenjualan, setJenisLaporan } from '../../store/actions'
import { bindActionCreators } from 'redux'


class FormFilterLaporan extends React.Component {
    constructor(){
        super()
        this.state = {
            dari_tanggal: moment(),
            sampai_tanggal: moment(),
            jenis: ''
        }
    }

    componentWillMount() {
        this.props.setClearLaporanPenjualan()
    }

    handleChange = (e) => {
        if (e.target) {
           this.setState({[e.target.name]: e.target.value})
        } else {
         this.setState({dari_tanggal: e.start,sampai_tanggal: e.end})
        }
    }
    handleSubmit = (e) => {
        this.props.setLaporanPenjualan(this.state.dari_tanggal, this.state.sampai_tanggal)
        e.preventDefault()
    }
    render() {
        const { dari_tanggal, sampai_tanggal} = this.state
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <DatetimeRangePickerTrigger
                moment={{ start: dari_tanggal, end: sampai_tanggal}}
                onChange={this.handleChange}
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
                <select
                className="form-control mb-2 mr-sm-2"
                style={{ marginLeft: 12}}
                value={this.state.jenis}
                onChange={(e) => {
                    this.props.setJenisLaporan(e.target.value)
                    this.setState({jenis: e.target.value})
                }}
                >
                <option>Jenis Laporan</option>
                <option>Rekap Per Jenis Produk Jasa</option>
                <option>Rekap Per Jenis Produk Barang</option>
                </select>
                <button type="submit" className="btn btn-primary mb-2" >Filter</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({setJenisLaporan, setLaporanPenjualan, setClearLaporanPenjualan}, dispatch)
export default connect(null, mapDispatchToProps)(FormFilterLaporan)