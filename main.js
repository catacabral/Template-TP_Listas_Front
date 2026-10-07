/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
    mostrarComidasConForEach ()
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const comidaContainer = document.getElementById('comidaContainer');
const formComidaNueva = document.getElementById("agregarComida")


function mostrarComidasConForEach () {

  comidaContainer.innerHTML = "";

  comidas.forEach( comida => {

    comidaContainer.innerHTML += 
     `
    <article class="card">
      <h2>${comida.nombre}</h2>
      <p>${comida.provincia}</p>
      <span class="categoria">${comida.categoria}</span>
      <ul>
        ${comida.ingredientes.map(ingrediente => `<li>${ingrediente}<li>`).join(``)}
      </ul>

    </article>

    `;

  })

}

mostrarComidasConForEach();

const agregarComidaForm = document.getElementById("agregarComidaForm")

formComidaNueva.addEventListener("submit", (e) => {
  
  e.preventDefault()
  alert("Comida nueva recibida: " + e.target.nombre.value)
  
  let nuevaComida = {
    nombre: e.target.nombre.value,
    categoria: e.target.categoria.value,
    provincia: e.target.provincia.value,
    ingredientes: e.target.ingredientes.value.split(",")

    }

    comidas.push(nuevaComida)

    mostrarComidasConForEach();
  
    formComidaNueva.reset()

})
