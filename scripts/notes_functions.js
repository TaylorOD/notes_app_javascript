/* global getSavedNotes, updateLastEdited, removeNote, saveNotes, moment, updatedAt, notes, filters */
"use strict"

// read existing notes from localstorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes")

// prevents the app from crashing if the data from local storage isnt being read correctly
  try {
    return notesJSON ? JSON.parse(notesJSON) : []
  } catch (e) {
    return []
  }
}

// save notes to local storage
const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes))
}

// remove note from list
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id)

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1)
  }
}

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

// Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1
      } else if (a.updatedAt < b.updatedAt) {
        return 0
      }
    })
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1
      } else if (a.createdAt < b.createdAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
  }
}

// Render application Notes
const renderNotes = (notes, filters) => {
  const notesEl = document.querySelector("#notes")
  notes = sortNotes(notes, filters.sortBy)
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

