NowPlaying = function(api, user, interval) {
    this.api = api;
    this.user = user;
    
    /* AutoUpdate frequency - Last.fm API rate limits at 1/sec */
    this.interval = interval || 5;
};
NowPlaying.prototype = {
    
    //This logic is stupid. I am a bit tipsy.
    presize : false,
    postsize : false,

    display: function(track)
    {
        /* some viewport stuff, TODO.
        var ww = $(window).width(),
            wh = $(window).height();
        $('#artist,track').width(ww -300);
        */


              
        if(!(this.presize == track.name)){
        
        //track.artist.replace(/&amp;/g, "&"); //fix &amp; displaying

                $('#artist').text(track.artist);
                $('#track').text(track.name) //.replace(/&amp;/gi, "&");   //TODO do this smarterer
                
                $('#track,#artist').sizeUp().fadeOut(100).fadeIn();

                this.presize = track.name;
                this.postsize = track.name;

        } else if(!(this.postsize == track.name)){ //hopefully never called at all I guess?
            $('#artist').text(track.artist);
            $('#track').text(track.name);
            $('#track,#artist').sizeUp();

            this.postsize = track.name;

        } else {
            
            return false;
        }

        //$('aside').html(track.url.link()); // breaks on some last.fm urls :(
        $('aside').html('Link : <a href="'+track.url+'" target="_blank">'+track.artist+ ": " +track.name+'</a>');

       this.trackname = track.name;

    },
    
    update: function()
    {
        this.api.getNowPlayingTrack(
            this.user,
            jQuery.proxy(this.handleResponse, this), 
            function(error) { console && console.log(error); }
        );
    },
    
    autoUpdate: function()
    {
        // Do an immediate update, don't wait an interval period
        this.update();
        
        // Try and avoid repainting the screen when the track hasn't changed
        setInterval(jQuery.proxy(this.update, this), this.interval * 1000);
    },
    
    handleResponse: function(response)
    {
        if (response) {
            
            console.log(response);

            this.display({
                // The API response can vary depending on the user, so be defensive
                artist: response.artist['#text'] || response.artist.name,
                name: response.name,
                url: response.url
            });
        }
        else {
            this.display({artist: ' ', name: '',url:''});
        }
    }
};