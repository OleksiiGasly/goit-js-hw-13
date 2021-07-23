import SimpleLightbox from "simplelightbox";

let gallery = new SimpleLightbox('.gallery a');

gallery.on('show.simplelightbox', function () {
	gallery.refresh();
});

gallery.on('error.simplelightbox', function (e) {
	console.log(e);
});

const simpleLightBoxRefresh = () => {
    gallery.refresh();
};

export default simpleLightBoxRefresh;