/**
 * Created by fry on 14.11.2017.
 */
defineComp("live-search-result", function(bios, $element, args) {
    $("<h1>Live Search Result</h1>")
        .appendTo($element);


    bios.initAllUI($element);

    bios.loadComponent("owners", "mainSection", args);
    bios.loadComponent("animals", "mainSection", args);


    this.onDiscard = function() {};
});


// <ul class="demo-list-icon mdl-list">
//     <li class="mdl-list__item">
//     <span class="mdl-list__item-primary-content">
//     <i class="material-icons mdl-list__item-icon">person</i>
//     Bryan Cranston
// </span>
// </li>
// <li class="mdl-list__item">
//     <span class="mdl-list__item-primary-content">
//     <i class="material-icons mdl-list__item-icon">person</i>
//     Aaron Paul
// </span>
// </li>
// <li class="mdl-list__item">
//     <span class="mdl-list__item-primary-content">
//     <i class="material-icons mdl-list__item-icon">person</i>
//     Bob Odenkirk
// </span>
// </li>
// </ul>