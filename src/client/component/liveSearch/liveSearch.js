defineComp("live-search", function(bios, template) {
    "use strict";

    let $element = this.$ele;

    bios.rxLiveSearch = {};
    bios.rxLiveSearch.upStream = new Rx.ReplaySubject();

    this.onLoad = function () {
        let $subComp = $('live-search-result').getComponent();
        let $input = $('input', $element);
        
        let searchQuery = "";

        function updateResults(data){
            $subComp.updateResults(data);
        }

        /* region search bar behavior */
        $input.on("keyup", function(e) {
            // $liveResults.empty()
            //     .removeClass("hidden");
            searchQuery = $input.val();
            console.log('key up', e.keyCode);
            switch (e.keyCode) {
                case 16: // = shift
                case 20: // = caps lock
                case 18: // = alt
                    break; // do nothing
                case 13: // = enter
                    // @todo action on enter
                    break;
                default:
                    if (!(searchQuery === "")){
                        // add wildcard to search
                        if (!(searchQuery.slice(-1) === "*"))
                            searchQuery += "*";
                        // console.log("query: ", searchQuery);
                        bios.search.liveSearch(searchQuery, function(data) {
                            // console.log(data);
                            if (data.query !== searchQuery) {
                                console.log("returned query is wrong");
                                return;
                            }
                            updateResults(data);
                        }, "short");
                    }
            }
        });
        /*endregion*/
        bios.rxLiveSearch.upStream.subscribe(function(upstream){
            console.log('get', upstream);
            console.log($('live-search-result-item', upstream));
        });
    };
}
,{
    templatePath: "/component/liveSearch/liveSearch.html"
}
);