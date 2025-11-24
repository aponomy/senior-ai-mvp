# Senior AI — den enkla (men kraftfulla) AI:n för alla som vill hänga med

**Senior AI** är ett generellt AI‑verktyg designat först och främst för äldre personer som tycker att dagens AI känns rörig, långrandig eller svår. Det är *inte* en vård‑ eller “sällskaps‑AI”, utan ett **primärt arbetsredskap** för att skriva, förstå, skapa (text/bild/video), ta reda på saker och **få ärenden utförda** — utan teknisk friktion. Sekundärt hjälper den även personer med minne‑/uppmärksamhetsutmaningar (t.ex. demens/ADHD).

Värdeorden: **Tillgänglighet · Enkelhet · Säkerhet · Delaktighet** (känslan av att vara *med* i utvecklingen).

---

## Produkt i ett stycke

Senior AI är en röst‑först assistent med **visuella samtalskort** som byggs upp under dialogen. Du pratar — skärmen sammanfattar med **stora, läsbara kort**. Vill du sidospåra? **Dra ut ett nytt spår** (en kortstapel åt sidan), utforska färdigt, och hoppa tillbaka med ett tryck. Svaren är **alltid korta och klara** (1–3 meningar), med tydliga valknappar (“Fortsätt”, “Visa exempel”, “Gör klart”). Under huven finns en **agentmotor** som kan boka tider, fylla i formulär, beställa varor och navigera BankID‑flöden — tryggt och förklarat steg‑för‑steg. För den som vill finns en **privat minnesfunktion** som kan spela in och transkribera vardagen lokalt/krypterat, plus ett **delat minne** där anhöriga fyller på kända berättelser. Allt paketerat för att kännas lätt, begripligt och lugnt. 

---

## Den unika kärnan: Röst + visuella **kort** i flera riktningar

**Varför kort?** För att slippa textväggar och scroll. Varje *kort* är en liten, begriplig enhet: rubrik + två rader sammanfattning + 1–3 åtgärdsknappar.
**Varför sidospår?** Människor tänker icke‑linjärt. Senior AI låter dig **pausa huvudflödet**, öppna ett “sidospår” (ny kortstapel), få svar, och sedan **tillbaka** — utan att tappa tråden.

**Så här upplevs det (mikroscenarier):**

* *“Vad är ett bra grattiskort till barnbarnet?”* → AI svarar i **ett kort** med tre superkorta förslag + knappen **“Skapa bildkort”**. Tryck → nytt sidospår med bildskapande; klart → tillbaka.
* *“När går bussen till vårdcentralen?”* → **Kort** med avgång + **“Lägg i kalender”** eller **“Beställ taxi”** → agenten bokar, visar **bekräftelsekort**.
* *“Visa vad läkaren sa i går”* → **Kort** som sammanfattar gårdagens läkarbesök ur din privata logg, samt **“Läs upp”, “Skicka till dottern”**. (Valfritt, krypterat minne; se nedan.)

**Designregler för korten:** stor text, hög kontrast, max 2–3 val per steg, konsekventa verb, alltid “Ångra/Tillbaka”. **Röst och tryck samspelar**: du kan säga *“Ta första”* eller trycka. AI:n visar alltid på skärmen *vad den uppfattade* innan den gör något. 

---

## Alltid kort och tydligt (anti‑bloat som standard)

Senior AI är tränad att *alltid* svara kort, i klarspråk, med följdval för fördjupning. Tänk: **“Svar först. Detaljer på begäran.”** Det sparar mental energi och minskar missförstånd — speciellt viktigt för ovana användare och för de sekundära målgrupperna. 

---

## Agenten som **gör saker** (ärenden, formulär, bokningar)

Under varje kort finns en **agent** som kan:

* **Bank och betalningar**: läsa ut OCR/saldo, påminna om räkningar, hjälpa till att avsluta abonnemang.
* **Myndigheter**: guida och fylla i Försäkringskassan/Skatteverket‑ärenden i bakgrunden, med **BankID** via säkra, officiella flöden.
* **Hälsa**: boka vård/1177‑kontakt, förnya recept, påminna om medicin (utan vårdjournal).
* **Vardag**: handla mat/blommor, beställa hantverkare, boka taxi/busskort, skicka hälsningar/foton till familj.

**Upplevelsen:** Agenten beskriver *innan* åtgärd **vad som händer**, *under* åtgärd **vad den gör**, och *efter* åtgärd **vad resultatet blev** — alltid i **korta kort** med tydlig kvittens. Vid osäkerhet går agenten i **fråga‑läget**: *“Jag tänker fylla i X med Y — stämmer det?”*

**Säkerhetslager i agentflöden:** se “Skydd mot bluffar” nedan. 

---

## Privat minne: inspelning, transkribering och **dagbok** (valfritt)

För de som vill aktivera det: Senior AI kan **spela in/transkribera** valda delar av dagen (ex. möten, telefonsamtal i samma enhet), och göra dem **sökbara**: *“Vad sa sjukgymnasten i morse?”* → **kort** med nyckelpunkter och **“Läs upp detalj”**. Det kan också skapa **dagbok** (“Min dag i tre punkter”) eller **påminna** vid behov.
Allt lagras **lokalt eller E2E‑krypterat**, och bearbetas **privat**. Vi följer *privacy‑by‑design* och kan stödja lösningar som **NEAR‑inspirerade** krypterings/compute‑mönster för att AI‑bearbetning sker skyddat och *på dina villkor*. 

---

## Delat minne med familjen: **kända berättelser**

Anhöriga kan (frivilligt) lägga in **kända historier, platser och foton** som “ankare”. När användaren vill minnas, eller känner oro, kan Senior AI erbjuda **lugna minneskort**: *“Vill du höra om resan till Lofoten 1982?”* Den här funktionen har stark emotionell nytta (reminiscens) och kan öka trivsel och sammanhangskänsla — samtidigt som **huvudmålet** för Senior AI förblir *allmän AI‑nytta med enkelhet*. 

---

## Skydd mot bluffar, **BankID‑vakt** och trygg interaktion

Senior AI agerar din **digitala väktare**:

* **Bluff‑detektor**: analyserar samtal, SMS, e‑post i realtid och varnar: *“Det här liknar en bankbluff. Ska jag avvisa och kontakta banken via säkra kanalen?”*
* **Pause & Verify**: vid *minsta* risk pausar agenten och **dubbelkollar** via kända, säkra API:er.
* **BankID‑skydd**: styr inloggning/underskrift via officiella flöden; inga koder genom telefon/sms/e‑post. AI visar ett **kort**: *“Nu signerar vi X hos Y. Vill du fortsätta?”*

Det här minskar sårbarhet mot moderna AI‑bluffar och ger användaren (och familjen) lugn. 

---

## Så hänger det ihop — **arkitektur i sex moduler**

1. **Dialogmotor** (LLM) – svarar kort, föreslår nästa steg, håller flera **trådar** (kortsidospår).
2. **Kort‑UI** – stora rubriker, tre val max, sidospår som **visuella staplar**; röst↔text alltid synkat. 
3. **Agent‑nav** – säkra integrationer (BankID, banker, Försäkringskassan, handlare, transporter).
4. **Minnesnav** – lokal/E2E‑krypterad logg, sök och dagbok, delat minne med anhöriga. 
5. **Säkerhetslager** – bluff‑detektion, “pause & verify”, tydlig behörighetsmodell. 
6. **Inställningar** – textstorlek, talhastighet, “alltid visa sammanfattning”, “extra långsam takt”, etc. 

---

## Primär målgrupp (äldre nyfikna) → **funktion → värde**

* *Röst + kort i sidospår* → förstår alltid “var vi är” → **mindre kognitiv belastning**. 
* *Alltid korta svar* → slipper textväggar → **snabbare beslut, färre misstag**. 
* *Agent som gör saker* → ärenden faktiskt utförda → **självständighet i vardagen**. 
* *Säkerhetslager* → ingen “övertalning” via telefon → **minskad bluffrisk**. 
* *Delat minne (frivilligt)* → lugn/mening vid osäkerhet → **välbefinnande**. 

---

## Sekundära målgrupper (utan att ändra kärnan)

* **Nedsatt minne**: korta, upprepningsvänliga steg; privat logg som *extern minnesyta*; familjens *kända berättelser*. **Allt valfritt** och tydligt avgränsat. 
* **Uppmärksamhetsutmaningar (t.ex. ADHD)**: icke‑linjärt gränssnitt passar sidotankar; korta svar + checklista‑kort; *“Fortsätt där vi var”* fungerar även efter avbrott. 

---

## Exempel på dag med Senior AI (komprimerad)

1. **Morgon**: *“Vad händer idag?”* → kort med dagens tre viktigaste punkter + **“Läs upp”** / **“Skicka till sonen”**.
2. **Förmiddag**: *“Säg grattis till Eva”* → agenten föreslår kort text/bild, skickar via vald kanal. Sidospår för bild → tillbaka.
3. **Eftermiddag**: *“Ansök om bostadstillägg”* → kort‑guide, BankID vakt, e‑formulär fylls i; **kvittenskort** klart.
4. **Kväll**: *“Sammanfatta dagen”* → tre punkter + **“Spara i dagboken”** (valfritt, privat). 

---

## Förverkligande (nära, i etapper)

**MVP (3–4 månader)**

* Kort‑UI med sidospår, röst↔text‑synk, *anti‑bloat* svar.
* Agent för enkel kalender, meddelanden, matbutik, taxi.
* Grundläggande bluff‑detektor + BankID‑genvägar. 

**Etapp 2**

* Försäkringskassan/Skatteverket‑flöden; bankpåminnelser/fakturor.
* Privat minnesnav (lokal/E2E‑krypterat), dagbok, familjeportal för *kända berättelser*. 

**Etapp 3**

* Utökad säkerhet (mönster för AI‑bluffar), fler handlare och vårdkedjor, multimodal skapande (bild/video) i guidat läge.

---

## Varför detta lyckas där andra faller kort

* **Allmän AI — utan krånglet**: ett *generellt* verktyg (inte vård‑nischat) som vanliga seniorer faktiskt kan och vill använda.
* **Röst + kort i sidospår**: gör konversationen **synlig, navigerbar och trygg**. Ingen annan mainstream‑lösning erbjuder detta samtalsmönster konsekvent. 
* **Agent som levererar**: inte bara svar — **resultat**.
* **Integritet och säkerhet från grunden**: privacy‑by‑design, E2E‑kryptering, “pause & verify”. 

---

### Kort om compliance och förtroende

* **Transparens** i vad som loggas och varför; **opt‑in** för allt känsligt; enkel **Radera allt**.
* **Klar språkpolicy**: inga otydliga påståenden, alltid hänvisning när något är osäkert.
* **Familjens roll**: tydliga behörigheter (t.ex. “får se dagbok” vs “får lägga till kända berättelser”).

---

## Sammanfattning

Senior AI är **den enkla vägen in i modern AI** för äldre — med en unik kombination av **röst** och **visuella kort** som gör samtal begripliga, **sidospår** som gör dem mänskliga och en **agent** som faktiskt utför ärenden. Resultatet: fler känner sig **delaktiga** i utvecklingen, utan att behöva bli tekniker. Och när livet kräver det finns **minnesstöd** och **familjeankare** — privat och på användarens villkor.

---

*Den här beskrivningen bygger vidare på era tidigare underlag, med fördjupning i kort‑UI, sidospår, privat minne och säker agent‑design för BankID/myndigheter/handel.*
