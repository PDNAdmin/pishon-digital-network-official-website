param([switch]$CropVariants)
$ErrorActionPreference = 'Stop'
$assetRoot = $PSScriptRoot
Add-Type -AssemblyName System.Drawing
if ($CropVariants) {
  $cropSources = @(Get-ChildItem -LiteralPath (Join-Path $assetRoot 'photography') -Filter 'hero-*.jpg' | Where-Object { $_.BaseName -notmatch '-mobile$' })
  $cropSources += @(Get-ChildItem -LiteralPath (Join-Path $assetRoot 'posters') -Filter '*.jpg' | Where-Object { $_.BaseName -notmatch '-mobile$' })
  foreach ($file in $cropSources) {
    $source = [System.Drawing.Image]::FromFile($file.FullName)
    try {
      $cropWidth = [int][Math]::Floor($source.Height * 9 / 16)
      $targetWidth = [int]([Math]::Floor($cropWidth / 9) * 9)
      $targetHeight = [int]($targetWidth / 9 * 16)
      $bitmap = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $focus = 0.5
        if ($file.Name -like 'testimonial-restaurant-*') { $focus = 0.74 }
        elseif ($file.Name -like 'testimonial-*') { $focus = 0.65 }
        $left = [int][Math]::Max(0, [Math]::Min($source.Width - $cropWidth, [Math]::Floor($source.Width * $focus - $cropWidth / 2)))
        $graphics.DrawImage($source, (New-Object System.Drawing.Rectangle(0,0,$targetWidth,$targetHeight)), (New-Object System.Drawing.Rectangle($left,0,$cropWidth,$source.Height)), [System.Drawing.GraphicsUnit]::Pixel)
        $bitmap.Save((Join-Path $file.DirectoryName ($file.BaseName + '-mobile.jpg')), [System.Drawing.Imaging.ImageFormat]::Jpeg)
      } finally { $graphics.Dispose(); $bitmap.Dispose() }
    } finally { $source.Dispose() }
  }
}
function Write-ReviewSheet($Folder, $OutputName, $CanvasWidth, $CanvasHeight) {
  $sourceFiles = @(Get-ChildItem -LiteralPath (Join-Path $assetRoot $Folder) -File | Where-Object { $_.Extension -in '.jpg','.png' -and $_.Name -notmatch '-mobile' } | Sort-Object Name)
  $canvas = New-Object System.Drawing.Bitmap($CanvasWidth,$CanvasHeight)
  $graphics = [System.Drawing.Graphics]::FromImage($canvas)
  $font = New-Object System.Drawing.Font('Arial',12)
  try {
    $graphics.Clear([System.Drawing.Color]::FromArgb(246,245,241))
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $rows = [Math]::Max(1,[Math]::Ceiling($sourceFiles.Count / 3))
    $cellWidth = $CanvasWidth / 3; $cellHeight = $CanvasHeight / $rows
    for ($i=0; $i -lt $sourceFiles.Count; $i++) {
      $image = [System.Drawing.Image]::FromFile($sourceFiles[$i].FullName)
      try {
        $x=($i%3)*$cellWidth; $y=[Math]::Floor($i/3)*$cellHeight
        $scale=[Math]::Min(($cellWidth-20)/$image.Width,($cellHeight-38)/$image.Height)
        $width=[int]($image.Width*$scale); $height=[int]($image.Height*$scale)
        $graphics.DrawImage($image,[int]($x+($cellWidth-$width)/2),[int]$y,$width,$height)
        $graphics.DrawString($sourceFiles[$i].Name,$font,[System.Drawing.Brushes]::Black,[single]($x+10),[single]($y+$cellHeight-28))
      } finally { $image.Dispose() }
    }
    $target=Join-Path $assetRoot $OutputName
    if (Test-Path -LiteralPath $target) {
      $resolved=(Resolve-Path -LiteralPath $target).Path
      if (-not $resolved.StartsWith($assetRoot+[IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)) { throw 'Review path outside asset root' }
      Remove-Item -LiteralPath $resolved -Force
    }
    $canvas.Save($target,[System.Drawing.Imaging.ImageFormat]::Png)
  } finally { $font.Dispose(); $graphics.Dispose(); $canvas.Dispose() }
}
Write-ReviewSheet 'photography' 'photography-review.png' 1200 900
Write-ReviewSheet 'illustrations' 'illustration-review.png' 1200 900
Write-ReviewSheet 'ads' 'ads-review.png' 1500 2100
$promptRecords = @{}
if (Test-Path -LiteralPath (Join-Path $assetRoot 'prompts.json')) {
  $promptDocument=Get-Content -LiteralPath (Join-Path $assetRoot 'prompts.json') -Raw | ConvertFrom-Json
  foreach ($record in $promptDocument.assets) { $promptRecords[$record.file]=$record }
}
$files = @(Get-ChildItem -LiteralPath $assetRoot -Recurse -File | Where-Object { $_.Extension -in '.jpg','.png','.svg' -and $_.FullName -notmatch '[\\/]_work[\\/]' } | Sort-Object FullName)
$inventory = @($files | ForEach-Object {
  $relative = $_.FullName.Substring($assetRoot.Length + 1).Replace('\','/')
  $width = $null; $height = $null; $alpha = $null
  if ($_.Extension -ne '.svg') {
    $image = [System.Drawing.Image]::FromFile($_.FullName)
    try { $width = $image.Width; $height = $image.Height; $alpha = [System.Drawing.Image]::IsAlphaPixelFormat($image.PixelFormat) } finally { $image.Dispose() }
  } else { [xml]$svg = Get-Content -LiteralPath $_.FullName -Raw; $bounds = $svg.svg.viewBox.Split(' '); $width = [int]$bounds[2]; $height = [int]$bounds[3]; if ([string]$svg.svg.width -match '^\d+$') { $width=[int]$svg.svg.width }; if ([string]$svg.svg.height -match '^\d+$') { $height=[int]$svg.svg.height }; $alpha = $true }
  $record=$promptRecords[$relative]
  [ordered]@{ file=$relative; width=$width; height=$height; bytes=$_.Length; transparent=$alpha; placeholder=($_.Name -match 'placeholder|mock-before-after'); round=$(if ($record -or $relative -match '-review.png$') {2} else {1}); modifiedUtc=$_.LastWriteTimeUtc.ToString('o'); sha256=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash; qualityReview=$record.review; productionMethod=$(if ($relative -like 'illustrations/*.svg') {'Model-generated art; VTracer outline trace'} elseif ($relative -like 'illustrations/*.png') {'2048px transparent render of traced SVG'} elseif ($_.Extension -eq '.svg') {'Native SVG'} elseif ($relative -match '-review.png$') {'Review contact sheet'} elseif ($relative -match '-mobile.jpg$') {'Crop of generated photo'} else {'Built-in image generation'}) }
})
$inventory | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $assetRoot 'manifest.json') -Encoding UTF8
$cards = foreach ($item in ($inventory | Where-Object { $_.file -notmatch '-review\.png$' })) {
  $file = [System.Net.WebUtility]::HtmlEncode($item.file)
  $label = if ($item.placeholder) { '<strong>LAYOUT PLACEHOLDER</strong>' } else { '' }
  '<a class="card" href="' + $file + '"><div class="media"><img loading="lazy" src="' + $file + '" alt="' + $file + '"></div><div class="caption">' + $file + '<small>' + $item.width + ' x ' + $item.height + '</small>' + $label + '</div></a>'
}
$html = @'
<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PDN asset gallery</title><style>*{box-sizing:border-box}body{margin:0;padding:48px;background:#F6F5F1;color:#0F0F10;font:16px/1.5 Arial,sans-serif}h1{font-size:48px;letter-spacing:-2px;margin:0}header{max-width:900px;margin-bottom:40px}p{max-width:750px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:20px}.card{display:block;color:inherit;text-decoration:none;border:1px solid #d9d8d3;border-radius:16px;overflow:hidden;background:white}.media{height:300px;display:flex;align-items:center;justify-content:center;background:#F6F5F1}.media img{width:100%;height:100%;object-fit:contain}.card[href^="icons/"] .media img{width:64px;height:64px}.caption{padding:16px;font-size:13px;overflow-wrap:anywhere}.caption small{display:block;color:#62625d}strong{display:inline-block;font-size:10px;letter-spacing:1px;border:1px solid #D4AF37;padding:3px 7px;margin-top:8px}a:focus-visible{outline:3px solid #0F0F10;outline-offset:4px}@media(max-width:600px){body{padding:24px}h1{font-size:36px}}</style><header><h1>PDN asset gallery</h1><p>Black and white. One gold detail. Select an asset to open its original file.</p><p>Photography is AI generated. Team and testimonial imagery are fictional layout placeholders; replace them with real people before publication. The before/after mockup is a design reference.</p></header><main class="grid">
'@
$html += $cards -join "`n"
$html += '</main></html>'
$html | Set-Content -LiteralPath (Join-Path $assetRoot 'index.html') -Encoding UTF8
Write-Output ('Catalogued ' + $inventory.Count + ' assets.')
