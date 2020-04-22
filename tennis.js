const canvas = document.getElementById("field");
const ctx = canvas.getContext('2d');
let scorepl1 = document.getElementById('scorepl1');
let scorepl2 = document.getElementById('scorepl2');
let loop = 0;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: "RED"
}

const player1 = {
    x: 0,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "GREEN",
}

const player2 = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "BLUE",

}




function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawArc(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}



function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}


function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function update() {

    if (ball.x - ball.radius <= 0) {
        player2.score++;
        ball.speed = 0;
        clearInterval(loop);


    } else if (ball.x + ball.radius >= canvas.width) {
        player1.score++;
        ball.speed = 0;
        clearInterval(loop);


    }
    scorepl1.innerHTML = player1.score;
    scorepl2.innerHTML = player2.score;
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x + ball.radius < canvas.width / 2) ? player1 : player2;

    if (collision(ball, player)) {

        let collidePoint = (ball.y - (player.y + player.height / 2));
        collidePoint = collidePoint / (player.height / 2);
        let angleRad = (Math.PI / 4) * collidePoint;
        let direction = (ball.x + ball.radius < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
    }

}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawRect(player1.x, player1.y, player1.width, player1.height, player1.color);
    drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
    update();
    render();

}

function reset() {
    resetBall();
    loop = setInterval(game, 1000 / framePerSecond);
}
let framePerSecond = 60;
loop = setInterval(game, 1000 / framePerSecond);
document.onkeydown = updateKeys;

function updateKeys(e) {
    shift = 16;
    ctrl = 17;
    K_UP = 38;
    K_DOWN = 40;
    var ctrlPressed = 0;
    var shiftPressed = 0;
    shiftPressed = e.shiftKey;
    ctrlPressed = e.ctrlKey;
    currentKey = e.keyCode;

    if (shiftPressed) {
        if (player2.y > 0) {
            player2.y -= 10;
            render();
        }
    }
    if (ctrlPressed) {
        if (player2.y < 300) {
            player2.y += 10;
            render();
        }
    }
    if (currentKey == K_UP) {
        if (player1.y > 0) {
            player1.y -= 10;
            render();
        }
    }
    if (currentKey == K_DOWN) {
        if (player1.y < 300) {
            player1.y += 10;
            render();
        }
    }


}