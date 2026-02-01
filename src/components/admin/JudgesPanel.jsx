import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/shared/StatsCard";
import { JudgeList } from "@/components/fragments/JudgeList";
import { JudgeModal } from "@/components/fragments/JudgeModal";
import { ViewJudgeModal } from "@/components/fragments/ViewJudgeModal";
import { DeleteJudgeModal } from "@/components/fragments/DeleteJudgeModal";
import { userService } from "@/services/user.service";

export function JudgesPanel() {
  const [judges, setJudges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchJudges = async () => {
    try {
      setLoading(true);
      const judges = await userService.getJudges({ orderByDesc: true });
      setJudges(judges);
    } catch (err) {
      setError("Failed to load judges");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJudges();
  }, []);

  const totalCount = judges.length;

  const handleAddClick = () => {
    setSelectedJudge(null);
    setIsAddModalOpen(true);
  };

  const handleViewClick = (judge) => {
    setSelectedJudge(judge);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (judge) => {
    setSelectedJudge(judge);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (judge) => {
    setSelectedJudge(judge);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await userService.create({ ...data, role: "judge" });
      await fetchJudges();
      setIsAddModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to add judge");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await userService.update(selectedJudge.id, data);
      await fetchJudges();
      setIsEditModalOpen(false);
      setSelectedJudge(null);
    } catch (err) {
      setError(err.message || "Failed to update judge");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await userService.delete(selectedJudge.id);
      await fetchJudges();
      setIsDeleteModalOpen(false);
      setSelectedJudge(null);
    } catch (err) {
      setError(err.message || "Failed to delete judge");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h4 className="text-red-700/90 text-shadow-2xs tracking-tighter font-bold text-lg mb-1">Judges</h4>
            <p className="text-muted-foreground text-sm">
              Manage judges for the pageant competition
            </p>
          </div>
          <Button onClick={handleAddClick} className="btn-3d-red">
            + Add Judge
          </Button>
        </div>
      </div>

  <div className="flex bg-card text-card-foreground border border-border rounded-lg p-6 gap-6">
  <div className="justify-center w-32 h-26">
    <StatsCard
      number={loading ? "-" : totalCount}
      label="Total Judges"
    />
  </div>

  <div className="flex-1 min-w-0">
    {loading ? (
      <div className="py-8 text-center">
        <p className="text-muted-foreground text-sm">
          Loading judges...
        </p>
      </div>
    ) : (
      <JudgeList
        judges={judges}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    )}
  </div>
</div>



      <JudgeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
      />

      <JudgeModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedJudge(null);
        }}
        onSubmit={handleEditSubmit}
        judge={selectedJudge}
        isSubmitting={isSubmitting}
      />

      <ViewJudgeModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedJudge(null);
        }}
        judge={selectedJudge}
      />

      <DeleteJudgeModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedJudge(null);
        }}
        onConfirm={handleDeleteConfirm}
        judge={selectedJudge}
        isDeleting={isDeleting}
      />
    </div>
  );
}

