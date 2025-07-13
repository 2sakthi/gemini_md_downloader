// popup.js

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const status = document.getElementById('status');

    // 检查当前标签页是否是Gemini页面
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        
        if (!currentTab.url || !currentTab.url.startsWith("https://gemini.google.com")) {
            downloadBtn.disabled = true;
            copyBtn.disabled = true;
            status.textContent = '请在Gemini页面使用此插件';
            status.style.color = '#ea4335';
            return;
        }

        // 下载按钮点击事件
        downloadBtn.addEventListener('click', function() {
            downloadBtn.disabled = true;
            status.textContent = '正在下载...';
            status.style.color = '#666';
            
            chrome.tabs.sendMessage(currentTab.id, { action: "download_markdown" }, function(response) {
                if (chrome.runtime.lastError) {
                    status.textContent = '下载失败';
                    status.style.color = '#ea4335';
                } else {
                    status.textContent = '下载成功！';
                    status.style.color = '#34a853';
                    setTimeout(() => window.close(), 1000);
                }
                downloadBtn.disabled = false;
            });
        });

        // 复制按钮点击事件
        copyBtn.addEventListener('click', function() {
            copyBtn.disabled = true;
            status.textContent = '正在复制...';
            status.style.color = '#666';
            
            chrome.tabs.sendMessage(currentTab.id, { action: "copy_markdown" }, function(response) {
                if (chrome.runtime.lastError) {
                    status.textContent = '复制失败';
                    status.style.color = '#ea4335';
                } else if (response && response.success) {
                    status.textContent = '已复制到剪贴板！';
                    status.style.color = '#34a853';
                    setTimeout(() => window.close(), 1000);
                } else {
                    status.textContent = '复制失败，请重试';
                    status.style.color = '#ea4335';
                }
                copyBtn.disabled = false;
            });
        });
    });
}); 