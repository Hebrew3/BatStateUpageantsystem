import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function ContestantModal({ isOpen, onClose, onSubmit, contestant = null, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    fullname: "",
    number: "",
    role: "MR",
    note: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contestant) {
      setFormData({
        fullname: contestant.fullname || "",
        number: contestant.number || "",
        role: contestant.role || "MR",
        note: contestant.note || "",
      });
    } else {
      setFormData({
        fullname: "",
        number: "",
        role: "MR",
        note: "",
      });
    }
    setErrors({});
  }, [contestant, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }
    if (!formData.number || formData.number === "") {
      newErrors.number = "Candidate number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        number: parseInt(formData.number) || formData.number,
      });
    }
  };

  const isEditing = !!contestant;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-semibold mb-2">
          {isEditing ? "Edit Contestant" : "Add New Contestant"}
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          {isEditing
            ? "Update contestant information"
            : "Register a new contestant for the pageant competition"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullname" className="text-sm font-medium">
              Full Name <span className="text-destructive">*</span>
            </label>
            <input
              id="fullname"
              type="text"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              placeholder="Enter full name"
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                errors.fullname
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : "border-input"
              }`}
            />
            {errors.fullname && (
              <p className="text-destructive text-xs">{errors.fullname}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="number" className="text-sm font-medium">
              Candidate Number <span className="text-destructive">*</span>
            </label>
            <input
              id="number"
              type="number"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
              placeholder="Enter candidate number"
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                errors.number
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : "border-input"
              }`}
            />
            {errors.number && (
              <p className="text-destructive text-xs">{errors.number}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Category <span className="text-destructive">*</span>
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="MR">Mr. BatStateU</option>
              <option value="MS">Ms. BatStateU</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="note" className="text-sm font-medium">
              Notes (optional)
            </label>
            <textarea
              id="note"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              placeholder="Enter any additional notes"
              rows={3}
              className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
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
              {isSubmitting ? "Saving..." : isEditing ? "Update" : "Add Contestant"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

