# ResistAI Web

Web platform for the [ResistAI](https://github.com/kagansaglam/resistai) antibiotic resistance research platform.

**Live site:** [resistai.bio](https://resistai.bio)
**Deploy:** Vercel

---

## Features

- **Protein search** — browse and filter 2,433 AMR proteins by druggability tier, resistance family, and organism
- **Druggability dashboard** — interactive charts, binding pocket details, and AlphaFold structure viewer
- **ESM-2 similarity search** — find related proteins using protein language model embeddings
- **Literature RAG** — semantic search across 2,508 PubMed articles
- **AI research assistant** — ask questions about AMR targets, grounded in indexed literature (Llama 3.3 70B)
- **Email reports** — receive druggability summaries via email (Resend)

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database / Auth | Supabase |
| Deploy | Vercel |
| Email | Resend |
| API | [resistai-api.onrender.com](https://resistai-api.onrender.com) |

---

## Local Development

```bash
git clone https://github.com/kagansaglam/resistai-web.git
cd resistai-web
npm install
cp .env.example .env.local
# Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, API_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Related Repositories

| Repo | Description |
|---|---|
| [resistai](https://github.com/kagansaglam/resistai) | Pipeline (Nextflow, ESM-2, fpocket, XGBoost) |
| [resistai-api](https://github.com/kagansaglam/resistai-api) | FastAPI backend |

---

## License

MIT
