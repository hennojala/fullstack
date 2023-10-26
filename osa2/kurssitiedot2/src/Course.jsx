// komponentti Course
const Course = ({ course }) => {

    // nimi ja kurssinosat
    const { name, parts } = course;
  
    // Lasketaan osien harjoitusten summa käyttämällä reduce-metodia
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  
    // palautetaan kurssin nimi, ja käydään läpi kurssin osat ja sen tiedot.
    return (
      <div>
        <h2>{name}</h2>
        {parts.map(part => (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        ))}
      <p><strong>total of {totalExercises} exercises</strong></p>
    </div>
    );
  };