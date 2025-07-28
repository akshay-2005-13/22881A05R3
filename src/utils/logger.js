export function logEvent(eventType, payload) {
    const log = `[${new Date().toISOString()}] ${eventType}: ${JSON.stringify(payload)}`;
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");
    logs.push(log);
    localStorage.setItem("logs", JSON.stringify(logs));
}
