# FWK23S_SKI_Backend

- innan start. installera: (npm install)

- Våra lösenord, portnummer och den hemliga nycken ligger i en .env fil som dolts i gitignore. Lösenorden är hashade av säkerhetskäl.

- Vi har skapat möjligheten för att endast admin ska ha tillgång till hemlig data på hemsidan. Annars kommer det upp ett felmeddelande (403)

##   Verify JWT
Backend server Verifiea JWT med SECRET_KEY och kolla på roll som är admin eller user i payload

##   Respons 200, 403
Skicka respons 200 om rollen är admin. Skicka respons 403 om rollen är user

##  Hur server kommunicerar varandra med JWT
1. Frontend skickar credential (e-mail, lösenord) till Auth 
2. Auth kollar på inlogning uppgifter i users.json.Loggin Lyckas.
3. Auth utfäder JWT med SECRET_KEY och skicka de till Frontend
4. Frontend sparar JWT i LocalStrage.
5. Frontend Skickar request med JWT i header till Backend -> headers: { Authorization: `Bearer ${token}` }
6. Backend verify JWT och
7. Backend kollar på rollen, admin eller user i payload
8. Backend skickar respons till Frontend 


