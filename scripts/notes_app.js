/* global getSavedNotes, updateLastEdited, removeNote, saveNotes, moment, updatedAt, notes, filters, renderNotes, uuidv4 */
"use strict"

let notes = getSavedNotes()

const filters = {
  searchText: "",
  sortBy: "byEdited"
}

renderNotes(notes, filters)

// listens for new note text and creates new note
document.querySelector("#create-note").addEventListener("click", (e) => {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  })
  saveNotes(notes)
  location.assign(`/edit.html#${id}`)
})

// listens for search text and renders notes that match
document.querySelector("#search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value
  renderNotes(notes, filters)
})

// listens for a change in filter by and renders nots to match
document.querySelector("#filter-by").addEventListener("change", (e) => {
  filters.sortBy = e.target.value
  renderNotes(notes, filters)
})

// sync edit and index title storage
window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue)
    renderNotes(notes, filters)
  }
})