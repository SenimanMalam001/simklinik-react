import React from 'react';
import axios from '../../axios'
import Alert from '../../components/Alert'
import { Redirect } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Form from './form'
import AlertSuccess from '../../components/AlertSuccess'
import { connect } from 'react-redux'
import { setAllPenjamin } from '../../store/actions'
import { bindActionCreators } from 'redux'

class RekamMedikEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      no_reg: '',
      sistole_diastole: '',
      frekuensi_pernapasan: '',
      suhu: '',
      nadi: '',
      berat_badan: '',
      tinggi_badan: '',
      anamnesa: '',
      pemeriksaan_fisik: '',
      keadaan_umum: '',
      kesadaran: '',
      diagnosis_utama: '',
      keadaan_pulang: '',
      error: {
        status: false,
        message: ''
      },
      swalSuccess: false
    }
  }

  handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  validate = () => {
    return true
  }

  handleSubmit = (event) => {
    const { error, swalSuccess, ...input} = this.state
    const { id } = this.props.match.params
    if (this.validate()) {
      const token = localStorage.token
      const headers = {
        token,
        otoritas: 'edit_rekam_medik'
      }

      axios.put(`/rekammedik/${id}`, input,{ headers }).then((res) => {
        this.setState({swalSuccess: true})
        this.props.history.push('/rekammedik')
      }).catch((err) => {
        console.log(err)
      })
    }
    event.preventDefault()
  }

  getData = () => {
    const { id } = this.props.match.params
    const token = localStorage.token
    const headers = {
      token,
      otoritas: 'get_rekam_medik'
    }
    axios.get(`/rekammedik/${id}`, { headers}).then((res) => {
      const { ...data } = res.data.data
      this.setState(data)
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const {
      no_reg,
      sistole_diastole,
      frekuensi_pernapasan,
      suhu,
      nadi,
      berat_badan,
      tinggi_badan,
      anamnesa,
      pemeriksaan_fisik,
      keadaan_umum,
      kesadaran,
      diagnosis_utama,
      keadaan_pulang,
      error
    } = this.state
    return (
      <div className="container" style={{ marginTop: '20px'}}>

        <div className="col-md-4 offset-md-4">
          <BreadCrumb
            secondText="Rekam Medik"
            thirdText="Edit "
            secondUrl="/rekammedik"
          />
          {
            error.status && <Alert type="danger" text={error.message} />
          }
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            no_reg={no_reg}
            sistole_diastole={sistole_diastole}
            frekuensi_pernapasan={frekuensi_pernapasan}
            suhu={suhu}
            nadi={nadi}
            berat_badan={berat_badan}
            tinggi_badan={tinggi_badan}
            anamnesa={anamnesa}
            pemeriksaan_fisik={pemeriksaan_fisik}
            keadaan_umum={keadaan_umum}
            kesadaran={kesadaran}
            diagnosis_utama={diagnosis_utama}
            keadaan_pulang={keadaan_pulang}
          />
        </div>
        <AlertSuccess
          type="edit"
          status={this.state.swalSuccess}
        />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    penjamins: state.penjamin,
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({setAllPenjamin}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RekamMedikEdit)
