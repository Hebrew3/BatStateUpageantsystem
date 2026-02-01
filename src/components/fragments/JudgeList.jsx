export function JudgeList({ judges, onEdit, onDelete }) {
  return (
    <div className="bg-card text-card-foreground border border-border shadow-2xs rounded-lg overflow-hidden">
      <div className="bg-red-700/90 shadow-2xs px-4 py-3 border-b border-border">
        <h5 className="text-white text-shadow-2xs font-bold">Judges</h5>
      </div>
      <div className="divide-y divide-border">
        {judges.length === 0 ? (
          <div className="px-4 py-8 text-center text-muted-foreground text-sm">
            No judges registered yet
          </div>
        ) : (
          judges.map((judge) => (
            <div
              key={judge.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-red-700/90 flex items-center justify-center text-sm font-medium text-white text-shadow-2xs shadow-2xs">
                {judge.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 font-medium min-w-0">
                <span className="truncate block">{judge.username}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit(judge)}
                  className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-blue-600"
                  title="Edit judge"
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
                  onClick={() => onDelete(judge)}
                  className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-destructive"
                  title="Delete judge"
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

