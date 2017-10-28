//core
(function(global) {
    "use strict";

    //onLoad
    $(function() {
        //init
        $.ajax({
            url: "/pet/1",
            type: "POST",
            // contentType: "application/json",
            // data: JSON.stringify(conf),
            success: function (resData) {
                console.log(resData)
            }
        });
        var DATA = $("content div h1").html();
        console.log(DATA);
        DATA = {
            gekkoConfig: {
                watch: {
                    exchange: "poloniex"
                }
            }
        };
        var configForm = jsonForm($("content div")[0], DATA, {
            meta: {
                gekkoConfig: {
                    watch: {
                        exchange: {
                            type: "select",
                            options: ["bitfinex", "poloniex"]
                        },
                        currency: {
                            type: "select",
                            options: ["BTC"]
                        },
                        asset: {
                            type: "select",
                            options: ["ETC", "DASH", "XRP", "ETP"]
                        }
                    },
                    tradingAdvisor: {
                        method: {
                            type: "select",
                            options: ["UO", "MACD", "PPO"]
                        }
                    }
                },
                mutator: {
                    valuePath: {
                        type: "select",
                        options: [
                            "gekkoConfig/tradingAdvisor/candleSize",
                            "gekkoConfig/tradingAdvisor/historySize",
                        ]
                    }
                }
            }
        });
    });
})({});