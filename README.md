# KDS KVIZ

Mobilni quiz za moderatore: klikni **Randomize**, dobiješ 3 pitanja iz pravilnika, a odgovore otvaraš tapom dok pitaš igrača.

## Lokalni pregled

GitHub Pages i `fetch` zahtijevaju HTTP server (otvaranje `index.html` kao `file://` neće učitati JSON).

```bash
# Python
python3 -m http.server 8080

# ili Node
npx serve .
```

Otvori [http://localhost:8080](http://localhost:8080).

## GitHub Pages

1. Pushaj repo na GitHub.
2. **Settings → Pages → Build and deployment**
3. Source: **Deploy from a branch**
4. Branch: `main` (ili `master`), folder: **/ (root)**
5. Spremi — site će biti na `https://<user>.github.io/<repo>/`

## Struktura

| Datoteka | Opis |
| --- | --- |
| `index.html` | UI ljuska |
| `styles.css` | Mobile-first stilovi |
| `app.js` | Randomize + tap-to-reveal |
| `questions.json` | Pitanja na hrvatskom |
| `questions.txt` | Izvorni engleski Q&A |

## Dodavanje pitanja

Uredi `questions.json`:

```json
{
  "id": 77,
  "category": "Naziv kategorije",
  "question": "Tekst pitanja?",
  "answer": "Tekst odgovora."
}
```
