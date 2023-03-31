import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";



interface eventProps {
    id: string;
    tytul: string;
    data: string;
    czas: string;
    opis: string;
    obrazek: string;
    rodzaj: string;
    telefon: string;
    email: string;
    miejsce: string;
  }

export const Resources = "http://localhost:3031/Articles/"

const EventsList = () => {
const [events, setEvents] = useState<eventProps[]>([]);
useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(Resources);
            if (!response.ok) {
                throw new Error('Błąd połączenia');
            }
            const newData = await response.json();
            setEvents(newData);
        } catch (error) {
            console.error('Błąd pobierania danych', error)
        }
    }
    fetchData();
},[])

function shortText(text: string) {
  return text.split(" ").slice(0, 20).join(" ");
}

return (
    <>
    <div className="container mb-3">
    <h3 className='text-muted text-uppercase'>Lista wydarzeń</h3>
      <div className="articles-column d-flex flex-wrap gap-3 mt-4">
        {events.map(event => (
            <div key={event.id} className="card p-2">
                <img src={event.obrazek} className="card-img-top" alt={`alt-${event.tytul}`} />
                <div className="card-body">
                  <h4 className="card-title">{event.tytul}</h4>
                  <p>{shortText(event.opis)} ...<NavLink key={event.id} to={`/Articles/${event.id}`}>Czytaj więcej</NavLink></p>
                  <h5 className="card-text">{event.rodzaj}</h5>
                  <ul>
                    <li><strong>Data i czas:</strong> {event.data} - {event.czas}</li>
                    <li><strong>Miejsce:</strong> {event.miejsce}</li>
                    <li><strong>Telefon:</strong> {event.telefon}</li>
                    <li><strong>E-mail:</strong> {event.email}</li>
                  </ul>
                
                </div>
            </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default EventsList