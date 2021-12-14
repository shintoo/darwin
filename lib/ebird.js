import csvToJson from './csv'
import getTaxa, { taxonToNode } from './taxa'

const checklistEndpoint = "https://api.ebird.org/v2/product/checklist/view/" // /<checklistid>
const taxonomyEndpoint = "https://api.ebird.org/v2/ref/taxonomy/ebird/?species="
const hotspotEndpoint = "https://api.ebird.org/v2/ref/hotspot/info/" // <locId>

export default async function getEBirdChecklist(checklistId, ebird_token) {
  const options = {
    mode: 'cors',
    headers: new Headers({ "x-eBirdApiToken": ebird_token })
  }
  const resp = await fetch(checklistEndpoint + checklistId, options)
  const data = await resp.json()
  console.log("get ebird checklist data (from resp):", data)
  const user = data.userDisplayName
  const speciesCodes = data.obs.map(o => o.speciesCode)
  const species = await getSpeciesFromEBirdCodes(speciesCodes, ebird_token)
  const location = await getLocationName(data.locId, ebird_token)
  console.log("getSpecies returned: ", species)
  const speciesSet = new Set(species.filter(s => typeof(s) !== "undefined"))
  let taxa = []

  for (let item of speciesSet) {
    console.log("doing getTaxa for: ", item)
    const results = await getTaxa(item, "species", null, null, null, 1)

    if (results.length == 0 || results[0] == -1)
      continue

    const taxon = results[0]
    console.log("results[0] for getTaxa was: ", taxon)
    taxa.push(taxon)
  }

  console.log("get ebird checklist taxa: ", taxa)
  return { taxa: taxa, location: location, userName: user }
}

// in ebird codes e.g. thagul
// out species/taxon eg Laurus glaocoides thayeri
async function getSpeciesFromEBirdCodes(speciesCodes, ebird_token) {
  const options = {
    mode: 'cors',
    headers: new Headers({ "x-eBirdApiToken": ebird_token })
  }
  const resp = await fetch(taxonomyEndpoint + speciesCodes.join(","), options)
  const csv = await resp.text()
  const data = csvToJson(csv)
  const names = data.map(d => d.SCIENTIFIC_NAME?.replace(/ \[+.*\]+/, ""))

  return names
}

async function getLocationName(locId, ebird_token) {
  const options = {
    mode: 'cors',
    headers: new Headers({ "x-eBirdApiToken": ebird_token })
  }
  const resp = await fetch(hotspotEndpoint + locId, options)
  const data = await resp.json()
  return data.name
}
