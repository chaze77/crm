import { Client, Account, Databases, Functions } from 'appwrite';

const VITE_ENDPOINT = import.meta.env.VITE_ENDPOINT;
const VITE_PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

const client = new Client();
client.setEndpoint(VITE_ENDPOINT).setProject(VITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const functions = new Functions(client);

export { client, account, databases, functions };
