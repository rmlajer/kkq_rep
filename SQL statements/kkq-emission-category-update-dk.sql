UPDATE emission_category
    SET category = 'Landbrug', description = 'Denne kategori indeholder al udledning fra landbrug, inklusiv udslip fra produktion af gødning, kemikalier, brændstoffer, maskineri, bygninger og services såvel som transport af disse. Derudover er efter-produkter som anvendes som erstatningsprodukter ligeledes inkluderet, f.eks. kød fra malkekvæg eller uld fra slagtefår.'
    WHERE category_id = 1;
    
UPDATE emission_category
    SET category = 'Indirekte land-anvendelse (iLUC)', description = 'Når aktiviteter anvender landarealer vil yderligere landarealer være nødvendige for at opretholde produktionen, da f.eks. produktion af gødning også kræver plads. De følgende aktiviteter anvender landarealer: afgrøder, græsning, skovbrug, byområder, infrastruktur og minearbejde. Når en aktivitet anvender landområder forårsager dette en udvidelse af menneskelig aktivitet i vilde naturområder såvel som en intensivering af eksisterende land-anvendelse.'
    WHERE category_id = 2;

UPDATE emission_category
    SET category = 'Forarbejdning', description = 'Forarbejdning indeholder direkte udledning fra forarbejdningsindustrien og inkluderer udledning fra alle relaterede aktiviteter med undtagelse af landbrug og iLUC: Produktion af brændstoffer, kemikalier, maskineri, bygninger, services, transport af ikke-foderrelaterede goder (Transport af landbrugsprodukter til forarbejdning inkluderes under “transport”) og behandling af materialer. Den sidste kategori her inkluderer behandling af affald såvel som forarbejdning af rester til dyrefoder og andre efter-produkter. Erstatningsprodukter fra disse efter-produkter er ligeledes inkluderet.'
    WHERE category_id = 3;

UPDATE emission_category
    SET category = 'Emballage', description = 'Emballage-kategorien indeholder alt udledning fra emballagens produktion, forarbejdning, affaldsbehandling og genanvendelse. Når emballage-materialer skaber efter-produkter som f.eks. varme og energi fra forbrænding, inkluderes disse erstatningsprodukter i den samlede beregning.'
    WHERE category_id = 4;

UPDATE emission_category
    SET category = 'Transport', description = 'Denne kategori indeholder udledning fra transport af landbrugsprodukter til forarbejdning og transport af fødevareprodukter til detailhandel. Al anden transport er inkluderet i andre stadier.'
    WHERE category_id = 5;

UPDATE emission_category
    SET category = 'Detailhandel', description = 'Dette stadie inkluderer alle direkte udledninger i detailhandel såsom brændstof, energi, materialer og værktøjer (f.eks. skærme, kasseapparater, køleskabe, frysere, bygninger, osv.)'
    WHERE category_id = 6;