// Replace this with your Direct Line token
const DIRECT_LINE_TOKEN = "GFMJjIiUYhjctN0JiT0slsaxzM9Uv3tE8UZsgPTovaFydzOrQ7YlJQQJ99BJAC4f1cMAArohAAABAZBS4IQx.2nn7S3dXJXQoz6ZLxZCo0qluQwt7Hg36tmMEc3MELERtNXTMeXUyJQQJ99BJAC4f1cMAArohAAABAZBS1Vwz";

// Show Web Chat
document.getElementById("startChatBtn").addEventListener("click", () => {
    const webchat = document.getElementById("webchat");
    webchat.style.display = "flex";

    // Initialize BotFramework Web Chat
    const directLine = window.WebChat.createDirectLine({ token: DIRECT_LINE_TOKEN });

    window.WebChat.renderWebChat({
        directLine: directLine,
        userID: 'user1',
        username: 'You',
        locale: 'en-US',
        styleOptions: {
            bubbleBackground: '#ff3b30',        // Red bubbles
            bubbleFromUserBackground: '#cc0000', // Darker red for user
            bubbleBorderRadius: 12,
            bubbleTextColor: '#ffffff',
            rootHeight: '300px'
        }
    }, webchat);

    // Auto-scroll to bottom on new message
    directLine.activity$.subscribe(() => {
        webchat.scrollTop = webchat.scrollHeight;
    });
});

// Send alert
document.getElementById("sendTestAlert").addEventListener("click", async () => {
    const logicUrlInput = document.getElementById("logicAppUrl").value;
    const defaultLogicUrl = "https://prod-09.centralindia.logic.azure.com:443/workflows/0fea9e06d40d42ba9884898109ee2b71/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=rV8gYgCx4930l7g2oK3dGZn1DSTcOKj1yyYaF9FQLMs";
    const logicUrl = logicUrlInput || defaultLogicUrl;

    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const issue = document.getElementById("issue").value;

    if (!name || !location || !issue) return alert("Please fill in your name, location, and issue.");

    try {
        document.getElementById("alertResult").textContent = "Sending...";
        const res = await fetch(logicUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, location, issue })
        });

        document.getElementById("alertResult").textContent = res.ok
            ? "Alert sent successfully ✅"
            : `Failed to send alert ❌ (${res.status} ${res.statusText})`;
    } catch (err) {
        document.getElementById("alertResult").textContent = "Error sending alert ❌. Check console.";
        console.error(err);
    }
});

// Back button animation
document.getElementById("backHome").addEventListener("click", function() {
    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 300);
});
