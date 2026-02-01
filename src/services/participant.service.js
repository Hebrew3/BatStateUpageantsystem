import {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  getParticipantByNumber,
  getParticipantsByRole,
  updateParticipant,
  deleteParticipant,
} from "@/repository/participantRepository";

const VALID_ROLES = ["MR", "MS"];

const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter((field) => {
    const value = data[field];
    return value === undefined || value === null || value === "";
  });
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }
};

const validateRole = (role) => {
  if (role && !VALID_ROLES.includes(role)) {
    throw new Error(`Invalid role. Must be one of: ${VALID_ROLES.join(", ")}`);
  }
};

const validateNumber = (number) => {
  if (number !== undefined && number !== null) {
    if (!Number.isInteger(number) || number <= 0) {
      throw new Error("Participant number must be a positive integer");
    }
  }
};

export class ParticipantError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "ParticipantError";
    this.code = code;
  }
}

export const participantService = {
  async create(data) {
    try {
      validateRequiredFields(data, ["number", "fullname"]);
      validateRole(data.role);
      validateNumber(data.number);

      const existing = await getParticipantByNumber(data.number);
      if (existing) {
        throw new ParticipantError(
          `Participant with number ${data.number} already exists`,
          "DUPLICATE_NUMBER"
        );
      }

      const participant = await createParticipant(data);
      return participant;
    } catch (error) {
      if (error instanceof ParticipantError) {
        throw error;
      }
      throw new ParticipantError(
        `Failed to create participant: ${error.message}`,
        "CREATE_FAILED"
      );
    }
  },

  async getAll(options = {}) {
    try {
      const participants = await getAllParticipants(options);
      return participants || [];
    } catch (error) {
      throw new ParticipantError(
        `Failed to fetch participants: ${error.message}`,
        "FETCH_FAILED"
      );
    }
  },

  async getById(id) {
    try {
      if (!id) {
        throw new ParticipantError("Participant ID is required", "INVALID_ID");
      }

      const participant = await getParticipantById(id);
      if (!participant) {
        throw new ParticipantError(`Participant with ID ${id} not found`, "NOT_FOUND");
      }
      return participant;
    } catch (error) {
      if (error instanceof ParticipantError) {
        throw error;
      }
      throw new ParticipantError(
        `Failed to fetch participant: ${error.message}`,
        "FETCH_FAILED"
      );
    }
  },

  async getByNumber(number) {
    try {
      if (number === undefined || number === null) {
        throw new ParticipantError("Participant number is required", "INVALID_NUMBER");
      }

      validateNumber(number);
      const participant = await getParticipantByNumber(number);
      return participant || null;
    } catch (error) {
      if (error instanceof ParticipantError) {
        throw error;
      }
      throw new ParticipantError(
        `Failed to fetch participant by number: ${error.message}`,
        "FETCH_FAILED"
      );
    }
  },

  async getByRole(role) {
    try {
      if (!role) {
        throw new ParticipantError("Role is required", "INVALID_ROLE");
      }

      validateRole(role);
      const participants = await getParticipantsByRole(role);
      return participants || [];
    } catch (error) {
      if (error instanceof ParticipantError) {
        throw error;
      }
      throw new ParticipantError(
        `Failed to fetch participants by role: ${error.message}`,
        "FETCH_FAILED"
      );
    }
  },

  async update(id, data) {
    try {
      if (!id) {
        throw new ParticipantError("Participant ID is required", "INVALID_ID");
      }

      if (data.role !== undefined) {
        validateRole(data.role);
      }
      if (data.number !== undefined) {
        validateNumber(data.number);
      }

      if (data.number) {
        const existing = await getParticipantByNumber(data.number);
        if (existing && existing.id !== id) {
          throw new ParticipantError(
            `Participant with number ${data.number} already exists`,
            "DUPLICATE_NUMBER"
          );
        }
      }

      const updated = await updateParticipant(id, data);
      if (!updated) {
        throw new ParticipantError(`Participant with ID ${id} not found`, "NOT_FOUND");
      }
      return updated;
    } catch (error) {
      if (error instanceof ParticipantError) {
        throw error;
      }
      throw new ParticipantError(
        `Failed to update participant: ${error.message}`,
        "UPDATE_FAILED"
      );
    }
  },

  async delete(id) {
    try {
      if (!id) {
        throw new ParticipantError("Participant ID is required", "INVALID_ID");
      }

      const deleted = await deleteParticipant(id);
      if (!deleted) {
        throw new ParticipantError(`Participant with ID ${id} not found`, "NOT_FOUND");
      }
      return deleted;
    } catch (error) {
      if (error instanceof ParticipantError) {
        throw error;
      }
      throw new ParticipantError(
        `Failed to delete participant: ${error.message}`,
        "DELETE_FAILED"
      );
    }
  },

  async getStats() {
    try {
      const all = await getAllParticipants();
      const participants = all || [];
      const mr = participants.filter((c) => c.role === "MR");
      const ms = participants.filter((c) => c.role === "MS");
      return {
        total: participants.length,
        mrCount: mr.length,
        msCount: ms.length,
      };
    } catch (error) {
      throw new ParticipantError(
        `Failed to fetch stats: ${error.message}`,
        "STATS_FAILED"
      );
    }
  },
};

export { validateRequiredFields, validateRole, validateNumber, VALID_ROLES };

