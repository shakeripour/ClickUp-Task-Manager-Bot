const priorityMap = {
    urgent: 1,
    high: 2,
    normal: 3,
    low: 4,
};

const TechCategoryID = '189f5936-c11c-49b7-a8ea-1e1adb970365';

// Mapping Tech Category labels to option IDs
const techCategoryMap = {
    'front': 'bfa1e5b4-66fc-43d5-b6b3-a29936b4f7d1',
    'back': 'adfaeb52-e244-49a1-8244-a909c3f92236',
    'product': '3971d9c3-581a-4ac1-a2a9-2e67f47739b0',
    'devops': '6bfdb348-5a03-4009-ba97-0314a54a9f74',
    'design': 'a1b67c8a-1d58-433f-85a5-445161eb9f4a',
    'wordpress': '24cf18c1-9984-4be3-b507-4d7eb0523cb5'
};

export function parseTaskInput(input) {
    const lines = input.split('\n').map(line => line.trim());
    const title = lines.shift(); // First line is the title
    let description = '';
    let tags = [];
    let priority = null;
    let sprintPoints = null;
    let techCategories = [];
    const customFields = [];
    const invalidCategories = [];

    lines.forEach(line => {
        if (line.startsWith('tags:')) {
            tags = line.slice(5).split(',').map(tag => tag.trim());
        } else if (line.startsWith('pr:')) {
            const prValue = line.slice(3).trim().toLowerCase();
            priority = priorityMap[prValue] || parseInt(prValue, 10);
        } else if (line.startsWith('sp:')) {
            sprintPoints = parseInt(line.slice(3).trim(), 10);
        } else if (line.startsWith('tc:')) {
            const categories = line.slice(3).split(',').map(tc => tc.trim().toLowerCase());
            techCategories = categories.map(category => {
                if (techCategoryMap[category]) {
                    return techCategoryMap[category];
                } else {
                    invalidCategories.push(category);
                    return null;
                }
            }).filter(Boolean);
        } else {
            description += (description ? '\n' : '') + line;
        }
    });

    if (techCategories.length) customFields.push({ id: TechCategoryID, value: techCategories });

    return { title, description, tags, priority, sprintPoints, customFields, invalidCategories };
}