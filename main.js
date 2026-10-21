/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
    mostrarComidasConForEach (comidas)
    actualizarFiltro();
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const comidaContainer = document.getElementById("comidaContainer");
const formComidaNueva = document.getElementById("agregarComida");


function mostrarComidasConForEach (lista) {

  comidaContainer.innerHTML = "";

  lista.forEach( comida => {

    comidaContainer.innerHTML += 
     `
    <article class="card">
      <h2>${comida.nombre}</h2>
      <p>${comida.provincia}</p>
      <span class="categoria">${comida.categoria}</span>
      <ul>
        ${comida.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join(``)}
      </ul>

    </article>

    `;

  })

}



const agregarComidaForm = document.getElementById("agregarComida")

formComidaNueva.addEventListener("submit", (e) => {
  
  e.preventDefault()
  alert("Comida nueva recibida: " + e.target.nombre.value)

  const ingredientesInputs = document.querySelectorAll(".ingrediente");
  let ingredientes = []
  
 ingredientesInputs.forEach(input => {
  ingredientes.push(input.value);
 })

  let nuevaComida = {
    nombre: e.target.nombre.value,
    categoria: e.target.categoria.value,
    provincia: e.target.provincia.value,
    ingredientes: ingredientes

    }

    comidas.push(nuevaComida)

    mostrarComidasConForEach(comidas);
  
    formComidaNueva.reset()

})

const buscador = document.getElementById("buscador")
const filtroCategoria = document.getElementById("filtroCategoria")
const filtroProvincia = document.getElementById("filtroProvincia")

 function filtrar(){
  const comidasFiltradas = comidas.filter( comida => {
    return comida.categoria.includes(filtroCategoria.value)
       && comida.provincia.includes(filtroProvincia.value);
  });

  mostrarComidasConForEach(comidasFiltradas);

 }

 function buscar(){
  const texto = buscador.value.toLowerCase()

  const comidasFiltradas = comidas.filter( comida => {
    return comida.nombre.toLowerCase().includes(texto)
    || comida.provincia.toLowerCase().includes(texto)
    || comida.categoria.toLowerCase().includes(texto)
  })

  mostrarComidasConForEach(comidasFiltradas)

 }

filtroCategoria.addEventListener("change", filtrar)
filtroProvincia.addEventListener("change", filtrar)
buscador.addEventListener("input", buscar)

function actualizarFiltro(){

  let categorias = [];

  comidas.forEach(comida => {
   if(!categorias.includes(comida.categoria)){
   categorias.push(comida.categoria)
   }
  })

  categorias.forEach(categoria => {
    filtroCategoria.innerHTML += `<option value="${categoria}">${categoria}</option>`
  })

}







const agregarIngredientebtn = document.getElementById("agregarIngrediente")
const ingredientesContainer = document.querySelector(".contenedor-ingredientes")

agregarIngredientebtn.addEventListener("click", (e) =>{

  ingredientesContainer.innerHTML +=   `<input type="text" class="ingrediente" placeholder="Un ingrediente por box" required>`
})

