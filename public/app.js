var formulario = document.getElementById('contact');

let buttonCrear = document.getElementById('crear');
let buttonEliminar = document.getElementById('eliminar');
let buttonModificar = document.getElementById('modificar');
let buttonConsultar = document.getElementById('consultar');

buttonCrear.addEventListener('click', function (e) {
    e.preventDefault();
  console.log('Crear');
  let datos = new FormData(formulario);
  let nombrepaciente = datos.get('nombre');
  let apellidopaciente = datos.get('apellido');
  let idpaciente = datos.get('identificacion');

  let myHeaders = new Headers();

  const options = {
    method: 'POST',
    headers: myHeaders,
    body: new URLSearchParams({
      'nombre': nombrepaciente,
      'apellido': apellidopaciente,
      'numid': idpaciente
    }),
  }

  fetch('/basedatos/insertarpaciente', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

buttonEliminar.addEventListener('click', function (e) {
  e.preventDefault();
console.log('eliminar');
let datos = new FormData(formulario);
let idpaciente = datos.get('identificacion');

let myHeaders = new Headers();

const options = {
  method: 'DELETE',
  headers: myHeaders,
  body: new URLSearchParams({
       'numid': idpaciente
  }),
}

fetch('/basedatos/borrarpacientes', options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
});

buttonModificar.addEventListener('click', function (e) {
  e.preventDefault();
console.log('actualizar');
let datos = new FormData(formulario);
let nombrepaciente = datos.get('nombre');
let apellidopaciente = datos.get('apellido');
let idpaciente = datos.get('identificacion');

let myHeaders = new Headers();

const options = {
  method: 'POST',
  headers: myHeaders,
  body: new URLSearchParams({
    'nombre': nombrepaciente,
    'apellido': apellidopaciente,
    'numid': idpaciente
  }),
}

fetch('/basedatos/actualizarpacientes', options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
});


buttonConsultar.addEventListener('click', function (e) {
  e.preventDefault();
console.log('Consultar');
let datos = new FormData(formulario);
let idpaciente = datos.get('identificacion');
console.log(idpaciente);


let myHeaders = new Headers();

const options = {
  method: 'GET',
  headers: myHeaders,
}

fetch('/basedatos/consultatotalpacientes', options)
  .then((res) => res.json())
  .then((data) => {
    console.log('mostrando datos', data);
    var isFound = false;
    for(var i=0; i<data.length; i++){
     
      if(data[i].numid == idpaciente){
        
        document.getElementById('nombre').value=data[i].nombre;
        document.getElementById('apellido').value=data[i].apellido;
        document.getElementById('cedula').value=data[i].numid;
        isFound=true;
        i=data.length;
      }
    }
    if(isFound == false)
      alert('El paciente no se encuentra registrado')
  });

});


