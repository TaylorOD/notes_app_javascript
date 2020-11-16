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
}

notes = loadNotes()

export { getNotes, createNote }