let JasApparel = class extends Initial{
	constructor() {
		super();
		this.domain = location.origin;
		this.build();
		this.init();
	}

	init() {
		let button = document.querySelector('button.exp-btn-push')
		let that = this;
		button.addEventListener("click", (e) => {
			e.preventDefault();
			button.classList.add("is-loading");
			that.getProduct();
		});
	}

	getProduct() {
		let title = document.querySelector(".product-single__title").textContent.trim();
		let pathname = location.pathname;
		let pId = pathname.substr(pathname.lastIndexOf("/") + 1);
		if (pId.length === 0) {
			pathname = pathname.substring(0, pathname.lastIndexOf("/"));
			pId = pathname.substr(pathname.lastIndexOf("/") + 1);
		}
		let banner = false;
		let images = [];
		let arrayImages = document.querySelectorAll('div.product__main-photos div.product__main-photos-wrapper div.product__slide div.product-image-main div.image-wrap.loaded img.photoswipe__image');
		if (arrayImages && arrayImages.length > 0) {
			arrayImages.forEach((valueImageEbay, indexImageEbay) => {
				let src = valueImageEbay.attributes[1]?.value ?? false;
				if (src) {
					if (src.includes('//')) {
						src = src.replace('//', '');
                        console.log(src);
					}
					if (indexImageEbay == 0) {
						banner = src;
					} else {
						images.push(src);
					}
				} else {
					alert('Nguồn ảnh không tìm thấy, báo cho @ryotaru để kiểm tra lại!');
				}
			});
		} else {
			alert('Các hình ảnh không tìm thấy, báo cho @ryotaru để kiểm tra lại!');
		}

		if (banner && images.length > 0) {
			let product = {
				type: "",
				title: title,
				banner: banner,
				images: images,
				item_id: pId,
				store: "JasApparel",
				market: "JasApparel"
			};
			console.log(product);
			this.push([product]);
		} else {
			alert('Ảnh bìa hoặc các hình ảnh không tìm thấy, báo cho @ryotaru để kiểm tra lại!');
		}
	}
};
