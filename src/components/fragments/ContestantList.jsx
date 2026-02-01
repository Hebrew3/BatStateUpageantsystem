export function ContestantList({ title, contestants, onView, onEdit, onDelete }) {
  return (
    <div className="bg-card text-card-foreground border border-border shadow-2xs rounded-lg overflow-hidden">
      <div className="bg-red-700/90 shadow-2xs px-4 py-3 border-b border-border">
        <h5 className="text-white text-shadow-2xs font-bold">{title}</h5>
      </div>
      <div className="divide-y divide-border">
        {contestants.length === 0 ? (
          <div className="px-4 py-8 text-center text-muted-foreground text-sm">
            No contestants registered yet
          </div>
        ) : (
          contestants.map((contestant) => (
            <div
              key={contestant.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-red-700/90 flex items-center justify-center text-sm font-medium text-white text-shadow-2xs shadow-2xs">
                {contestant.number}
              </div>
              <div className="flex-1 font-medium min-w-0">
                <span className="truncate block">{contestant.fullname}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onView(contestant)}
                  className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  title="View details"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
                <button
                  onClick={() => onEdit(contestant)}
                  className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-blue-600"
                  title="Edit contestant"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(contestant)}
                  className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-destructive"
                  title="Delete contestant"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

