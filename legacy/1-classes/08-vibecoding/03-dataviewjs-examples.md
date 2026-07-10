# Module 3: DataviewJS Examples for Vibecoding in Obsidian

## Introduction to DataviewJS in Vibecoding Context

DataviewJS allows for dynamic querying and visualization of your Obsidian notes, making it perfect for tracking vibecoding experiments, audiovisual projects, and creative processes. This module provides practical examples of how to use DataviewJS to manage and visualize your vibecoding journey.

## Basic Audio Project Tracking

### Simple Project Dashboard
```dataviewjs
// Create a dashboard for all audio projects
let projects = dv.pages('#audio-project').sort(p => p.created_date || p.file.ctime, 'desc');

dv.header(2, "Audio Project Dashboard");

// Summary statistics
dv.paragraph(`**Total Projects:** ${projects.length}`);
dv.paragraph(`**Completed:** ${projects.filter(p => p.status === 'completed').length}`);
dv.paragraph(`**In Progress:** ${projects.filter(p => p.status === 'in-progress').length}`);
dv.paragraph(`**Planning:** ${projects.filter(p => p.status === 'planning').length}`);

// Detailed list
dv.header(3, "Recent Projects");
for (let project of projects.slice(0, 5)) {
    let status = project.status || 'planning';
    let statusColor = status === 'completed' ? 'green' : 
                     status === 'in-progress' ? 'orange' : 'gray';
    
    dv.el("div", 
        `- **${project.file.link}** - <span style="color:${statusColor}">${status}</span>` +
        (project.difficulty ? ` - Difficulty: ${project.difficulty}` : '') +
        (project.hours_spent ? ` - Hours: ${project.hours_spent}` : ''),
        { cls: "project-item" }
    );
}
```

### Audio Experiment Timeline
```dataviewjs
// Visual timeline of audio experiments
let experiments = dv.pages('#audio-experiment')
    .filter(p => p.date)
    .sort(p => p.date, 'asc');

dv.header(2, "Audio Experiment Timeline");

let container = dv.el("div", "", { cls: "timeline-container" });
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "flex-start";

for (let exp of experiments) {
    let dateStr = exp.date ? exp.date.toISOString().split('T')[0] : 'No date';
    let status = exp.status || 'unknown';
    let statusColor = status === 'success' ? 'green' : 
                     status === 'failure' ? 'red' : 'gray';
    
    let item = dv.el("div", "", { cls: "timeline-item" });
    item.style.marginBottom = "10px";
    item.style.paddingLeft = "20px";
    item.style.borderLeft = `3px solid ${statusColor}`;
    
    item.innerHTML = `
        <strong>${dateStr}</strong>: ${exp.file.link} 
        <span style="color:${statusColor}; font-size:0.9em;">(${status})</span>
        ${exp.notes ? `<br><small>${exp.notes}</small>` : ''}
    `;
    
    container.appendChild(item);
}
```

## Vibecoding Technique Explorer

### Technique Categories and Mastery Tracking
```dataviewjs
// Track mastery of different vibecoding techniques
let techniques = dv.pages('#vibecoding-technique');

dv.header(2, "Vibecoding Techniques Mastery");

// Create categories
let categories = {};
for (let tech of techniques) {
    let cat = tech.category || 'Uncategorized';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(tech);
}

// Display categorized techniques
for (let [category, techList] of Object.entries(categories)) {
    dv.header(3, category);
    
    for (let tech of techList) {
        let mastery = tech.mastery || 0;
        let masteryDisplay = '☆'.repeat(mastery) + '☆'.repeat(5 - mastery);
        let masteryPercent = (mastery / 5 * 100).toFixed(0);
        
        dv.el("div", 
            `- **${tech.file.link}** - Mastery: ${masteryDisplay} (${masteryPercent}%)` +
            (tech.difficulty ? ` - Difficulty: ${tech.difficulty}` : '') +
            (tech.last_practiced ? ` - Last practiced: ${tech.last_practiced}` : ''),
            { cls: "technique-item" }
        );
    }
}
```

### Practice Session Tracker
```dataviewjs
// Track practice sessions and progress
let sessions = dv.pages('#practice-session')
    .filter(p => p.date)
    .sort(p => p.date, 'desc');

dv.header(2, "Practice Sessions");

// Recent sessions table
dv.table(
    ["Date", "Duration", "Focus Area", "Outcome"],
    sessions.slice(0, 10).map(s => [
        s.date,
        s.duration ? `${s.duration} min` : 'N/A',
        s.focus_area || 'General',
        s.outcome || 'N/A'
    ])
);

// Weekly summary
let weeklyStats = {};
for (let session of sessions) {
    if (session.date) {
        let week = session.date.startOfWeek().toDateString();
        if (!weeklyStats[week]) weeklyStats[week] = { count: 0, totalDuration: 0 };
        weeklyStats[week].count++;
        weeklyStats[week].totalDuration += session.duration || 0;
    }
}

dv.header(3, "Weekly Practice Summary");
for (let [week, stats] of Object.entries(weeklyStats)) {
    dv.paragraph(`**${week}:** ${stats.count} sessions, ${stats.totalDuration} minutes total`);
}
```

## Audiovisual Project Portfolio

### Interactive Project Gallery
```dataviewjs
// Create an interactive gallery of audiovisual projects
let avProjects = dv.pages('#audiovisual-project')
    .filter(p => p.completed_date)
    .sort(p => p.completed_date, 'desc');

dv.header(2, "Audiovisual Project Gallery");

let galleryContainer = dv.el("div", "", { cls: "gallery-container" });
galleryContainer.style.display = "grid";
galleryContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
galleryContainer.style.gap = "20px";
galleryContainer.style.marginTop = "20px";

for (let project of avProjects) {
    let projectCard = dv.el("div", "", { cls: "project-card" });
    projectCard.style.border = "1px solid #ddd";
    projectCard.style.borderRadius = "8px";
    projectCard.style.padding = "15px";
    projectCard.style.backgroundColor = "#f9f9f9";
    
    let techUsed = project.tech_used ? Array.isArray(project.tech_used) ? project.tech_used : [project.tech_used] : [];
    let techBadges = techUsed.map(tech => `<span style="display:inline-block; background:#007acc; color:white; padding:2px 8px; border-radius:12px; margin:2px; font-size:0.8em;">${tech}</span>`).join('');
    
    projectCard.innerHTML = `
        <h4 style="margin-top:0;">${project.file.link}</h4>
        <p><strong>Status:</strong> ${project.status || 'N/A'}</p>
        <p><strong>Completion:</strong> ${project.completed_date || 'N/A'}</p>
        <p><strong>Difficulty:</strong> ${project.difficulty || 'N/A'}</p>
        <p><strong>Technologies:</strong></p>
        <div>${techBadges}</div>
        ${project.description ? `<p><em>${project.description}</em></p>` : ''}
    `;
    
    galleryContainer.appendChild(projectCard);
}
```

### Skill Progress Visualization
```dataviewjs
// Visualize progress in different skills over time
let skillRecords = dv.pages('#skill-record')
    .filter(p => p.skill && p.level && p.date)
    .sort(p => p.date, 'asc');

dv.header(2, "Skill Progress Visualization");

// Group by skill
let skillProgress = {};
for (let record of skillRecords) {
    let skill = record.skill;
    if (!skillProgress[skill]) skillProgress[skill] = [];
    skillProgress[skill].push(record);
}

// Create progress charts for each skill
for (let [skill, records] of Object.entries(skillProgress)) {
    dv.header(3, skill);
    
    // Create a simple text-based chart
    let chartContainer = dv.el("div", "", { cls: "progress-chart" });
    chartContainer.style.fontFamily = "monospace";
    chartContainer.style.whiteSpace = "pre";
    
    let maxValue = Math.max(...records.map(r => r.level));
    let minValue = Math.min(...records.map(r => r.level));
    let range = maxValue - minValue || 1;
    
    let chartLines = [];
    for (let record of records) {
        let normalizedValue = Math.round(((record.level - minValue) / range) * 20);
        let bars = '█'.repeat(normalizedValue) + '░'.repeat(20 - normalizedValue);
        let dateStr = record.date.toISOString().split('T')[0];
        chartLines.push(`${bars} ${record.level} (${dateStr})`);
    }
    
    chartContainer.innerHTML = chartLines.join('<br>');
    dv.el("div", chartContainer);
}
```

## Vibecoding Resource Library

### Curated Resource Collection
```dataviewjs
// Organize and display vibecoding resources
let resources = dv.pages('#resource')
    .filter(p => p.resource_type)
    .sort(p => p.rating ? -p.rating : 0); // Sort by rating, highest first

dv.header(2, "Vibecoding Resource Library");

// Categorize resources
let categorizedResources = {};
for (let res of resources) {
    let type = res.resource_type;
    if (!categorizedResources[type]) categorizedResources[type] = [];
    categorizedResources[type].push(res);
}

// Display each category
for (let [type, resList] of Object.entries(categorizedResources)) {
    dv.header(3, type.toUpperCase());
    
    for (let res of resList) {
        let rating = res.rating || 0;
        let ratingStars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        let tags = res.tags ? Array.isArray(res.tags) ? res.tags : [res.tags] : [];
        let tagBadges = tags.map(tag => `<span style="display:inline-block; background:#6c757d; color:white; padding:2px 6px; border-radius:10px; margin:1px; font-size:0.7em;">${tag.replace('#', '')}</span>`).join('');
        
        dv.el("div", 
            `- **${res.file.link}** - Rating: ${ratingStars}` +
            (res.author ? ` by ${res.author}` : '') +
            (res.difficulty ? ` - Difficulty: ${res.difficulty}` : '') +
            `<div style="margin-top:5px;">${tagBadges}</div>`,
            { cls: "resource-item" }
        );
    }
}
```

## Advanced DataviewJS Techniques

### Custom Audio Analysis Dashboard
```dataviewjs
// Create a comprehensive audio analysis dashboard
let audioNotes = dv.pages('#audio-analysis')
    .filter(p => p.frequency_range && p.amplitude_data);

dv.header(2, "Audio Analysis Dashboard");

// Aggregate statistics
let totalAnalyses = audioNotes.length;
let avgDuration = audioNotes.length > 0 ? 
    (audioNotes.map(n => n.duration || 0).reduce((a, b) => a + b, 0) / audioNotes.length).toFixed(2) : 0;

dv.paragraph(`**Total Analyses:** ${totalAnalyses}`);
dv.paragraph(`**Average Duration:** ${avgDuration}s`);

// Frequency range distribution
let freqRanges = {};
for (let note of audioNotes) {
    if (note.frequency_range) {
        let range = note.frequency_range;
        freqRanges[range] = (freqRanges[range] || 0) + 1;
    }
}

dv.header(3, "Frequency Range Distribution");
for (let [range, count] of Object.entries(freqRanges)) {
    let percentage = ((count / totalAnalyses) * 100).toFixed(1);
    dv.el("div", 
        `${range}: ${count} analyses (${percentage}%)`,
        { cls: "freq-range-item" }
    );
}

// Detailed analysis table
if (audioNotes.length > 0) {
    dv.header(3, "Recent Analyses");
    dv.table(
        ["File", "Frequency Range", "Duration", "Peak Amplitude"],
        audioNotes.slice(0, 10).map(note => [
            note.file.link,
            note.frequency_range || 'N/A',
            note.duration ? `${note.duration}s` : 'N/A',
            note.peak_amplitude || 'N/A'
        ])
    );
}
```

### Interactive Vibecoding Journal
```dataviewjs
// Create an interactive journal viewer
let journalEntries = dv.pages('#vibecoding-journal')
    .filter(p => p.date && p.mood)
    .sort(p => p.date, 'desc');

dv.header(2, "Vibecoding Journal");

// Mood trend visualization
let moodData = journalEntries.slice(0, 14).reverse(); // Last 14 entries, chronological order
if (moodData.length > 0) {
    dv.header(3, "Mood Trend (Last 14 Days)");
    
    let moodChart = dv.el("div", "", { cls: "mood-chart" });
    moodChart.style.height = "100px";
    moodChart.style.position = "relative";
    moodChart.style.borderBottom = "1px solid #ccc";
    moodChart.style.margin = "20px 0";
    
    let maxValue = 10;
    let minValue = 1;
    let range = maxValue - minValue;
    let chartHeight = 80;
    
    // Draw mood points
    for (let i = 0; i < moodData.length; i++) {
        let moodValue = moodData[i].mood || 5;
        let x = (i / (moodData.length - 1)) * 100;
        let y = 100 - ((moodValue - minValue) / range) * 100;
        
        let point = dv.el("div", "", { cls: "mood-point" });
        point.style.position = "absolute";
        point.style.left = `${x}%`;
        point.style.top = `${y}%`;
        point.style.width = "8px";
        point.style.height = "8px";
        point.style.backgroundColor = moodValue > 7 ? "#4CAF50" : 
                                   moodValue > 4 ? "#FFC107" : "#F44336";
        point.style.borderRadius = "50%";
        point.style.transform = "translate(-50%, -50%)";
        point.title = `${moodData[i].date.toISOString().split('T')[0]}: ${moodValue}`;
        
        moodChart.appendChild(point);
    }
    
    // Draw connecting lines
    for (let i = 1; i < moodData.length; i++) {
        let prevMood = moodData[i-1].mood || 5;
        let currMood = moodData[i].mood || 5;
        let prevX = ((i-1) / (moodData.length - 1)) * 100;
        let currX = (i / (moodData.length - 1)) * 100;
        let prevY = 100 - ((prevMood - minValue) / range) * 100;
        let currY = 100 - ((currMood - minValue) / range) * 100;
        
        let line = dv.el("div", "", { cls: "mood-line" });
        line.style.position = "absolute";
        line.style.left = `${prevX}%`;
        line.style.top = `${prevY}%`;
        line.style.width = `${Math.abs(currX - prevX)}%`;
        line.style.height = "2px";
        line.style.backgroundColor = "#999";
        line.style.transformOrigin = "top left";
        line.style.transform = `rotate(${Math.atan2(currY - prevY, currX - prevX) * 180 / Math.PI}deg)`;
        line.style.transform = `translate(-50%, -50%) rotate(${Math.atan2(currY - prevY, currX - prevX) * 180 / Math.PI}deg)`;
        
        // Actually draw the line properly
        let properLine = dv.el("svg", "", { cls: "mood-svg" });
        properLine.style.position = "absolute";
        properLine.style.top = "0";
        properLine.style.left = "0";
        properLine.style.width = "100%";
        properLine.style.height = "100%";
        properLine.innerHTML = `
            <line x1="${prevX}%" y1="${prevY}%" x2="${currX}%" y2="${currY}%" stroke="#999" stroke-width="2"/>
        `;
        
        moodChart.appendChild(properLine);
    }
}

// Journal entries list
dv.header(3, "Recent Entries");
for (let entry of journalEntries.slice(0, 5)) {
    let moodColor = entry.mood > 7 ? "#4CAF50" : 
                   entry.mood > 4 ? "#FFC107" : "#F44336";
    
    dv.el("div", 
        `- **${entry.date}** - Mood: <span style="color:${moodColor}; font-weight:bold;">${entry.mood}/10</span> - ${entry.file.link}` +
        (entry.focus_time ? ` - Focus: ${entry.focus_time}min` : '') +
        (entry.creative_output ? ` - Creative: ${entry.creative_output}` : ''),
        { cls: "journal-entry" }
    );
}
```

## Integration with Vibecoding Workflow

### Project Planning Matrix
```dataviewjs
// Create a planning matrix for upcoming projects
let todoProjects = dv.pages('#todo-project')
    .filter(p => p.importance && p.urgency)
    .sort(p => (p.importance * 2) + p.urgency, 'desc'); // Prioritize important & urgent

dv.header(2, "Project Planning Matrix");

// Eisenhower Matrix visualization (simplified)
dv.table(
    ["Project", "Importance", "Urgency", "Priority Score", "Status"],
    todoProjects.map(p => [
        p.file.link,
        p.importance,
        p.urgency,
        (p.importance * 2) + p.urgency,
        p.status || 'Not Started'
    ])
);
```

### Learning Path Recommendation Engine
```dataviewjs
// Recommend next learning steps based on current progress
let currentSkills = dv.pages('#current-skill')
    .filter(p => p.level)
    .array();

let allTechniques = dv.pages('#vibecoding-technique');

dv.header(2, "Recommended Learning Path");

// Find techniques that build on current skills
let recommendations = [];
for (let technique of allTechniques) {
    if (technique.prerequisites) {
        let prereqs = Array.isArray(technique.prerequisites) ? 
                      technique.prerequisites : [technique.prerequisites];
        
        let satisfiedPrereqs = prereqs.filter(prereq => 
            currentSkills.some(skill => 
                skill.name === prereq && skill.level >= 3
            )
        );
        
        if (satisfiedPrereqs.length === prereqs.length) {
            let readiness = satisfiedPrereqs.length / prereqs.length;
            recommendations.push({
                technique: technique,
                readiness: readiness,
                missing: prereqs.length - satisfiedPrereqs.length
            });
        }
    }
}

// Sort by readiness and display top recommendations
recommendations.sort((a, b) => b.readiness - a.readiness);

dv.header(3, "Ready to Learn");
for (let rec of recommendations.filter(r => r.missing === 0).slice(0, 3)) {
    dv.paragraph(`→ ${rec.technique.file.link} - Ready to tackle!`);
}

dv.header(3, "Coming Soon");
for (let rec of recommendations.filter(r => r.missing > 0).slice(0, 3)) {
    dv.paragraph(`→ ${rec.technique.file.link} - Need ${rec.missing} more prerequisite skills`);
}
```

## Best Practices for DataviewJS in Vibecoding

### Performance Optimization
When working with large numbers of notes:

1. **Filter early**: Use `.where()` clauses as early as possible
2. **Limit results**: Use `.limit()` to restrict output
3. **Cache expensive operations**: Store calculated values in variables

### Example of Optimized Query
```dataviewjs
// Optimized query that filters early and limits results
let optimizedQuery = dv.pages('"Audio Projects"')
    .where(p => p.status === 'completed' && p.difficulty && p.created_date)
    .limit(20)
    .sort(p => p.created_date, 'desc');

dv.header(2, "Optimized Completed Projects");
dv.list(optimizedQuery.map(p => p.file.link));
```

### Error Handling
```dataviewjs
try {
    let riskyQuery = dv.pages('#experimental-feature');
    if (riskyQuery.length > 0) {
        dv.header(2, "Experimental Features");
        dv.list(riskyQuery.map(p => p.file.link));
    } else {
        dv.paragraph("No experimental features found.");
    }
} catch (error) {
    dv.paragraph(`Error loading data: ${error.message}`);
}
```

This completes the DataviewJS examples module for your vibecoding course. These examples provide a foundation for tracking and visualizing your vibecoding journey within Obsidian, helping you maintain organized records of your audiovisual experiments, projects, and learning progress.