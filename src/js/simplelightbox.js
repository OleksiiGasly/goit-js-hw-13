import SimpleLightbox from "simplelightbox";
import '../../node_modules/simplelightbox/src/simple-lightbox.scss';

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