import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { Resources } from '../components/EventsList'


interface eventProps {
  id: string,
  tytul: string,
  data: string,
  czas: string,
  opis: string,
  obrazek: string,
  rodzaj: string,
  telefon: string,
  email: string,
  miejsce: string,
}

function Event(): JSX.Element {
  
const [eventId, setEventId] = useState<eventProps>();
  let { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(Resources + id); // Resources variable should be defined
        if (!response.ok) {
          throw new Error('Błąd połączenia');
        }
        const newData = await response.json();
        setEventId(newData);
      } catch (error) {
        console.error('Błąd pobierania danych', error);
      }
    }
    fetchData();
  }, [id]);
  console.log(eventId);

  return (
    <>
    
      <div className="container">
      <h3 className='text-muted text-uppercase'>Strona wydarzenia</h3>
    <div className="row">
    <p className="text-left mb-3"><strong>Kategoria:</strong> {eventId?.rodzaj}</p>
      <div className="d-flex flex-column justify-content-"> 
        <h1 className="text-left my-4">{eventId?.tytul}</h1>
        <h4 className="text-left">{eventId?.miejsce}</h4>
        <p className="text-left"><strong>Data i czas: </strong>{eventId?.data} - {eventId?.czas}</p>
        <img src={eventId?.obrazek} className="d-block" width={"361"} alt="Event alt" />
        <p className="text-left"><strong>Opis wydarzenia: <br/></strong>{eventId?.opis}</p>
        <p className="text-left"><strong>Kontakt: <br/>Telefon: </strong> {eventId?.telefon} | <strong>Email: </strong>{eventId?.email}</p>
      </div>
    </div>
  </div>
    </>
  );

}
export default Event;