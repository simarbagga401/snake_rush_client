let socket = io.connect('http://localhost:8000');
function send_snake_pos(pos) {
    console.log(`x:${pos[0]}  ,  y:${pos[1]}`)
    socket.emit('snake_position', pos);
}