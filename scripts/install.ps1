cd backend
npm install -g typescript
npm install -g ts-node
npm install -g typeorm
npm install
npm upgrade
cd ..
cd frontend
npm install
npm upgradde
cd ..
Write-Host -NoNewLine 'Skript färdigt... tryck valfri knapp för att avsluta';
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');
