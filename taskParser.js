const priorityMap = {
    urgent: 1,
    high: 2,
    normal: 3,
    low: 4,
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

    lines.forEach(line => {
        if (line.startsWith('tags:')) {
            tags = line.slice(5).split(',').map(tag => tag.trim());
        } else if (line.startsWith('pr:')) {
            const prValue = line.slice(3).trim().toLowerCase();
            priority = priorityMap[prValue] || parseInt(prValue, 10);
        } else if (line.startsWith('sp:')) {
            sprintPoints = parseInt(line.slice(3).trim(), 10);
        } else if (line.startsWith('tc:')) {
            techCategories = line.slice(3).split(',').map(tc => tc.trim());
        } else {
            description += (description ? '\n' : '') + line;
        }
    });

    // Include custom fields like sprint points and tech categories
    if (sprintPoints !== null) customFields.push({ id: 'sprint_points_custom_field_id', value: sprintPoints });
    if (techCategories.length) customFields.push({ id: 'tech_category_custom_field_id', value: techCategories });

    return { title, description, tags, priority, customFields };
}