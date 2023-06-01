// fetch('./data_hh.json')
//   .then(res=> res.json())
//   .then(data => console.log("ЛОКАЛЬНЫЙ >>> ", data))

const f = fetch('https://api.hh.ru/vacancies?text="программист"&area=1')
.then(res=> res.json())
.then(data => (console.log('по URL >>> ', data), d.push(data.items)))


let d = [];


function ds() {
    fetch('https://api.hh.ru/vacancies?text="программист"&area=1')
        .then(res=> res.json())
        .then(data => (console.log('по URL >>> ', data), d.push(data.items)))

    console.log("d >>> ", d)
    dds()
}ds()

function dds() {
    const t = JSON.stringify(d)
    let dd = d.forEach(elem => {
        return elem.salary
    })

    console.log("dd >>> ", f)
}   
