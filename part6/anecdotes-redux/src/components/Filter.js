import { connect } from "react-redux"
import { filterFor } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleChange = (event) => {
        props.filterFor(event.target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        filterFor: value => {
            dispatch(filterFor(value))
        }
    }
}

const ConnectedComponent = connect(
    null,
    mapDispatchToProps
)(Filter)

export default ConnectedComponent