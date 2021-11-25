import SelectBoard from "./Components/SelectBoard";
import BirthdayList from "./Components/BirthdayList";

import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [actives, setActives] = useState([])

    useEffect(() => {
        const storedActives = JSON.parse(window.localStorage.getItem('actives')) || []
        setActives(storedActives)
    }, []);

    useEffect(() => {
        window.localStorage.setItem('actives', JSON.stringify(actives));
    }, [actives]);

    return (
        <div className="wrapper">
            <SelectBoard actives={actives} setActives={setActives} />
            <BirthdayList actives={actives} />
        </div>

    );
}

export default App;
