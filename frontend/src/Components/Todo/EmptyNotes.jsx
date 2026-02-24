function EmptyNotes({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-6xl mb-4">📝</div>
      <h2 className="text-2xl font-semibold mb-2">
        No Notes Yet
      </h2>
      <button
        onClick={onAdd}
        className="neon-button"
      >
        Create Note
      </button>
    </div>
  );
}

export default EmptyNotes;
