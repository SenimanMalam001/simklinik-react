import React from 'react';


const CardInfoPetugas = (props) => {
  const { registrasi, no_reg, petugas, users, openModal} = props
  return (
    <div class="card" style={{ marginBottom: '16px'}}>
      <div class="card-body" style={{ paddingLeft: '1rem', paddingTop: '0rem',paddingBottom: '0rem'}}>
        <a href="#" onClick={openModal}>
        <p><b>Pasien:</b> { no_reg && registrasi.map( reg => reg.value == no_reg && reg.label) } <br/>
        <b>Petugas:</b> { users.filter( user => petugas.indexOf(user.value) >= 0).map(user => user.label).join(', ') }
        </p>
      </a>
      </div>
    </div>
  )

}

export default CardInfoPetugas
