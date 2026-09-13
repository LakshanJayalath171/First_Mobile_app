import { Client } from "appwrite";

const endpoint =
  process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ??
  "https://fra.cloud.appwrite.io/v1";
const projectId =
  process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "6aa66d0100299ebc945f";

export const appwriteClient = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);
