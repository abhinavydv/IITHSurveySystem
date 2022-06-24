import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const HomePage = () => {
    const [surveys, setSurveys] = useState([]);
    useEffect(() => {
        getSurveys();
    })

    const getSurveys = () => {
        const response = axios.get('http://localhost:5000/surveys');
    }

    return (
        <div>
            <h1>Welcome user!</h1>
            <Link to='/create' className='button is-primary'>New</Link><br/>

        </div>
    )
}
