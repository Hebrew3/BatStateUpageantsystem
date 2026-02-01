import {
  createSegment,
  getAllSegments,
  getSegmentById,
  getSegmentByEvent,
  updateSegment,
  deleteSegment,
} from "@/repository/segmentRepository";

const validateEventName = (event) => {
  if (event !== undefined && event !== null) {
    if (typeof event !== "string" || event.trim().length < 2) {
      throw new Error("Event name must be at least 2 characters");
    }
    if (event.trim().length > 255) {
      throw new Error("Event name must be less than 255 characters");
    }
  }
};

export class SegmentError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "SegmentError";
    this.code = code;
  }
}

export const segmentService = {
  async create(data) {
    try {
      if (!data.event || !data.event.trim()) {
        throw new SegmentError("Event name is required", "INVALID_EVENT");
      }
      validateEventName(data.event);

      const trimmedEvent = data.event.trim();
      const existing = await getSegmentByEvent(trimmedEvent);
      if (existing) {
        throw new SegmentError(
          `Segment with event "${trimmedEvent}" already exists`,
          "DUPLICATE_EVENT"
        );
      }

      const segment = await createSegment({ event: trimmedEvent });
      return segment;
    } catch (error) {
      if (error instanceof SegmentError) {
        throw error;
      }
      throw new SegmentError(
        `Failed to create segment: ${error.message}`,
        "CREATE_FAILED"
      );
    }
  },

  async getAll(options = {}) {
    try {
      const segments = await getAllSegments(options);
      return segments || [];
    } catch (error) {
      throw new SegmentError(
        `Failed to fetch segments: ${error.message}`,
        "FETCH_FAILED"
      );
    }
  },

  async getById(id) {
    try {
      if (!id) {
        throw new SegmentError("Segment ID is required", "INVALID_ID");
      }

      const segment = await getSegmentById(id);
      if (!segment) {
        throw new SegmentError(`Segment with ID ${id} not found`, "NOT_FOUND");
      }
      return segment;
    } catch (error) {
      if (error instanceof SegmentError) {
        throw error;
      }
      throw new SegmentError(
        `Failed to fetch segment: ${error.message}`,
        "FETCH_FAILED"
      );
    }
  },

  async getByEvent(event) {
    try {
      if (!event) {
        throw new SegmentError("Event name is required", "INVALID_EVENT");
      }

      validateEventName(event);
      const segment = await getSegmentByEvent(event.trim());
      return segment || null;
    } catch (error) {
      if (error instanceof SegmentError) {
        throw error;
      }
      throw new SegmentError(
        `Failed to fetch segment by event: ${error.message}`,
        "FETCH_FAILED"
      );
    }
  },

  async update(id, data) {
    try {
      if (!id) {
        throw new SegmentError("Segment ID is required", "INVALID_ID");
      }

      if (data.event !== undefined) {
        validateEventName(data.event);
        const trimmedEvent = data.event.trim();
        if (trimmedEvent) {
          const existing = await getSegmentByEvent(trimmedEvent);
          if (existing && existing.id !== id) {
            throw new SegmentError(
              `Segment with event "${trimmedEvent}" already exists`,
              "DUPLICATE_EVENT"
            );
          }
        }
      }

      const updated = await updateSegment(id, {
        ...data,
        event: data.event ? data.event.trim() : undefined,
      });
      if (!updated) {
        throw new SegmentError(`Segment with ID ${id} not found`, "NOT_FOUND");
      }
      return updated;
    } catch (error) {
      if (error instanceof SegmentError) {
        throw error;
      }
      throw new SegmentError(
        `Failed to update segment: ${error.message}`,
        "UPDATE_FAILED"
      );
    }
  },

  async delete(id) {
    try {
      if (!id) {
        throw new SegmentError("Segment ID is required", "INVALID_ID");
      }

      const deleted = await deleteSegment(id);
      if (!deleted) {
        throw new SegmentError(`Segment with ID ${id} not found`, "NOT_FOUND");
      }
      return deleted;
    } catch (error) {
      if (error instanceof SegmentError) {
        throw error;
      }
      throw new SegmentError(
        `Failed to delete segment: ${error.message}`,
        "DELETE_FAILED"
      );
    }
  },
};

export { validateEventName };

