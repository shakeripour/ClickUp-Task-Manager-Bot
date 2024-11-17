import fs from 'fs/promises';
const DATA_FILE = './userData.json';
let userData = {};

export async function loadUserData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        userData = JSON.parse(data);
    } catch (error) {
        console.error('Could not load user data. Initializing with empty data.');
        userData = {};
    }
}

export async function saveUserData() {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(userData, null, 2));
    } catch (error) {
        console.error('Could not save user data:', error.message);
    }
}

export function getUserData(chatId) {
    if (!userData[chatId]) {
        userData[chatId] = {
            apiToken: null,
            lastTeamId: null,
            lastSpaceId: null,
            lastFolderId: null,
            lastListId: null,
            lastListName: null,
            state: null,
            lists: [],
        };
    }
    return userData[chatId];
}

export function updateUser(chatId, updates) {
    if (!userData[chatId]) getUserData(chatId); // Initialize user data if not present
    userData[chatId] = { ...userData[chatId], ...updates };
    saveUserData(); // Persist changes
}

export function clearUserData(chatId) {
    delete userData[chatId];
    saveUserData();
}