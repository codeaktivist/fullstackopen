import PropTypes from 'prop-types'

const Notification = (props) => {
    return (
        <div className={`notification ${props.type}`}>
            {props.text}
        </div>
    )
}

Notification.propTypes = {
    type: PropTypes.string.isRequired
}

export default Notification