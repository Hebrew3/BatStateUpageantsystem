import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, contestant, isDeleting }) {
  if (!isOpen || !contestant) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertTriangle className="size-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Delete Contestant</h2>
          <p className="text-muted-foreground">
            Are you sure you want to delete <strong>{contestant.fullname}</strong> from the competition?
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This action cannot be undone. All scores associated with this contestant will also be deleted.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 font-black shadow-2xs text-black/70 btn-3d-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 font-black shadow-2xs btn-3d-red"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}

