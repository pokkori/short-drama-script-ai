import Link from "next/link";

export const metadata = {
  title: "利用規約 | ショートドラマ台本AI",
  description: "ショートドラマ台本AIの利用規約です。",
};

export default function TermsPage() {
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
        <h1 className="text-2xl font-bold text-white mb-8">利用規約</h1>
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <p>
              本利用規約（以下「本規約」）は、ショートドラマ台本AI（以下「本サービス」）の利用条件を定めるものです。
              本サービスをご利用いただく際には、本規約に同意いただいたものとみなします。
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">第1条（サービス内容）</h2>
            <p>
              本サービスは、AIを活用してTikTok・YouTube Shorts・Instagram Reels等の短尺動画向けドラマ台本を自動生成するWebサービスです。
              無料プランでは3回まで利用可能です。
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">第2条（禁止事項）</h2>
            <p className="mb-3">以下の行為を禁止します。</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>違法コンテンツ・差別的表現・ヘイトスピーチを含む台本の生成</li>
              <li>実在する人物を誹謗中傷する内容の入力</li>
              <li>本サービスの著作権・知的財産権を侵害する行為</li>
              <li>他のユーザーや第三者に不利益を与える行為</li>
              <li>自動化ツールによる大量アクセス・スクレイピング</li>
              <li>サービスの正常な運営を妨害する行為</li>
              <li>無料制限を回避する目的でのCookieの不正操作</li>
            </ul>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">第3条（生成コンテンツの利用）</h2>
            <p className="mb-3">
              本サービスで生成した台本は、ご自身の動画制作・SNS投稿・商用コンテンツ制作にご利用いただけます。
              ただし、以下の点にご注意ください。
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>AIが生成した内容の著作権帰属については法的に不明瞭な部分があります</li>
              <li>生成内容が第三者の権利を侵害していないかご確認ください</li>
              <li>専門家への相談推奨：重要な商用利用の場合は弁護士等にご相談ください</li>
            </ul>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">第4条（免責事項）</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>本サービスはAIによる自動生成であり、生成コンテンツの品質・正確性を保証しません</li>
              <li>生成された台本の利用により生じた損害について、当社は責任を負いません</li>
              <li>サービスの中断・終了・変更について、事前通知なく行う場合があります</li>
              <li>生成AIの性質上、同じ入力に対して異なる結果が出力される場合があります</li>
            </ul>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">第5条（規約の変更）</h2>
            <p>
              本規約は、必要に応じて予告なく変更することがあります。変更後は本ページに掲載した時点で効力を生じます。
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-3">第6条（準拠法・管轄裁判所）</h2>
            <p>
              本規約は日本法に基づき解釈されます。本サービスに関する紛争は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
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
              <Link href="/privacy" aria-label="プライバシーポリシー" className="hover:text-white transition-colors min-h-[44px] inline-flex items-center">
                プライバシーポリシー
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
