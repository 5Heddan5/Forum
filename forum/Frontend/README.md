.
├── backend/
│   ├── database/
│   │   └── forum.db      # Din SQLite-databas
│   ├── server.js         # Express server (API backend)
│   └── routes/
│       └── threads.js    # API-rutter för trådar och kommentarer
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── ThreadList.js   # Lista med trådar (i din huvudvy)
│       │   ├── Thread.js       # Komponent för att visa detaljerad tråd
│       │   └── CommentForm.js  # Komponent för att skapa en kommentar
│       ├── views/
│       │   ├── Home.js         # Första sidan med alla trådar
│       │   ├── AddThread.js    # Sidan för att skapa en ny tråd
│       │   ├── ThreadDetail.js # Detaljsida för en tråd där kommentarer kan läggas
│       ├── App.js              # Huvudkomponent där routing sker
│       ├── routes.js           # Routing-konfiguration
│       └── index.js            # Inträdespunkt för React-applikationen
└── package.json              # Paketkonfiguration
