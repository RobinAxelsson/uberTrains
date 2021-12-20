cd backend
npm install -g typescript
npm install -g ts-node
npm install
cd ..
cd frontend
npm install
Write-Host -NoNewLine 'Skript färdigt... tryck valfri knapp för att avsluta';
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');