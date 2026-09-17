import type {Metadata} from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
export const metadata:Metadata={
  metadataBase:new URL(SITE_URL),
 verification:{google:"kP0uh6id2kcfp0J95i7arlkvFWjVgr0hYtBLyAEqC9g"},
  title:"Jasa Inspeksi Mobil Bekas Bandung | Sidekick Inspector",
  description:"Jasa inspeksi mobil bekas Bandung untuk cek kondisi mesin, bodi, kelistrikan, kaki-kaki dan test drive. Harga mulai Rp350.000 dengan laporan objektif.",
  openGraph:{title:"Sidekick Inspector Bandung",description:"Cek kondisi mobil bekas sebelum beli dengan laporan inspeksi yang objektif.",type:"website",locale:"id_ID",images:["/images/inspection-engine.webp"]},
  robots:{index:true,follow:true},
  icons:{icon:"/images/sidekick-inspector-logo.png",shortcut:"/images/sidekick-inspector-logo.png"}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="id"><body>{children}</body></html>}
