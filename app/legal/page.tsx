import Link from "next/link";

export const metadata = {
  title: "特定商取引法に基づく表記 | ショートドラマ台本AI",
  description: "ショートドラマ台本AIの特定商取引法に基づく表記です。",
};

export default function LegalPage() {
  const items = [
    { label: "販売事業者名", value: "個人事業主（お問い合わせにて開示）" },
    { label: "代表者名", value: "お問い合わせにて開示" },
    { label: "所在地", value: "お問い合わせにて開示" },
    { label: "電話番号", value: "非公開（お問い合わせいただいた場合は遅滞なく開示いたします）" },
    { label: "メールアドレス", value: "support@short-drama-script-ai.vercel.app" },
    { label: "サービス名", value: "ショートドラマ台本AI" },
    { label: "販売価格", value: "無料プラン：0円（3回まで）／プレミアムプラン：詳細は近日公開" },
    { label: "支払方法", value: "クレジットカード（Stripe）" },
    { label: "支払時期", value: "サービス申込時に決済" },
    { label: "提供時期", value: "決済完了後、即時提供" },
    { label: "返品・キャンセル", value: "デジタルコンテンツの性質上、原則として返金・キャンセルは承っておりません。サービス提供に重大な問題があった場合はご相談ください。" },
    { label: "動作環境", value: "インターネット接続環境、モダンブラウザ（Chrome・Safari・Firefox・Edge）" },
  ];

  return (
    <main
      className="min-h-screen py-12 px-4"
      style={{ background: "linear-gradient(135deg, #0D1117 0%, #1a1a2e 100%)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            aria-label="トップページに戻る"
            className="text-gray-400 hover:text-white transition-colors min-h-[44px] inline-flex items-center"
          >
            ← トップ
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-white mb-8">特定商取引法に基づく表記</h1>
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <dl>
            {items.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row gap-2 p-4 ${i !== items.length - 1 ? "border-b border-white/5" : ""}`}
              >
                <dt className="text-gray-400 text-sm font-medium sm:w-40 flex-shrink-0">{item.label}</dt>
                <dd className="text-gray-200 text-sm leading-relaxed">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="text-gray-500 text-xs mt-6 leading-relaxed">
          ※ 本サービスはAIによる自動生成サービスです。生成されたコンテンツの内容・品質に関して特定の成果を保証するものではありません。
        </p>
        <nav aria-label="フッターナビゲーション" className="mt-8">
          <ul className="flex gap-6 text-sm text-gray-500">
            <li>
              <Link href="/privacy" aria-label="プライバシーポリシー" className="hover:text-white transition-colors min-h-[44px] inline-flex items-center">
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link href="/terms" aria-label="利用規約" className="hover:text-white transition-colors min-h-[44px] inline-flex items-center">
                利用規約
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
