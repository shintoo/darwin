const taxaEndpoint = "https://api.inaturalist.org/v1/taxa"

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
