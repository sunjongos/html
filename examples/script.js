// 30 Dummy Tickets Data
const dummyTickets = [
    { id: "LIN-01", title: "Implement SSO Authentication" },
    { id: "LIN-02", title: "Fix memory leak in dashboard" },
    { id: "LIN-03", title: "Upgrade React to v18" },
    { id: "LIN-04", title: "Design new landing page" },
    { id: "LIN-05", title: "Add dark mode support" },
    { id: "LIN-06", title: "Optimize image assets loading" },
    { id: "LIN-07", title: "Integrate Stripe billing" },
    { id: "LIN-08", title: "Create user onboarding flow" },
    { id: "LIN-09", title: "Update Terms of Service" },
    { id: "LIN-10", title: "Refactor state management" },
    { id: "LIN-11", title: "Fix mobile navigation bug" },
    { id: "LIN-12", title: "Setup CI/CD pipeline" },
    { id: "LIN-13", title: "Write E2E tests for checkout" },
    { id: "LIN-14", title: "Migrate database to PostgreSQL" },
    { id: "LIN-15", title: "Add multi-language support" },
    { id: "LIN-16", title: "Implement push notifications" },
    { id: "LIN-17", title: "Design email templates" },
    { id: "LIN-18", title: "Fix typography alignment" },
    { id: "LIN-19", title: "Create API documentation" },
    { id: "LIN-20", title: "Add Webhooks integration" },
    { id: "LIN-21", title: "Improve accessibility (a11y)" },
    { id: "LIN-22", title: "Audit security vulnerabilities" },
    { id: "LIN-23", title: "Build admin dashboard" },
    { id: "LIN-24", title: "Setup error tracking (Sentry)" },
    { id: "LIN-25", title: "Add analytics events" },
    { id: "LIN-26", title: "Optimize SEO meta tags" },
    { id: "LIN-27", title: "Implement rate limiting" },
    { id: "LIN-28", title: "Create marketing assets" },
    { id: "LIN-29", title: "Fix caching invalidation" },
    { id: "LIN-30", title: "Review Q3 Roadmap" }
];

// AI Pre-sorting Logic (Simulation)
const categorizeTicket = (ticket) => {
    const idNum = parseInt(ticket.id.split('-')[1]);
    
    // AI rules simulation
    if ([2, 11, 22, 29].includes(idNum)) return "Now"; // Urgent bugs
    if ([1, 7, 12, 14, 23].includes(idNum)) return "Next"; // Core features
    if ([9, 17, 19, 26, 28, 30].includes(idNum)) return "Cut"; // Low priority tasks
    
    // Distribute others randomly but weighted towards 'Later'
    const rand = Math.random();
    if (rand < 0.1) return "Now";
    if (rand < 0.3) return "Next";
    if (rand < 0.8) return "Later";
    return "Cut";
};

// Initialize Board
document.addEventListener("DOMContentLoaded", () => {
    const columns = {
        "Now": document.getElementById('col-now'),
        "Next": document.getElementById('col-next'),
        "Later": document.getElementById('col-later'),
        "Cut": document.getElementById('col-cut')
    };

    // Render Tickets
    dummyTickets.forEach(ticket => {
        const category = categorizeTicket(ticket);
        const col = columns[category];
        
        const el = document.createElement('div');
        el.className = 'ticket';
        el.draggable = true;
        el.dataset.id = ticket.id;
        el.innerHTML = `
            <div class="ticket-id">${ticket.id}</div>
            <div class="ticket-title">${ticket.title}</div>
        `;
        
        el.addEventListener('dragstart', handleDragStart);
        el.addEventListener('dragend', handleDragEnd);
        
        col.appendChild(el);
    });

    updateCounts();

    Object.values(columns).forEach(col => {
        col.addEventListener('dragover', handleDragOver);
        col.addEventListener('drop', handleDrop);
        col.addEventListener('dragenter', handleDragEnter);
        col.addEventListener('dragleave', handleDragLeave);
    });

    document.getElementById('copyBtn').addEventListener('click', copyToMarkdown);
});

let draggedItem = null;

function handleDragStart(e) {
    draggedItem = this;
    setTimeout(() => this.classList.add('dragging'), 0);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.id);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedItem = null;
    
    document.querySelectorAll('.kanban-column').forEach(col => {
        col.style.background = '';
    });
    
    updateCounts();
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const col = this;
    const afterElement = getDragAfterElement(col, e.clientY);
    
    if (afterElement == null) {
        col.appendChild(draggedItem);
    } else {
        col.insertBefore(draggedItem, afterElement);
    }
}

function handleDragEnter(e) {
    e.preventDefault();
    this.style.background = 'rgba(255, 255, 255, 0.02)';
}

function handleDragLeave(e) {
    this.style.background = '';
}

function handleDrop(e) {
    e.preventDefault();
    this.style.background = '';
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.ticket:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateCounts() {
    ['now', 'next', 'later', 'cut'].forEach(id => {
        const count = document.getElementById(`col-${id}`).children.length;
        document.getElementById(`count-${id}`).innerText = count;
    });
}

function copyToMarkdown() {
    let markdown = `# Linear Triage Results\n\n`;
    
    const cols = ['Now', 'Next', 'Later', 'Cut'];
    
    cols.forEach(colName => {
        const colId = `col-${colName.toLowerCase()}`;
        const tickets = document.getElementById(colId).querySelectorAll('.ticket');
        
        markdown += `## ${colName} (${tickets.length})\n`;
        
        if (tickets.length === 0) {
            markdown += `- (Empty)\n`;
        } else {
            tickets.forEach(t => {
                const id = t.querySelector('.ticket-id').innerText;
                const title = t.querySelector('.ticket-title').innerText;
                markdown += `- [ ] **${id}**: ${title}\n`;
            });
        }
        markdown += `\n`;
    });

    navigator.clipboard.writeText(markdown).then(() => {
        showToast();
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}
