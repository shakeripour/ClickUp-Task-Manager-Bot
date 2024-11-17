export function getHelpMessage() {
    return `
🤖 *ClickUp Task Manager Bot Help*

Welcome to the ClickUp Task Manager Bot! Here's how you can use this bot to manage your tasks efficiently:

---

### 📋 *Commands*

1. */menu* - Opens the main menu with all available options.
2. */settoken <API_TOKEN>* - Set your ClickUp API token to connect your workspace.
3. */createtask* - Start creating tasks in your selected list. You'll be prompted to input task details.
4. */currentlist* - View the currently selected list where your tasks are being created.
5. */help* - Display this help menu.

---

### 🔧 *Features*

- **Set API Token**: Connect your bot with ClickUp using an API token.
- **Fetch Teams and Lists**: Navigate through Teams → Spaces → Folders → Lists.
- **Create Tasks**: Add tasks with details like tags, priorities, and sprint points.
- **Current List**: Check or update the list where tasks are created.
- **Clear Data**: Reset your stored data (e.g., API token, selected list).

---
`;
}