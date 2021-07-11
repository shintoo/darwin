import { useState } from 'react'
import SearchBar from './SearchBar'
import SearchResultBox from './SearchResultBox'

export default function Builder(props) {
  const [ searchText, setSearchText ] = useState("")
  return (
    <>
      <SearchBar setSearchText={setSearchText} />
      <SearchResultBox query={searchText} />
    </>
  )
}
