import type { Article } from "@/lib/articles";

type ArticleFormProps = {
  article?: Article;
  action: string;
  submitLabel: string;
};

export function ArticleForm({ article, action, submitLabel }: ArticleFormProps) {
  return <form className="admin-form" action={action} method="post">
    <label>Judul artikel<input name="title" required minLength={5} defaultValue={article?.title} placeholder="Contoh: Checklist Cek Mobil Bekas Sebelum Membeli" /></label>
    <label>Alamat artikel (opsional)<input name="slug" defaultValue={article?.slug} placeholder="checklist-cek-mobil-bekas" /><small>Kosongkan jika ingin dibuat otomatis dari judul.</small></label>
    <label>Ringkasan singkat<textarea name="excerpt" rows={3} maxLength={300} defaultValue={article?.excerpt} placeholder="Ringkasan yang muncul pada daftar artikel." /></label>
    <label>Isi artikel<textarea name="body" rows={16} required minLength={80} defaultValue={article?.body} placeholder="Tulis artikel di sini. Pisahkan paragraf dengan satu baris kosong." /></label>
    <label>Deskripsi Google (maks. 160 karakter)<textarea name="metaDescription" rows={3} maxLength={160} defaultValue={article?.metaDescription} placeholder="Ringkasan untuk hasil pencarian Google." /></label>
    <label>Status<select name="status" defaultValue={article?.status ?? "draft"}><option value="draft">Simpan sebagai draft</option><option value="published">Terbitkan sekarang</option></select></label>
    <div className="form-actions"><button className="btn" type="submit">{submitLabel}</button><a className="admin-cancel" href="/admin">Batal</a></div>
  </form>;
}
