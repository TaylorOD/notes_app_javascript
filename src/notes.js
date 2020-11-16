let notes = []

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

notes = getSavedNotes()