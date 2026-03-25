import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー | ショートドラマ台本AI",
  description: "ショートドラマ台本AIのプライバシーポリシーです。",
};

export default function PrivacyPage() {
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
        <h1 className="text-2xl font-bold text-white mb-8">プライバシーポリシー</h1>
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <p>
              ショートドラマ台本AI（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
              本プライバシーポリシーは、本サービスにおける個人情報の取り扱いについて定めるものです。
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">1. 収集する情報</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>入力情報（ジャンル・舞台設定・登場人物などの台本生成リクエスト）</li>
              <li>アクセスログ（IPアドレス・ブラウザ情報・アクセス日時）</li>
              <li>クッキー（利用回数管理・セッション管理のため）</li>
              <li>Vercel Analytics による匿名アクセス解析データ</li>
            </ul>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">2. 利用目的</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>台本生成サービスの提供</li>
              <li>サービスの改善・品質向上</li>
              <li>不正利用の防止</li>
              <li>統計情報の集計・分析</li>
            </ul>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">3. 第三者提供</h2>
            <p className="mb-3">収集した情報は、以下の場合を除き第三者に提供しません。</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>法令に基づく場合</li>
              <li>人命・財産保護のために必要な場合</li>
            </ul>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">4. 外部サービスの利用</h2>
            <p className="mb-3">本サービスは以下の外部サービスを利用しています。</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <span className="font-medium text-white">Anthropic Claude API</span>
                ：台本生成AI。入力内容がAnthropicのサーバーに送信されます。
                <a
                  href="https://www.anthropic.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Anthropicプライバシーポリシー（外部リンク）"
                  className="text-pink-400 hover:underline ml-1"
                >
                  Anthropicプライバシーポリシー
                </a>
              </li>
              <li>
                <span className="font-medium text-white">Vercel Analytics</span>
                ：匿名のアクセス解析サービス。個人を特定する情報は収集しません。
              </li>
            </ul>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">5. クッキーについて</h2>
            <p>
              本サービスでは、無料利用回数の管理のためにクッキーを使用します。
              ブラウザの設定によりクッキーを無効にすることができますが、その場合サービスの一部機能が利用できなくなる場合があります。
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">6. お問い合わせ</h2>
            <p>プライバシーに関するお問い合わせは、support@short-drama-script-ai.vercel.app までご連絡ください。</p>
          </div>

          <p className="text-gray-500 text-xs">制定日：2026年3月25日</p>
        </div>

        <nav aria-label="フッターナビゲーション" className="mt-8">
          <ul className="flex gap-6 text-sm text-gray-500">
            <li>
              <Link href="/legal" aria-label="特定商取引法に基づく表記" className="hover:text-white transition-colors min-h-[44px] inline-flex items-center">
                特商法
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
