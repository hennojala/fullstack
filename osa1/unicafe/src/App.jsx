import React, { useState } from 'react';

// Button component represents an individual feedback button
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

// StatisticLine component handles displaying a single statistic row
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

// Statistics component displays feedback statistics in an HTML table
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  // Display "No feedback given" message if no feedback has been given yet
  if (all === 0) {
    return <p>No feedback given</p>;
  }

  // Calculate average and positive feedback percentage
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100 + " %";

  return (
    <table>
      <tbody>
        {/* Display individual statistic rows */}
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

// App component represents the main application
const App = () => {
  // State variables for tracking feedback counts
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Event handlers for updating feedback counts
  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      {/* Render feedback buttons */}
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>Statistics</h1>
      {/* Render feedback statistics */}
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
