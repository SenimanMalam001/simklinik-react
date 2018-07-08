import React from 'react'
import AlertSuccess from '../../components/AlertSuccess'
import axios from '../../axios'
import ReactExport from "react-data-export";
import SweetAlert from 'sweetalert2-react';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Import extends React.Component {
    constructor() {
        super()
        this.state = {
            swalSuccess: false,
            error: {
                status: false,
                message: ''
            }
        }
    }
    handleSubmit = (event) => {
        const token = localStorage.token
        const headers = {
            token,
            otoritas: 'create_produk',
            'content-type': 'multipart/form-data'
        }
        var data = new FormData();
        data.append('file', document.getElementById('file').files[0]);
        axios.post('/produk',data,{ headers }).then((res) => { 
            this.setState({ swalSuccess: true})
            this.props.history.push('/produk')
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
    render() {
        const formatProduks = [
            {
                kode: 'B01',
                nama: 'obat manjur',
                tipe: 'barang',
                satuan: 'pcs',
                harga_beli: 1000,
                harga_jual_1: 1100,
                harga_jual_2: 1200,
                harga_jual_3: 1200,
                harga_jual_4: 1200,
            }
        ]
        return (
            <div>
                <form onSubmit={ this.handleSubmit}>
                    <div className="form-group">
                    <input type="file" className="form-control" id="file"/>
                    <span>*Hanya Menerima File Excell</span>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <br/>
                <ExcelFile element={<button className="btn btn-success">Download Format Excell</button>}>
                    <ExcelSheet data={formatProduks} name="Employees">
                        <ExcelColumn label="Kode" value="kode" />
                        <ExcelColumn label="Nama" value="nama" />
                        <ExcelColumn label="Tipe" value="tipe" />
                        <ExcelColumn label="Satuan" value="satuan" />
                        <ExcelColumn label="Harga Beli" value="harga_beli" />
                        <ExcelColumn label="Harga Jual 1" value="harga_jual_1" />
                        <ExcelColumn label="Harga Jual 2" value="harga_jual_2" />
                        <ExcelColumn label="Harga Jual 3" value="harga_jual_3" />
                        <ExcelColumn label="Harga Jual 4" value="harga_jual_4" />
                    </ExcelSheet>
                </ExcelFile>
                <AlertSuccess
                type="create"
                status={this.state.swalSuccess}
                />
                <SweetAlert
                show={this.state.error.status}
                title="Error"
                type="error"
                text={this.state.error.message}
                onConfirm={() => {
                    this.setState({ error: {
                    status: false,
                    message: ''
                    } })
                }}
                />
            </div>
        )
    }
}

export default Import