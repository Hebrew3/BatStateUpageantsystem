import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/shared/StatsCard";
import { ContestantList } from "@/components/fragments/ContestantList";
import { ContestantModal } from "@/components/fragments/ContestantModal";
import { ViewContestantModal } from "@/components/fragments/ViewContestantModal";
import { DeleteConfirmationModal } from "@/components/fragments/DeleteConfirmationModal";
import { participantService } from "@/services/participant.service";

export function ContestantsPanel() {
  const [contestants, setContestants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContestant, setSelectedContestant] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchContestants = async () => {
    try {
      setLoading(true);
      const allParticipants = await participantService.getAll({ orderByDesc: true });
      setContestants(allParticipants || []);
    } catch (err) {
      setError("Failed to load contestants");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContestants();
  }, []);

  const mrContestants = contestants.filter((c) => c.role === "MR");
  const msContestants = contestants.filter((c) => c.role === "MS");

  const totalCount = contestants.length;
  const mrCount = mrContestants.length;
  const msCount = msContestants.length;

  const handleAddClick = () => {
    setSelectedContestant(null);
    setIsAddModalOpen(true);
  };

  const handleViewClick = (contestant) => {
    setSelectedContestant(contestant);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (contestant) => {
    setSelectedContestant(contestant);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (contestant) => {
    setSelectedContestant(contestant);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await participantService.create(data);
      await fetchContestants();
      setIsAddModalOpen(false);
    } catch (err) {
      setError("Failed to add contestant");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await participantService.update(selectedContestant.id, data);
      await fetchContestants();
      setIsEditModalOpen(false);
      setSelectedContestant(null);
    } catch (err) {
      setError("Failed to update contestant");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await participantService.delete(selectedContestant.id);
      await fetchContestants();
      setIsDeleteModalOpen(false);
      setSelectedContestant(null);
    } catch (err) {
      setError("Failed to delete contestant");
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
            <h4 className="text-red-700/90 text-shadow-2xs tracking-tighter font-bold text-lg mb-1">Contestants</h4>
            <p className="text-muted-foreground text-sm">
              Register and manage contestants for the pageant competition
            </p>
          </div>
          <Button onClick={handleAddClick} className="btn-3d-red">
            + Add Contestant
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          number={loading ? "-" : totalCount}
          label="Total Contestants"
        />
        <StatsCard
          number={loading ? "-" : mrCount}
          label="Mr. BatStateU"
        />
        <StatsCard
          number={loading ? "-" : msCount}
          label="Ms. BatStateU"
        />
      </div>

      {loading ? (
        <div className="bg-card text-card-foreground border border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground text-sm">Loading contestants...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <ContestantList
            title="Mr. BatStateU"
            contestants={mrContestants}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
          <ContestantList
            title="Ms. BatStateU"
            contestants={msContestants}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>
      )}

      <ContestantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
      />

      <ContestantModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedContestant(null);
        }}
        onSubmit={handleEditSubmit}
        contestant={selectedContestant}
        isSubmitting={isSubmitting}
      />

      <ViewContestantModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedContestant(null);
        }}
        contestant={selectedContestant}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedContestant(null);
        }}
        onConfirm={handleDeleteConfirm}
        contestant={selectedContestant}
        isDeleting={isDeleting}
      />
    </div>
  );
}

