CV API
Detta repository innehåller kod för ett enklare REST API byggt med Express. APIet är byggt för att hantera arbetserfarenheter i ett så kallat CV. 
Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Installation, databas
APIet använder en SQLite-databas.
Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Repositorit innehåller databasen CV_db.db där tabellen redan är skapad. 
databastabellen ser ut som följande:
CREATE TABLE "workexperience" (
	"id"	INTEGER NOT NULL,
	"companyname"	TEXT NOT NULL,
	"jobtitle"	TEXT NOT NULL,
	"location"	TEXT NOT NULL,
	"startdate"	TEXT NOT NULL,
	"enddate"	TEXT NOT NULL,
	"description"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
)


## Användning
Nedan finns beskrivet hur man nå APIet på olika vis:

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|GET    |/api         |Välkomstmeddelande endast                                                             |
|GET    |/api/workexperience| Hämtar databasen som ett json-objekt                                             |
|POST   |/api/workexperience|Lagrar en ny arbetserfarenhet. Kräver att companyname, jobtitle, location, startdate, enddate, och description följer med     |
|PUT    |/api/workexperience/:id |Uppdaterar en existerande arbetserfarenhet med angivet ID. Kräver att companyname, jobtitle, location, startdate, enddate, och description följer med|
|DELETE |/api/workexperience/:id |Raderar en arbetserfarenhet med angivet ID.                                                       |

En array av objekt returneras som JSON med följande struktur:
```
{
   companyname:  "McDonalds"
description: "Flipping burgers and cleaning floors"
enddate: "2012-01-01"
id: 3
jobtitle: "fry cook"
location: "Malmö Mobila"
startdate: "2010-01-01"
}
```
