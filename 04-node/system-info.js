import ms from "ms";
import os from "node:os";

console.log("Información del sistema operativo");

console.log("Nombre del sistema operativo: ", os.type());
console.log("Versión del sistema operativo: ", os.release());
console.log("Arquitectura del sistema operativo: ", os.arch());
console.log("Memoria total del sistema operativo (en bytes): ", os.totalmem());
console.log("Memoria libre del sistema operativo (en bytes): ", os.freemem());
console.log("Directorio home del usuario: ", os.homedir());
console.log(
  "Tiempo de actividad del sistema operativo: ",
  ms(os.uptime() * 1000, { long: true }),
);
console.log("--------------------------------------");
console.log("Número de núcleos del sistema operativo: ", os.cpus().length);
console.log("Modelo del núcleo del sistema operativo: ", os.cpus()[0].model);
console.log("Modelo del núcleo del sistema operativo: ", os.cpus());
console.log("--------------------------------------");
console.log("Interface de red del sistema operativo: ", os.networkInterfaces());
console.log("--------------------------------------");
