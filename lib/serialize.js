export function createQueryString(obj) {
  let acc = []

  for (const param in obj) {
    if (obj.hasOwnProperty(param)) {
      acc.push(encodeURIComponent(param) + "=" + encodeURIComponent(obj[param]))
    }
  }

  return acc.join("&")
}
