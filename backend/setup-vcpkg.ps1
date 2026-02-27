# vcpkg setup script for Windows
# Edit this script to define your own static-link libraries via vcpkg

param(
    [string]$VcpkgRoot = $env:VCPKG_ROOT,
    [string]$Triplet = "x64-windows-static-release"
)

Write-Host "=== vcpkg Static Link Setup Template ===" -ForegroundColor Cyan

# Check if vcpkg is installed
if (-not $VcpkgRoot) {
    Write-Host "ERROR: VCPKG_ROOT environment variable is not set" -ForegroundColor Red
    Write-Host "Please install vcpkg and set VCPKG_ROOT:" -ForegroundColor Yellow
    Write-Host "  1. git clone https://github.com/Microsoft/vcpkg.git" -ForegroundColor Yellow
    Write-Host "  2. cd vcpkg && .\bootstrap-vcpkg.bat" -ForegroundColor Yellow
    Write-Host "  3. Set VCPKG_ROOT environment variable to vcpkg directory" -ForegroundColor Yellow
    exit 1
}

$vcpkgExe = Join-Path $VcpkgRoot "vcpkg.exe"
if (-not (Test-Path $vcpkgExe)) {
    Write-Host "ERROR: vcpkg.exe not found at $vcpkgExe" -ForegroundColor Red
    Write-Host "Please run bootstrap-vcpkg.bat first" -ForegroundColor Yellow
    exit 1
}

Write-Host "Found vcpkg at: $vcpkgExe" -ForegroundColor Green
Write-Host "Using triplet: $Triplet" -ForegroundColor Green
Write-Host ""

Write-Host "This script is a template for static-link setup via vcpkg." -ForegroundColor Green
Write-Host "Update the install target(s) in this script to use any library you need." -ForegroundColor Green
Write-Host ""
Write-Host "Example:" -ForegroundColor Cyan
Write-Host "  $vcpkgExe install <package>:$Triplet" -ForegroundColor Cyan
Write-Host "  $vcpkgExe install libpng:$Triplet" -ForegroundColor Cyan

Write-Host "=== Setup Complete ===" -ForegroundColor Cyan
Write-Host "You can now build the project with:" -ForegroundColor Green
Write-Host "  cargo build --release" -ForegroundColor Green
Write-Host ""
Write-Host "Note: Make sure VCPKG_ROOT environment variable is set in your shell" -ForegroundColor Yellow
