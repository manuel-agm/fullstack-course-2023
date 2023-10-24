import { useState } from 'react'

const Header = (props) => {
  return (<h1>{props.text}</h1>)
}

const Button = (props) => {
  return (
    <button onClick={props.handleRate}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td> {props.text} </td>
      <td>  {props.value}  </td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (<p>No feedback given</p>)
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text='Good: ' value={props.good} />
          <StatisticLine text='Neutral: ' value={props.neutral} />
          <StatisticLine text='Bad: ' value={props.bad} />
          <StatisticLine text='All: ' value = {props.good + props.neutral + props.bad} />
          <StatisticLine text='Average: ' value = { props.good + props.neutral + props.bad == 0 ? 0 : props.score / (props.good + props.neutral + props.bad) } />
          <StatisticLine text='Positive: : ' value = { props.good + props.neutral + props.bad == 0 ? 0 + ' %' : (props.good / (props.good + props.neutral + props.bad)) * 100 + ' %'} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore] = useState(0)

  const rate = (rate) => {
    switch (rate) {
      case 1:
        setGood(good + 1)
        break;
      case 0:
        setNeutral(neutral + 1)
        break;
      case -1:
        setBad(bad + 1)
        break;
    }
    setScore(score + rate)
  } 

  return (
    <div>
      <Header text='Give feedback' />
      <Button handleRate={() => rate(1)} text='Good' />
      <Button handleRate={() => rate(0)} text='Neutral' />
      <Button handleRate={() => rate(-1)} text='Bad' />
      <Header text='Statistics' />
      <Statistics good={good} bad={bad} neutral={neutral} score={score} />
    </div>
  )
}

export default App