import React from 'react'
import Select from 'react-select'
import connect from 'react-redux/es/connect/connect'
import { changeRequestConditionsAuthors } from 'modules/requestConditions'
import 'containers/SelectMenu/select.css'

const customStyles = {
  container: (provided, state) => ({
    width: '-webkit-fill-available', display: 'inline-block', backgroundColor: '#fbfbfb', border: '2px solid #dcdcdc', borderRadius: '5px'
  }),
  input: (provided, state) => ({
    width: 'auto', minHeight: '26px', maxHeight: '26px'
  }),
  control: (styles) => (
    { ...styles, backgroundColor: '#fcfcfc', border: 'none', width: 'auto', boxShadow: 'none', justifyContent: 'center', borderColor: 'black', minHeight: '26px', maxHeight: '26px' }
  ),
  option: (styles) => (
    { ...styles, backgroundColor: '#fcfcfc', border: 'none', width: 'auto', boxShadow: 'none', justifyContent: 'center' }
  ),
  menu: (styles) => (
    { ...styles, backgroundColor: '#fcfcfc', border: 'none', width: 'auto', boxShadow: 'none', justifyContent: 'center' }
  )

}

class Index extends React.Component {
  state = {
    selectedOption: null,
    options: []
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return { options: nextProps.discordUsers.map(user => ({ value: user._id, label: user.name })) }
  }

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption })
    let filterArr = selectedOption.map(option => option.value)
    this.props.onFilterChange(filterArr)
  }
  render () {
    const { selectedOption } = this.state

    return (
      <Select
        placeholder={'Выбрать пользователей'}
        styles={customStyles}
        value={selectedOption}
        onChange={this.handleChange}
        options={this.state.options}
        isMulti
      />
    )
  }
}

export default connect(
  state => ({
    discordUsers: state.discordUsers,
    requestConditions: state.requestConditions
  }),
  dispatch => ({
    onFilterChange: (filterArr) => dispatch(changeRequestConditionsAuthors(filterArr))
  })
)(Index)
