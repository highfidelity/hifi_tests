Controller.keyPressEvent.connect(function(event){
    Window.displayAnnouncement("You pressed: " + JSON.stringify(event));
});
