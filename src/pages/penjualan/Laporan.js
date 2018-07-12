import React from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import FormFilterLaporan from './FormFilterLaporan'
import { connect } from 'react-redux'
import { BarLoader } from 'react-spinners';
import TableLaporan from './TableLaporan'

class Laporan extends React.Component {
    render() {
        return (
            <div className="container">
                <BreadCrumb
                secondText="Laporan Penjualan"
                />
            <FormFilterLaporan />
            <TableLaporan/>
            <center>
                <BarLoader
                    loading={this.props.loading}
                    className="middle-center"
                />
            </center>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    penjualans: state.penjualans,
    loading: state.loading,
    jenis_laporan: state.jenis_laporan
  }
}
export default connect(mapStateToProps)(Laporan)

