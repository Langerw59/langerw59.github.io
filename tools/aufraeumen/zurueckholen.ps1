# Quantura - Zurueckholen
# Holt alles aus dem letzten Lager-Ordner wieder an den alten Platz in "vorlage".

$ErrorActionPreference = 'Stop'
$root   = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$eltern = Split-Path $root -Parent
$lager  = Get-ChildItem -Path $eltern -Directory -Filter '_Lager_vorlage_*' | Sort-Object Name | Select-Object -Last 1
if (-not $lager) { Write-Host 'Kein Lager-Ordner gefunden.' -ForegroundColor Red; Read-Host 'Enter'; exit 1 }
$liste = Join-Path $lager.FullName '_LISTE.txt'
if (-not (Test-Path $liste)) { Write-Host '_LISTE.txt fehlt im Lager.' -ForegroundColor Red; Read-Host 'Enter'; exit 1 }

$eintraege = Get-Content $liste -Encoding UTF8 | Select-Object -Skip 1 | Where-Object { $_.Trim() -ne '' }
Write-Host ('Lager: ' + $lager.FullName)
Write-Host ($eintraege.Count.ToString() + ' Eintraege werden zurueck nach "vorlage" gelegt.')
$antwort = Read-Host 'Zurueckholen? (J = ja, N = nein)'
if ($antwort -notmatch '^[JjYy]') { Write-Host 'Abgebrochen.'; Read-Host 'Enter'; exit 0 }

$ok = 0
foreach ($rel in $eintraege) {
    $quelle = Join-Path $lager.FullName $rel
    $ziel   = Join-Path $root $rel
    if (Test-Path -LiteralPath $quelle) {
        if (Test-Path -LiteralPath $ziel) { Write-Host ('  existiert schon, uebersprungen: ' + $rel) -ForegroundColor Yellow; continue }
        New-Item -ItemType Directory -Path (Split-Path $ziel -Parent) -Force | Out-Null
        Move-Item -LiteralPath $quelle -Destination $ziel
        $ok++
    }
}
Write-Host ('Fertig: ' + $ok + ' zurueckgeholt.') -ForegroundColor Green
Read-Host 'Enter druecken zum Schliessen'
