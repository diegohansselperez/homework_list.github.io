const fechatoday = document.querySelector("#fechaHoy");
const lista = document.querySelector(".lista");
const input = document.querySelector("#input");
const botonAgregar = document.querySelector("#boton_enter");
const containVacio = document.querySelector(".contain-input_vacio");

const check = 'fa-circle-check';
const uncheck = 'fa-circle'
const lineThrough = 'line-through'

let id;
let arrayList;



//fecha actualizable
const fechaNew = new Date();
fechatoday.innerHTML = fechaNew.toLocaleDateString('es-MX',{weekday:'long', month:'long', day:'numeric'})

function agregarTarea(tarea, id, realizada, eliminada) {
  if(eliminada){return}
  const realizadoCheck = realizada ? check : uncheck;
  const lineCheck = realizada ? lineThrough : false;
  
  const li = document.createElement("li");

  const itemRealizado = document.createElement("i");
  itemRealizado.classList.add("fa-regular", `${realizadoCheck}`, "fa-xl");
  itemRealizado.setAttribute("data", "realizado");
  itemRealizado.setAttribute("id", `${id}`);

  const pTarea = document.createElement("p");
  pTarea.classList.add("text", `${lineCheck}`);
  pTarea.innerText = tarea;

  const itemEliminado = document.createElement("i");
  itemEliminado.classList.add("fa-solid", "fa-trash", "fa-xl");
  itemEliminado.setAttribute("data", "eliminado");
  itemEliminado.setAttribute("id", `${id}`);

  li.append(itemRealizado, pTarea, itemEliminado);
  lista.appendChild(li);
  
  
}

function agregarExit(tarea) {
  if (tarea === "") {
    const div = document.createElement("div");
    div.classList.add("input_vacio");

    const exitItem = document.createElement("i");
    exitItem.setAttribute("id", "exit_item");
    exitItem.classList.add("fa-solid", "fa-xmark");

    const errorItem = document.createElement("i");
    errorItem.classList.add("fa-solid", "fa-circle-xmark");

    const parrafoh2 = document.createElement("h2");
    parrafoh2.innerText = "No hay nada que agregar a Tareas Pendientes";

    div.append(exitItem, errorItem, parrafoh2);

    containVacio.appendChild(div);
    
    exitItem.addEventListener("click", () => {
        containVacio.innerHTML = '';
    });
    
  }
}

//Agregar tarea con el item plus
botonAgregar.addEventListener("click", () => {
  const tarea = input.value;

  if (tarea) {
    agregarTarea(tarea, id, false, false);
    arrayList.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false
    })
    input.value = ''
  } 
  if (tarea === '' ){
    agregarExit(tarea);
  }
  localStorage.setItem('ListToDo',JSON.stringify(arrayList))

  id++
  console.log(arrayList);
});


//Agregar tarea con "Enter"
document.addEventListener("keyup", (e) => {
  if(e.key == 'Enter'){
    const tarea = input.value
    if(tarea){
      agregarTarea(tarea, id, false, false);
      arrayList.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false
      })
      input.value = ''
    }
    if (tarea === ''){
      agregarExit(tarea);
    }
  }
  localStorage.setItem('ListToDo',JSON.stringify(arrayList))

    id++
});

lista.addEventListener('click', (e) => {
  const element = e.target
  const elementData = element.attributes.data.value

  if(elementData === 'realizado'){
    tareaRealizada(element);
  } else if (elementData === 'eliminado'){
    tareaEliminada(element);
    console.log(element);
  }
  localStorage.setItem('ListToDo',JSON.stringify(arrayList))
})

function tareaRealizada(element) {
  element.classList.toggle(check)
  element.classList.toggle(uncheck)
  element.parentNode.querySelector('.text').classList.toggle(lineThrough)
  arrayList[element.id].realizado = arrayList[element.id].realizado ? false : true;
}

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode)

  arrayList[element.id].eliminada = true;
  
}

//localStorage.setItem('ListToDo',JSON.stringify(arrayList))

let data = localStorage.getItem('ListToDo')
if(data){
  arrayList = JSON.parse(data);
  console.log(arrayList);
  id = arrayList.length
  cargarLista(arrayList)
} else {
  arrayList = []
  id = 0
}

function cargarLista(arrayList) {
  arrayList.forEach(function(item){
    agregarTarea(item.nombre, item.id, item.realizado, item.eliminado)
  })
}
