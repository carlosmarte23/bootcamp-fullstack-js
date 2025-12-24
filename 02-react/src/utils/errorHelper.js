export const errorHelper = (error) => {
  if (!navigator.onLine) {
    return "No tienes conexión a internet. Verifica tu red y vuelve a intentar.";
  } else if (error.status === null) {
    return "No se pudo contactar al servidor. Intenta nuevamente.";
  }

  if (error.status === 400) {
    return "La solicitud no es válida. Revisa los filtros aplicados e intenta nuevamente.";
  } else if (error.status === 401) {
    return "No tienes autorización para realizar esta búsqueda.";
  } else if (error.status === 403) {
    return "No tienes permisos para acceder a esta información.";
  } else if (error.status === 404) {
    return "No se encontraron empleos que coincidan con los filtros seleccionados.";
  } else if (error.status === 500) {
    return "Ocurrió un problema en el servidor. Intenta nuevamente en unos minutos.";
  } else {
    return "Ocurrió un error inesperado. Intenta nuevamente.";
  }
};
