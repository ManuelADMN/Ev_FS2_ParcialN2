
import { servicesData, teamMembersData } from './geminiService';
import { authService } from './authService';

// ==========================================
// API CONFIGURATION
// ==========================================
// Change this to your real backend URL when ready
export const API_BASE_URL = "https://api.denoise.com/v1"; 

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  DATA: {
    PROJECTS: `${API_BASE_URL}/projects`,
    TEAM: `${API_BASE_URL}/team`,
    SENSORS: `${API_BASE_URL}/sensors`,
    SYSTEM_STATUS: `${API_BASE_URL}/system/status`,
  },
  ADMIN: {
    USERS: `${API_BASE_URL}/admin/users`,
  }
};

// ==========================================
// POSTMAN COLLECTION GENERATOR
// ==========================================
export const generatePostmanCollection = () => {
  const collection = {
    info: {
      name: "Denoise Platform API",
      description: "API Documentation for Denoise AI Platform. Includes Auth, Data Retrieval, and Admin Management.",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: [
      {
        name: "Auth",
        item: [
          {
            name: "Login",
            request: {
              method: "POST",
              header: [{ key: "Content-Type", value: "application/json" }],
              url: { raw: "{{baseUrl}}/auth/login", host: ["{{baseUrl}}"], path: ["auth", "login"] },
              body: {
                mode: "raw",
                raw: JSON.stringify({ email: "admin@denoise.com", password: "123" }, null, 2)
              }
            }
          },
          {
            name: "Register",
            request: {
              method: "POST",
              header: [{ key: "Content-Type", value: "application/json" }],
              url: { raw: "{{baseUrl}}/auth/register", host: ["{{baseUrl}}"], path: ["auth", "register"] },
              body: {
                mode: "raw",
                raw: JSON.stringify({ name: "New User", email: "new@denoise.com", password: "password123" }, null, 2)
              }
            }
          }
        ]
      },
      {
        name: "Public Data",
        item: [
          {
            name: "Get Projects (DenoQ/M/R)",
            request: {
              method: "GET",
              url: { raw: "{{baseUrl}}/projects", host: ["{{baseUrl}}"], path: ["projects"] }
            }
          },
          {
            name: "Get Team Members",
            request: {
              method: "GET",
              url: { raw: "{{baseUrl}}/team", host: ["{{baseUrl}}"], path: ["team"] }
            }
          }
        ]
      },
      {
        name: "Client Dashboard",
        item: [
          {
            name: "Get System Status",
            request: {
              method: "GET",
              header: [{ key: "Authorization", value: "Bearer {{token}}" }],
              url: { raw: "{{baseUrl}}/system/status", host: ["{{baseUrl}}"], path: ["system", "status"] }
            }
          },
          {
            name: "Get Live Sensors",
            request: {
              method: "GET",
              header: [{ key: "Authorization", value: "Bearer {{token}}" }],
              url: { raw: "{{baseUrl}}/sensors", host: ["{{baseUrl}}"], path: ["sensors"] }
            }
          }
        ]
      },
      {
        name: "Admin",
        item: [
          {
            name: "Get All Users",
            request: {
              method: "GET",
              header: [{ key: "Authorization", value: "Bearer {{token}}" }],
              url: { raw: "{{baseUrl}}/admin/users", host: ["{{baseUrl}}"], path: ["admin", "users"] }
            }
          },
          {
            name: "Create User",
            request: {
              method: "POST",
              header: [{ key: "Authorization", value: "Bearer {{token}}" }, { key: "Content-Type", value: "application/json" }],
              url: { raw: "{{baseUrl}}/admin/users", host: ["{{baseUrl}}"], path: ["admin", "users"] },
              body: {
                mode: "raw",
                raw: JSON.stringify({ name: "Staff Member", email: "staff@denoise.com", password: "123", role: "User", status: "Active" }, null, 2)
              }
            }
          },
          {
            name: "Delete User",
            request: {
              method: "DELETE",
              header: [{ key: "Authorization", value: "Bearer {{token}}" }],
              url: { raw: "{{baseUrl}}/admin/users/:id", host: ["{{baseUrl}}"], path: ["admin", "users", ":id"], variable: [{ key: "id", value: "1" }] }
            }
          }
        ]
      }
    ],
    variable: [
      {
        key: "baseUrl",
        value: "https://api.denoise.com/v1",
        type: "string"
      },
      {
        key: "token",
        value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        type: "string"
      }
    ]
  };

  return JSON.stringify(collection, null, 2);
};
