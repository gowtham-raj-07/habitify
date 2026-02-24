import API from "./Axios";

export const fetchNotes = () => {
  return API.get("/notes");
};

export const createNote = (data) => {
  return API.post("/notes", data);
};

export const updateNote = (id, data) => {
  return API.put(`/notes/${id}`, data);
};

export const deleteNote = (id) => {
  return API.delete(`/notes/${id}`);
};
