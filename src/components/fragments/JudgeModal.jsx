import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function JudgeModal({ isOpen, onClose, onSubmit, judge = null, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (judge) {
      setFormData({
        username: judge.username || "",
        password: "",
      });
    } else {
      setFormData({
        username: "",
        password: "",
      });
    }
    setErrors({});
  }, [judge, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    if (!judge && !formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!judge && formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        ...(formData.password && { password: formData.password }),
      });
    }
  };

  const isEditing = !!judge;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-semibold mb-2">
          {isEditing ? "Edit Judge" : "Add New Judge"}
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          {isEditing
            ? "Update judge account information"
            : "Register a new judge for the pageant competition"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username <span className="text-destructive">*</span>
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Enter username (letters, numbers, underscore only)"
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                errors.username
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : "border-input"
              }`}
            />
            {errors.username && (
              <p className="text-destructive text-xs">{errors.username}</p>
            )}
            {!errors.username && (
              <p className="text-muted-foreground text-xs">Letters, numbers, and underscores only</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              {isEditing ? "New Password (leave blank to keep current)" : "Password"} <span className="text-destructive">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder={isEditing ? "Enter new password" : "Enter password"}
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                errors.password
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : "border-input"
              }`}
            />
            {errors.password && (
              <p className="text-destructive text-xs">{errors.password}</p>
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
              {isSubmitting ? "Saving..." : isEditing ? "Update" : "Add Judge"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

