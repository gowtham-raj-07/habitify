import Note from "../models/note.js";

export const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(notes);
};

export const createNote = async (req, res) => {
  const { title, content } = req.body;

  const t = title?.trim() || "";
  const c = content?.trim() || "";

  if (!c) {
    return res.status(400).json({ message: "Content is required" });
  }

  const weight = c.length;

  const note = await Note.create({
    user: req.user.id,
    title: t,
    content: c,
    weight,
  });

  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });

  if (note.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  const t = title?.trim() || "";
  const c = content?.trim() || "";

  if (!c) {
    return res.status(400).json({ message: "Content is required" });
  }

  note.title = t;
  note.content = c;
  note.weight = c.length;

  const updated = await note.save();
  res.json(updated);
};

export const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });

  if (note.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  await note.deleteOne();
  res.json({ message: "Note deleted" });
};