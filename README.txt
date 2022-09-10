ProgettoAnimalHouse-a.a.2122

Componenti Progetto: Samuele Berni, Alvise Amati, Andrea Del Pino

Per avviare il nostro progetto occorre recarsi nel terminale nella root del progetto e spostarsi nella cartella "backend"; 
ed avviare il server con "node server.js". La cartella iniziale sarà "frontend/frontoffice/Index/index.html", ovvero il file di login/registrazione o dove è possibile direttamente collegarsi alla pagina  dei  giochi.

Una volta su questa pagina potrai Registrare un nuovo utente base/ Loggarti / o giocare con un nickname.
Gli utenti base per il login sono Admin Admin per accedere al backend degli amministratori o Normal Normal per accedere ai contenuti
come utente normale. Di admin ne esiste solamente uno e non è possibile crearne ulteriori se non direttamente sul file di json.

ACCESSO NORMALE:
Se accedi da utente normale appena completerai il login ti ritrovi nella pagina "Logged.html".
Nell'header tramite il bottone Modifica profilo potrai aggiungere gli animali preferiti.
Mentre nei bottoni sotto vedrai i 5 servizi a cuoi puoi accedere. 
    1- BACHECA "Bacheca.html" qua troverai un form dove potrai aggiungere un tuo post con il link di un immagine online
       e sotto vedrai tutti i post aggiunti e dall'utente che lo ha fatto
    2- LEADERBOARD "Leaderboard.html" qua avrai le tabelle con i migliori punteggi dei giocatori nei game,  verranno visualizzati solamente i 10 migliori punteggi.
    3- ECOMMERCE "Ecommerce.html" appena caricata la pagine vedrai tutti i prodotti disponibili nello store e puoi selezionare tra 2 categorie
       con i corrispettivi bottoni. puoi aggiungere quanti item vuoi al carrello e cliccando sul bottone checkout visualizzerai la pagina per rivedere gli item aggiunti e confermare l'acquisto
    4- SERVIZI "Servizi.html" qua avrai un form per prenotare un servizio, dove ovviamente se nessun utente ha prenotato quel servizio quel giorno, permetterà la prenotazione
       mentre con il bottone View service vedi stampati tutti i servizi prenotati personali
    5- GAME (N.B. se vai su game da loggato ti rimanda alla piattaforma game ma ci entri da utente loggato invece che dovendo scrivere il proprio nickname)


ACCESSO ADMIN:
Se accedi da utente Admin ti ritrovi in "BackOffice.html" dove avrai 2 azioni:
    -ANAGRAFICA CLIENTI effettui le operazioni sugli utenti 
        -Creazione utente: crei un nuovo utente
        -Modifica Profilo: hai la possibilita digitando lo username di un account di vedere tutti i dati e le preferenze e modificare 
    -GESTIONE ECOMMERCE: potrai visualizzare gli oggetti in vendita, aggiungerli o eliminarli




Se  sempre dall' index.html invece di Loggarti vai nel "Gioca con noi" potrai scegliere un nickname e giocare comunque
a tutti i minigame.
Oltre a questo potrai vedere i servizi commerciali disponibili e anche tutti gli item dell'ecoomerce senza poter comprare
che resta riservato agli utenti loggati.
Abbiamo fatto i seguenti giochi: 
	1- Quiz: dove dovrai indovinare l'animale corrispondente e più ne riesci a fare più punti fai
	2- Memory: prima risolvi il gioco del memory più punti fai
	3- Curiosity: per visualizzare le curiosità sugli animali
	4- Memes: pagina in cui visualizzi dei video divertenti su animali e simili