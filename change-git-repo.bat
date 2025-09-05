@echo off
echo Modification du depot Git pour le site Jardins
echo =========================================

set /p new_repo="Entrez l'URL du nouveau depot Git (ex: https://github.com/votre-nom/nouveau-repo.git): "

echo.
echo Modification de la configuration Git...
git remote set-url origin %new_repo%

echo.
echo Verification de la nouvelle configuration:
git remote -v

echo.
echo Configuration terminee. Le projet est maintenant lie au depot: %new_repo%
echo.
echo Pour pousser le code vers le nouveau depot, utilisez les commandes suivantes:
echo git add .
echo git commit -m "Premier commit dans le nouveau depot"
echo git push -u origin main
echo.
echo Appuyez sur une touche pour quitter...
pause > nul
