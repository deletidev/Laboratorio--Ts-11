import { ClienteParticular, ClienteTourperador } from './clientes/clientes';
import { Reserva } from './clientes/clientes.modelo';
import './style.css';

const reservas: Reserva[] = [
  {
    tipoHabitacion: 'standard',
    desayuno: false,
    pax: 1,
    noches: 3
  },
  {
    tipoHabitacion: 'standard',
    desayuno: false,
    pax: 1,
    noches: 4
  },
  {
    tipoHabitacion: 'suite',
    desayuno: true,
    pax: 2,
    noches: 1
  }
];

const pepe = new ClienteParticular(reservas);
console.log(pepe.subtotal());
console.log(pepe.total());
const alconViajes = new ClienteTourperador(reservas);
console.log(alconViajes.subtotal());
console.log(alconViajes.total());
