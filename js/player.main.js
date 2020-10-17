

class Video{
	
	autoplay = false;
	loop = false;
	hideMouseAfter = 5000; //Time in ms
	videoDiv;
	videoPlayer;
	lastMouseKnownPos = Date.now();
	videoControl = $("#videoControl");
	fullscreen_button = $("#full_screen");
	play_pause_button = $("#play_pause");

	constructor(videoID){
		this.videoID = videoID;
		this.videoDiv = $('#'+this.videoID);
		this.videoPlayer = this.videoDiv.find('video').get(0);
	}

	isPlaying()
	{
		return (this.videoPlayer.currentTime > 0 && !this.videoPlayer.paused && !this.videoPlayer.ended && this.videoPlayer.readyState > 2);
	}

	hoverControl(self){

		//VIDEO HOVER CONTROL
		this.videoDiv.mouseleave(function(){
			self.videoControl.fadeOut(500);
		});

		self.videoDiv.mousemove(function(e) {
			self.lastMouseKnownPos = Date.now();

			if(self.videoControl.css('display') == 'none')
				self.videoControl.fadeIn(500);
		});
	}

	mouseHiddingControl(self)
	{
		if(Date.now() > (self.hideMouseAfter + self.lastMouseKnownPos) && self.isPlaying())
		{
			if(self.videoControl.css('display') != 'none'){
				self.videoControl.fadeOut(500);
			}
		}
	}

	switchPlay(self)
	{
		if(self.isPlaying() != true)
			self.videoPlayer.play();
		else{
			self.videoPlayer.pause();
		}
		self.play_pause_button.toggleClass("fa-pause");
	}

	startStop(self)
	{
		this.play_pause_button.click(function() {
			self.switchPlay(self);
			return false;
		});
	}

	fullscreenMode(self)
	{
		this.fullscreen_button.click(function() {
		if (self.videoPlayer.requestFullscreen) {
		  self.videoDiv[0].requestFullscreen();
		} else if (self.videoPlayer.mozRequestFullScreen) {
		  self.videoDiv[0].mozRequestFullScreen();
		} else if (self.videoPlayer.webkitRequestFullscreen) {
		  self.videoDiv[0].webkitRequestFullscreen();
		} else if (self.videoPlayer.msRequestFullscreen) { 
		  self.videoDiv[0].msRequestFullscreen();
		}

		return false;
		});
	}

	init(){

		var self = this;
		
		this.hoverControl(this);
		this.startStop(this);
		this.fullscreenMode(this);
		var mouseHidingInterval = setInterval(this.mouseHiddingControl, 1000, this);

		this.videoPlayer.addEventListener('waiting', (event) => {
			$(".lds-dual-ring").fadeIn(100);
			self.videoControl.fadeIn(500);

		});
		this.videoPlayer.addEventListener('playing', (event) => {
			$(".lds-dual-ring").fadeOut(100);
			self.videoControl.fadeOut(500);
		});

	}

}