import PropTypes from 'prop-types'

const Button = ({ title, onAdd }) => {
    return (
        <input 
        type='submit' 
        value={title} 
        className='btn btn-block' 
        onClick={onAdd} 
        />
    )
}

Header.defaultProps = {
    title: 'Generate Recommendations',
  }
  
  Header.propTypes = {
    title: PropTypes.string.isRequired,
  }

export default Button