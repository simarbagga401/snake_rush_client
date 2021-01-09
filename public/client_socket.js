let socket = io.connect("http://localhost:8000");
const span = document.querySelector("span");
const room_id_input = document.querySelector(".room_id_input");
const enter_btn = document.querySelector("#enter_btn");
const send_btn = document.querySelector("#send_btn");
const chat_input = document.querySelector(".chat_input");
let room_id = null;
let client_id = null;

socket.on("game_init", (res) => {
  client_id = res.client_id;
  room_id = res.room_id;
  console.log(
    `Game Initialized by Client ${client_id} , Room id is ${room_id}`
  );
  span.innerText = room_id;
  if (res === undefined) {
    span.innerText = "Refresh to Generate Room Id";
  }
});

enter_btn.addEventListener("click", () => {
  let payload = {
    client_id,
    room_id: room_id_input.value,
  };
  socket.emit("enter_game_req", payload);
});

socket.on("enter_game_res", (res) => {
  console.log("enter game res :- ", res);
  room_id_input.style.display = "none";
  enter_btn.style.display = "none";
  let p = document.querySelector("span");
  let ui_res = document.querySelector("#entered_room_text");
  p.style.display = "none";

  if (res.client === "Requestor") {
    if (res.room_id != undefined) {
      game_mode = "multi_player";
      room_id = res.room_id;
      ui_res.innerText = `In Room ${room_id}`;
      console.log(res);
    } else if (res.err_msg != undefined) {
      ui_res.innerText = res.err_msg;
      room_id_input.style.display = "block";
    } else {
      ui_res.innerText = "Server Error: Try Again Later";
    }
  }

  if (res != undefined && res.client === "Creator") {
    game_mode = "multi_player";
    p.style.display = "block";
    res.clients.forEach((client) => {
      ui_res.innerText += `${client} joined`;
    });
  }
});

send_btn.addEventListener("click", () => {
  let chat = chat_input.value;
  generate_comment("right", chat, player);
  let payload = {
    client_id,
    room_id,
    chat,
  };
  socket.emit("outgoing_chat", payload);
});

function generate_comment(cls, content, color) {
  let comment = document.createElement("div");
  let main = document.querySelector("main");
  comment.innerText = content;
  comment.style.color = color;
  comment.classList.add("comment", `${cls}`);
  main.appendChild(comment);
  main.scrollTop += 50;
  chat_input.value = "";
}

socket.on("incomming_chat", (res) => {
  console.log(res);
  generate_comment("left", res.chat, res.color);
});

socket.on("snake_pos_server", ({ x, y }) => {
  console.log(x, y);
});

function send_snake_pos([x, y]) {
  let payload = {
    client_id,
    room_id,
    x,
    y,
  };
  socket.emit("snake_pos_client", payload);
}
