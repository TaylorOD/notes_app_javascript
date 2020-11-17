import { initializeEditPage, updateLastEdited } from "./views"
import { updateNote, removeNote } from "./notes"

const titleEl = document.querySelector("#note_title")
const bodyEl = document.querySelector("#note_body")
const updatedAtEl = document.querySelector("#note_updatedAt")
const removeEl = document.querySelector("#remove_note")
const noteID = location.hash.substring(1)

initializeEditPage(noteID)

// save new title for note to local storage using edit page
titleEl.addEventListener("input", (e) => {
  const note = updateNote(noteID, {
    title: e.target.value
  })
  updatedAtEl.textContent = updateLastEdited(note.updatedAt)
})

// save new body for note to local storage using edit page
bodyEl.addEventListener("input", (e) => {
  const note = updateNote(noteID, {
    body: e.target.value
  })
  updatedAtEl.textContent = updateLastEdited(note.updatedAt)
})

// remove note on edit page and redirect to home page
removeEl.addEventListener("click", () => {
  removeNote(noteID)
  location.assign("/index.html")
})

// syncs across edit pages
window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    initializeEditPage(noteID)
  }
})