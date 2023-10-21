import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.'
  ];

  // Initialize votes for each anecdote to zero
  const initialVotes = new Array(anecdotes.length).fill(0);

  // State for selected anecdote and its votes
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);

  //State for most voted anecdote
  const [mostVoted, setMostVoted] = useState(0);

  // Function to generate a random index within the length of anecdotes array
  const generateRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  // Function to handle voting for the selected anecdote
  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);

    // Check if the current anecdote has more votes than the most voted one
    if (newVotes[selected] > newVotes[mostVoted]) {
      setMostVoted(selected);
    }
  };

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        {anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <button onClick={handleVote}>vote</button>
      <button onClick={generateRandomIndex}>next anecdote</button>
      <div>
        <h2>Anecdote with most votes</h2>
        {votes[mostVoted] > 0 ? anecdotes[mostVoted] : "No votes yet"}
        <div>
          has {votes[mostVoted]} votes
        </div>
      </div>
    </div>
  );
};

export default App;
