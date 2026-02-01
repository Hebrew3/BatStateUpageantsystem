export function SegmentList({ segments, onEdit, onDelete, onView }) {
  return (
    <div className="bg-card text-card-foreground border border-border shadow-2xs rounded-lg overflow-hidden">
      <div className="bg-red-700/90 shadow-2xs px-4 py-3 border-b border-border">
        <h5 className="text-white text-shadow-2xs font-bold">Segments</h5>
      </div>
      <div className="divide-y divide-border">
        {segments.length === 0 ? (
          <div className="px-4 py-8 text-center text-muted-foreground text-sm">
            No segments created yet
          </div>
        ) : (
          segments.map((segment) => (
            <div
              key={segment.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-red-700/90 flex items-center justify-center text-sm font-medium text-white text-shadow-2xs shadow-2xs">
                {segment.event.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 font-medium min-w-0">
                <span className="truncate block">{segment.event}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onView && onView(segment)}
                  className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-blue-600"
                  title="View segment"
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
                  onClick={() => onEdit(segment)}
                  className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-blue-600"
                  title="Edit segment"
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
                  onClick={() => onDelete(segment)}
                  className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-destructive"
                  title="Delete segment"
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

