import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Resources } from '../components/EventsList';
import { useState } from 'react';

interface FormData {
    tytul: string;
    data: string;
    czas: string;
    opis: string;
    obrazek: string;
    rodzaj: string;
    telefon: string | null;
    email: string;
    miejsce: string;
}

const initialValues: FormData = {
    tytul: '',
    data: '',
    czas: '',
    opis: '',
    obrazek: '',
    rodzaj: '',
    telefon: null,
    email: '',
    miejsce: '',
};

const validationSchema: Yup.ObjectSchema<FormData> = Yup.object({
  tytul: Yup.string().required('Tytuł jest wymagany'),
  data: Yup.string().required('Określ datę'),
  czas: Yup.string().required('Określ czas'),
  opis: Yup.string().required('Opis jest wymagany'),
  obrazek: Yup.string().required('Adres obrazka jest wymagany'),
  rodzaj: Yup.string().required('Kategoria jest wymagana'),
  telefon: Yup.string().matches(/^\d{9}$/, 'Telefon musi składać się z 9 cyfr')
  .required('Telefon jest wymagany'),
  email: Yup.string().email('E-mail niepoprawny').required('E-mail jest wymagany'),
  miejsce: Yup.string().required('Lokalizacja jest wymagana'),
});



function AddEventForm() {
    const handleSubmit = async (values: FormData, { resetForm }: any) => {
        try {
          // Make an HTTP POST request to the "Resources" endpoint
          const response = await fetch(Resources, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          });
      
          // Check if the request was successful
          if (!response.ok) {
            throw new Error('Próba dodania postu zakończyła się niepowodzeniem');
          }
          console.log('Dodaję post:', values);
          // Reset the form
          resetForm();
          setSuccess(true)
        } catch (error) {
          console.error(error);
        }
      };
  

      // After clicking "+Dodaj wydarzenie"
      const [success, setSuccess] = useState(false);


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors }) => (
        <>
        
        <Form className="container d-flex flex-column gap-2">
        <h3 className='text-muted text-uppercase'>Formularz dodawania wydarzenia</h3>
        
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between my-4'>
                <label htmlFor="tytul"><strong>Nazwa wydarzenia:</strong></label>
                <button className='btn btn-danger' type='reset' >Wyczyść formularz</button>
            </div>
            <Field type="text" id="tytul" name="tytul" />
            <ErrorMessage name="tytul" component="div" className="error text-danger" />
          </div>
          <div className='d-flex flex-wrap'>
            <div className='d-flex flex-column'>
                <label htmlFor="data"><strong>Data:</strong></label>
                <Field type="date" id="data" name="data" />
                <ErrorMessage name="data" component="div" className="error text-danger" />
            </div>
            <div className='d-flex flex-column'>
                <label htmlFor="czas"><strong>Godzina:</strong></label>
                <Field type="time" id="czas" name="czas" />
                <ErrorMessage name="czas" component="div" className="error text-danger" />
            </div>
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="opis"><strong>Opis:</strong></label>
            <Field as="textarea" id="opis" name="opis" />
            <ErrorMessage name="opis" component="div" className="error text-danger" />
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="obrazek"><strong>Wklej URL obrazka:</strong></label>
            <Field type="text" id="obrazek" name="obrazek" placeholder='adres powinien się zaczynać "https://..." lub "http://..."'/>
            <ErrorMessage name="obrazek" component="div" className="error text-danger" />
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="rodzaj"><strong>Kategoria:</strong></label>
            <Field type="text" id="rodzaj" name="rodzaj" />
            <ErrorMessage name="rodzaj" component="div" className="error text-danger" />
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="telefon"><strong>Numer telefonu:</strong></label>
            <Field type="text" id="telefon" name="telefon" />
            <ErrorMessage name="telefon" component="div" className="error text-danger" />
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="email"><strong>E-mail:</strong></label>
            <Field type="text" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error text-danger" />
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="miejsce"><strong>Lokalizacja:</strong></label>
            <Field type="text" id="miejsce" name="miejsce" />
            <ErrorMessage name="miejsce" component="div" className="error text-danger" />
          </div>
          <button className="mt-5 btn btn-info" type="submit" disabled={Object.keys(errors).length > 0}>
            + Dodaj wydarzenie
          </button>
          {success ? (
            <div className='text-success'>Dodano pomyślnie, post wyświetla się już na stronie</div>
          ) : (
            <div>Po kliknięciu w przycisk wydarzenie powinno wyświetlać się na stronie głównej</div>
          )}
          
        </Form>
        </>
      )}
    </Formik>
  );
}

export default AddEventForm;
