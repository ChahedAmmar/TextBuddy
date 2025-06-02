let des = document.getElementById("Dyslexia");
let isdyslexiaEnabled = false;
des.addEventListener("click", function () {
    if (!isdyslexiaEnabled) {
        
    
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: dyslexia
    });
    isdyslexiaEnabled = true;
  });} else {
    resetDyslexia();
    isdyslexiaEnabled = false;
  }
  

});

function dyslexia() {
  if (!document.querySelector('link[href*="open-dyslexic"]')) {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.cdnfonts.com/css/open-dyslexic';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }

  const elements = document.querySelectorAll("p, span, li, div, a, h1, h2, h3, h4, h5, h6, td, th");

  elements.forEach(el => {
    el.style.fontFamily = "'OpenDyslexic', Arial, sans-serif";
    el.style.letterSpacing = "0.05em";
    el.style.lineHeight = "1.6";
    el.style.backgroundColor = "#ffffff";
    el.style.color = "#111111";
  });

}
function resetDyslexia(){
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const elements = document.querySelectorAll("p, span, li, div, a, h1, h2, h3, h4, h5, h6, td, th");
          elements.forEach(el => {
            el.style.fontFamily = "";
            el.style.letterSpacing = "";
            el.style.lineHeight = "";
            el.style.backgroundColor = "";
            el.style.color = "";
          });
        }
      });
    });
}
let Cblind = document.getElementById("Cblind");
let isCblindEnabled = false;



Cblind.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!isCblindEnabled) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: colorBlind
            });
            isCblindEnabled = true;
        } else {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: resetColorBlind
            });
            isCblindEnabled = false;
        }
    });
});

function colorBlind() {
    document.documentElement.style.filter = "grayscale(100%)";
}

function resetColorBlind() {
    document.documentElement.style.filter = "none";
}
const font = document.getElementById("font");
const fontSize = document.getElementById("fontSize");
const bold = document.getElementById("bold-btn");
const fontspacing = document.getElementById("spacing");
font.addEventListener("change",function(){
    const selectedFont = font.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: changeFont,
            args: [selectedFont]
        });
    });
})
function changeFont(font){
    document.body.style.fontFamily = font;
}
bold.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: Boldtxt
        });
    });
});
function Boldtxt() {
    const elements = document.querySelectorAll("p, span, li, div, a, h1, h2, h3, h4, h5, h6, td, th");
    elements.forEach(el => {
        el.style.fontWeight = el.style.fontWeight === "bold" ? "normal" : "bold";
    });
}
fontSize.addEventListener("change", function () {
    const selectedSize = fontSize.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: changeFontSize,
            args: [selectedSize]
        });
    });
});
function changeFontSize(size) {
    const elements = document.querySelectorAll("p, span, li, div, a, h1, h2, h3, h4, h5, h6, td, th");
    elements.forEach(el => {
        el.style.fontSize = size + "px";
    });
    
}
fontspacing.addEventListener("change", function () {
    const selectedSpacing = fontspacing.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: changeFontSpacing,
            args: [selectedSpacing]
        });
    });
});
function changeFontSpacing(spacing) {
    const elements = document.querySelectorAll("p, span, li, div, a, h1, h2, h3, h4, h5, h6, td, th");
    elements.forEach(el => {
        el.style.letterSpacing = spacing + "px";
    });
}
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: resetAllStyles
        });
    });
});
function resetAllStyles() {
    const elements = document.querySelectorAll("p, span, li, div, a, h1, h2, h3, h4, h5, h6, td, th");
    elements.forEach(el => {
        el.style.fontFamily = "";
        el.style.fontSize = "";
        el.style.fontWeight = "";
        el.style.letterSpacing = "";
    
    });
    
}
document.getElementById("speech").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                return {
                    text: window.getSelection().toString(),
                    lang: document.documentElement.lang || "en"
                };
            }
        }, (results) => {
            const { text, lang } = results[0].result;
            if (text.trim()) {
                const apiKey = "5b7bd460474d4ceb8444e860302b695d";
                const formattedLang = lang.toLowerCase().startsWith("fr")
                    ? "fr-fr"
                    : lang.toLowerCase().startsWith("ar")
                    ? "ar-sa"
                    : lang.toLowerCase().startsWith("es")
                    ? "es-es"
                    : lang.toLowerCase().startsWith("de")
                    ? "de-de"
                    :"en-us"; 

                const url = `https://api.voicerss.org/?key=${apiKey}&hl=${formattedLang}&src=${encodeURIComponent(text)}`;

                const audio = new Audio(url);
                audio.play();
            } else {
                alert("Please select some text first.");
            }
        });
    });
});

let simplify= document.getElementById("simplify");
simplify.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                return window.getSelection().toString();
            }
        }, (results) => {
            let text = results && results[0] && results[0].result ? results[0].result : "";
            if (!text.trim()) {
                alert("Please select some text first.");
                return;
            }
            fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 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",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "openai/gpt-3.5-turbo-1106",
                    "messages": [
                        {
                            "role": "user",
                            "content": `summarize the following text in a concise short manner  in the language of the provided text :${text} `
                        }
                    ]
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content ? data.choices[0].message.content : "No summary returned.");
            })
            .catch(error => {
                alert("Error: " + error);
            });
        });
    });
});
let translate = document.getElementById("lang");
translate.addEventListener("change",function(){
    const selectedLang = translate.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: changeLanguage,
            args: [selectedLang]
        });
    });
})
function changeLanguage(lang){
    let text = window.getSelection().toString();
if (!text.trim()) {alert("Please select some text first.")}
   fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer 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",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "openai/gpt-3.5-turbo-1106",
    "messages": [
      {
        "role": "user",
        "content": `translate this text ${text} to ${lang}`
      }
    ]
  })
})
  .then(response => response.json())
  .then(data => {
    alert(data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content ? data.choices[0].message.content : "No translation returned.");
  })
  .catch(error => {
    alert("Error: " + error);
  });
}
let highlight = document.getElementById("highlight");
let highlightColor = document.getElementById("highlightColor");
highlight.addEventListener("click", function () {
    color= highlightColor.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: highlightText,
            args: [color]
        });
    });
})
function highlightText(color){
    let text = window.getSelection().toString();
    if (!text.trim()) {
        alert("Please select some text first.");
        return;
    }
    const span = document.createElement("span");
    span.style.backgroundColor = color;
    span.textContent = text;
    
    const range = window.getSelection().getRangeAt(0);
    range.deleteContents()                 ;
    range.insertNode(span);
}
    