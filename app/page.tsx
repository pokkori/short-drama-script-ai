import Link from "next/link";

function IconFilm() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
      <line x1="17" y1="17" x2="22" y2="17" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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

function IconPencil() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function IconChevronRight() {
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

const features = [
  {
    icon: <IconFilm />,
    title: "6ジャンル対応",
    desc: "ラブストーリー・友情・サスペンス・コメディ・ホラー・感動系の6ジャンルから選択。プロ品質の台本を瞬時に生成します。",
  },
  {
    icon: <IconZap />,
    title: "Streaming生成",
    desc: "待ち時間ゼロ。文字が流れるように表示されるリアルタイムStreaming方式で、思考をとめずにクリエイティブに集中できます。",
  },
  {
    icon: <IconPencil />,
    title: "すぐ使える台本形式",
    desc: "シーン・セリフ・ト書きが整った台本形式で出力。コピーしてそのまま動画制作に使えます。",
  },
];

const steps = [
  {
    step: "01",
    title: "ジャンルと設定を入力",
    desc: "ジャンル・舞台設定・登場人物・尺・トーンを選択または入力します。",
  },
  {
    step: "02",
    title: "AIが台本を生成",
    desc: "ボタンを押すだけで、AIがリアルタイムに台本を生成します。",
  },
  {
    step: "03",
    title: "コピーして動画制作",
    desc: "生成された台本をコピーして、そのまま撮影・編集に使えます。",
  },
];

const faqs = [
  {
    q: "無料で使えますか？",
    a: "はい、登録不要・クレジットカード不要で3回まで無料でご利用いただけます。",
  },
  {
    q: "どのSNSに対応していますか？",
    a: "TikTok・YouTube Shorts・Instagram Reelsなど縦型ショート動画全般に対応した台本を生成します。",
  },
  {
    q: "生成した台本は商用利用できますか？",
    a: "はい、生成した台本は動画制作・SNS投稿・商用コンテンツ制作にお使いいただけます。",
  },
  {
    q: "台本の長さは選べますか？",
    a: "30秒・60秒・90秒の3種類から選択できます。それぞれに最適なセリフ量・構成で生成されます。",
  },
  {
    q: "登場人物は自由に設定できますか？",
    a: "はい、名前・年齢・関係性など自由にテキスト入力できます。設定が詳しいほど物語の完成度が上がります。",
  },
];

export default function HomePage() {
  const xShareText = encodeURIComponent(
    "ショートドラマ台本AIでTikTok/Shorts用の台本を自動生成しました！\nhttps://short-drama-script-ai.vercel.app\n#ショートドラマ台本AI #TikTok #YouTubeShorts"
  );
  const xShareUrl = `https://twitter.com/intent/tweet?text=${xShareText}`;

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #0D1117 0%, #1a1a2e 50%, #16213e 100%)" }}>
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden pt-20 pb-24 px-4">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #FF6B6B, transparent)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #FF6BAE, transparent)" }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-md bg-white/5 border border-white/10 text-pink-300">
            <span>TikTok / YouTube Shorts / Instagram Reels 対応</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            60秒で生まれる
            <br />
            <span style={{ background: "linear-gradient(90deg, #FF6B6B, #FF6BAE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              バズるドラマ台本
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            ジャンル・設定・登場人物を入力するだけ。AIがショートドラマの台本をリアルタイムで自動生成。クリエイターの制作時間を大幅に短縮します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tool"
              aria-label="無料で台本を生成する"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-lg min-h-[56px] transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #FF6B6B, #FF6BAE)" }}
            >
              無料で台本を生成する
              <IconChevronRight />
            </Link>
            <a
              href={xShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Xでシェアする"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-lg min-h-[56px] backdrop-blur-md bg-white/5 border border-white/20 transition-all hover:bg-white/10"
            >
              <IconShare />
              Xでシェア
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-4">登録不要・無料3回・クレジットカード不要</p>
        </div>
      </section>

      {/* 特徴カード */}
      <section className="py-20 px-4" aria-labelledby="features-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="features-heading" className="text-3xl font-bold text-center text-white mb-12">
            選ばれる3つの理由
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all"
              >
                <div className="text-pink-400 mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使い方3ステップ */}
      <section className="py-20 px-4" aria-labelledby="howto-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="howto-heading" className="text-3xl font-bold text-center text-white mb-12">
            使い方は3ステップ
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, #FF6B6B, #FF6BAE)" }}
                >
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/tool"
              aria-label="今すぐ台本を生成してみる"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-lg min-h-[56px] transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #FF6B6B, #FF6BAE)" }}
            >
              今すぐ試してみる
              <IconChevronRight />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQセクション */}
      <section className="py-20 px-4" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-heading" className="text-3xl font-bold text-center text-white mb-12">
            よくある質問
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-white font-bold mb-2">Q. {faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2026 ショートドラマ台本AI. All rights reserved.
          </p>
          <nav aria-label="フッターナビゲーション">
            <ul className="flex gap-6 text-sm">
              <li>
                <Link
                  href="/legal"
                  aria-label="特定商取引法に基づく表記"
                  className="text-gray-500 hover:text-white transition-colors min-h-[44px] inline-flex items-center"
                >
                  特商法
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  aria-label="プライバシーポリシー"
                  className="text-gray-500 hover:text-white transition-colors min-h-[44px] inline-flex items-center"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  aria-label="利用規約"
                  className="text-gray-500 hover:text-white transition-colors min-h-[44px] inline-flex items-center"
                >
                  利用規約
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </main>
  );
}
