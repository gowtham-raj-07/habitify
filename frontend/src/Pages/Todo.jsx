import { useEffect, useMemo, useState } from "react";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../Api/noteApi";

import AddNoteModal from "../Components/Todo/AddNoteModal";
import NotesGrid from "../Components/Todo/NotesGrid";
import EmptyNotes from "../Components/Todo/EmptyNotes";
import { ChevronDown } from "lucide-react";

function Todo() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("latest");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes()
      .then((res) => {
        setNotes(res.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredNotes = useMemo(() => {
    let list = [...notes];

    if (search) {
      list = list.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "alpha") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filter === "latest") {
      list.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    if (filter === "weight") {
      list.sort((a, b) => b.weight - a.weight);
    }

    return list;
  }, [notes, search, filter]);

  async function handleSave(note) {
    let res;

    if (note._id) {
      res = await updateNote(note._id, note);
      setNotes((prev) =>
        prev.map((n) => (n._id === note._id ? res.data : n))
      );
    } else {
      res = await createNote(note);
      setNotes((prev) => [res.data, ...prev]);
    }

    setIsModalOpen(false);
    setEditingNote(null);
  }

  async function handleDelete(id) {
    const ok = window.confirm("Are you sure you want to delete this note?");
    if (!ok) return;

    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  }

  if (loading) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto animate-fadeIn">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <input
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="neon-input md:w-1/3"
        />

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="neon-input w-full appearance-none cursor-pointer pr-10 bg-white dark:bg-[#0b0b0b] text-gray-900 dark:text-white"
            >
              <option value="latest">Latest</option>
              <option value="alpha">Alphabetical</option>
              <option value="weight">By Weight</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" size={20} />
          </div>

          <button
            onClick={() => {
              setEditingNote(null);
              setIsModalOpen(true);
            }}
            className="neon-button whitespace-nowrap"
          >
            + Create Note
          </button>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <EmptyNotes onAdd={() => setIsModalOpen(true)} />
      ) : (
        <NotesGrid
          notes={filteredNotes}
          onEdit={(note) => {
            setEditingNote(note);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <AddNoteModal
        isOpen={isModalOpen}
        initialData={editingNote}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}

export default Todo;
