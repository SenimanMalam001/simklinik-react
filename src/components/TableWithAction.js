import React from 'react';
import Thead from './Thead'
import Tbody from './TbodyWithAction'
import Pagination from './Pagination'


class TableWithAction extends React.Component {
  constructor() {
    super()
  }
  render() {
    const { actionNotDisplay, handlePageClick, data, thead, tbody, editUrl, deleteAction, pages } = this.props
    return (
      <div className="table-responsive">
        <table className="table">
          <Thead
            text={thead}
          />
          <Tbody
            data={ data }
            display={tbody}
            editUrl={editUrl}
            deleteAction={deleteAction}
            actionNotDisplay={actionNotDisplay}
          />
        </table>
        <Pagination
          pages={pages}
          handlePageClick={handlePageClick}
        />
      </div>
    )
  }
}


export default TableWithAction
