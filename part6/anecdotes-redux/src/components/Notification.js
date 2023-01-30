import { connect } from 'react-redux'

const Notification = (props) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    if (props.notification.visible)
        return (
            <div style={style}>
                {props.notification.content}
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

const ConnectedComponent = connect(
    mapStateToProps
)(Notification)

export default ConnectedComponent