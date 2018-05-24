import React from 'react'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import SelectBox from '../../components/SelectBox'


const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    user,
  } = props
  let { users } = props
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
    <form onSubmit={ handleSubmit}>
      <SelectBox
        label="User"
        placeholder="Pilih User"
        name="user"
        value={user}
        options={users}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

}

export default Form
