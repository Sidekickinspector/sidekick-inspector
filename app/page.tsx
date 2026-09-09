import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = { alternates: { canonical: SITE_URL } };

const wa = "https://wa.me/628118616666?text=Halo%20Sidekick%20Inspector%2C%20saya%20ingin%20booking%20inspeksi%20mobil%20bekas.";
const services = [
  ["Mesin & transmisi","Kebocoran, suara, cairan, performa mesin, dan respons transmisi."],
  ["Bodi & cat","Panel, ketebalan cat, bekas perbaikan, tabrakan, dan indikasi banjir."],
  ["Kelistrikan","Lampu, aki, fitur kabin, indikator, dan sistem elektronik kendaraan."],
  ["Kaki-kaki","Ban, rem, suspensi, kemudi, serta kondisi bagian bawah kendaraan."],
  ["Test drive","Kenyamanan, bunyi abnormal, kemudi, pengereman, dan akselerasi."],
  ["Laporan inspeksi","Temuan disajikan melalui laporan, foto, video, dan konsultasi."],
];
const packages = [
  {name:"Basic",tag:"Mulai Rp350.000",items:["150+ titik pengecekan","Laporan inspeksi PDF","Dokumentasi kondisi kendaraan"]},
  {name:"Premium",tag:"Hubungi WhatsApp",featured:true,items:["200+ titik pengecekan","Foto dan video detail","Konsultasi hasil inspeksi"]},
  {name:"Executive",tag:"Hubungi WhatsApp",items:["Pemeriksaan menyeluruh","Test drive","Laporan di hari yang sama","Deteksi masalah tersembunyi"]},
];
const faqs = [
  ["Apa saja yang diperiksa dalam jasa inspeksi mobil bekas Bandung?","Pemeriksaan meliputi mesin, transmisi, bodi dan cat, kelistrikan, kaki-kaki, fitur kabin, serta test drive sesuai kondisi dan paket yang dipilih."],
  ["Bagaimana proses cek dan inspeksi mobil bekas?","Kirim tipe mobil, lokasi, jadwal, dan kontak penjual melalui WhatsApp. Inspector datang ke lokasi, melakukan pemeriksaan, lalu menjelaskan temuan utamanya."],
  ["Berapa harga jasa inspeksi mobil bekas di Bandung?","Harga jasa inspeksi mobil bekas di Bandung mulai dari Rp350.000. Biaya akhir dikonfirmasi berdasarkan jenis kendaraan, lokasi, dan kebutuhan pemeriksaan."],
  ["Apakah tersedia jasa inspeksi mobil bekas terdekat?","Kami melayani jasa inspeksi mobil di Bandung dan sekitarnya. Kirim titik lokasi kendaraan agar ketersediaan jadwal dapat dikonfirmasi."],
  ["Apa tugas seorang inspektor mobil?","Inspektor mobil memeriksa kondisi teknis dan visual kendaraan, mendokumentasikan temuan, serta membantu pembeli memahami risiko sebelum transaksi."],
  ["Apakah layanan ini untuk inspeksi mokas Kota Bandung?","Ya. Layanan ini ditujukan bagi calon pembeli mobil bekas atau inspeksi mokas di Kota Bandung yang ingin mengetahui kondisi kendaraan sebelum membeli."],
  ["Bagaimana memilih jasa inspeksi mobil bekas terpercaya?","Pilih layanan yang menjelaskan cakupan pemeriksaan, memberikan dokumentasi dan laporan, serta membantu Anda memahami temuan tanpa memaksa keputusan pembelian."],
  ["Apa yang dibandingkan saat mencari jasa inspeksi mobil bekas terbaik?","Bandingkan cakupan pemeriksaan, kejelasan laporan, dokumentasi, biaya, dan kemudahan konsultasi agar layanan sesuai kebutuhan Anda."],
];

export default function Home(){
  const schema={"@context":"https://schema.org","@type":"AutomotiveBusiness",name:"Sidekick Inspector Bandung",description:"Jasa inspeksi mobil bekas Bandung dengan pemeriksaan menyeluruh dan laporan objektif.",telephone:"+62-811-8616-666",areaServed:["Bandung","Cimahi","Kabupaten Bandung"],sameAs:["https://www.instagram.com/inspeksimobilbandung/"],priceRange:"Mulai Rp350.000"};
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}}))};
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
    <header className="site-header">
      <a className="brand" href="#beranda"><img src="/images/sidekick-inspector-logo.png" alt="Logo Sidekick Inspector Bandung" width="62" height="62"/><span><strong>Sidekick Inspector</strong><small>Bandung</small></span></a>
      <nav aria-label="Navigasi utama"><a href="#tentang">Tentang</a><a href="#layanan">Layanan</a><a href="#proses">Proses</a><a href="#harga">Harga</a><Link href="/artikel">Artikel</Link><a href="#faq">FAQ</a></nav>
      <a className="btn small" href={wa} target="_blank" rel="noreferrer">Booking WhatsApp</a>
    </header>
    <section className="hero" id="beranda">
      <div className="hero-copy"><p className="eyebrow">Layanan inspeksi mobil bekas Bandung</p><h1>Jasa Inspeksi Mobil Bekas Bandung <em>Lebih Yakin Sebelum Beli.</em></h1><p className="lead">Cek dan inspeksi mobil bekas secara objektif sebelum transaksi—mulai dari mesin, bodi, kelistrikan, kaki-kaki hingga test drive.</p>
        <div className="actions"><a className="btn" href={wa} target="_blank" rel="noreferrer">Pesan Inspeksi</a><a className="text-link" href="#harga">Lihat paket & harga →</a></div>
        <div className="proof"><div><b>150+</b><span>Titik pengecekan</span></div><div><b>On-site</b><span>Datang ke lokasi</span></div><div><b>Transparan</b><span>Laporan terperinci</span></div></div>
      </div>
      <div className="hero-media"><img src="/images/inspection-engine.webp" alt="Inspector memeriksa mesin mobil bekas di Bandung"/><div className="badge"><span>✓</span><div><b>Inspeksi independen</b><small>Keputusan tetap di tangan Anda</small></div></div></div>
    </section>
    <div className="trust"><span>PEMERIKSAAN MENYELURUH</span><i>◆</i><span>LAPORAN OBJEKTIF</span><i>◆</i><span>KONSULTASI HASIL</span><i>◆</i><span>AREA BANDUNG & SEKITARNYA</span></div>
    <section className="about-section" id="tentang">
      <div className="about-kicker"><p className="eyebrow">Tentang Sidekick Inspector</p><h2>Inspeksi mobil bekas yang lebih objektif sebelum Anda bertransaksi.</h2></div>
      <div className="about-copy">
        <p><strong>SIDEKICK INSPECTOR</strong> adalah jasa inspeksi mobil bekas Bandung yang membantu calon pembeli mengetahui kondisi kendaraan secara objektif sebelum transaksi. Kami hadir sebagai layanan inspeksi mobil bekas terpercaya di Bandung, Cimahi, Kabupaten Bandung, dan wilayah sekitarnya.</p>
        <p>Pemeriksaan tidak hanya mengandalkan scanner elektronik modern untuk membaca data kendaraan secara real-time. Setiap inspeksi juga dikerjakan langsung oleh inspektor mobil berpengalaman melalui pemeriksaan fisik menyeluruh pada kondisi mesin, transmisi, kaki-kaki, body dan cat, interior, kelistrikan, fitur, ban, serta indikasi bekas tabrakan, banjir, kerusakan, atau perbaikan.</p>
        <p>Sebagai jasa inspector mobil independen, SIDEKICK INSPECTOR membantu Anda melakukan cek dan inspeksi mobil bekas dengan lebih detail dan terukur. Layanan ini cocok bagi Anda yang mencari jasa inspeksi mobil di Bandung, jasa inspeksi mobil bekas terdekat, maupun inspeksi mokas di Kota Bandung sebelum membeli unit dari perorangan, showroom, atau marketplace.</p>
        <p>Setiap temuan penting didokumentasikan dengan foto, terutama pada titik cacat atau masalah yang ditemukan. Hasil pemeriksaan diberikan dalam laporan digital PDF yang rapi, mudah dipahami, dan dapat diunduh sebagai bahan pertimbangan sebelum membeli mobil.</p>
        <p>Hubungi kami untuk mengetahui harga jasa inspeksi mobil bekas di Bandung dan menjadwalkan pemeriksaan kendaraan pilihan Anda.</p>
        <div className="about-contact"><strong>SIDEKICK INSPECTOR — Beli mobil bekas lebih yakin, lebih aman, dan lebih transparan.</strong><a href={wa} target="_blank" rel="noreferrer">WhatsApp: 0811-8616-666</a><a href="https://www.instagram.com/inspeksimobilbandung/" target="_blank" rel="noreferrer">Instagram: @inspeksimobilbandung</a></div>
      </div>
    </section>
    <section className="section" id="layanan">
      <div className="section-head"><div><p className="eyebrow">Apa yang kami periksa</p><h2>Layanan Inspeksi Mobil Bekas Bandung yang menyeluruh.</h2></div><p>Setiap bagian penting diperiksa untuk membantu mengurangi risiko biaya perbaikan tak terduga setelah membeli mobil bekas.</p></div>
      <div className="service-grid">{services.map(([title,text],i)=><article className="service" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="process" id="proses">
      <div className="process-media"><img src="/images/electrical-test.webp" alt="Pemeriksaan kelistrikan mobil bekas"/></div>
      <div className="process-copy"><p className="eyebrow">Proses yang jelas</p><h2>Dari booking hingga laporan, tanpa dibuat rumit.</h2><ol>
        <li><b>01</b><div><h3>Kirim data kendaraan</h3><p>Berikan lokasi, jadwal, tipe mobil, dan kontak penjual.</p></div></li>
        <li><b>02</b><div><h3>Inspector datang ke lokasi</h3><p>Kami melakukan pemeriksaan sesuai paket yang dipilih.</p></div></li>
        <li><b>03</b><div><h3>Terima laporan & konsultasi</h3><p>Pelajari temuan utama sebelum Anda membuat keputusan.</p></div></li>
      </ol><a className="btn" href={wa} target="_blank" rel="noreferrer">Booking Sekarang</a></div>
    </section>
    <section className="section pricing" id="harga">
      <div className="center-head"><p className="eyebrow">Paket inspeksi</p><h2>Harga Jasa Inspeksi Mobil Bekas di Bandung.</h2><p>Harga jasa inspeksi mobil bekas mulai dari Rp350.000. Konfirmasi harga akhir berdasarkan jenis kendaraan dan lokasi.</p></div>
      <div className="price-grid">{packages.map(p=><article className={"price-card "+(p.featured?"featured":"")} key={p.name}>{p.featured&&<span className="popular">Paling lengkap</span>}<p>Paket</p><h3>{p.name}</h3><strong>{p.tag}</strong><ul>{p.items.map(x=><li key={x}>✓ {x}</li>)}</ul><a className={"btn "+(!p.featured?"outline":"")} href={wa} target="_blank" rel="noreferrer">Pilih Paket</a></article>)}</div>
      <p className="note">*Harga dan cakupan layanan dapat menyesuaikan jenis kendaraan, lokasi, serta kebutuhan pemeriksaan.</p>
    </section>
    <section className="gallery-section" id="hasil">
      <div className="section-head light"><div><p className="eyebrow">Dokumentasi lapangan</p><h2>Ketelitian terlihat dari setiap proses.</h2></div><p>Foto kegiatan pemeriksaan Sidekick Inspector di lokasi pelanggan.</p></div>
      <div className="gallery">{["inspection-lamp.webp","engine-stethoscope.webp","report-tablet.webp","report-review.webp","customer-handover.webp","test-drive.webp"].map((imageName,i)=><figure className={"g"+(i+1)} key={imageName}><img src={"/images/"+imageName} alt={["Pemeriksaan lampu mobil","Pemeriksaan mesin mobil","Pencatatan laporan inspeksi","Review dokumen kendaraan","Serah terima hasil inspeksi","Test drive mobil bekas"][i]}/></figure>)}</div>
    </section>
    <section className="section faq-section" id="faq">
      <div className="section-head"><div><p className="eyebrow">Pertanyaan umum</p><h2>Informasi jasa inspeksi mobil di Bandung.</h2></div><p>Jawaban singkat untuk membantu Anda menyiapkan pemeriksaan mobil bekas sebelum booking.</p></div>
      <div className="faq-list">{faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
    <section className="cta"><img src="/images/sidekick-inspector-logo.png" alt="Sidekick Inspector" width="150" height="150"/><div><p className="eyebrow">Jangan beli dalam keraguan</p><h2>Cek kondisi mobilnya sebelum Anda bertransaksi.</h2><p>Booking inspeksi mobil bekas di Bandung dan sekitarnya melalui WhatsApp.</p></div><a className="btn" href={wa} target="_blank" rel="noreferrer">WhatsApp 0811-8616-666</a></section>
    <footer><div className="footer-brand"><img src="/images/sidekick-inspector-logo.png" alt="Logo Sidekick Inspector" width="74" height="74"/><div><b>Sidekick Inspector</b><span>Jasa Inspeksi Mobil Bekas Bandung</span></div></div><div><b>Layanan</b><a href="#layanan">Inspeksi Mobil Bekas</a><a href="#harga">Paket & Harga</a><Link href="/artikel">Artikel & Panduan</Link><a href="#faq">Pertanyaan Umum</a></div><div><b>Hubungi</b><a href={wa}>0811-8616-666</a><a href="https://www.instagram.com/inspeksimobilbandung/">@inspeksimobilbandung</a><span>Bandung dan sekitarnya</span></div><p className="copyright">© 2026 Sidekick Inspector Bandung. Semua hak dilindungi.</p></footer>
    <a className="floating" href={wa} target="_blank" rel="noreferrer" aria-label="Hubungi melalui WhatsApp">WA</a>
  </main>
}
