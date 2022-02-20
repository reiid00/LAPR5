import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 10628,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:1b0519aef294543104baa612@vs628:27017/?authSource=admin&authMechanism=SCRAM-SHA-256&readPreference=primary&appname=mongodb-vscode%200.7.0&ssl=false",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    post: {
      name: "PostController",
      path: "../controllers/postController"
    },
    tag: {
      name: "TagController",
      path: "../controllers/tagController"
    },
    comentario: {
      name: "ComentarioController",
      path: "../controllers/comentarioController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    post: {
      name: "PostRepo",
      path: "../repos/postRepo"
    },
    tag: {
      name: "TagRepo",
      path: "../repos/tagRepo"
    },
    comentario: {
      name: "ComentarioRepo",
      path: "../repos/comentarioRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    post: {
      name: "PostService",
      path: "../services/postService"
    },
    tag: {
      name: "TagService",
      path: "../services/tagService"
    },
    comentario: {
      name: "ComentarioService",
      path: "../services/comentarioService"
    }
  },
};
