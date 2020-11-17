import { v4 as uuidv4 } from 'uuid';
import moment from "moment"

let notes = []

// read existing notes from localstorage
const loadNotes = () => {
  const notesJSON = localStorage.getItem("notes")

// prevents the app from crashing if the data from local storage isnt being read correctly
  try {
    return notesJSON ? JSON.parse(notesJSON) : []
  } catch (e) {
    return []
  }
}

// Save notes to localStorage
const saveNotes = () => {
  localStorage.setItem("notes", JSON.stringify(notes))
}

// Expose notes from module
const getNotes = () => notes

const createNote = () => {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  })
  saveNotes()
  return id
}

// remove note from list
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id)

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1)
    saveNotes()
  }
}

// Sort your notes by one of three ways
const sortNotes = (sortBy) => {
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

const updateNote = (id, updates) => {
  const note = notes.find((note) => note.id === id)
  if (!note) {
    return undefined
  }

  if (typeof updates.title === "string") {
    note.title = updates.title
    note.updatedAt = moment().valueOf()
  }

  if (typeof updates.body === "string") {
    note.body = updates.body
    note.updatedAt = moment().valueOf()
  }

  saveNotes()
  return note

}

notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote }