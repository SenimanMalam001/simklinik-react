import React from 'react';

const TheadUser = (props) => {
  const { text }  = props
  return (
    <thead className="thead-dark">
      <tr>
        {
          text.map((text, index) => {
            return (
              <th key={index} scope="col">{text}</th>
            )
          })
        }
      </tr>
    </thead>
  )
}

export default TheadUser
