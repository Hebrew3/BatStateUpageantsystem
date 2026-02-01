import { Button } from "@/components/ui/button";

export function ViewJudgeModal({ isOpen, onClose, judge }) {
  if (!isOpen || !judge) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Judge Details</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-700/90 flex items-center justify-center text-2xl font-bold text-white text-shadow-2xs shadow-2xs">
              {judge.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{judge.username}</h3>
              <span className="inline-block px-3 py-1 bg-red-700/80 rounded-full text-xs font-bold mt-1 text-white">
                Judge
              </span>
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Username</span>
              <span className="font-medium">{judge.username}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Account Created</span>
              <span className="font-medium">
                {judge.createdAt ? new Date(judge.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              className="flex-1 font-black shadow-2xs btn-3d-red"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

