import { useEffect, useState } from "react";

import logo from './logo.svg';
import './App.css';
import datahh from "./data_hh.json";

function App() {

  const [dataTable, setDataTable] = useState([]);
  const [dataHH, setDataHH] = useState([]);
  const [allPagesHH, setAllPagesHH] = useState();
  const [allDataHH, setAllDataHH] = useState([]);

  const name = "кладовщик"

  useEffect(() => {
    fetch(`https://api.hh.ru/vacancies?clusters=true&text=${name}&area=1146&per_page=100&page=0&schedule=flyInFlyOut`) //5 id:81235130
    // fetch('https://api.hh.ru/vacancies/81235130/similar_vacancies')
      .then(res=> res.json())
      .then(data => (setDataHH(data), setAllPagesHH(data.pages), setDataTable(data.items)))
  }, [])

  console.log(dataHH)

  function clog() {
    console.log('всего страниц >>> ', allPagesHH)
    allPages()
  }
  
  function allPages() {
      for (let i = 0; i < allPagesHH; i++) {
          fetch(`https://api.hh.ru/vacancies?text=${name}&area=1146&per_page=100&page=0&schedule=flyInFlyOut'&page=${i}`)
              .then(res=> res.json())
              .then(data => (setAllDataHH(...allDataHH, data.items)))
          setTimeout(5000);
      }
  }

  function clogtwo() {
    console.log('всего данных для таблицы >>> ', dataTable)
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {/* {d.map((elem) => {
            return(
              <p>{elem}</p>
            )
          })} */}
        </div>
        <a
          className="App-link"
          href="#"
          rel="noopener noreferrer"
          onClick={clog}
        >
          количество и запуск
        </a>
        <a
          className="App-link"
          href="#"
          rel="noopener noreferrer"
          onClick={clogtwo}
        >
          результат
        </a>
      </header>



          <main>
          <div className="table-box">
                        <table className="table" id="table">
                            <thead>
                                <tr className="table-head">
                                    <th id="0" className="table-head__elem">address</th>
                                    <th id="1" className="table-head__elem">alternate_url</th>
                                    <th id="2" className="table-head__elem">area</th>
                                    <th id="3" className="table-head__elem">created_at</th>
                                    <th id="4" className="table-head__elem">employer</th>
                                    <th id="5" className="table-head__elem">employment</th>
                                    <th id="6" className="table-head__elem">experience</th>
                                    <th id="7" className="table-head__elem">id</th>
                                    <th id="8" className="table-head__elem">name</th>
                                    <th id="9" className="table-head__elem">published_at</th>
                                    <th id="10" className="table-head__elem">salary</th>
                                    <th id="11" className="table-head__elem">snippet</th>
                                    <th id="12" className="table-head__elem">type</th>
                                </tr>
                            </thead>

                            <tbody>
                              {/* {dataTable.map((elem, index) => {
                                return (
                                    <tr className="table-body" key={index}>
                                        <td className="table-body__elem">{elem.address}</td>
                                        <td className="table-body__elem">{elem}</td>
                                        <td className="table-body__elem">{elem}</td>
                                        <td className="table-body__elem">{elem}</td>
                                        <td className="table-body__elem">{elem}</td>
                                        <td className="table-body__elem">{elem}</td>
                                        <td className="table-body__elem">{elem}</td>
                                        <td className="table-body__elem">{elem}</td>
                                        <td className="table-body__elem">{elem}</td>
                                        <td className="table-body__elem">{elem}</td>
                                        <td className="table-body__elem">{elem}</td>
                                        <td className="table-body__elem">{elem}</td>
                                    </tr>
                                )
                              })} */}
                            </tbody>
                        </table>
                    </div>
          </main>



    </div>
  );
}

export default App;
