import React from "react";
import ReactExport from "react-data-export";
import axios from '../../axios'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends React.Component {
    constructor() {
        super()
        this.state = {
            produks: []
        }
    }
    componentDidMount() {
        console.log('hahahahah')
        const token = localStorage.token
        axios.get(`/produk/all`,{ headers: { token, otoritas: 'get_produk', redis_key:'Produk' }}).then((res) => {
        const { data } = res.data
        this.setState({produks: data})
        }).catch((err) => {
        console.log(err)
        })
    }
    render() {
        return (
            <ExcelFile element={<button className="btn btn-success">Download Produk</button>}>
                <ExcelSheet data={this.state.produks} name="Employees">
                    <ExcelColumn label="Kode" value="kode" />
                    <ExcelColumn label="Nama" value="nama" />
                    <ExcelColumn label="Tipe" value="tipe" />
                    <ExcelColumn label="Harga Beli" value="harga_beli" />
                    <ExcelColumn label="Harga Jual 1" value="harga_jual_1" />
                    <ExcelColumn label="Harga Jual 2" value="harga_jual_2" />
                    <ExcelColumn label="Harga Jual 3" value="harga_jual_3" />
                    <ExcelColumn label="Harga Jual 4" value="harga_jual_4" />
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

export default Download