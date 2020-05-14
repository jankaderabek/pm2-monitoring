# Monitoring pm2 procesů

 Sada aplikací, které dohromady umožňují monitorovat provoz node aplikací napříč servery.

## Struktura
 - repozitář funguje jako monorepo pomocí nástroje [Lerna](https://lerna.js.org/)
 - složka `apps` obsahuje tyto aplikace
   - `pm2-api`
     - [Express](https://expressjs.com/) server, který poskytuje API zpřístupňující interní informace o procesech v pm2
       - endpoint `/pm2`
   - `backend`
     - [NestJS](https://nestjs.com/) aplikace zpracovávající data z `pm2-api` napříč servery
     - drží informace o dostupných serverech a záznamy aktuálního stavů procesů na nich
     - v pravidelných intervalech si stahuje informace z `pm2-api` a ukládá je do SQLite databáze
     - databáze je průběžně promazávána a jsou drženy záznamy pouze za určité období
       - historické záznamy mohou být použity pro vykreslení grafů
     - endpoint `/servers/process-list` vrací kolekci dostupných serverů s posledním záznamem statistik o běžících procesech
   - `frontend`
     - [Nuxt.js](https://nuxtjs.org/) frontendová aplikace, která je napojena na `backend`
     - jednoduché zobrazení dat z jednotlivých serverů
     - aktivní polling na backend pro aktualizaci dat

## Vývoj
 - `lerna exec "npm ci"` pro nainstalování závislostí všech aplikací
 - `lerna run dev` pro spuštění všech aplikací v dev modu
