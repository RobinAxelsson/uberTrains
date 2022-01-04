cd backend
Write-Host "Installerar backend-paket..." -ForegroundColor Green;
Write-Host "";
npm install -g typescript
npm install -g ts-node
npm install -g typeorm
npm install
Write-Host "";
Write-Host "";
Write-Host "";
Write-Host "Uppgraderar paket..." -ForegroundColor Green;
Write-Host "";
npm upgrade
Write-Host "";
Write-Host "";
Write-Host "";
cd ..
cd frontend
Write-Host "Installerar frontend-paket..." -ForegroundColor Green;
Write-Host "";
npm install
cd ..
Write-Host "";
Write-Host "";
Write-Host "";
Write-Host -NoNewLine 'Skript färdigt... tryck valfri knapp för att avsluta' -ForegroundColor Green;
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');
