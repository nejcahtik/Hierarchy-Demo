1. Z MySQL je treba najprej odpret datoteko app_db.sql in jo zagnat, da se ustvari baza.

2. Potem je treba zagnat python program v mapi /pythonProject1 (npr. s programom PyCharm)

3. S programom je treba v hierarhijo najprej dodat managerja (z ukazom add_manager oz. managerja
lahko v hierarhijo dodamo tudi preko excelovih tabel), ker v aplikaciji ni mogoče dodat managerjev

4. Hierarhijo lahko inicializiramo z ukazom add_from_table, s katerim iz tabel, ki so že priložene v mapi
/pythonProject1 (users.xlsx, clients.xlsx, products.xlsx in level.xlsx), v hierarhijo dodamo vse podatke, ki so
v teh tabelah. 

5. Ko je tabela inicializirana uporabimo ukaz run_server, s katerim zaženemo strežnik, na katerega se bo
povezala Angular aplikacija

6. Treba je met nainstaliran Angular CLI (https://angular.io/guide/setup-local).

7. Gremo v mapo /myapp in odpremo cmd. Vnesemo ukaz "npm install", da se nainstalirajo vsi dodatki.

8. Angular aplikacijo odpremo v cmd-ju z ukazom ng serve  --open

9. Odpre se aplikacija, kjer lahko dodajamo uporabnike/kliente/produkte/levele/pogodbe

Ni še vse stestirano, tako da upam, da ni preveč hroščev