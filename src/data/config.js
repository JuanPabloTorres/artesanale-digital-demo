// Datos reales del negocio (investigados públicamente). El horario proviene
// de la biografía oficial de Instagram (@artesanalepr); otras fuentes (Yelp)
// muestran variaciones — Ramón debe confirmar el horario vigente.
export const NEGOCIO = {
  nombre: 'ArtesanAle',
  lema: 'Pizzas artesanales horneadas a la leña, en el corazón de Villalba',
  pueblo: 'Villalba, Puerto Rico',
  direccion: '55 Calle Muñoz Rivera, Villalba, PR 00766',
  telefono: '(939) 489-8418',
  instagram: '@artesanalepr',
  horario: [
    { dia: 'Jueves – Sábado', horas: '4:00pm – 12:00am' },
    { dia: 'Domingo', horas: '2:00pm – 10:00pm' },
    { dia: 'Lunes – Miércoles', horas: 'Cerrado' },
  ],
  rating: { google: 4.6, facebook: 4.7 },
  dueño: 'Ramón',
  tiempoPromedioMin: 25,
  cargoServicio: 0.10,
}
