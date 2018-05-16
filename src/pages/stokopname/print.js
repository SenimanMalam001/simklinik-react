import React from 'react';
import Table from '../../components/TableWithAction'


class Print extends React.Component {
  constructor() {
    super()
  }
  render() {
    const { data } = this.props
    return (
      <div className="container">
        <Table
          data={data}
          thead={['No Trans','Produk','Stok Komputer','Stok Akhir','Selisih','Nilai']}
          tbody={['no_trans','produk','stok_komputer','stok_akhir','selisih','nilai_selisih']}
          actionNotDisplay={true}
          withoutPagination={true}
        />
      </div>
    )
  }
}

export default Print
