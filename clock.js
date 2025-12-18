// Seleciona o canvas pelo ID
const canvas = document.getElementById('clock');

// Obtém o contexto 2D, responsável por todos os desenhos
const ctx = canvas.getContext('2d');

// Define o centro do relógio com base no tamanho do canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Define o raio do relógio, deixando uma margem
const radius = canvas.width / 2 - 20;

// Função principal que desenha apenas o relógio base
function drawClockBase() {
  // Limpa todo o canvas antes de redesenhar
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o círculo externo do relógio
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Desenha as marcas das horas (12 divisões)
  for (let i = 0; i < 12; i++) {
    // Cada hora equivale a 30 graus
    const angle = (i * 30 - 90) * Math.PI / 180;

    // Ponto inicial da marca
    const x1 = centerX + Math.cos(angle) * (radius - 10);
    const y1 = centerY + Math.sin(angle) * (radius - 10);

    // Ponto final da marca
    const x2 = centerX + Math.cos(angle) * radius;
    const y2 = centerY + Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

// Função que desenha os ponteiros em tempo real
function drawHands() {
  const now = new Date();

  // Obtém horas, minutos e segundos atuais
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Converte tempo para ângulos
  const hourAngle =
    ((hours + minutes / 60) * 30 - 90) * Math.PI / 180;

  const minuteAngle =
    ((minutes + seconds / 60) * 6 - 90) * Math.PI / 180;

  const secondAngle =
    (seconds * 6 - 90) * Math.PI / 180;

  // Ponteiro das horas
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + Math.cos(hourAngle) * (radius * 0.5),
    centerY + Math.sin(hourAngle) * (radius * 0.5)
  );
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#fff';
  ctx.stroke();

  // Ponteiro dos minutos
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + Math.cos(minuteAngle) * (radius * 0.75),
    centerY + Math.sin(minuteAngle) * (radius * 0.75)
  );
  ctx.lineWidth = 4;
  ctx.stroke();

  // Ponteiro dos segundos
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + Math.cos(secondAngle) * (radius * 0.85),
    centerY + Math.sin(secondAngle) * (radius * 0.85)
  );
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'red';
  ctx.stroke();
}

// Loop de atualização do relógio
function update() {
  drawClockBase(); // layer base
  drawHands();     // layer de ponteiros
  requestAnimationFrame(update);
}

// Inicia o loop
update();
