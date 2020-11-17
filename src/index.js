import { createNote } from "./notes"
import { setFilters } from "./filters"
import { renderNotes } from "./views"

renderNotes()

// listens for new note text and creates new note
document.querySelector("#create-note").addEventListener("click", (e) => {
  const id = createNote()
  location.assign(`/edit.html#${id}`)
})

// listens for search text and renders notes that match
document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value
  })
  renderNotes()
})

// listens for a change in filter by and renders nots to match
document.querySelector("#filter-by").addEventListener("change", (e) => {
  setFilters({
    sortBy: e.target.value
  })
  renderNotes()
})

// sync edit and index title storage
window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    renderNotes()
  }
})