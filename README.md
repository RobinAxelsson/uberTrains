# UberTrains Grupp 6

Detta repo avser ett bokningssystem för virtuella tågresor skapat som ett skolprojekt för kurs TH2103, Teknikhögskolan Göteborg.
Systemet är webbaserat och använder sig av följande teknologier:

`Node.js | Express.js | React | Sqlite | Tailwind | TypeORM`

- [UberTrains Grupp 6](#ubertrains-grupp-6)
  - [Verktyg som behövs](#verktyg-som-behövs)
- [Komma igång med projektet](#komma-igång-med-projektet)
  - [Kloning av Github-projekt](#kloning-av-github-projekt)
  - [Projektgrenar](#projektgrenar)
  - [Installation av dependencies](#installation-av-dependencies)
    - [Automatiserad installation](#automatiserad-installation)
    - [Manuell installation](#manuell-installation)
  - [Körning av projekt](#körning-av-projekt)
    - [Starta backend](#starta-backend)
    - [Starta frontend](#starta-frontend)
    - [Avsluta sessioner](#avsluta-sessioner)
  - [Dev Notes](#dev-notes)

## Verktyg som behövs

- Skapa konto på github.com
- Installera Git
- Installera Visual Studio Code (VS Code)
- Installera Postman (och skapa konto)
- Installera node.js
- Installera SQLite Studio

# Komma igång med projektet
**Denna guide avser att du redan installerat samtlig mjukvara som krävs**
## Kloning av Github-projekt
Öppna Visual Studio Code på din dator och i vänstra menyfältet väljer du "Source Control" <br>

![image](https://user-images.githubusercontent.com/70197523/146829432-7047612b-81b0-4898-bc67-71f3cf4ec1c6.png)

Därefter välj att klona ett repository och i sökfältet som dyker upp klistrar du in huvudlänken till projektet. <br>
Om du inte har denna länk så är URL:en: `https://github.com/malmz90/uberTrains` <br>
Avsluta genom att klicka på "Clone from URL". <br>
![image](https://user-images.githubusercontent.com/70197523/146829709-b154e920-f446-41e5-8861-fe0ec9b6ab7c.png)
<br>
I nästa steg väljer du i vilken mapp du vill arbeta med projektet. Sökvägen till detta är frivilligt. <br>

## Projektgrenar

Nu är du inne i projektets huvudgren. Men för att kunna testa nya implementationer behöver ni öppna den gren med den kod ni vill testa. <br>
Man arbetar i grenar och det är som kopior av projektet man sedan kan slå ihop. Detta gör man så ens nya kod inte påverkar någon annan. <br>
Vår huvudgren för utveckling kallas "dev" och där gäller "färdigbakad" kod som inte riktigt gått ut till användarna ännu. <br>
Gäller det ny kod för user stories har vi oftast egna branches för detta. <br>
Det är i en sådan branch ni kommer befinna er i när ni ska testa user stories, innan de bakas ihop med dev-grenen. <br> <br>
För att växla mellan grenar så trycker ni längst ner i det vänstra hörnet i VSCode och sedan klickar på den gren ni vill hoppa till i menyn som dyker upp. <br>

![image](https://user-images.githubusercontent.com/70197523/146832513-c1bde069-d0e9-4810-8b46-0138b448b80e.png) <br>

![image](https://user-images.githubusercontent.com/70197523/146832667-486eb21d-b78e-431e-88fc-b23d26521750.png) <br>

**I denna bilden har vi t.ex 3st grenar:** <br>

<ul>
  <li><strong>TypeORMImplementation</strong>: Detta är en gren som en utvecklare skapat för att utveckla en user story. På namnet antyder den att man arbetat med databashantering. Denna branch vill ni hoppa till om ni ska testa den koden som exempel</li>
  <li><strong>dev</strong>: Detta är vår gren där vi lägger färdiga funktioner innan de går till demo</li>
  <li><strong>main</strong>: Detta är vår live-gren. I ett verkligt projekt är alltså detta grenen som användarna ser. Denna vill vi alltså inte pusha till om vi inte är 100 på att implementationen fungerar.</li>
  <li><strong>handleTrainInfrastructure</strong>: Detta är en gren som en utvecklare skapat för att utveckla en user story. På namnet antyder den att man arbetat med infrastruktur för tåg. Denna branch vill ni hoppa till om ni ska testa den koden som exempel</li>
</ul>

## Installation av dependencies

Nu har du projektet på din dator och nästa steg är att installera samtliga dependencies. Detta kan göras automatiskt via ett skript eller manuellt. <br>
Välj vilken sektion av guiden du vill följa för manuellt respektive automatiskt.

### Automatiserad installation

Öppna ett nytt terminalfönster i VSCode genom att välja "Terminal" i översta menyraden och sedan klicka "New Terminal" <br>
Därefter kör nedan kod en rad i taget genom att klistra in och sedan klicka enter: <br>

```powershell
Set-ExecutionPolicy -ExecutionPolicy unrestricted -Scope CurrentUser
``` 

<br>

```powershell
./install.ps1
```

<br><br>
Nu kommer samtliga dependencies att installeras och projektet kommer vara redo att köras.
Installationsskriptet uppdateras löpande och ska innehålla samtliga nödvändiga paket.

### Manuell installation

Om du hellre vill lära dig och installera dependencies manuellt gör enligt nedan: <br> <br>

Öppna ett nytt terminalfönster i VSCode genom att välja "Terminal" i översta menyraden och sedan klicka "New Terminal" <br>
Därefter kör nedan kod **en rad i taget** genom att klistra in och sedan klicka enter: <br>

```powershell
cd backend
npm install -g typescript
npm install -g ts-node
npm install -g typeorm
npm install
cd ..
cd frontend
npm install
cd ..
```
<br><br>
Nu ska samtliga paket vara installerade och redo att köras. Paketen installeras via kommandot "npm install" från en fil som har flesta paketen listade. <br>
Det kan hända att vi har löpande lagt till paket i projektet som saknas i denna guide. Skulle du få problem vid körning, så är detta mycket möjligt en orsak. <br>
Då kan du prova att köra den automatiserade varianten om den skulle vara uppdaterad, alternativt höra med utvecklare för assistans.

## Körning av projekt

Körningen av projektet är uppdelat i två delar kallat "front-end" och "back-end". <br>
Tänk dig att frontend är det användaren ser - alltså det som är på scenen, medans backend är det som händer bakom kulisserna. <br>
T.ex om du är inne på Kicks och ska handla en parfym så lägger du den i varukorgen. Det du ser är att du trycker på en knapp med en kundvagn och du får parfymen i din varukorg.
Det är hemsidans frontend. <br> <br>
Men när du klickar på knappen så händer det egentligen mycket mer i bakgrunden, kanske reserverar lagersaldo osv. Det är backend.

<br> <br>
När du kör detta projekt behöver du alltså först starta vår backend som gör grovjobbet och sedan frontend. Noga att det exekveras i den ordningen. Alltså backend > frontend.

### Starta backend
För att starta backend skriver du nedan i ditt terminalfönster i VSCode: <br>
**Precis som innan, exekvera en rad åt gången** <br>
```powershell
cd backend
npm run start:dev
```

<br>

Nu ska du få ett meddelande som säger något dylikt: `Listening on port:4000` 
<br>
Får du istället felmeddelanden ha gärna kvar dom och fråga en utvecklare, eller Googla dom om du vill försöka lösa det själv. <br> 
**Man kan aldrig förstöra något, det går alltid att backa!!**

### Starta frontend

Nu när din backend körs så kan du inte skriva i det terminalfönstret, därför behöver du öppna en ny flik. Detta kan du göra på samma sätt du öppnade din första terminal, alltså översta menyn > Terminal > New Terminal <br>
Alternativt välja "plus-symbolen"
<br>
I ditt nya terminalfönster skriver du nedan kod för att starta din front-end: <br>

```powershell
cd frontend
npm start
```

<br>
Nu ska det öppnas ett webbläsarfönster med vår frontend. Får du felmeddelanden, som sagt kontakta oss.

### Avsluta sessioner

För att avsluta går du till respektive terminalfönster och klickar `"ctrl+c"`

## Dev Notes

>[How to setup a typescript project for node](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
