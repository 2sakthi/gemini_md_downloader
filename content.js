// content.js (v1.5 with Turndown Integration)

(function() {
    'use strict';

    const LOG_PREFIX = '[GEMINI-MD-LISTENER]';

    console.log(`${LOG_PREFIX} Script loaded. Version 1.5 (Turndown Integrated).`);

    // Initialize TurndownService
    const turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '---',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full'
    });

    // Add custom rules for Gemini-specific elements if needed
    // For example, to handle specific data-test-ids or custom tags
    // turndownService.addRule('geminiCustomElement', {
    //   filter: (node) => node.nodeName === 'DIV' && node.getAttribute('data-test-id') === 'some-custom-element',
    //   replacement: (content) => `Custom Content: ${content}`
    // });

    /**
     * Sanitize a string to be used as a valid filename.
     */
    function sanitizeFilename(title) {
        const invalidChars = ['\\', '/', ':', '*', '?', '"', '<', '>', '|'];
        let sanitizedTitle = title;
        for (const char of invalidChars) {
            sanitizedTitle = sanitizedTitle.split(char).join('_');
        }
        return sanitizedTitle.trim() || 'gemini-chat';
    }

    /**
     * Extracts the conversation and triggers a download.
     */
    function downloadConversation() {
        console.log(`${LOG_PREFIX} Download command received.`);

        const titleElement = document.querySelector('.conversation.selected .conversation-title, .conversation-title.gds-label-l');
        const title = titleElement ? titleElement.innerText.trim() : 'Gemini Conversation';
        const filename = sanitizeFilename('Gemini - ' + title) + '.md';
        console.log(`${LOG_PREFIX} Filename: ${filename}`);

        let markdownContent = `# ${title}\n\n`;
        const turns = document.querySelectorAll('user-query, model-response');
        console.log(`${LOG_PREFIX} Found ${turns.length} conversation turns.`);

        if (turns.length === 0) {
            console.error(`${LOG_PREFIX} No conversation content found.`);
            return;
        }

        turns.forEach(turn => {
            if (turn.tagName.toLowerCase() === 'user-query') {
                const queryText = turn.querySelector('.query-text')?.innerText;
                if (queryText) {
                    markdownContent += `## User\n\n${queryText}\n\n---\n\n`;
                }
            } else if (turn.tagName.toLowerCase() === 'model-response') {
                const responseEl = turn.querySelector('.markdown');
                if (responseEl) {
                    // Use Turndown to convert the HTML content to Markdown
                    const htmlContent = responseEl.innerHTML;
                    const formattedText = turndownService.turndown(htmlContent);
                    markdownContent += `## Gemini\n\n${formattedText.trim()}\n\n---\n\n`;
                }
            }
        });

        const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log(`${LOG_PREFIX} Download triggered successfully with Turndown.`);
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "download_markdown") {
            downloadConversation();
            sendResponse({ status: "Download initiated with Turndown." });
        }
        return true;
    });

})();