// Vercel 서버리스 함수: GET /api/message?name=닉네임
// 응원 문장 15개 중 하나를 골라 이름과 함께 돌려준다.

const MESSAGES = [
  "{name}, 오늘 하루도 정말 잘 해낼 거예요!",
  "{name}, 작은 걸음도 앞으로 나아가는 거예요.",
  "{name}, 지금까지 충분히 잘해 왔어요.",
  "{name}, 오늘의 노력이 내일의 자신감이 될 거예요.",
  "{name}, 천천히 가도 괜찮아요. 멈추지만 않으면 돼요.",
  "{name}, 당신의 웃음이 누군가에게 힘이 돼요.",
  "{name}, 실수해도 괜찮아요. 그만큼 배우고 있는 거예요.",
  "{name}, 오늘은 스스로를 한 번 칭찬해 주세요.",
  "{name}, 어려운 순간도 결국 지나가요. 힘내요!",
  "{name}, 당신은 생각보다 훨씬 강한 사람이에요.",
  "{name}, 좋은 일이 곧 찾아올 거예요.",
  "{name}, 숨 한 번 크게 쉬고, 다시 시작해 봐요.",
  "{name}, 오늘도 당신답게 빛나세요!",
  "{name}, 포기하지 않는 마음이 가장 멋져요.",
  "{name}, 오늘 하루 수고 많았어요. 정말 고마워요."
];

const MAX_NAME_LENGTH = 20;

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "GET 요청만 지원해요." });
    return;
  }

  const raw = typeof req.query.name === "string" ? req.query.name : "";
  const name = Array.from(raw.trim()).slice(0, MAX_NAME_LENGTH).join("");
  const displayName = name ? `${name}님` : "여러분";

  const template = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  const message = template.replace("{name}", displayName);

  res.status(200).json({ name: displayName, message });
};
