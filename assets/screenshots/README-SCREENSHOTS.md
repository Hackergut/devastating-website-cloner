# 📸 Come Aggiungere Screenshot Reali

## Problema
Gli screenshot attuali sono immagini generiche del sito Ledger, non mostrano il nostro clone in azione.

## Soluzione

### Opzione 1: Screenshot del Clone Locale

1. **Avvia il progetto localmente:**
```bash
npm run dev
```

2. **Apri il browser:**
```
http://localhost:3000
```

3. **Fai uno screenshot:**
- Mac: `CMD + Shift + 4`
- Windows: `Win + Shift + S`
- Linux: `Shift + PrtSc`

4. **Salva come:**
```
assets/screenshots/ledger-clone-desktop.png
```

### Opzione 2: Screenshot dello Script in Azione

1. **Esegui lo script:**
```bash
npm run clone https://stripe.com
```

2. **Mentre gira, fai screenshot del terminale**

3. **Salva come:**
```
assets/screenshots/extraction-demo.png
```

### Opzione 3: Usa Immagini Esistenti

Le immagini estratte sono in:
```
public/images/visual-23.webp  (immagine principale)
public/images/Nano-Gen5-visual.webp  (prodotto)
public/images/ledger-stax-face.webp  (prodotto)
```

Copia una di queste:
```bash
cp public/images/visual-23.webp assets/screenshots/demo.png
```

## Formato Ideale

- **Desktop**: 1440x900 o 1920x1080
- **Tablet**: 768x1024
- **Mobile**: 390x844
- **Formato**: PNG o WebP

## Dopo aver aggiunto gli screenshot

1. **Commit:**
```bash
git add assets/screenshots/
git commit -m "📸 Add real screenshots"
git push
```

2. **Aggiorna README:** Le immagini verranno mostrate automaticamente

## Per una GIF Demo

Usa uno di questi tool:
- **terminalizer**: `npm install -g terminalizer`
- **asciinema**: `asciinema rec demo.cast`
- **LICEcap** (GUI per Mac/Windows)
- **Peek** (Linux)

Registra mentre esegui:
```bash
npm run clone https://example.com
```
