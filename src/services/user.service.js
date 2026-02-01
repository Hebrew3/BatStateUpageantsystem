import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
} from "@/repository/userRepository";

const VALID_ROLES = ["judge", "organizer"];

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

const validateUsername = (username) => {
  if (username !== undefined && username !== null) {
    if (typeof username !== "string" || username.length < 3) {
      throw new Error("Username must be at least 3 characters");
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new Error("Username can only contain letters, numbers, and underscores");
    }
  }
};

const validatePassword = (password, isRequired = false) => {
  if (isRequired && (!password || password.length < 4)) {
    throw new Error("Password must be at least 4 characters");
  }
};

export class UserError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "UserError";
    this.code = code;
  }
}

export const userService = {
  async create(data) {
    try {
      validateRequiredFields(data, ["username", "password"]);
      validateUsername(data.username);
      validateRole(data.role);
      validatePassword(data.password, true);

      const existing = await getUserByUsername(data.username);
      if (existing) {
        throw new UserError(
          `User with username "${data.username}" already exists`,
          "DUPLICATE_USERNAME"
        );
      }

      const user = await createUser(data);
      return user;
    } catch (error) {
      if (error instanceof UserError) {
        throw error;
      }
      throw new UserError(
        `Failed to create user: ${error.message}`,
        "CREATE_FAILED"
      );
    }
  },

  async getAll(options = {}) {
    try {
      const users = await getAllUsers(options);
      return users || [];
    } catch (error) {
      throw new UserError(
        `Failed to fetch users: ${error.message}`,
        "FETCH_FAILED"
      );
    }
  },

  async getJudges(options = {}) {
    try {
      const allUsers = await getAllUsers(options);
      const judges = (allUsers || []).filter((u) => u.role === "judge");
      return judges;
    } catch (error) {
      throw new UserError(
        `Failed to fetch judges: ${error.message}`,
        "FETCH_FAILED"
      );
    }
  },

  async getById(id) {
    try {
      if (!id) {
        throw new UserError("User ID is required", "INVALID_ID");
      }

      const user = await getUserById(id);
      if (!user) {
        throw new UserError(`User with ID ${id} not found`, "NOT_FOUND");
      }
      return user;
    } catch (error) {
      if (error instanceof UserError) {
        throw error;
      }
      throw new UserError(
        `Failed to fetch user: ${error.message}`,
        "FETCH_FAILED"
      );
    }
  },

  async getByUsername(username) {
    try {
      if (!username) {
        throw new UserError("Username is required", "INVALID_USERNAME");
      }

      validateUsername(username);
      const user = await getUserByUsername(username);
      return user || null;
    } catch (error) {
      if (error instanceof UserError) {
        throw error;
      }
      throw new UserError(
        `Failed to fetch user by username: ${error.message}`,
        "FETCH_FAILED"
      );
    }
  },

  async update(id, data) {
    try {
      if (!id) {
        throw new UserError("User ID is required", "INVALID_ID");
      }

      if (data.role !== undefined) {
        validateRole(data.role);
      }
      if (data.username !== undefined) {
        validateUsername(data.username);
      }
      if (data.password !== undefined) {
        validatePassword(data.password, data.password.length > 0);
      }

      if (data.username) {
        const existing = await getUserByUsername(data.username);
        if (existing && existing.id !== id) {
          throw new UserError(
            `User with username "${data.username}" already exists`,
            "DUPLICATE_USERNAME"
          );
        }
      }

      const updated = await updateUser(id, data);
      if (!updated) {
        throw new UserError(`User with ID ${id} not found`, "NOT_FOUND");
      }
      return updated;
    } catch (error) {
      if (error instanceof UserError) {
        throw error;
      }
      throw new UserError(
        `Failed to update user: ${error.message}`,
        "UPDATE_FAILED"
      );
    }
  },

  async delete(id) {
    try {
      if (!id) {
        throw new UserError("User ID is required", "INVALID_ID");
      }

      const deleted = await deleteUser(id);
      if (!deleted) {
        throw new UserError(`User with ID ${id} not found`, "NOT_FOUND");
      }
      return deleted;
    } catch (error) {
      if (error instanceof UserError) {
        throw error;
      }
      throw new UserError(
        `Failed to delete user: ${error.message}`,
        "DELETE_FAILED"
      );
    }
  },

  async getStats() {
    try {
      const all = await getAllUsers();
      const users = all || [];
      const judges = users.filter((u) => u.role === "judge");
      const organizers = users.filter((u) => u.role === "organizer");
      return {
        total: users.length,
        judgeCount: judges.length,
        headJudgeCount: headJudges.length,
        organizerCount: organizers.length,
      };
    } catch (error) {
      throw new UserError(
        `Failed to fetch stats: ${error.message}`,
        "STATS_FAILED"
      );
    }
  },
};

export { validateRequiredFields, validateRole, validateUsername, validatePassword, VALID_ROLES };

