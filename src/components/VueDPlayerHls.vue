<template>
    <div class="dplayer"></div>
</template>

<script>
    require('../../node_modules/dplayer/dist/DPlayer.min.css');
    import DPlayer from 'DPlayer'
    export default {
        props: {
            autoplay: {
                type: Boolean,
                default: false
            },
            theme: {
                type: String,
                default: '#FADFA3'
            },
            loop: {
                type: Boolean,
                default: false
            },
            lang: {
                type: String,
                default: 'zh'
            },
            screenshot: {
                type: Boolean,
                default: false
            },
            hotkey: {
                type: Boolean,
                default: true
            },
            preload: {
                type: String,
                default: 'auto'
            },
            contextmenu: {
                type: Array
            },
            logo: {
                type: String
            },
            video: {
                type: Object
            }
        },
        data() {
            return {
                dp: null
            }
        },
        mounted() {
            const player = this.dp = new DPlayer({
                element: this.$el,
                autoplay: this.autoplay,
                theme: this.theme,
                loop: this.loop,
                lang: this.lang,
                screenshot: this.screenshot,
                hotkey: this.hotkey,
                preload: this.preload,
                contextmenu: this.contextmenu,
                logo: this.logo,
                video: {
                    pic: this.video.pic,
                    defaultQuality: 0,
                    quality: [{
                        url: this.video.url,
                        name: '高清'
                    }],
                    thumbnails: this.video.thumbnails,
                    type: 'hls'
                }
            })
            player.on('play', () => {
                this.$emit('play')
            })
            player.on('quality_start', () => {
                this.$emit('quality_start')
                player.on('play')
            })
            player.on('pause', () => {
                this.$emit('pause')
            })
            player.on('canplay', () => {
                this.$emit('canplay')
            })
            player.on('playing', () => {
                this.$emit('playing')
            })
            player.on('ended', () => {
                this.$emit('ended')
            })
            player.on('error', () => {
                this.$emit('error')
            })
        }
    }
</script>
<style scoped>

</style>