const Header = ({name}) => {
    return (
        <h2>{name}</h2>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <div key={part.id}>{part.name} {part.exercises}</div>)}
        </div>
    )
}

const Total = ({parts}) => {
    return (
        <div style={{fontWeight: 900}}>
            total of {parts.reduce((sum, part) => {
                return (sum += part.exercises)}, 0)} exercises
        </div>
    )
}

const Course = ({courses}) => {
    return (
        <>
            {courses.map(course => {
                return (
                    <div key={course.id}>    
                        <Header name={course.name} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                    )
            })}
        </>
    )
}

export default Course