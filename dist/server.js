// server/server.ts
import express4 from "express";
import * as Path2 from "node:path";
import * as URL2 from "node:url";

// server/routes/tasks.ts
import express from "express";
var router = express.Router();
var tasks_default = router;

// server/routes/clients.ts
import express2 from "express";

// server/db/knexfile.js
import * as Path from "node:path";
import * as URL from "node:url";
var __filename = URL.fileURLToPath(import.meta.url);
var __dirname = Path.dirname(__filename);
var knexfile_default = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: Path.join(__dirname, "dev.sqlite3")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  },
  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: ":memory:"
    },
    migrations: {
      directory: Path.join(__dirname, "migrations")
    },
    seeds: {
      directory: Path.join(__dirname, "seeds")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: "/app/storage/dev.sqlite3"
    },
    useNullAsDefault: true
  }
};

// server/db/connection.ts
import knex from "knex";
var environment = process.env.NODE_ENV || "development";
var config = knexfile_default[environment];
var connection = knex(config);
var connection_default = connection;

// server/db/users.ts
async function getUser(id) {
  return connection_default("users").select("username", "name", "email", "is_admin").where("id", id).first();
}
async function getAdminClients(authId) {
  try {
    return await connection_default("tasks").join("users", "tasks.user_id", "users.id").select().where("tasks.admin_id", authId);
  } catch (error) {
    return Promise.reject(new Error(error));
  }
}
async function upsertUser(newUser) {
  try {
    const result = await connection_default("users").insert({
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      is_admin: newUser.isAdmin
    }).returning("*").onConflict("id").merge();
    return result[0];
  } catch (error) {
    return Promise.reject(new Error(error));
  }
}

// server/db/getTasks.ts
async function getTasks(auth0id) {
  return connection_default("tasks as t").where("t.user_id", auth0id).join("task_options as o", "t.task_option_id", "o.id").select(
    "t.id",
    "is_complete as isComplete",
    "o.id as option_id",
    "o.name",
    "t.date"
  ).orderBy("t.date", "desc");
}
async function getAdminClientTasks(adminId, clientUsername) {
  return await connection_default("tasks").join("users", "tasks.user_id", "users.id").join("task_options", "task_options.id", "tasks.task_option_id").where("tasks.admin_id", adminId).where("users.username", clientUsername).select(
    "tasks.id as id",
    "tasks.user_id as clientId",
    "tasks.admin_id as adminId",
    "tasks.task_option_id as taskId",
    "tasks.data as data",
    "tasks.is_complete as isComplete",
    "tasks.date as date",
    "users.username as clientUsername",
    "users.name as clientName",
    "users.email as clientEmail",
    "task_options.name as taskName"
  ).orderBy("tasks.date", "desc");
}
async function getAllClientsStats(adminId, clientId) {
  return await connection_default("tasks").join("users", "tasks.user_id", "users.id").join("task_options", "task_options.id", "tasks.task_option_id").where("tasks.admin_id", adminId).where("users.id", clientId).select(
    "tasks.id as id",
    "tasks.user_id as clientId",
    "tasks.is_complete as isComplete",
    "tasks.date as date",
    "users.name as clientName",
    "task_options.name as taskName"
  ).orderBy("tasks.date", "desc");
}
async function getClientStatsTasks(clientId) {
  return await connection_default("tasks").join("users", "tasks.user_id", "users.id").join("task_options", "task_options.id", "tasks.task_option_id").where("tasks.user_id", clientId).select(
    "tasks.id as id",
    "tasks.user_id as clientId",
    "tasks.is_complete as isComplete",
    "tasks.date as date",
    "users.name as clientName",
    "task_options.name as taskName"
  ).orderBy("tasks.date", "desc");
}

// server/auth0.ts
import { auth } from "express-oauth2-jwt-bearer";
import * as jose from "jose";
import dotenv from "dotenv";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  const envConfig = dotenv.config();
  if (envConfig.error)
    throw envConfig.error;
}
var oidcConfig = {
  authorizationParams: {
    response_type: "code",
    scope: "openid profile email create:orders update:users",
    audience: process.env.VITE_AUTH0_AUDIENCE
  },
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: process.env.VITE_AUTH0_CLIENT_ID,
  clientSecret: process.env.VITE_AUTH0_CLIENT_SECRET,
  issuerBaseURL: `https://${process.env.VITE_AUTH0_DOMAIN}`,
  secret: "LONG_RANDOM_STRING",
  routes: {
    login: false,
    postLogoutRedirect: "/moderator/home"
  }
};
var authConfig = {
  issuerBaseURL: `https://${process.env.VITE_AUTH0_DOMAIN}`,
  audience: process.env.VITE_AUTH0_AUDIENCE
};
var validateAccessToken = auth(authConfig);

// types/User.ts
import * as z from "zod";
var userDraftSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string()
});
var userSchema = userDraftSchema.extend({
  id: z.string(),
  isAdmin: z.boolean()
});

// server/logger.ts
function logError(message) {
  console.error(message);
}

// server/db/taskComplete.ts
async function taskComplete(done, task_id) {
  return connection_default("tasks").where("id", task_id).update("is_complete", done);
}

// server/routes/clients.ts
var router2 = express2.Router();
router2.get("/", validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub;
  if (!auth0Id) {
    res.status(400).json({ message: "Please provide an id" });
    return;
  }
  try {
    const result = await getUser(auth0Id);
    if (!result) {
      return res.status(404).send("Not found");
    } else {
      return res.json(result);
    }
  } catch (error) {
    logError(error);
    return res.status(500).send("Something went wrong");
  }
});
router2.get("/tasks", validateAccessToken, async (req, res) => {
  const auth0id = req.auth?.payload.sub;
  if (!auth0id) {
    res.status(400).json({ message: "Please provide a valid id" });
    return;
  }
  try {
    const result = await getTasks(auth0id);
    if (!auth0id) {
      res.status(404).send("Not found");
    } else {
      return res.json(result);
    }
  } catch (error) {
    logError(error);
    return res.status(500).send("Something went wrong");
  }
});
router2.get("/stats", validateAccessToken, async (req, res) => {
  const auth0id = req.auth?.payload.sub;
  if (!auth0id) {
    res.status(400).json({ message: "Please provide a valid id" });
    return;
  }
  try {
    const result = await getClientStatsTasks(auth0id);
    if (!auth0id) {
      res.status(404).send("Not found");
    } else {
      return res.json(result);
    }
  } catch (error) {
    logError(error);
    return res.status(500).send("Something went wrong");
  }
});
router2.post("/edit", validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub;
  const form = req.body;
  if (!auth0Id) {
    return res.status(400).json({ message: "Missing auth0 id" });
  }
  if (!form) {
    return res.status(400).json({ message: "Please provide a form" });
  }
  try {
    const userResult = userDraftSchema.safeParse(form);
    if (userResult.success) {
      const user = { ...userResult.data, id: auth0Id, isAdmin: false };
      const result = await upsertUser(user);
      return res.status(201).send(result);
    } else {
      return res.status(400).json({ message: "Invalid form" });
    }
  } catch (error) {
    logError(error);
    return res.status(500).send("Something went wrong");
  }
});
router2.patch("/tasks", validateAccessToken, async (req, res) => {
  const form = req.body;
  if (!form) {
    return res.status(400).json({ message: "Please provide a form" });
  }
  const { done, task_id } = form;
  try {
    await taskComplete(done, task_id);
    res.sendStatus(204);
  } catch (error) {
    logError(error);
    return res.status(500).send("Something went wrong");
  }
});
var clients_default = router2;

// server/routes/admins.ts
import express3 from "express";

// types/Task.ts
import * as z2 from "zod";
var taskDataSchema = z2.object({
  taskOptionId: z2.number(),
  data: z2.string(),
  isComplete: z2.boolean(),
  date: z2.string()
});
var taskDraftSchema = taskDataSchema.extend({
  userId: z2.string(),
  adminId: z2.string()
});
var taskSchema = taskDraftSchema.extend({
  id: z2.number()
});

// server/db/tasks.ts
async function insertTask(task) {
  try {
    const result = await connection_default("tasks").insert({
      user_id: task.userId,
      admin_id: task.adminId,
      task_option_id: task.taskOptionId,
      data: task.data,
      is_complete: task.isComplete,
      date: task.date
    }).returning([
      "id",
      "user_id as userId",
      "admin_id as adminId",
      "task_option_id as taskOptionId",
      "data",
      "is_complete as isComplete",
      "date"
    ]);
    return result[0];
  } catch (error) {
    return Promise.reject(new Error(error));
  }
}
async function deleteTask(id, adminId) {
  try {
    return connection_default("tasks").where("id", id).where("admin_id", adminId).del();
  } catch (error) {
    return Promise.reject(new Error(error));
  }
}

// server/routes/admins.ts
var router3 = express3.Router();
router3.get("/clientlist", validateAccessToken, async (req, res) => {
  const auth0id = req.auth?.payload.sub;
  if (!auth0id) {
    res.status(400).json({ message: "Please login with your admin Id" });
    return;
  }
  try {
    const clients = await getAdminClients(auth0id);
    res.status(200).json(clients);
  } catch (error) {
    logError(error);
    res.status(500).json({ message: "Unable to retrieve clients" });
  }
});
router3.get("/:clientUsername/tasks", validateAccessToken, async (req, res) => {
  const adminId = req.auth?.payload.sub;
  const clientUsername = req.params.clientUsername;
  if (!adminId) {
    res.status(400).json({ message: "Please login with your admin Id" });
    return;
  }
  try {
    const adminClientTasks = await getAdminClientTasks(adminId, clientUsername);
    if (adminClientTasks.length === 0) {
      return res.status(404).send("Not found");
    } else {
      return res.status(200).json(adminClientTasks);
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ message: "Unable to retrieve client tasks" });
  }
});
router3.get("/:clientId/stats", validateAccessToken, async (req, res) => {
  const adminId = req.auth?.payload.sub;
  const clientId = req.params.clientId;
  if (!adminId) {
    res.status(400).json({ message: "Please login with your admin Id" });
    return;
  }
  try {
    const adminClientStats = await getAllClientsStats(adminId, clientId);
    if (adminClientStats.length === 0) {
      return res.status(404).send("Not found");
    } else {
      return res.status(200).json(adminClientStats);
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ message: "Unable to retrieve client tasks" });
  }
});
router3.post("/:clientId/addTask", validateAccessToken, async (req, res) => {
  const adminId = req.auth?.payload.sub;
  const clientId = req.params.clientId;
  if (!adminId) {
    return res.status(400).json({ message: "Missing admin auth" });
  }
  if (!clientId) {
    return res.status(400).json({ message: "Missing client id" });
  }
  const form = { ...req.body, adminId, userId: clientId };
  if (!form) {
    return res.status(400).json({ message: "Missing form input" });
  }
  try {
    const formCheck = taskDraftSchema.safeParse(form);
    if (formCheck.success) {
      const task = {
        ...formCheck.data,
        task_option_id: formCheck.data.taskOptionId,
        is_complete: formCheck.data.isComplete
      };
      const result = await insertTask(task);
      return res.status(201).json(result);
    } else {
      console.error(formCheck.error);
      return res.status(400).json({ message: "Invalid form" });
    }
  } catch (error) {
    logError(error);
    return res.status(500).send("Something went wrong");
  }
});
router3.delete(
  "/:clientUsername/tasks/:id",
  validateAccessToken,
  async (req, res) => {
    const adminId = req.auth?.payload.sub;
    const id = Number(req.params.id);
    if (!adminId) {
      res.status(400).json({ message: "Please login with your admin Id" });
      return;
    }
    try {
      await deleteTask(id, adminId);
      res.sendStatus(200);
    } catch (error) {
      logError(error);
      res.status(500).json({ message: "Cannot delete task" });
    }
  }
);
var admins_default = router3;

// server/server.ts
var __filename2 = URL2.fileURLToPath(import.meta.url);
var __dirname2 = Path2.dirname(__filename2);
var server = express4();
server.use(express4.json());
server.use(express4.static(Path2.join(__dirname2, "public")));
server.use("/api/v1/tasks", tasks_default);
server.use("/api/v1/client", clients_default);
server.use("/api/v1/admin", admins_default);
if (process.env.NODE_ENV === "production") {
  server.use(express4.static(Path2.resolve("public")));
  server.use("/assets", express4.static(Path2.resolve("./dist/assets")));
  server.get("*", (req, res) => {
    res.sendFile(Path2.resolve("./dist/index.html"));
  });
}
var server_default = server;

// server/index.ts
var port = process.env.PORT || 3e3;
server_default.listen(port, () => {
  console.log("Server listening on port", port);
});
