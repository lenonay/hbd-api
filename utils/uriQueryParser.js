export function fetchURLQuery(query) {
  const URIParams = new URLSearchParams();

  if(query){
    for(const [key, value] of Object.entries(query)){
      URIParams.append(key,value);
    }

    return URIParams;
  }

  // Si no hay nada retornamos una cadena vacía.
  return "";
}