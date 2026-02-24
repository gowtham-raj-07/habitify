import { useEffect, useState } from "react";

function AddNoteModal({ isOpen, onClose, onSave, initialData }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    function a() {
      if (!isOpen) return;

      if (initialData) {
        setTitle(initialData.title || "");
        setContent(initialData.content || "");
      } else {
        setTitle("");
        setContent("");
      }

      setError("");
    }
    a();
  }, [isOpen, initialData]);

  function handleSubmit(e) {
    e.preventDefault();

    const t = title.trim();
    const c = content.trim();

    if (!t || !c) {
      setError("Title and content are required");
      return;
    }

    onSave({
      ...initialData,
      title: t,
      content: c,
      weight: t.length + c.length,
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <form onSubmit={handleSubmit} className="neon-card w-96 relative border border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
          {initialData ? "Edit Note" : "Create Note"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="neon-input mb-4 placeholder-gray-500 dark:placeholder-gray-400"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="neon-input min-h-[100px] mb-6 placeholder-gray-500 dark:placeholder-gray-400"
        />

        <div className="flex justify-between gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition">
            Cancel
          </button>

          <button type="submit" className="neon-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNoteModal;