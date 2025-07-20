import { Noto_Sans, Noto_Serif, Noto_Serif_Devanagari, Poppins } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const notoSerifDevnagari = Noto_Serif_Devanagari({
  variable: "--font-noto-serif-devnagari",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
  display: "swap",
});

export const metadata = {
  title: 'Jeevan Vigyan Dham | जीवन विज्ञान | Jeevan Vigyan – आध्यात्मिक प्रयोगशाला नेपाल',
  description: 'जीवन विज्ञान: योग, ध्यान, साधना र मनोविज्ञानका माध्यमबाट मानव कल्याण र आत्म‑उत्थानको मार्गदर्शन',
  openGraph: {
    title: 'Jeevan Vigyan – आध्यात्मिक प्रयोगशाला नेपाल',
    description: 'योग, ध्यान, साधना र मनोविज्ञानका कार्यक्रमहरू गरी नेपाल र विश्वभर विद्यार्थीहरूलाई आत्म‑शक्ति प्रदान गरिन्छ।',
    url: 'https://jeevanvigyan.org',
    type: 'website',
    images: [
      {
        url: 'https://jeevanvigyan.org/images/logo.png', // replace with real image if needed
        width: 1200,
        height: 630,
        alt: 'Jeevan Vigyan आध्यात्मिक प्रयोगशाला',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeevan Vigyan – आध्यात्मिक प्रयोगशाला नेपाल',
    description: 'योग र ध्यानका कार्यक्रमहरूद्वारा आत्म‑शक्ति र जीवन गुणस्तर वृद्धिको खोज।',
    images: ['https://jeevanvigyan.org/images/logo.png'],
    site: '@jeevanvigyan', // update if real Twitter handle is available
  },
  metadataBase: new URL('https://jeevanvigyan.org'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${notoSerifDevnagari.className} antialiased`}>
        <AntdRegistry>
          <ConfigProvider theme={{
            token: {
              fontFamily: 'Noto Serif Devnagari',
            },
            components: {
              Button: {
                colorPrimary: 'var(--jv-red)',
                colorPrimaryHover: 'linear-gradient(to right,#DCB967,#C9A858,#EDD56E,#E1BD59)',
                fontWeight: 700,
                // fontFamily: 'var(--font-noto-devnagari)',
              }
            }
          }}>
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
