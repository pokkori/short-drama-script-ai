import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

let _client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!_client) _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return _client;
}

const FREE_LIMIT = 3;
const COOKIE_KEY = "drama_use_count";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

const VALID_GENRES = ["ラブストーリー", "友情", "サスペンス", "コメディ", "ホラー", "感動系"];
const VALID_DURATIONS = ["30秒", "60秒", "90秒"];
const VALID_TONES = ["シリアス", "カジュアル", "コメディ"];

const systemPrompt = `あなたはTikTok・YouTube Shorts・Instagram Reels向けショートドラマの台本作家です。
視聴者を最初の3秒で引き込み、最後まで離脱させない構成が得意です。
バズる短尺ドラマの法則を熟知しており、感情的な起伏・どんでん返し・共感を軸にした脚本を書きます。

## 台本フォーマット（必ず遵守）

### 台本タイトル
[キャッチーなタイトル]

---

### 【シーン1】[シーン名]
**ト書き:** [場面描写・登場人物の動作・表情を簡潔に]

**[登場人物名]:** 「[セリフ]」

**ト書き:** [動作・表情・雰囲気]

**[登場人物名]:** 「[セリフ]」

---

（以降、シーンを繰り返す）

---

### 台本終了

**撮影メモ:**
- カメラワーク・BGM・テロップなどの演出ヒントを3〜5点箇条書き

## 品質ルール
- 最初の3秒で視聴者を引き込む冒頭を必ず入れる
- 感情の山場を必ず1箇所以上つくる
- 指定の尺に合わせたセリフ量にする（30秒=6〜8セリフ/60秒=12〜16セリフ/90秒=18〜24セリフ）
- ト書きは簡潔に（1行以内）
- セリフは自然な話し言葉で
- 最後は余韻を残す終わり方にする`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。しばらく待ってから再試行してください。" },
      { status: 429 }
    );
  }

  const isPremium =
    req.cookies.get("premium")?.value === "1" ||
    req.cookies.get("stripe_premium")?.value === "1";

  const cookieCount = parseInt(req.cookies.get(COOKIE_KEY)?.value || "0");
  if (!isPremium && cookieCount >= FREE_LIMIT) {
    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストの形式が正しくありません" }, { status: 400 });
  }

  const { genre, setting, characters, duration, tone } = body as Record<string, string>;

  if (!setting || !setting.trim()) {
    return NextResponse.json({ error: "舞台設定を入力してください" }, { status: 400 });
  }
  if (!characters || !characters.trim()) {
    return NextResponse.json({ error: "登場人物を入力してください" }, { status: 400 });
  }
  if (setting.length > 200) {
    return NextResponse.json({ error: "舞台設定は200文字以内で入力してください" }, { status: 400 });
  }
  if (characters.length > 400) {
    return NextResponse.json({ error: "登場人物は400文字以内で入力してください" }, { status: 400 });
  }
  if (genre && !VALID_GENRES.includes(genre)) {
    return NextResponse.json({ error: "不正なジャンルです" }, { status: 400 });
  }
  if (duration && !VALID_DURATIONS.includes(duration)) {
    return NextResponse.json({ error: "不正な尺指定です" }, { status: 400 });
  }
  if (tone && !VALID_TONES.includes(tone)) {
    return NextResponse.json({ error: "不正なトーン指定です" }, { status: 400 });
  }

  const safeSetting = setting.replace(/[<>]/g, "");
  const safeCharacters = characters.replace(/[<>]/g, "");

  const durationGuide =
    duration === "30秒"
      ? "30秒（6〜8セリフ程度。スピーディーな展開）"
      : duration === "90秒"
      ? "90秒（18〜24セリフ程度。しっかりとした感情の流れ）"
      : "60秒（12〜16セリフ程度。テンポよい展開）";

  const toneGuide =
    tone === "コメディ"
      ? "笑いを重視したコメディタッチ。ボケとツッコミ、予想外の展開を盛り込む。"
      : tone === "カジュアル"
      ? "日常的でリアルな会話スタイル。親しみやすい言葉遣い。"
      : "感情を丁寧に描く真剣なトーン。心情描写を大切にする。";

  const prompt = `以下の条件でTikTok/YouTube Shorts向けのショートドラマ台本を作成してください。

【ジャンル】${genre || "ラブストーリー"}
【舞台設定】${safeSetting}
【登場人物】
${safeCharacters}
【動画の尺】${durationGuide}
【トーン・スタイル】${toneGuide}

条件を全て満たし、視聴者が最後まで見たくなる引力のある台本を書いてください。
最初の一言で「え、何これ？」と思わせる冒頭にしてください。`;

  try {
    const newCount = cookieCount + 1;
    const stream = getClient().messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          const meta = JSON.stringify({ count: newCount });
          controller.enqueue(encoder.encode(`\nDONE:${meta}`));
          controller.close();
        } catch (err) {
          console.error(err);
          controller.error(err);
        }
      },
    });

    const res = new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Set-Cookie": `${COOKIE_KEY}=${newCount}; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly; Secure; Path=/`,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "AI生成中にエラーが発生しました。しばらく待ってから再試行してください。" },
      { status: 500 }
    );
  }
}
