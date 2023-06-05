import { useEffect, useState } from "react";

// import './Test.css';

function App() {

	const [dataHH, setDataHH] = useState([]); //весь ответ
	const [dataTable, setDataTable] = useState([]); //только вакансии из ответа
	const [allPagesHH, setAllPagesHH] = useState(); //всего страниц
	const [allDataHH, setAllDataHH] = useState([]);
	const [sortedField, setSortedField] = useState("there"); //флаг для сортировки (направление)

	const [profRoleHH, setProfRoleHH] = useState([]);  //все названия вакансий по группам
	const [allProfRoleHH, setAllProfRoleHH] = useState([]);  //все названия вакансий без группировки
	const [reqInput, setReqInput] = useState(''); //значение поля поиска req
	const [reqSchedule, setReqSchedule] = useState(); //значение поля график
	const [reqArea, setReqArea] = useState(); //значение поля регион
	const [reqInputValue, setReqInputValue] = useState(''); //текущее значение поля поиска req

	const [isOpen, setIsOpen] = useState(true);

	// const id_role = 52;
	// useEffect(() => {
	// 	// fetch(`https://api.hh.ru/vacancies?clusters=true&text=${name}&area=1146&per_page=100&page=0&schedule=flyInFlyOut`) //5 id:81235130
	// 	fetch(`https://api.hh.ru/vacancies?clusters=true&professional_role=${id_role}&area=1146&per_page=100&page=0&schedule=flyInFlyOut`) //5 id:81235130
	// 		.then(res=> res.json())
	// 		.then(data => (setDataHH(data), setAllPagesHH(data.pages), setDataTable(data.items)))
	// }, [])
	console.log(dataHH);

//получаем все названия вакансий по группам
		useEffect(() => {
				fetch(`https://api.hh.ru/professional_roles`)
						.then(res=> res.json())
						.then(data => setProfRoleHH(data.categories));
		}, [])

		const schedule_db = [{id:"fullDay",name:"Полный день"},{id:"shift",name:"Сменный график"},{id:"flexible",name:"Гибкий график"},{id:"remote",name:"Удаленная работа"},{id:"flyInFlyOut",name:"Вахтовый метод"}];
		const areas_db = [{id:"113",name:"Не выбран"},{id:"54",name:"Красноярск"},{id:"1146",name:"Красноярский край"},{id:"1187",name:"Республика Хакасия"}];
		let current_db = [];

//получаем все названия вакансий без группировки:
		useEffect(() => {
				function gettingAll() {
						const allProfRoleHH = [];
						profRoleHH.forEach(elem => {
								allProfRoleHH.push(elem.roles)
						})
						const allRole = [];
						for (let i = 0; i < allProfRoleHH.length; i++) {
								allProfRoleHH[i].forEach(e => {
									allRole.push(e)
								})
						}
						setAllProfRoleHH(allRole)
				}gettingAll()
		}, [profRoleHH])
				
		// console.log("сейчас newAllProfRoleHH >>> ", allProfRoleHH)

		//запрос на получение данных с hh
		function reqData() {
				// console.log("сейчас reqSchedule", reqSchedule)
				// console.log("сейчас reqInput", reqInput)
				// console.log("сейчас reqArea", reqArea)

				const allProfRoleHH = [];
				profRoleHH.forEach(elem => {
						allProfRoleHH.push(elem.roles)
				})

				let newAllProfRoleHH = [];
				for (let i = 0; i < allProfRoleHH.length; i++) {
					// newAllProfRoleHH.push(allProfRoleHH[i]);
					
					allProfRoleHH[i].forEach(e => {
						newAllProfRoleHH.push(e)
					})
				}

				let id_area = 113;
				if(reqArea === undefined) {
						return id_area = 113;
				} else {
						areas_db.forEach(elem => {
								if(elem.name === reqArea) {
										return id_area = elem.id;
								}
						})
				}

				let id_rol = 1;
				newAllProfRoleHH.forEach(elem => {
					if(elem.name.toLowerCase() == reqInput.toLowerCase()){
						return id_rol = elem.id
					}
				})
				schedule_db.forEach(elem => {
						if(elem.name === reqSchedule) {
								fetch(`https://api.hh.ru/vacancies?clusters=true&professional_role=${id_rol}&area=${id_area}&per_page=100&page=0&schedule=${elem.id}`)
										.then(res => res.json())
										.then(data => (setDataHH(data), setAllPagesHH(data.pages), setDataTable(data.items)))
						}
						if(reqSchedule === undefined || reqSchedule === "График не задан") {
								fetch(`https://api.hh.ru/vacancies?clusters=true&professional_role=${id_rol}&area=1146&per_page=100&page=0`)
										.then(res => res.json())
										.then(data => (setDataHH(data), setAllPagesHH(data.pages), setDataTable(data.items)))
						}
				})

				// console.log("сейчас newAllProfRoleHH", newAllProfRoleHH);	
		}


	
		const tt = [];
	function clog() {
		allPages()
		console.log('всего в current_db >>> ', current_db)
		setAllDataHH(current_db);
		console.log('всего вакансий >>> ', allDataHH)
		
		console.log('ttttttt >>> ', tt)
		return tt
	}
	
	function allPages() {
		let allP = 4;

		
		function per(n) {
			for (let i = 0; i < allP; i++) {
				fetch(`https://api.hh.ru/vacancies?professional_role=31&area=1146&per_page=100&page=${i}`)
						.then(res=> res.json())
						.then(data => current_db.push(data.items))
					}
		}per()

		setTimeout(() => {
			for (let i = 0; i < current_db.length; i++) {
				current_db[i].forEach(e => {
					tt.push(e)
					
				})
				
			}
		}, 1000);
		
	}


		
		//вывод подсказок при вводе в поле поиска:
		const filteredRole = allProfRoleHH.filter(elem => {
			return elem.name.toLowerCase().includes(reqInputValue.toLowerCase())
		})

		// поиск по таблице:
		function tableSearch() {
				var phrase = document.querySelector('.search-form__input');
				var table = document.querySelector('#table');
				var regPhrase = new RegExp(phrase.value, 'i');
				var flag = false;
				for (var i = 1; i < table.rows.length; i++) {
						flag = false;
						for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
								flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
								if (flag) break;
						}
						if (flag) {
								table.rows[i].style.display = "";
						} else {
								table.rows[i].style.display = "none";
						}
		
				}
		}

			// сортировка таблицы по столбцам:
			function sortColumn(id) {
				const table = document.querySelector('#table')
				if(sortedField === "there") {
						setSortedField("here");
						let sortedRows = Array.from(table.rows)
						.slice(1)
						.sort((rowA, rowB) => rowA.cells[id].innerHTML > rowB.cells[id].innerHTML ? 1 : -1);
						table.tBodies[0].append(...sortedRows);
				} else {
						setSortedField("there");
						let sortedRows = Array.from(table.rows)
						.slice(1)
						.sort((rowB, rowA) => rowB.cells[id].innerHTML > rowA.cells[id].innerHTML ? -1 : 1);
						table.tBodies[0].append(...sortedRows);
				}
		}



		// useEffect(() => {
		// 		const searchInput = document.querySelector('.request-form__input');
		// 		const searchOptions = document.querySelector('.options');

		// 		function getOptions(word, stations) {
		// 			return allProfRoleHH.filter(s => {
		// 				// Определить совпадает ли то что мы вбили в input
		// 				// названиям станций внутри массива
				
		// 				const regex = new RegExp(word, 'gi');
		// 				return s.name.match(regex);
		// 			})
		// 		}
				
		// 		function displayOptions() {
				
		// 			console.log('this.value >> ', this.value);
				
		// 			const options = getOptions(this.value, allProfRoleHH);
				
		// 			const html = options
		// 				.map(station => {
		// 					const regex = new RegExp(this.value, 'gi');
		// 					const stationName = station.name.replace(regex, 
		// 							`<span className="hl">${this.value}</span>`
		// 						)
				
		// 					return `<li><span>${stationName}</span></li>`;
		// 				})
		// 				.slice(0, 10)
		// 				.join('');
				
		// 			// searchOptions.innerHTML = this.value ? html : null;
		// 		}
		// 		searchInput.addEventListener('change', displayOptions);
		// 		searchInput.addEventListener('keyup', displayOptions);
		// })

		const itemClickHandler = (e) => {
				setReqInputValue(e.target.textContent)
				setIsOpen(!isOpen);
		}

		const inputClickHandler = () => {
			setIsOpen(true);
		}

	return (
			<div className="App">
					<header className="App-header">
						<a className="App-link" href="#" rel="noopener noreferrer" onClick={clog}> количество и запуск</a>
					</header>



					<main>

							<div className="request-box">
									<form className="request-form">
											<input className="request-form__input" value={reqInputValue} type="text" placeholder="вакансия" onKeyUp={(e) => setReqInput(e.target.value)} onChange={(e) => setReqInputValue(e.target.value)} onClick={inputClickHandler}/>
											
											{/* <ul className="options">
        											<li>названия</li>
      										</ul> */}

											<ul className="autocomplete">
												{reqInputValue && isOpen ? filteredRole.map((role, index) => {
													return (
														<li className="autocomplete__item" key={index} onClick={itemClickHandler}>{role.name}</li>
													)
												}) : null}
											</ul>

											<div className="list-box">
													<select>
															{filteredRole.map((elem, index) => {
																	return (
																			<option key={index}>{elem.name}</option>
																	)
															})}
													</select>
											</div>
											
											<select onChange={(e) => setReqSchedule(e.target.value)}>
													<option>График не задан</option>
													{schedule_db.map((elem, index) => {
															return (
																	<option id={elem.id} key={index}>{elem.name}</option>
															)
													})}
											</select>

											<select onChange={(e) => setReqArea(e.target.value)}>
													{areas_db.map((elem, index) => {
															return (
																	<option id={elem.id} key={index}>{elem.name}</option>
															)
													})}
											</select>

											<button className="request-form__btn" type="button" onClick={reqData}>Запрос</button>
									</form>
							</div>

							<div className="search-box">
									<form className="search-form">
											<input className="search-form__input" type="text" placeholder="Поиск..." onKeyUp={tableSearch}/>
											{/* <button className="search-form__btn" type="button"><img className="search-form__btn_img" src={searchImg} alt="поиск"></img></button> */}
									</form>
							</div>

							<div className="table-box">
									<table className="table" id="table">
											<thead>
													<tr className="table-head">
															<th id="0" className="table-head__elem">№</th>
															<th id="1" className="table-head__elem">name</th>
															<th id="2" className="table-head__elem">salary</th>
															<th id="3" className="table-head__elem" onClick={(e) => sortColumn(e.currentTarget.id)}>area</th>
															<th id="4" className="table-head__elem">employer</th>
															<th id="5" className="table-head__elem" onClick={(e) => sortColumn(e.currentTarget.id)}>address</th>
															<th id="6" className="table-head__elem">employment</th>
															<th id="7" className="table-head__elem" onClick={(e) => sortColumn(e.currentTarget.id)}>experience</th>
															<th id="8" className="table-head__elem">published_at</th>
													</tr>
											</thead>

											<tbody> 
													{dataTable.map((elem, index) => {
															return (
																	<tr className="table-body" key={index}>
																			<td className="table-body__elem">{index+1}</td>
																			<td className="table-body__elem"><a href={elem.alternate_url} target="_blank">{elem.name}</a></td>
																			<td className="table-body__elem">{elem.salary === null ? "не указано" : (elem.salary.from === elem.salary.to ? elem.salary.from : (elem.salary.from !== null & elem.salary.to !== null ? elem.salary.from + " - " + elem.salary.to : (elem.salary.from === null ? elem.salary.to : elem.salary.from)))} {elem.salary !== null ? elem.salary.currency : null}</td>
																			<td className="table-body__elem">{elem.area.name}</td>
																			<td className="table-body__elem"><a href={elem.employer.alternate_url} target="_blank">{elem.employer.name}</a></td>
																			<td className="table-body__elem">{elem.address === null ? "не указан" : elem.address.city}</td>
																			<td className="table-body__elem">{elem.employment.name}</td>
																			<td className="table-body__elem">{elem.experience.name}</td>
																			<td className="table-body__elem">{elem.published_at.split('T')[0].replace(/^(\d+)-(\d+)-(\d+)$/, `$3.$2.$1`)}</td>
																	</tr>
															)		
													})}
											</tbody>
									</table>
							</div>
					</main>



			</div>
	);
}

export default App;
