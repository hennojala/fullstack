import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

//Virheilmoitus
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}
const Confirm = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="confirm">
      {message}
    </div>
  )
}

//Suodatus komponentti
const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  );
};

//Käyttäjänlisäys komponentti
const PersonForm = ({ onSubmit, name, onNameChange, number, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input value={name} onChange={onNameChange} />
        <br></br>
        number:
        <input value={number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

// Luettelonäkymä komponentti
const Persons = ({ persons, onClick }) => {
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onClick(person.id, person.name)}>delete</button>
        </li>
      ))}
    </ul>
  );
};


const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);

  //Haetaan kaikki henkilöt
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Henkilön lisäysfunktio
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    // Tarkistetaan, onko nimi jo olemassa persons-taulukossa
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) //Jos nimi jo löytyy niin kysytään halutaanko päivittää numero
    {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook,\nDo you want to update the number?`
      );

      if (confirmUpdate === true) { //Päivitetään nro jos vastaus on kyllä
        const changedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson)
            );
            setNewName('');
            setNewNumber('');
            setConfirmMessage(`Updated ${existingPerson.name}`)
            setTimeout(() => {
              setConfirmMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Error to update ${changedPerson.name}`);
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
    else { // jos ei löydy, lisätään luetteloon
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setConfirmMessage(`Added ${newName}`);
          setTimeout(() => {
            setConfirmMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Error to added ${newName}`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        });
    }
  }

  // Suodatetaan yhteystiedot hakukentässä annetun syötteen perusteella
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  // Henkilön poistamisfunktio 
  const deletePerson = (id, name) => {

    if (window.confirm(`Do you really want to delete ${name}?`)) {

      personService
        .deleteTo(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setConfirmMessage(`Deleted ${name}`);
          setTimeout(() => {
            setConfirmMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Error to delete ${name}, it was already deleted before.`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  };

  return (
    <div>
      <Notification message={errorMessage} />
      <Confirm message={confirmMessage} />

      <h2>Phonebook</h2>
      <Filter value={search} onChange={(event) => setSearch(event.target.value)} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        onNameChange={(event) => setNewName(event.target.value)}
        number={newNumber}
        onNumberChange={(event) => setNewNumber(event.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onClick={deletePerson} />
    </div>
  );
};
export default App;