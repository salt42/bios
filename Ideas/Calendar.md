# Calendar Modul:
## UI bei Anzeige:
### von normalem Termin:
* details  
* Button: Ändern
* Button: Zum Patienten   (wenn es ihn gibt)

### UI bei neuem Termin/ Ändern:

* Level 1:
  
       Selectbox/Radiobuttons  
    mit den KalenderTypen (=Kalendernamen bei Google)  Bsp.: Select 0 = Termine, 1 = Urlaub, 2 = Orga, 3 = Chef

    Bei L1 = 0:  
* Level 2: 
 
       Selectbox/Radiobuttons  
    0 = Freitext, 1 = Kunde, 2 = Neukunde, 3 = Vertreter

        Bei L2 = 0: Textbox                                                                                         ===> Text + {{0 - 0 - 0}}

        Bei L2 = 1:
        Level 3:
         Selectbox 1: Kundennummer
         Selectbox 2: Tier
         Combobox: FallnummerSelect oder Neu(=0)
         Text: Beschreibung
                                                                                                                    ===> Text + {{0 - 1 - Sel1 - Sel2 - ComboSel}}

        Bei L2 = 2:
        Level 3:
         Text1: Name
         Text2: Tier
         Text3: Telefonnummer
         Text4: Beschreibung
                                                                                                                    ===> Text + {{0 - 2 - Text1? - Text2? - Text3? - Text4?}}  <-- unschön!!

        Bei L2 = 3:
        Level 3:
         Selectbox 1: Firma      <--- ggf Neuanlage in DB wenn Eintrag nicht vorhanden?? (diese Funktion müsste er eh können) dann Combobox
         Selectbox 2: Vertreter
         Text: Beschreibung
                                                                                                                    ===> Text + {{0 - 3 - Sel1 - Sel2}}

* Bei L1 = 1:  //Urlaub  
     Level2:  
      Combobox: User-Select/Text  
      Text: Beschreibung  
                                                                                                                    ===> Text + {{1-ComboSelect|Text}}

* Bei L1 = 2:  //Orga  
     Level2:  
      Checkbox: Ganztägig  
      Text: Beschreibung  
                                                                                                                    ===> Text + {{2 - 1|0}}