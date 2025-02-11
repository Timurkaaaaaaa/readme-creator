document.addEventListener("DOMContentLoaded", function () {
    const settingsDiv = document.getElementById("settings");
    const outputMarkdown = document.getElementById("markdown-preview");
    const outputDiv = document.getElementById("output");

    settingsDiv.addEventListener("input", function () {
        updateOutput();
    });

    function updateOutput() {
        let markdownContent = "";

        document.querySelectorAll("#settings .settings--item").forEach(section => {
            section.querySelectorAll("input, textarea").forEach(input => {
                if (input.value.trim() !== "") {
                    const label = input.previousElementSibling.textContent.trim();
                    const value = input.value.trim();

                    if (label.includes("Project Name")) {
                        markdownContent += `# ${value}\n\n`;
                    } else if (label.includes("Project Logo")) {
                        markdownContent += `![Project Logo](${value})\n\n`;
                    } else if (label.includes("Description")) {
                        markdownContent += `${value}\n\n`;
                    } else if (label.includes("Project Demo URL")) {
                        markdownContent += `![Project Demo](${value})\n\n`;
                    } else if (label.includes("Project Screenshot URL")) {
                        markdownContent += `![Project Screenshot URL](${value})\n\n`;
                    } else {
                        markdownContent += `## ${label}\n${value}\n\n`;
                    }
                }
            });
        });

        // Обновляем Markdown в markdown-preview
        outputMarkdown.innerHTML = `<pre><code>${markdownContent}</code></pre>`;

        // Обновляем HTML в output
        const htmlPreview = convertMarkdownToHTML(markdownContent);
        outputDiv.innerHTML = `<h1>Preview</h1>${htmlPreview}`;
    }

    function convertMarkdownToHTML(markdown) {
        // Простой конвертер Markdown в HTML
        const html = markdown
            .replace(/#/g, '<h3>')
            .replace(/##/g, '<h5>')
            .replace(/\n/g, '<br>')
            .replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="\$2" alt="\$1" style="max-width: 100%;">')
            .replace(/`(.*?)`/g, '<code>\$1</code>')
            .replace(/<h3>(.*?)<\/h3>/g, '<h3>\$1</h3><br>')
            .replace(/<h5>(.*?)<\/h5>/g, '<h5>\$1</h5><br>');

        return html;
    }
});