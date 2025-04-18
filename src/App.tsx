import React from 'react';
import './App.css';
import {firebaseAppConfig} from "./configs";
import {initializeApp} from "firebase/app";
import {useData} from "./hooks";
import {Chart} from "./components";

initializeApp(firebaseAppConfig);

function App() {
    const data = useData();

    return (
        <section className="App">
            <header className="App-header">
            </header>
            <main className="App-main">
                <div className='App-chart-container'>
                    <Chart data={data}/>
                </div>
            </main>
        </section>
    );
}

export default App;
