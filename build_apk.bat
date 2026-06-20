@echo off
echo Building React App...
call npm run build

echo Syncing with Capacitor...
call npx cap sync

echo Building Android APK (Debug)...
cd android
call gradlew.bat assembleDebug
cd ..

echo Copying APK to public folder...
copy "android\app\build\outputs\apk\debug\app-debug.apk" "public\learncode.apk"

echo.
echo ========================================================
echo Done! The APK is now in your public/ folder.
echo You can now commit and push to Git to deploy it to Vercel:
echo.
echo git add public/learncode.apk
echo git commit -m "Add compiled Android APK for download"
echo git push
echo ========================================================
