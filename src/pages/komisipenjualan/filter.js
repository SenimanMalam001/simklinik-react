import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import {DatetimeRangePickerTrigger} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.min.css'
import axios from '../../axios'
import DisplayFilter from './DisplayFilter'
import ReactToPrint from "react-to-print";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAllUsers } from '../../store/actions'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Filter extends React.Component {
  constructor() {
    super()
    this.state = {
      dari_tanggal: moment(),
      sampai_tanggal: moment(),
      jenis: 'Rekap',
      user: '',
      data: [],
      show: false,
      print: false
    }

  }

  handleChange = (e) => {
    if (e.target) {
      this.setState({[e.target.name]: e.target.value})

    } else {
      this.setState({dari_tanggal: e.start,sampai_tanggal: e.end})
    }
  }

  componentDidMount() {
    this.props.setAllUsers()
  }

  handleSubmit = (e) => {
    const { dari_tanggal, sampai_tanggal, jenis, user} = this.state
    axios.get(`/komisipenjualan/interval?jenis=${jenis}&user=${user}&dari_tanggal=${dari_tanggal}&sampai_tanggal=${sampai_tanggal}`).then((resp) => {
      this.setState({data: resp.data.data})
    }).catch((err) => {
      console.log(err);
    })
    e.preventDefault()
  }

  render() {
    const { show, dari_tanggal, sampai_tanggal, data, jenis, user} = this.state
    let { users } = this.props
    users = users.map(users => {
      return {
        value: users.id,
        label: users.name,
        target: {
          name: 'user',
          value: users.id
        }
      }
    })
    return (
      <span>
        <button className="btn btn-primary" onClick={() => this.setState({show: true})}>Filter</button>
        <Modal
          isOpen={show}
        >
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
             <Select
              placeholder="User..."
              name="user"
              className="mb-2 mr-sm-2"
              value={user}
              multi={false}
              onChange={(e) => {
                this.handleChange(e)
              }}
              options={users}
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
            <button type="button" className="btn btn-danger mb-2" onClick={()=> this.setState({ show: false})}>Close</button>
          </form>
          <DisplayFilter data={data} jenis={jenis} ref={el => (this.componentRef = el)} />
        </Modal>
      </span>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setAllUsers}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Filter)
