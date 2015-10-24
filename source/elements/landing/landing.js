"use strict";

(function() {

    /**
     * @description Video class
     * @class
     */
    class Landing {

        /**
         * @description Start initialization on domload
         * @constructor
         */
        constructor() {
            let ready = new Promise((resolve, reject) => {
                if (document.readyState != "loading") return resolve();
                document.addEventListener("DOMContentLoaded", () => resolve());
            });
            ready.then(this.init.bind(this));
        }

        /**
         * @description Adding events and properties
         */
        init() {
            let landing = document.querySelector('.landing')
                , header = landing.querySelector('.landing__header')
                , wrapper = header.querySelector('.landing__wrapper');

            if (
                (landing != null)
                && document.documentElement.classList.contains('video')
                && document.documentElement.classList.contains('videoautoplay')
            ){

                let src = landing.getAttribute('data-video').split(',')
                    , width = parseInt(landing.getAttribute('data-video-width'), 10)
                    , height = parseInt(landing.getAttribute('data-video-height'), 10)
                    , new_width
                    , new_height
                    , index = src.length
                    , source
                    , video = document.createElement('video');

                new_width = header.offsetWidth + 20;
                new_height = new_width*height/width;

                if (new_height < header.offsetHeight) {
                    new_height = header.offsetHeight + 20;
                    new_width = width*new_height/height;
                }

                video.style.height = new_height + 'px';
                video.style.width = new_width + 'px';

                video.setAttribute('autoplay', true);
                video.setAttribute('autobuffer', true);
                video.setAttribute('preload', true);
                video.setAttribute('mute', true);
                video.setAttribute('loop', true);
                video.classList.add('movie');

                video.addEventListener('canplaythrough', ()=> {
                    video.style.opacity = 1;
                });

                video.addEventListener('playing', ()=> {
                    video.style.opacity = 1;
                });


                while(index--) {
                    source = document.createElement('source');
                    source.setAttribute('src', src[index]);
                    video.appendChild(source);
                }

                wrapper.appendChild(video);

                this.video = video;
                window.addEventListener('resize', this.resized.bind(this));
            }
        }

        resized () {

            let landing = document.querySelector('.landing')
                , header = landing.querySelector('.landing__header')
                , new_width
                , new_height
                , width = parseInt(landing.getAttribute('data-video-width'), 10)
                , height = parseInt(landing.getAttribute('data-video-height'), 10);

            new_width = header.offsetWidth + 20;
            new_height = new_width*height/width;

            if (new_height < header.offsetHeight) {
                new_height = header.offsetHeight + 20;
                new_width = width*new_height/height;
            }

            this.video.style.height = new_height + 'px';
            this.video.style.width = new_width + 'px';
        }
    }

    setTimeout(()=>{
        new Landing();
    }, 500);

})();
