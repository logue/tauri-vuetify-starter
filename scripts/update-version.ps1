#!/usr/bin/env pwsh
# Update version across package.json, tauri.conf.json, and Cargo.toml from .env

param(
    [string]$EnvPath = "../.env"
)

$ErrorActionPreference = "Stop"

Write-Host "Reading version from .env..." -ForegroundColor Cyan

# Read version from .env
if (-not (Test-Path $EnvPath)) {
    Write-Error "Error: .env file not found at $EnvPath"
    exit 1
}

$version = ""
$envContent = Get-Content $EnvPath
foreach ($line in $envContent) {
    if ($line -match "^VERSION=(.+)$") {
        $version = $Matches[1].Trim()
        break
    }
}

if ([string]::IsNullOrEmpty($version)) {
    Write-Error "Error: VERSION not found in .env"
    exit 1
}

Write-Host "Found version: $version" -ForegroundColor Green

# Update app/package.json
Write-Host "Updating app/package.json..." -ForegroundColor Cyan
$packageJsonPath = "../app/package.json"
if (Test-Path $packageJsonPath) {
    $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
    $packageJson.version = $version
    $packageJson | ConvertTo-Json -Depth 100 | Set-Content $packageJsonPath -Encoding UTF8
    Write-Host "✓ Updated app/package.json to version $version" -ForegroundColor Green
} else {
    Write-Warning "Warning: $packageJsonPath not found"
}

# Update app/src-tauri/tauri.conf.json
Write-Host "Updating app/src-tauri/tauri.conf.json..." -ForegroundColor Cyan
$tauriConfPath = "../app/src-tauri/tauri.conf.json"
if (Test-Path $tauriConfPath) {
    $tauriConf = Get-Content $tauriConfPath -Raw | ConvertFrom-Json
    $tauriConf.version = $version
    $tauriConf | ConvertTo-Json -Depth 100 | Set-Content $tauriConfPath -Encoding UTF8
    Write-Host "✓ Updated app/src-tauri/tauri.conf.json to version $version" -ForegroundColor Green
} else {
    Write-Warning "Warning: $tauriConfPath not found"
}

# Update app/src-tauri/Cargo.toml
Write-Host "Updating app/src-tauri/Cargo.toml..." -ForegroundColor Cyan
$cargoTomlPath = "../app/src-tauri/Cargo.toml"
if (Test-Path $cargoTomlPath) {
    $cargoContent = Get-Content $cargoTomlPath -Raw
    $cargoContent = $cargoContent -replace 'version = "[^"]+"', "version = `"$version`""
    Set-Content $cargoTomlPath -Value $cargoContent -Encoding UTF8 -NoNewline
    Write-Host "✓ Updated app/src-tauri/Cargo.toml to version $version" -ForegroundColor Green
} else {
    Write-Warning "Warning: $cargoTomlPath not found"
}

Write-Host "`nVersion update complete! All files now use version $version" -ForegroundColor Green
