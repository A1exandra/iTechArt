var myModule = (function (opts) {

    if (opts.weather && opts.finance) {

        var deferred = Q.defer();

        $.ajax({
            url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22minsk%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
            success: function (json_weather) {

                $('<h2>').text(json_weather.query.results.channel.title).appendTo('.' + opts.type);
                $('<h3>').text('Date: ').appendTo('.' + opts.type);
                $('.' + opts.type).append(json_weather.query.results.channel.item.condition.date);
                $('<h3>').text('Temperature: ').appendTo('.' + opts.type);
                $('.' + opts.type).append(json_weather.query.results.channel.item.condition.temp);
                setTimeout(function () {
                    deferred.resolve(1);
                }, 10000);
            },

            error: function () {
                deferred.reject(new myError('Incorrect url!'));
            }
        });

        deferred.promise.then(function (res) {

            $.ajax({
                url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22USD%22%2C%22BYN%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
                success: function (json_finance) {

                    $('<h2>').text('Yahoo! Finance - Minsk, Minsk, BY').appendTo('.' + opts.type);
                    $('<h3>').text('Exchange rates: ').appendTo('.' + opts.type);
                    $('.' + opts.type).append(json_finance.query.results.quote[0].LastTradePriceOnly);
                },

                error: function () {
                    // reject(new myError('Incorrect url!'));
                    console.log('Incorrect url!');
                }
            });
        });

    } else if (opts.weather) {

        $.ajax({
            url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22minsk%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
            success: function (json_weather) {

                $('<h2>').text(json_weather.query.results.channel.title).appendTo('.' + opts.type);
                $('<h3>').text('Date: ').appendTo('.' + opts.type);
                $('.' + opts.type).append(json_weather.query.results.channel.item.condition.date);
                $('<h3>').text('Temperature: ').appendTo('.' + opts.type);
                $('.' + opts.type).append(json_weather.query.results.channel.item.condition.temp);
            }
        });
        /*var promise = new Promise(function (resolve, reject) {
            $.ajax({
                url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22minsk%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
                success: function (json_weather) {
                    $('<h2>').text(json_weather.query.results.channel.title).appendTo('.' + opts.type);
                    $('<h3>').text('Date: ').appendTo('.' + opts.type);
                    $('.' + opts.type).append(json_weather.query.results.channel.item.condition.date);
                    $('<h3>').text('Temperature: ').appendTo('.' + opts.type);
                    $('.' + opts.type).append(json_weather.query.results.channel.item.condition.temp);
                    setTimeout(function () {
                        resolve(1);
                    }, 10000);
                    setTimeout(function () {
                        console.log(1);
                    }, 10000);
                },
                error: function () {
                    reject(new myError('Incorrect url!'));
                }
            });
        });
        promise.then(function (res) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22USD%22%2C%22BYN%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
                    success: function (json_finance) {
                        $('<h2>').text('Yahoo! Finance - Minsk, Minsk, BY').appendTo('.' + opts.type);
                        $('<h3>').text('Exchange rates: ').appendTo('.' + opts.type);
                        $('.' + opts.type).append(json_finance.query.results.quote[0].LastTradePriceOnly);
                        setTimeout(function () {
                            resolve(2);
                        }, 5000);
                        setTimeout(function () {
                            console.log(2);
                        }, 5000);
                    },
                    error: function () {
                        reject(new myError('Incorrect url!'));
                    }
                });
            });
        })
            .then(function (res) {
                $.ajax({
                    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22minsk%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
                    success: function (json_weather) {
                        $('<h2>').text(json_weather.query.results.channel.title).appendTo('.' + opts.type);
                        $('<h3>').text('Date: ').appendTo('.' + opts.type);
                        $('.' + opts.type).append(json_weather.query.results.channel.item.condition.date);
                        $('<h3>').text('Temperature: ').appendTo('.' + opts.type);
                        $('.' + opts.type).append(json_weather.query.results.channel.item.condition.temp);
                        setTimeout(function () {
                            console.log(3)
                        }, 1000);
                    }
                });
            });

        $.ajax({
            url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22minsk%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
            success: function (json_weather) {
                $('<h2>').text(json_weather.query.results.channel.title).appendTo('.' + opts.type);
                $('<h3>').text('Date: ').appendTo('.' + opts.type);
                $('.' + opts.type).append(json_weather.query.results.channel.item.condition.date);
                $('<h3>').text('Temperature: ').appendTo('.' + opts.type);
                $('.' + opts.type).append(json_weather.query.results.channel.item.condition.temp);
                $.ajax({
                    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22USD%22%2C%22BYN%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
                    success: function (json_finance) {
                        $('<h2>').text('Yahoo! Finance - Minsk, Minsk, BY').appendTo('.' + opts.type);
                        $('<h3>').text('Exchange rates: ').appendTo('.' + opts.type);
                        $('.' + opts.type).append(json_finance.query.results.quote[0].LastTradePriceOnly);
                    }
                });
            }
        });*/
    } else if (opts.finance) {

        $.ajax({
            url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22USD%22%2C%22BYN%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
            success: function (json_finance) {

                $('<h2>').text('Yahoo! Finance - Minsk, Minsk, BY').appendTo('.' + opts.type);
                $('<h3>').text('Exchange rates: ').appendTo('.' + opts.type);
                $('.' + opts.type).append(json_finance.query.results.quote[0].LastTradePriceOnly);
            }
        });
    }
});

$(document).ready(function () {

    $('#weather').click(function () {
        myModule({
            type: 'weather',
            weather: true
        });
    });

    $('#finance').click(function () {
        myModule({
            type: 'finance',
            finance: true
        });
    });

    $('#total').click(function () {
        myModule({
            type: 'total',
            weather: true,
            finance: true
        });
    });
});

