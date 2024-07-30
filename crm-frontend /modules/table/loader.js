import { table, tableWrap } from '../constants.js';
import { svg } from '../svg-storage.js';

const loader = document.createElement('div');
loader.classList.add('loader');

export function createLoader() {
	if (table.contains(loader)) {
		return;
	}

	document.querySelectorAll('button').forEach(btn => {
		btn.disabled = true;
	});

	loader.innerHTML = '';

	const wrap = document.createElement('div');
	wrap.classList.add('loader__wrap');
	wrap.innerHTML = svg.loader;

	tableWrap.scrollTo(0, 0);

	tableWrap.classList.add('table-wrap_download');
	loader.append(wrap);
	table.prepend(loader);
}

export function removeLoader() {
	loader.remove();
	tableWrap.classList.remove('table-wrap_download');
	document.querySelectorAll('button').forEach(btn => {
		btn.disabled = false;
	});
}

export function createSmallLoader(btn) {
	const wrapper = document.createElement('div');
	wrapper.classList.add('small-loader-wrap');
	wrapper.innerHTML = svg.smallLoader;
	btn.prepend(wrapper);
}

export function removeSmallLoader(btn) {
	if (btn.classList.contains('modal__btn_expanded')) {
		btn.classList.remove('modal__btn_expanded');
	}
	btn.firstChild.remove();
}
