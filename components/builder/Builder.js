import { useState } from 'react'
import SearchBar from './SearchBar'
import SearchResultBox from './SearchResultBox'

export default function Builder(props) {
  const [ searchText, setSearchText ] = useState("")
  return (
    <>
      <div style={{position: "absolute", bottom: "0", width: "100%"}}>
        <SearchBar setSearchText={setSearchText} />
        <SearchResultBox query={searchText} />
      </div>
    </>
  )
}
