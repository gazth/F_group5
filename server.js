const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let players = {};

wss.on("connection", (ws) => {
  console.log("プレイヤーが接続しました");

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "move") {
      players[data.id] = { x: data.x, y: data.y, direction: data.direction };
    }
    // 全クライアントに現在のプレイヤー位置を送信
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "update", players }));
      }
    });
  });

  ws.on("close", () => {
    console.log("プレイヤーが切断しました");
  });
});

console.log("WebSocketサーバーがポート8080で起動");
