import { useState } from 'react'

const Header = (props) => (
    <h2>
        {props.text}
    </h2>
)

const Button = ({text, onClick}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistics = (props) => {
    const {good, neutral, bad, all} = props
    if (all === 0){
        return (
            <p>No feedback given</p>
        )
    }

    return (
        <table>
            <tbody>
                <StatisticLine text='good' counter={good} />
                <StatisticLine text='neutral' counter={neutral} />
                <StatisticLine text='bad' counter={bad} />

                <tr>
                    <td>all</td>
                    <td>{all}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{((good - bad) / all).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{(good / all * 100).toFixed(1)} %</td>
                </tr>
            </tbody>
        </table>
    )
}

const StatisticLine = ({text, counter}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{counter}</td>
        </tr>
    )
}


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + neutral + bad

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)


    return (
        <div>
            <Header text='give feedback' />
            <Button text='good' onClick={handleGoodClick}/>
            <Button text='neutral' onClick={handleNeutralClick}/>
            <Button text='bad' onClick={handleBadClick}/>
            <Header text='statistics' />
            <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
        </div>
    )
}

export default App;