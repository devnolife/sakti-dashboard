# Script Test Manual GraphQL dengan PowerShell
# 1. Login dengan mutation Signin
# 2. Ambil access_token
# 3. Gunakan token sebagai Bearer token untuk query Profile

$GRAPHQL_ENDPOINT = "https://superapps.if.unismuh.ac.id/graphql"

Write-Host "`n========================================"
Write-Host "🧪 TEST MANUAL GRAPHQL" -ForegroundColor Yellow
Write-Host "========================================`n"

# STEP 1: LOGIN (SIGNIN)
Write-Host "📝 STEP 1: Login dengan Signin mutation..." -ForegroundColor Cyan
Write-Host "Endpoint: $GRAPHQL_ENDPOINT"
Write-Host "Username: 105841102021"
Write-Host "Password: SamaSemua"
Write-Host ""

$signinMutation = @"
{
  "query": "mutation Signin { signin(loginUserInput: { username: \"105841102021\", password: \"SamaSemua\" }) { access_token user { id username role } } }"
}
"@

try {
    $signinResponse = Invoke-RestMethod -Uri $GRAPHQL_ENDPOINT -Method Post -Body $signinMutation -ContentType "application/json"
    
    if ($signinResponse.errors) {
        Write-Host "❌ SIGNIN FAILED!" -ForegroundColor Red
        Write-Host "Errors:" -ForegroundColor Red
        $signinResponse.errors | ConvertTo-Json -Depth 10
        exit 1
    }
    
    Write-Host "✅ SIGNIN SUCCESS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Response Data:" -ForegroundColor Cyan
    $signinResponse.data.signin | ConvertTo-Json -Depth 10
    Write-Host ""
    
    $accessToken = $signinResponse.data.signin.access_token
    $user = $signinResponse.data.signin.user
    
    Write-Host "🔑 Access Token: $($accessToken.Substring(0, [Math]::Min(50, $accessToken.Length)))..." -ForegroundColor Green
    Write-Host "👤 User ID: $($user.id)" -ForegroundColor Green
    Write-Host "👤 Username: $($user.username)" -ForegroundColor Green
    Write-Host "👤 Role: $($user.role)" -ForegroundColor Green
    Write-Host ""
    
    # STEP 2: GET PROFILE dengan Bearer Token
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "📝 STEP 2: Get Profile dengan Bearer Token..." -ForegroundColor Cyan
    Write-Host ""
    
    $profileQuery = @"
{
  "query": "query Profile { profile { id username name email phone role department { kode nama } } }"
}
"@
    
    $headers = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $accessToken"
    }
    
    $profileResponse = Invoke-RestMethod -Uri $GRAPHQL_ENDPOINT -Method Post -Body $profileQuery -Headers $headers
    
    if ($profileResponse.errors) {
        Write-Host "❌ PROFILE QUERY FAILED!" -ForegroundColor Red
        Write-Host "Errors:" -ForegroundColor Red
        $profileResponse.errors | ConvertTo-Json -Depth 10
        exit 1
    }
    
    Write-Host "✅ PROFILE QUERY SUCCESS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Profile Data:" -ForegroundColor Cyan
    $profileResponse.data.profile | ConvertTo-Json -Depth 10
    Write-Host ""
    
    # Summary
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "📋 SUMMARY" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "✅ Login berhasil" -ForegroundColor Green
    Write-Host "✅ Token diterima" -ForegroundColor Green
    Write-Host "✅ Profile berhasil diambil dengan Bearer token" -ForegroundColor Green
    Write-Host ""
    Write-Host "Profile Details:" -ForegroundColor Cyan
    Write-Host "  - ID: $($profileResponse.data.profile.id)"
    Write-Host "  - Username: $($profileResponse.data.profile.username)"
    Write-Host "  - Name: $($profileResponse.data.profile.name)"
    Write-Host "  - Email: $($profileResponse.data.profile.email)"
    Write-Host "  - Phone: $($profileResponse.data.profile.phone)"
    Write-Host "  - Role: $($profileResponse.data.profile.role)"
    
    if ($profileResponse.data.profile.department) {
        Write-Host "  - Department: $($profileResponse.data.profile.department.nama)"
        Write-Host "  - Dept Code: $($profileResponse.data.profile.department.kode)"
    }
    Write-Host ""
    
} catch {
    Write-Host "❌ ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host $_ -ForegroundColor Red
}

