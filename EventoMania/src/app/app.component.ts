import { Component, OnInit } from '@angular/core';
import { Evento } from './models/evento.model';
import data from '../assets/data.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  eventos: Evento[] = [];
  filtro: string = '';


  ngOnInit() {
    // Cargamos el fichero JSON
    const json: any = data;

    // Guardamos el fichero cargado en el array de Eventos
    this.eventos = json;

    // Convertimos las fechas a tipo Date
    this.eventos.map((value) => value.fecha = new Date(value.fecha));
  }

  // Obtiene los eventos cuya fecha aún no ha vencido y que coincidan con la localización seleccionada
  obtenerEventosActuales(): Evento[] {
    return this.eventos.filter(value => value.fecha >= new Date() && (value.direccion.toLowerCase()).indexOf(this.filtro.toLowerCase()) != -1)
  }

  // Obtiene los eventos cuya fecha ya haya vencido y que coincidan con la localización seleccionada
  obtenerEventosPasados(): Evento[] {
    return this.eventos.filter(value => value.fecha < new Date() && (value.direccion.toLowerCase()).indexOf(this.filtro.toLowerCase()) != -1)
  }

  // Obtenemos una lista de todos los lugares de los diferentes eventos sin repeticiones
  obtenerLugares(): string[] {

    // Primero nos quedamos solamente con las direcciones de todos los eventos
    let direcciones: string[] = this.eventos.map(value => value.direccion);

    // Filtramos todas las direcciones de manera que si la posición del "value" no coincide con el número de "idx", es una repetición
    return direcciones.filter((value: string, idx: number) => direcciones.indexOf(value) == idx);
  }

}
