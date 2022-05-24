const Header = ({name}) => {
    return (
        <h1>{name}</h1>
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
                console.log("part", part)
                return (sum += part.exercises)}, 0)} exercises
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }

        ]
    }

    return <Course course={course} />
}

export default App