import moment from "moment"
import { getFilters } from "./filters"
import { sortNotes } from "./notes"

// generate DOM for a note
const generateNoteDom = (note) => {
  const noteEl = document.createElement("a")
  const textEl = document.createElement("p")
  const statusEl = document.createElement("p")

  // setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title
  } else {
    textEl.textContent = "Unnamed Note"
  }
  textEl.classList.add("list-item__title")
  noteEl.appendChild(textEl)

  // Setup the link
  noteEl.setAttribute("href", `/edit.html#${note.id}`)
  noteEl.classList.add("list-item")

  // Setup the status message
  statusEl.textContent = updateLastEdited(note.updatedAt)
  statusEl.classList.add("list-item__subtitle")
  noteEl.appendChild(statusEl)

  return noteEl

}

// Render application Notes
const renderNotes = () => {

  const notesEl = document.querySelector("#notes")
  const filters = getFilters()

  const notes = sortNotes(filters.sortBy)
  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

  notesEl.innerHTML = ""

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDom(note)
      notesEl.appendChild(noteEl)
    })
  } else {
    const emptyMessage = document.createElement("p")
    emptyMessage.textContent = "No notes to show"
    // adds class to new p tag
    emptyMessage.classList.add("empty-message")
    notesEl.appendChild(emptyMessage)
  }
}

// Generate the last edited message
const updateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`

export { generateNoteDom, renderNotes, updateLastEdited }