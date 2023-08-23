import { Reserva } from './clientes.modelo';

class Cliente {
  reservas: Reserva[];
  precioStandar: number;
  precioSuite: number;
  personaAdicional: number;
  precioDesayuno: number;
  iva: number;

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
    this.precioStandar = 100;
    this.precioSuite = 150;
    this.personaAdicional = 40;
    this.precioDesayuno = 15;
    this.iva = 0.21;
  }

  subtotal = () =>
    this.reservas.reduce((acc: number, reserva) => {
      switch (reserva.tipoHabitacion) {
        case 'standard':
          acc += reserva.noches * this.precioStandar;
          break;
        case 'suite':
          acc += reserva.noches * this.precioSuite;
      }
      if (reserva.pax > 1) {
        acc += reserva.noches * (reserva.pax - 1) * this.personaAdicional;
      }
      if (reserva.desayuno) {
        acc += reserva.noches * reserva.pax * this.precioDesayuno;
      }
      return acc;
    }, 0);

  total = () => {
    const sub = this.subtotal();
    const iva = this.iva;
    return Number((sub + sub * iva).toFixed(2));
  };
}

export class ClienteParticular extends Cliente {
  constructor(reservas: Reserva[]) {
    super(reservas);
  }
}

export class ClienteTourperador extends Cliente {
  descuento: number;
  constructor(reservas: Reserva[]) {
    super(reservas);
    this.descuento = 0.15;
    this.precioSuite = 100;
  }

  subtotal = () => {
    const subtotal = this.reservas.reduce((acc: number, reserva) => {
      switch (reserva.tipoHabitacion) {
        case 'standard':
          acc += reserva.noches * this.precioStandar;
          break;
        case 'suite':
          acc += reserva.noches * this.precioSuite;
      }
      if (reserva.pax > 1) {
        acc += reserva.noches * (reserva.pax - 1) * this.personaAdicional;
      }
      if (reserva.desayuno) {
        acc += reserva.noches * reserva.pax * this.precioDesayuno;
      }
      return acc;
    }, 0);
    return subtotal - subtotal * this.descuento;
  };
}
