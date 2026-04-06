import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import FeedbackButton from "@/components/FeedbackButton";
import "./globals.css";

const SITE_URL = "https://short-drama-script-ai.vercel.app";
const TITLE = "ショートドラマ台本AI｜TikTok/Shorts/Reels用の60秒台本を自動生成【無料】";
const DESC = "ジャンル・設定・登場人物を入力するだけ。TikTok・YouTube Shorts・Instagram Reels向けの短尺ドラマ台本をAIが即時生成。ラブストーリー・サスペンス・コメディなど6ジャンル対応。登録不要・無料3回。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect x='8' y='28' width='84' height='55' rx='8' fill='%23374151'/><rect x='8' y='28' width='84' height='22' rx='4' fill='%231F2937'/><rect x='8' y='42' width='84' height='8' fill='%23111827'/><rect x='22' y='20' width='10' height='16' rx='2' fill='%23F59E0B' transform='rotate(-15 27 28)'/><rect x='44' y='16' width='10' height='16' rx='2' fill='%23F59E0B' transform='rotate(-15 49 24)'/><rect x='66' y='12' width='10' height='16' rx='2' fill='%23F59E0B' transform='rotate(-15 71 20)'/></svg>",
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "ショートドラマ台本AI",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "ショートドラマ台本AI - TikTok/Shorts向け台本を自動生成",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [`${SITE_URL}/og.png`],
  },
  metadataBase: new URL(SITE_URL),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ショートドラマ台本AI",
      url: SITE_URL,
      applicationCategory: "CreativeApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "JPY",
        description: "無料3回・プレミアムプランあり",
      },
      description: DESC,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "無料で使えますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、登録不要・クレジットカード不要で3回まで無料でご利用いただけます。4回目以降はプレミアムプランをご検討ください。",
          },
        },
        {
          "@type": "Question",
          name: "1回で何文字の台本が生成されますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "選択した尺（30秒・60秒・90秒）に応じて、目安として30秒なら約400〜600文字、60秒なら約800〜1200文字、90秒なら約1200〜1800文字の台本が生成されます。",
          },
        },
        {
          "@type": "Question",
          name: "生成した台本は商用利用できますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "生成した台本はご自身の動画制作・SNS投稿・商用コンテンツ制作にお使いいただけます。ただし、AIが生成した内容の著作権の帰属については現在法的に不明瞭な部分があるため、重要な商用利用の場合は専門家にご相談ください。",
          },
        },
        {
          "@type": "Question",
          name: "どのSNSプラットフォームに対応していますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TikTok・YouTube Shorts・Instagram Reels・X（旧Twitter）の動画投稿など、縦型ショート動画を中心としたSNS全般に対応した台本を生成します。",
          },
        },
        {
          "@type": "Question",
          name: "著作権はどうなりますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "入力した設定情報はお客様ご自身の情報です。AIが生成した台本の著作権については、現行法上明確な規定がない部分があります。生成した台本はご自由にお使いいただけますが、法的な問題が生じた場合は専門家にご相談ください。",
          },
        },
        {
          "@type": "Question",
          name: "登場人物は何人まで設定できますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "入力フォームに自由にテキスト入力できますので、技術的な上限はありません。ただし、60秒以内の短尺ドラマでは2〜3人程度が視聴者にわかりやすい構成になります。",
          },
        },
        {
          "@type": "Question",
          name: "実際の人物名を使っても大丈夫ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "実在する有名人・著名人の名前を無断で使用することは、名誉毀損やパブリシティ権の侵害になる可能性があります。フィクションの登場人物には架空の名前をご使用ください。",
          },
        },
        {
          "@type": "Question",
          name: "生成された台本を編集できますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、生成された台本はテキストとしてコピーしてメモ帳や各種エディタに貼り付けて自由に編集できます。AIの生成結果はあくまでたたき台として、ご自身でアレンジしてお使いいただくことをおすすめします。",
          },
        },
        {
          "@type": "Question",
          name: "英語や他言語の台本も生成できますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "現在は日本語の台本生成に特化しています。舞台設定や登場人物の欄に英語でリクエストを記載していただくと英語での生成も可能ですが、品質は日本語が最も高くなります。",
          },
        },
        {
          "@type": "Question",
          name: "プレミアムプランはありますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、プレミアムプランでは無制限の台本生成・優先生成・長尺台本（90秒以上）など追加機能をご利用いただけます。詳細は近日公開予定です。",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <footer className="flex justify-center py-2">
          <FeedbackButton serviceName="ショートドラマ台本AI" />
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
