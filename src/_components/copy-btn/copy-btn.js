function enableCopy(
  selector = "div.highlight",
  childSelector = "code",
  btnText = "Copy Me",
  btnTextSuccess = "Copied",
  activeClass = "--copy",
) {
  document
    .querySelectorAll(`${selector}:not(.${activeClass})`)
    .forEach((node) => {
      // create a "copy" button
      let copyBtn = document.createElement("div");
      copyBtn.classList.add("copy-btn");
      copyBtn.innerText = btnText;
      // activeClass acts as flag so we don't add another copy button by  mistake
      copyBtn.classList.add(activeClass);
      node.appendChild(copyBtn);
      copyBtn.addEventListener("click", async () => {
        // copy to clipboard
        if (navigator.clipboard) {
          let text = node.querySelector(childSelector).innerText;
          await navigator.clipboard.writeText(text);
        }
        // change text of button after copying
        copyBtn.innerText = btnTextSuccess;
        // change text back to normal after ### ms
        setTimeout(() => (copyBtn.innerText = btnText), 2000);
      });
    });
}

enableCopy();
