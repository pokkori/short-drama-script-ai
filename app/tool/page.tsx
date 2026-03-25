"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

const GENRES = ["ラブストーリー", "友情", "サスペンス", "コメディ", "ホラー", "感動系"] as const;
const DURATIONS = ["30秒", "60秒", "90秒"] as const;
const TONES = ["シリアス", "カジュアル", "コメディ"] as const;

type Genre = (typeof GENRES)[number];
type Duration = (typeof DURATIONS)[number];
type Tone = (typeof TONES)[number];

const FREE_LIMIT = 3;
const COOKIE_KEY = "drama_use_count";

function getCookieValue(name: string): number {
  if (typeof document === "undefined") return 0;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? parseInt(decodeURIComponent(match[1])) : 0;
}

function isPremium(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("premium=") || document.cookie.includes("stripe_premium=");
}

function IconCopy() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export default function ToolPage() {
  const [genre, setGenre] = useState<Genre>("ラブストーリー");
  const [setting, setSetting] = useState("");
  const [characters, setCharacters] = useState("");
  const [duration, setDuration] = useState<Duration>("60秒");
  const [tone, setTone] = useState<Tone>("シリアス");
  const [script, setScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [useCount, setUseCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const scriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUseCount(getCookieValue(COOKIE_KEY));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!setting.trim()) {
      setError("舞台設定を入力してください");
      return;
    }
    if (!characters.trim()) {
      setError("登場人物を入力してください");
      return;
    }
    if (!isPremium() && useCount >= FREE_LIMIT) {
      setError("無料利用回数（3回）に達しました。プレミアムプランをご検討ください。");
      return;
    }

    setError("");
    setScript("");
    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre, setting, characters, duration, tone }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "LIMIT_REACHED") {
          setError("無料利用回数（3回）に達しました。プレミアムプランをご検討ください。");
        } else {
          setError(data.error || "エラーが発生しました。もう一度お試しください。");
        }
        setIsGenerating(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) {
        setError("生成に失敗しました。");
        setIsGenerating(false);
        return;
      }

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const doneIdx = chunk.indexOf("\nDONE:");
        if (doneIdx !== -1) {
          buffer += chunk.slice(0, doneIdx);
          try {
            const meta = JSON.parse(chunk.slice(doneIdx + 6));
            if (meta.count) setUseCount(meta.count);
          } catch {
            // ignore
          }
          break;
        } else {
          buffer += chunk;
        }
        setScript(buffer);
        if (scriptRef.current) {
          scriptRef.current.scrollTop = scriptRef.current.scrollHeight;
        }
      }
      setScript(buffer);
    } catch {
      setError("通信エラーが発生しました。インターネット接続を確認してください。");
    } finally {
      setIsGenerating(false);
    }
  }, [genre, setting, characters, duration, tone, useCount]);

  const handleCopy = async () => {
    if (!script) return;
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const xShareText = encodeURIComponent(
    `ショートドラマ台本AIで${genre}の台本を生成しました！\nhttps://short-drama-script-ai.vercel.app\n#ショートドラマ台本AI #TikTok #YouTubeShorts`
  );
  const xShareUrl = `https://twitter.com/intent/tweet?text=${xShareText}`;

  const remaining = Math.max(0, FREE_LIMIT - useCount);

  return (
    <main
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0D1117 0%, #1a1a2e 50%, #16213e 100%)" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            aria-label="トップページに戻る"
            className="flex items-center justify-center w-10 h-10 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors min-h-[44px] min-w-[44px]"
          >
            <IconArrowLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">ショートドラマ台本AI</h1>
            <p className="text-gray-400 text-sm">TikTok / Shorts / Reels 向け台本生成</p>
          </div>
        </div>

        {/* 残り回数 */}
        {!isPremium() && (
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 flex items-center justify-between">
            <span className="text-gray-400 text-sm">無料残り回数</span>
            <span
              className={`font-bold text-lg ${remaining === 0 ? "text-red-400" : remaining === 1 ? "text-yellow-400" : "text-green-400"}`}
            >
              {remaining} / {FREE_LIMIT} 回
            </span>
          </div>
        )}

        {/* 入力フォーム */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-6">
          {/* ジャンル */}
          <div>
            <label className="block text-white font-medium mb-3" htmlFor="genre-select">
              ジャンル
            </label>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="ジャンル選択">
              {GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  aria-label={`ジャンル: ${g}`}
                  aria-pressed={genre === g}
                  className={`py-3 px-2 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                    genre === g
                      ? "text-white border-2 border-pink-400"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                  style={genre === g ? { background: "linear-gradient(135deg, #FF6B6B, #FF6BAE)" } : {}}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* 舞台設定 */}
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="setting-input">
              舞台設定
            </label>
            <input
              id="setting-input"
              type="text"
              value={setting}
              onChange={(e) => setSetting(e.target.value)}
              placeholder="例: 高校の屋上、放課後"
              aria-label="舞台設定を入力してください"
              maxLength={200}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 transition-colors min-h-[44px]"
            />
          </div>

          {/* 登場人物 */}
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="characters-input">
              登場人物
            </label>
            <textarea
              id="characters-input"
              value={characters}
              onChange={(e) => setCharacters(e.target.value)}
              placeholder={"例:\n主人公: 佐藤花 17歳 内気な女子高生\n相手役: 田中涼 18歳 クールな幼なじみ"}
              aria-label="登場人物を入力してください"
              maxLength={400}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 transition-colors resize-none"
            />
          </div>

          {/* 尺 */}
          <div>
            <p className="text-white font-medium mb-3">尺（動画の長さ）</p>
            <div className="flex gap-3" role="group" aria-label="尺の選択">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  aria-label={`尺: ${d}`}
                  aria-pressed={duration === d}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                    duration === d
                      ? "text-white border-2 border-pink-400"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                  style={duration === d ? { background: "linear-gradient(135deg, #FF6B6B, #FF6BAE)" } : {}}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* トーン */}
          <div>
            <p className="text-white font-medium mb-3">トーン</p>
            <div className="flex gap-3" role="group" aria-label="トーンの選択">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  aria-label={`トーン: ${t}`}
                  aria-pressed={tone === t}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                    tone === t
                      ? "text-white border-2 border-purple-400"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                  style={tone === t ? { background: "linear-gradient(135deg, #9B59B6, #FF6BAE)" } : {}}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* エラー */}
          {error && (
            <div
              role="alert"
              className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm"
            >
              {error}
            </div>
          )}

          {/* 生成ボタン */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || (!isPremium() && useCount >= FREE_LIMIT)}
            aria-label="台本を生成する"
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-lg min-h-[56px] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: "linear-gradient(135deg, #FF6B6B, #FF6BAE)" }}
          >
            {isGenerating ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                生成中...
              </>
            ) : (
              <>
                <IconSpark />
                台本を生成する
              </>
            )}
          </button>
        </div>

        {/* 台本表示エリア */}
        {(script || isGenerating) && (
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">生成された台本</h2>
              {script && !isGenerating && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    aria-label="台本をクリップボードにコピーする"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm backdrop-blur-md bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all min-h-[44px]"
                  >
                    <IconCopy />
                    {copied ? "コピー済み" : "コピー"}
                  </button>
                  <a
                    href={xShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Xで台本をシェアする"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm backdrop-blur-md bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all min-h-[44px]"
                  >
                    <IconShare />
                    Xで共有
                  </a>
                </div>
              )}
            </div>
            <div
              ref={scriptRef}
              className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap max-h-[600px] overflow-y-auto"
              aria-live="polite"
              aria-label="生成された台本の内容"
            >
              {script}
              {isGenerating && (
                <span className="inline-block w-2 h-4 bg-pink-400 ml-1 animate-pulse" aria-hidden="true" />
              )}
            </div>
          </div>
        )}

        {/* フッターナビ */}
        <nav aria-label="フッターナビゲーション">
          <ul className="flex justify-center gap-6 text-xs text-gray-600 pb-4">
            <li>
              <Link
                href="/legal"
                aria-label="特定商取引法に基づく表記"
                className="hover:text-gray-400 transition-colors min-h-[44px] inline-flex items-center"
              >
                特商法
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                aria-label="プライバシーポリシー"
                className="hover:text-gray-400 transition-colors min-h-[44px] inline-flex items-center"
              >
                プライバシー
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                aria-label="利用規約"
                className="hover:text-gray-400 transition-colors min-h-[44px] inline-flex items-center"
              >
                利用規約
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
