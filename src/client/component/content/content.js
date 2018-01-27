/**
 * Created by salt on 10.11.2017.
 */
defineComp("content", function(bios, $element, args) {
    "use strict";
    $("<h1>content component</h1>")
        .appendTo($element);
    $("<p>hier kann man das html der componente einbauen. zb ein login, oder eine liste, oder eine übersichts seite.</p>")
        .appendTo($element);

    $("<user-list></user-list>")
        .appendTo($element);


    //eine componente kümmert sich um einen ganzen bereich der webseite.
    //componenten ist immer <section name="sectionName" default="content"></section>

    //hier kann man dann das html der componente erstellen oder per ajax laden
    // @todo? für den ajax load brauchts noch eine methode in global/bios die des html lädt, in den container packt und alle uiModule in dem html initialisiert

    //diese (this) function wird jedes mal ausgeführt wenn die componente geladen wird.
    // componenten laden geht über global.loadComponent
});