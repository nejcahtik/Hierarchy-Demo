Navodila za instalacijo

Potrebujemo paketa mysql-connector-python (za povezavo z bazo) in openpyxl (za odpiranje excel datotek).
Namestimo si ju v PyCharmu pod File  -> Settings -> Project -> Python Interpreter. Na desni strani okna kliknemo
na plus (+). V search okno vpisemo mysql-connector-python in kliknemo "Install Package" spodaj levo. 
Podobno naredimo za "openpyxl".

Navodila za uporabo:

0. Zaposlene, produkte, levele in kliente lahko dodamo tudi prek excelovih tabel z ukazom 'add_from_table'. V ta namen so v projektu
v mapi /pythonProject1/ stiri tabele (employees.xlsx, products.xlsx, level.xlsx in clients.xlsx) z vnaprej
pripravljenim formatom, kamor lahko vnasamo vse podatke. 
POZOR: Pri tabeli employees mora biti v prvi vrstici
manager (in  pri njem morata biti polji mentor name in mentor surname prazni!!)
POZOR: Zaposlene moramo dodajati v pravem vrstnem redu. Torej zaposlen, ki je v drugi vrstici ne sme imeti
mentorja, ki je v tretji vrstici, ampak mora biti mentor nad njim, ker gre program s for zanko po vseh vrsticah in 
sproti dodaja zaposlene v bazo.
Treba je pazit, da so vsi leveli, ki jih uporabljamo v tabeli employees, dodani v tabeli levels
Treba je pazit, da so POINTS FROM in POINTS TO usklajeni s sosednjimi leveli (torej, če so POINTS TO levela 1 1000, morajo
biti POINTS FROM levela dve 1000). Če točke niso pravilno nastavljene, nas program opozori z WARNINGOM. Preden dodajamo pogodbe ali
spreminjamo ali preverjamo karkoli pri zaposlenih, morajo biti leveli usklajeni, ker se drugače lahko zgodi, da nek zaposleni
po točkah ne bo pripadal nobenemu levelu, in program lahko vrze fatal error.


#### Levele, zaposlene, produkte in kliente ni potrebno dodajati ročno, če smo jih že vnesli iz tabel z ukazom 'add_from_table' ####

1. Najprej lahko ročno dodamo hierarhične levele, ki se bodo uporabljali v shemi.
To storimo z ukazom 'add_level'. 
Pri tem ukazu moramo najprej vnesti level (torej številko levela),
 nato ime levela (npr. Basic, Advanced, ...), razpon točk, in vrednost "in eur",
 torej vrednost hierarhičnega levela, ki se bo uporabljala pri izračunu denarja
za zaposlene pri sklenitvi pogodb
Točke morajo bit pravilno nastavljene (torej, če so POINTS TO levela 1 1000, morajo
biti POINTS FROM levela dve 1000)
Če točke niso pravilno nastavljene, nas program opozori z WARNINGOM. Preden dodajamo pogodbe ali
spreminjamo karkoli pri zaposlenih, morajo biti leveli usklajeni, ker se drugače lahko zgodi, da nek zaposleni
po točkah ne bo pripadal nobenemu levelu in program lahko vrne fatal error.
Pri ukazu 'add_level' se nam, če so točke pravilno nastavljene, avtomatsko posodobijo tudi zaposleni (leveli, v katerih so), saj lahko zaposleni napredujejo v novo dodan level.
POZOR: Leveli morajo biti razvrsceni po naraščajočem vrstnem redu (torej level 1 je najnižji, level 2 nad njim, itd.)
POZOR: Zaenkrat z ukazom add_level še ne moremo vnašati levelov, ki so že v bazi, torej da bi se 
na novo vnešeni level, če bi bil že v bazi, avtomatsko overridal. Pride v naslednji posodobitvi.

2. Potem lahko dodamo še managerja z ukazom 'add_manager'. Manager je tisti,
ki nima mentorja - torej je na vrhu piramide.
Vnesemo njegovo ime, priimek, zacetne tocke, zacetni denar in zacetni hierarhicni level, 
v katerem bo, emso, geolokacijo, trr in banko.

3. Potem lahko vnesemo zaposlene z ukazom 'add_employee'. Vnesemo njegovo ime,
priimek, ime in priimek mentorja, zacetne tocke, denar in level, emso, geolokacijo, trr, banko in datum sklenitve zaposlitvene pogodbe (mora biti v formatu YYYY-MM-DD, kjer je Y leto, M mesec in D dan)

4. Dodamo še produkte z ukazom 'add_product' in vnesemo ime produkta, partnerja produkta, konstanto (ki se bo uporabila pri izračunu točk za zaposlene ob sklenitvi pogodbe), basic name in tip plana (npr. fixed)

5. dodamo še kliente z ukazom 'add_client'. To so tisti, ki bodo kupovali izdelke.
Vnesemo njihovo ime, priimek in emso

6. Končno lahko vnesemo tudi pogodbe z ukazom 'add_contract'. Nato vnesemo ime produkta, 
ime in priimek zaposlenega, ki je pogodbo sklenil, ime in priimek klienta, ki je kupil produkt, 
datum (spet v formatu YYYY-MM-DD) in base_value (ki se bo uporabljala pri izračunu točk). Ob 
sklenitvi vsake pogodbe se kliče tudi funkcija update_hierarchy(), ki gre z zanko po vseh mentorjih 
in posodobi njihove točke in denar. Hkrati ta funkcija ob posodobitvi točk pri vsakem izmed mentorjev 
pogleda tudi, če je ta zaposleni zbral dovolj točk, da gre v naslednji hierarhični level. 
Ob tem preveri tudi, če je mentor tega, ki je napredoval v naslednji level slučajno v istem ali 
nižjem levelu, kot njegov podrejeni. V tem primeru nas aplikacija prosi za novega mentorja tistega, 
ki je napredoval, saj ne sme imeti mentorja, ki je v nižjem levelu kot on sam. 
POZOR: Program ne preverja, če ima novo dodani mentor spet nižji level kot zaposleni (lahko spremenim v posodobitvah)
Torej lahko vnesemo mentorja, ki ima spet nižji level od zaposlenega (ni priporočljivo, ker se potem denar po formuli superior.in_eur-podrejeni.in_eur
šteje v minus)

7. Z ukazi show_contracts in show_executed_contracts lahko izpišemo vse pogodbe v nekem časovnem obdobju (vnesemo leto, mesec in dan za datuma, med katerima hočemo prikazati vse pogodbe)
Pri show_contracts in show_executed_contracts se nam prikaze tudi, koliko točk (personal pri navadnih 
pogodbah in networking točke pri izvršenih pogodbah) je dobil tisti, ki je to pogodbo sklenil

8. Z ukazi show_employees, show_products, show_clients lahko prikažemo vse zaposlene, produkte in kliente. 
Prikaže se nam število personal in networking točk posameznega zaposlenega, potem vsota teh dveh točk, denar in 
pa "paid_points" in "paid_cash". to sta vrednosti, ki povesta, koliko točk oz denarja, ki ga je imel posamezni zaposleni,
je bilo dejansko izplacanega, "paid_points" in "paid_cash" vrednosti sta vedno manjši od "cash" (to je teoretični cash, ki ga ima) in "total_points" (teoretične točke, ki jih ima) vrednosti.
razlika med cash in paid_cash ter points in paid_points so tiste točke (oz. denar) ki še niso bile izplačane. 

Pri tabeli produktov se najprej izpiše ime produkta, nato ime partnerja produkta in nato še konstanta produkta

8.5 Z ukazoma "pay_out_contracts" in "pay_out_executed_contracts" lahko izplačamo pogodbe posameznih zaposlenih
Torej po izplačilu pogodb, se bosta povečala paid_cash in paid_points (za toliko kolikor so vredne pogodbe, ki jih želimo izplačati) pri določenem
zaposlenem.
Najrpej vnesemo ime in priimek tistega zaposlenega, čigar pogodbe želimo izplačati, nato pa lahko omejimo pogodbe, ki jih
želimo izplačati v nek časovni interval - vnesemo datum od in datum do, 
prikažejo se nam pogodbe v tem časovnem obdobju, nato pa izberemo indekse vseh pogodb, ki jih želimo izplačati.
Torej točke (in denar), kolikor so vredne te pogodbe, se bodo prištele tistemu zaposlenemu, ki je sklenil pogodbo

8.6 Vse še neplačane pogodbe določenega zaposlenega lahko prikažemo tudi z ukazom "show_contracts_of"
in "show_executed_contracts_of". Vnesemo ime in priimek zaposlenega in časovno obdobje,
nato pa se nam izpišejo vse še neplačane pogodbe v tem časovnem obdobju za tega zaposlenega.

9. Z ukazi change_employee, change_level in change_product lahko spreminjamo podatke o zaposlenih, levelih ali produktih. Npr. pri zaposlenih najprej vnesemo ime in priimek zaposlenega, in nato, 
kaj želimo spremeniti: ime, priimek, trr, ...). Aplikacija nas nato vpraša za novo vrednost.
Pri ukazu change_level se nam avtomatsko posodobijo tudi zaposleni (leveli v katerih so) v primeru, da vnesemo nove vrednosti za points_from in points_to (če so le te 
točke pravilno nastavljene, če niso, nas program opozori z warningom)

10. Tudi ročno lahko posodobimo levele vseh zaposlenih z ukazom 'update_levels_of_employees', ki se potem nastavijo
v prave levele glede na točke, ki jih imajo posamezni zaposleni

Pazimo na pravilni format podatkov (npr emso je integer, imena in priimki so string, točke so floati,
datumi so oblike YYYY-MM-DD)