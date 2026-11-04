# Quantura - Aufraeumen
# Verschiebt alte Sicherungen, Archive und Duplikate aus "vorlage" in einen
# Lager-Ordner NEBEN "vorlage". Es wird NICHTS geloescht.
# Zurueckholen: zurueckholen.bat im selben Ordner.

$ErrorActionPreference = 'Stop'
$root  = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$datum = Get-Date -Format 'yyyy-MM-dd_HHmm'
$lager = Join-Path (Split-Path $root -Parent) ("_Lager_vorlage_" + $datum)

Write-Host ''
Write-Host '=== Quantura aufraeumen ===' -ForegroundColor Cyan
Write-Host ('Projekt: ' + $root)
Write-Host ('Lager  : ' + $lager)
Write-Host ''

if (-not (Test-Path (Join-Path $root 'pages\language_lab'))) {
    Write-Host 'FEHLER: Das sieht nicht wie der Ordner "vorlage" aus. Abbruch.' -ForegroundColor Red
    Read-Host 'Enter druecken zum Schliessen'; exit 1
}

function Rel([string]$p) { return $p.Substring($root.Length).TrimStart('\','/') }
function IsGit([string]$p) { return ($p -match '[\\/]\.git([\\/]|$)') }

# 1) Ordner, die nur Sicherungen / Archive / Berichte enthalten
$namensMuster = @(
    '^_backup',            # _backup_maus..., _backup_sprachfuehrer_...
    '^_BACKUPS$',
    '^_bak_',              # _bak_gs_fix_...
    '^_archive',           # pages\_archive, _archive_duplicates
    '__SAVE_',             # math_module__SAVE_...
    '^data_backup_'        # talk_levels\data\data_backup_...
)
$festeOrdner = @('_meta', '_REPORTS', 'pages\language_lab\_alt')

$ordner = New-Object System.Collections.Generic.List[string]
foreach ($f in $festeOrdner) {
    $p = Join-Path $root $f
    if (Test-Path $p) { $ordner.Add((Resolve-Path $p).Path) }
}
Get-ChildItem -Path $root -Directory -Recurse -Force | Where-Object { -not (IsGit $_.FullName) } | ForEach-Object {
    $name = $_.Name
    foreach ($m in $namensMuster) { if ($name -match $m) { $ordner.Add($_.FullName); break } }
}
# verschachtelte entfernen (wenn schon der Elternordner verschoben wird)
$ordner = $ordner | Sort-Object { $_.Length } -Unique
$ausgewaehlt = New-Object System.Collections.Generic.List[string]
foreach ($o in $ordner) {
    $drin = $false
    foreach ($a in $ausgewaehlt) { if ($o.StartsWith($a + '\') -or $o.StartsWith($a + '/')) { $drin = $true; break } }
    if (-not $drin) { $ausgewaehlt.Add($o) }
}

# 2) einzelne .bak-Dateien, aelter als 7 Tage (neuere bleiben als Sicherheitskopie)
$grenze = (Get-Date).AddDays(-7)
$dateien = Get-ChildItem -Path $root -File -Recurse -Force | Where-Object {
    $_.Name -match '\.bak' -and $_.LastWriteTime -lt $grenze -and -not (IsGit $_.FullName)
} | Where-Object {
    $f = $_.FullName; $drin = $false
    foreach ($a in $ausgewaehlt) { if ($f.StartsWith($a + '\') -or $f.StartsWith($a + '/')) { $drin = $true; break } }
    -not $drin
} | ForEach-Object { $_.FullName }

$alle = @($ausgewaehlt) + @($dateien)
if ($alle.Count -eq 0) { Write-Host 'Nichts zu tun - alles schon ordentlich.' -ForegroundColor Green; Read-Host 'Enter'; exit 0 }

# Vorschau
$gesamt = 0
Write-Host 'Diese ORDNER kommen ins Lager:' -ForegroundColor Yellow
foreach ($o in $ausgewaehlt) {
    $g = (Get-ChildItem $o -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum
    if (-not $g) { $g = 0 }; $gesamt += $g
    Write-Host ('  ' + (Rel $o) + '   (' + [math]::Round($g/1MB,1) + ' MB)')
}
Write-Host ''
Write-Host ('Dazu ' + @($dateien).Count + ' alte .bak-Dateien (aelter als 7 Tage).') -ForegroundColor Yellow
foreach ($d in $dateien) { $gesamt += (Get-Item $d -Force).Length }
Write-Host ''
Write-Host ('Zusammen ca. ' + [math]::Round($gesamt/1MB,1) + ' MB.')
Write-Host 'Es wird NICHTS geloescht, nur verschoben.' -ForegroundColor Green
Write-Host ''
$antwort = Read-Host 'Jetzt verschieben? (J = ja, N = nein)'
if ($antwort -notmatch '^[JjYy]') { Write-Host 'Abgebrochen. Nichts veraendert.'; Read-Host 'Enter'; exit 0 }

New-Item -ItemType Directory -Path $lager -Force | Out-Null
$liste = Join-Path $lager '_LISTE.txt'
"Quelle: $root" | Out-File $liste -Encoding UTF8
$ok = 0; $fehler = 0
foreach ($p in $alle) {
    $rel = Rel $p
    $ziel = Join-Path $lager $rel
    try {
        New-Item -ItemType Directory -Path (Split-Path $ziel -Parent) -Force | Out-Null
        Move-Item -LiteralPath $p -Destination $ziel -Force
        $rel | Out-File $liste -Append -Encoding UTF8
        $ok++
    } catch {
        Write-Host ('  nicht verschoben: ' + $rel + ' - ' + $_.Exception.Message) -ForegroundColor Red
        $fehler++
    }
}
Write-Host ''
Write-Host ('Fertig: ' + $ok + ' verschoben, ' + $fehler + ' Fehler.') -ForegroundColor Green
Write-Host ('Lager: ' + $lager)
Write-Host 'Wenn alles laeuft, kann das Lager spaeter einfach geloescht werden.'
Read-Host 'Enter druecken zum Schliessen'
