$(document).ready(function () {

                newQuote();

                $("#newquote").on("click", function () {
                    newQuote();
                });
                $("#tweetquote").on("click", function () {
                    if (!inFrame()) {
                        var trim = decodeEntities(currentQuote);
                        var url = twitterURLGen(trim, currentAuthor);
                        window.open(url, 'Share', 'width=720, height=480, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
                    }
                });
            });

            var themeColors = ["#000000", "#9b6f00", "#00a7c1", "#00c11c", "#7a066c", "#ada400", "#8400ad", "#d63131"];
            var currentQuote = "";
            var currentAuthor = "";


            function inFrame() {
                try {
                    return window.top !== window.self;
                } catch (e) {
                    return true;
                }
            }
            //get a new random color
            function getNewColor() {
                var index = Math.floor(Math.random() * themeColors.length);
                return themeColors[index];
            }
            //generate an URL to tweet
            function twitterURLGen(currentQuote, currentAuthor) {
                return "https://twitter.com/intent/tweet?hashtags=RandomQuotes&text=" + encodeURIComponent('"' + currentQuote + '"' + '--' + currentAuthor);
            }
            function decodeEntities(encodedString) {
                var textArea = document.createElement('textarea');
                textArea.innerHTML = encodedString;
                var res = textArea.value;
                while(res.includes("’")){
                    res = res.replace("’","'");
                }
                while(res.includes('“')){
                    res = res.replace('“','"');
                }
                while(res.includes('”')){
                    res = res.replace('”','"');
                }            
                return res;
            }
            function newQuote() {
                $.ajax({
                    cache: false,
                    url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                    success: function (response) {

                        currentQuote = response[0].content.slice(3, -5);
                        currentAuthor = response[0].title;
                        var currentColor = getNewColor();
                        if (inFrame()) {
                            var trim = decodeEntities(currentQuote);
                            var url = twitterURLGen(trim, currentAuthor);
                            $("#tweetquote").attr("href", url);
                        }

                        //change body bg color;                
                        $("body").animate({
                            backgroundColor: "#000000"
                        }, 500, function () {
                            $(this).animate({
                                opacity: 1,
                                backgroundColor: currentColor
                            }, 500);
                        });
                        //change quote fonts color
                        $(".quote-box").animate({                            
                                color: currentColor
                            }, 1000);
                        
                        //change buttons' color
                        $(".button").animate({
                                backgroundColor: currentColor
                            }, 1000);
                        
                        //change quote text
                        $(".quote-text").animate({
                            opacity: 0
                        }, 500, function () {
                            $(this).animate({
                                opacity: 1
                            }, 500);
                            $("#text").html(currentQuote);
                        });
                        //change author text
                        $(".quote-author").animate({
                            opacity: 0
                        }, 500, function () {
                            $(this).animate({
                                opacity: 1
                            }, 500);
                            $("#author").html(currentAuthor);
                        });
                        
                    }
                });
            }