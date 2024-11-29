document.addEventListener("DOMContentLoaded", () => {
    const messagesContainer = document.getElementById("messages");
    const messageInput = document.querySelector("#message-input input");
    const sendButton = document.querySelector("#message-input button");
    const userEmailDisplay = document.getElementById("user-email");
    const authLink = document.getElementById("auth-link");

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    if (loggedInUser) {
        userEmailDisplay.textContent = loggedInUser.email;
        authLink.textContent = "Logout ✖";
        authLink.href = "#";
        authLink.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.href = "J.A.Login.html";
        });
    } else {
        userEmailDisplay.textContent = "guest@example.com";
        authLink.textContent = "Login ↪";
        authLink.href = "J.A.Login.html";
    }

    function addMessage(messageText, isSent = true) {
        if (!messagesContainer) {
            console.error("Messages container not found.");
            return;
        }

        const messageElement = document.createElement("div");
        messageElement.classList.add("message", isSent ? "sent" : "received");

        const messageContent = document.createElement("div");
        messageContent.textContent = messageText;

        const messageTime = document.createElement("div");
        messageTime.classList.add("time");
        messageTime.textContent = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        messageElement.appendChild(messageContent);
        messageElement.appendChild(messageTime);
        messagesContainer.appendChild(messageElement);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    if (sendButton && messageInput) {
        sendButton.addEventListener("click", function () {
            const messageText = messageInput.value.trim();

            if (messageText !== "") {
                addMessage(messageText);
                messageInput.value = "";
            }
        });

        messageInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendButton.click();
            }
        });
    } else {
        console.error("Message input or send button not found.");
    }
});
