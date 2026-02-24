function NotesGrid({ notes, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => {
        const weight = note.content.trim().length;

        return (
          <div
            key={note._id}
            className="neon-card flex flex-col justify-between hover:scale-[1.02] active:scale-[0.98] cursor-default"
          >
            <div>
              <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white border-b border-cyan-400/20 pb-2">
                {note.title || "Untitled"}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {note.content}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800/50">
              <div className="flex gap-4 text-xs text-gray-400">
                <span title="Character count">Weight: {weight}</span>
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(note)}
                  className="p-1.5 rounded-md hover:bg-cyan-400/10 text-gray-400 hover:text-cyan-400 transition"
                  title="Edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(note._id)}
                  className="p-1.5 rounded-md hover:bg-red-400/10 text-gray-400 hover:text-red-400 transition"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NotesGrid;