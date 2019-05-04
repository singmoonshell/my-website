const KEY_LAST_EVENT_ID = 'plugins:github-notification:last-event-id';
const EVENTS_URL = 'https://api.github.com/users/YiiGuxing/received_events?per_page=1';

class GitHubNotificationPlugin {
    constructor() {
        this.launcher = null;
        this.newEventId = null;
        this.updateInterval = 30000;
        this.taskId = null;
    }

    install(launcher) {
        this.launcher = launcher;
        this.updateNotification().then();
    }

    uninstall() {
        this.launcher = null;
        if (this.taskId) {
            clearTimeout(this.taskId);
        }
    }

    beforeLaunch() {
        if (this.launcher && this.launcher.hasNotification) {
            localStorage.setItem(KEY_LAST_EVENT_ID, this.newEventId || null);
            this.launcher.hasNotification = false;
        }
    }

    async updateNotification() {
        if (!this.launcher) return;

        let response;
        try {
            response = await this.launcher.$http.get(EVENTS_URL);
        } catch (resp) {
            response = resp;
        }

        if (response && response.ok) {
            let events = response.body || [];
            let lastEventId = localStorage.getItem(KEY_LAST_EVENT_ID);
            let newEventId = events.length > 0 && events[0].id;
            this.launcher.hasNotification = newEventId && newEventId !== lastEventId;
            this.newEventId = newEventId
        }

        this.taskId = setTimeout(() => this.updateNotification(), this.updateInterval)
    }
}

export default new GitHubNotificationPlugin()