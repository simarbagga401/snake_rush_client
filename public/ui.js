let gif = document.querySelector(".gif");
let gifs = [
  "",
  "./imgs/gif1-min.gif",
  "./imgs/gif2-min.gif",
  "./imgs/gif3-min.gif",
];
gif.src = gifs[Math.floor(Math.random() * 3) + 1];
let open_chat_btn = document.querySelector(".open_chat_btn");
let chat_div = document.querySelector(".room");
if (window.innerWidth >= 1200) {
  chat_div.style.display = "flex";
  open_chat_btn.innerText = "Close Chat";
} else {
  chat_div.style.display = "none";
  open_chat_btn.innerText = "Open Chat";
}
open_chat_btn.addEventListener("click", () => {
  if (chat_div.style.display === "none") {
    chat_div.style.display = "flex";
    open_chat_btn.innerText = "Close Chat";
  } else if (chat_div.style.display === "flex") {
    chat_div.style.display = "none";
    open_chat_btn.innerText = "Open Chat";
  }
});
