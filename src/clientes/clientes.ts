import { Reserva } from './clientes.modelo';

const reservasSum = (reserva: Reserva, acc: number, obj: Cliente): number => {
  switch (reserva.tipoHabitacion) {
    case 'standard':
      acc += reserva.noches * obj.precioStandar;
      break;
    case 'suite':
      acc += reserva.noches * obj.precioSuite;
  }
  if (reserva.pax > 1) {
    acc += reserva.noches * (reserva.pax - 1) * obj.personaAdicional;
  }
  if (reserva.desayuno) {
    acc += reserva.noches * reserva.pax * obj.precioDesayuno;
  }

  return acc;
};

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
    this.reservas.reduce(
      (acc: number, reserva) => reservasSum(reserva, acc, this),
      0
    );

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
    const subtotal: number = this.reservas.reduce(
      (acc: number, reserva) => reservasSum(reserva, acc, this),
      0
    );
    return subtotal - subtotal * this.descuento;
  };
}
