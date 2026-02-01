import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function SegmentModal({ isOpen, onClose, onSubmit, segment = null, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    event: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (segment) {
      setFormData({
        event: segment.event || "",
      });
    } else {
      setFormData({
        event: "",
      });
    }
    setErrors({});
  }, [segment, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.event.trim()) {
      newErrors.event = "Event name is required";
    } else if (formData.event.trim().length < 2) {
      newErrors.event = "Event name must be at least 2 characters";
    } else if (formData.event.trim().length > 255) {
      newErrors.event = "Event name must be less than 255 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        event: formData.event.trim(),
      });
    }
  };

  const isEditing = !!segment;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-semibold mb-2">
          {isEditing ? "Edit Segment" : "Add New Segment"}
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          {isEditing
            ? "Update segment/event information"
            : "Create a new segment/event for the pageant competition"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="event" className="text-sm font-medium">
              Event Name <span className="text-destructive">*</span>
            </label>
            <input
              id="event"
              type="text"
              value={formData.event}
              onChange={(e) =>
                setFormData({ ...formData, event: e.target.value })
              }
              placeholder="ex. Formal Wear, Uniform, Swimwear..."
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm  focus-visible:outline-none ${
                errors.event
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : "border-input"
              }`}
            />
            {errors.event && (
              <p className="text-destructive text-xs">{errors.event}</p>
            )}
            {!errors.event && (
              <p className="text-muted-foreground text-xs">
                Name of the segment or category
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 font-black shadow-2xs text-black/70 btn-3d-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 font-black shadow-2xs btn-3d-red"
            >
              {isSubmitting ? "Saving..." : isEditing ? "Update" : "Add Segment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

