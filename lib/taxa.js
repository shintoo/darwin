const taxaEndpoint = "https://api.inaturalist.org/v1/taxa"

const iconicTaxa = [
  { id: 47178, image: 'actinopterygii.png' },
  { id: 20978, image: 'amphibians.png' },
  { id: 47119, image: 'arachnids.png' },
  { id: 3,     image: 'birds.png' },
  { id: 47158, image: 'insects.png' },
  { id: 40151, image: 'mammals.png' },
  { id: 47115, image: 'mollusks.png' },
  { id: 26036, image: 'reptiles.png' },
  { id: 47686, image: 'protozoa.png' },
  { id: 48222, image: 'chromista.png' },
  { id: 47170, image: 'fungi.png' },
  { id: 47126, image: 'plants.png' },
  { id: 1,     image: 'animalia.png' },
]

// Get a list of taxa matching the query from the iNaturalist API
// Args:
//   - query (str): Search text to match
//   - rank (str): Rank to match ("species", "family", "", etc.)
//   - parent (int): Only get taxa that are direct children of this parent taxon
// Returns:
//   - List of matched taxa in the form of:
//     [{ id: 41577,
//        name: "Humpback whale",
//        ancestors: [48460, 1, 2, 355675, ...]
//     }]
export default function getTaxa(query, rank, parent, id, page, per_page) {
  let url = taxaEndpoint

  if (id) {
      url += "/" + id
  }
  else if (parent && parent !== "") {
    url += "?parent_id=" + parent
  } else {
    url += "?q=" + query
    if (rank) {
      url += "&rank=" + rank
    }
  }

  if (page) {
    url += "&page=" + page
  }

  if (per_page) {
    url += "&per_page=" + per_page
  }


  console.log("url: ", url)

  return fetch(url)
    .then(resp => resp.ok ? resp.json() : null)
    .then(data => {
      if (!data.results)
        return [-1]
      return data.results.map(r => {
        return {
          id: r.id,
          photo: r.default_photo && {
            url: r.default_photo.medium_url,
            attribution: r.default_photo.attribution,
          },
          ancestors: r.ancestor_ids.reverse(),
          naming: {
            common_name: r.preferred_common_name !== "undefined" ? r.preferred_common_name : null,
            rank: r.rank,
            taxon: r.name
          },
          wikipedia_url: r.wikipedia_url,
        }
      })
    })
}

export function getIconicTaxonPhoto(taxon) {
  // taxon.id, taxon.ancestors
  console.log("Searching for iconic taxon of " + taxon.id)
  for (let i = 0; i < taxon.ancestors.length; i++) {
    for (let j = 0; j < iconicTaxa.length; j++) {
      console.log("Comparing ", taxon.ancestors[i], " to ", iconicTaxa[j].id)
      if (taxon.ancestors[i] == iconicTaxa[j].id) {
        console.log("Comparing: Found match")
        return '/iconic_taxa/' + iconicTaxa[j].image
      }
    }
  }

  return '/iconic_taxa/unknown.png'
}

export function taxonToNode(taxon) {
  return { 
    "id": taxon.id,
    "common_name": taxon.naming.common_name,
    "sci_name": taxon.naming.rank + " " + taxon.naming.taxon,
    "icon": taxon.photo ? taxon.photo.url.replace("medium", "square") : getIconicTaxonPhoto(taxon),
    "ancestors": taxon.ancestors,
    "wikipedia_url": taxon.wikipedia_url,
  }
}
