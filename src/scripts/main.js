const gadgetsRotate = () => {
    if (!document.querySelector('.home-page')) return;

    const tabs = document.querySelectorAll('.earn__tab');
    const images = document.querySelectorAll('.earn__img');
    let interval;
    let index = 0;

    const imgMobile = images[0];
    const imgTablet = images[1];
    const imgDesktop = images[2];

    // функция автопереключения табов
    function autoRotate() {
        interval = setInterval(t, 2000);
    }

    function t() {
        const activeTab = tabs[index];
        const activeTabText = activeTab.getAttribute('data-device');
        const width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;


        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        activeTab.classList.add('active');

        // функция, очищающая инлайн стили на картинках
        function removeStyleAttribute() {
            imgMobile.removeAttribute('style');
            imgTablet.removeAttribute('style');
            imgDesktop.removeAttribute('style');
        }

        if (width < 576) {
            // устанавливаем позицию картинок
            switch (activeTabText) {
                case 'mobile':
                    removeStyleAttribute();

                    imgMobile.style.left = '50%';
                    imgMobile.style.top = '50%';
                    imgMobile.style.transform = 'translate(-50%, -50%)';

                    imgTablet.style.left = '72%';
                    imgTablet.style.bottom = '40px';
                    imgTablet.style.opacity = '0.5';
                    imgTablet.style.maxWidth = '80px';

                    imgDesktop.style.top = '0';
                    imgDesktop.style.left = '0';
                    imgDesktop.style.opacity = '0.5';
                    imgDesktop.style.maxWidth = '130px';

                    break;
                case 'tablet':
                    removeStyleAttribute();

                    imgTablet.style.left = '50%';
                    imgTablet.style.bottom = '50%';
                    imgTablet.style.transform = 'translate(-50%, 50%)';
                    imgTablet.style.maxWidth = '180px';
                    imgTablet.style.opacity = '1';

                    imgMobile.style.left = '0';
                    imgMobile.style.top = '60%';
                    imgMobile.style.bottom = 'unset';
                    imgMobile.style.opacity = '0.5';
                    imgMobile.style.maxWidth = '60px';
                    imgMobile.style.transform = 'unset';

                    imgDesktop.style.top = '10px';
                    imgDesktop.style.left = '67%';
                    imgDesktop.style.opacity = '0.5';
                    imgDesktop.style.maxWidth = '97px';

                    break;
                case 'desktop':
                    removeStyleAttribute();

                    imgDesktop.style.left = '50%';
                    imgDesktop.style.top = '50%';
                    imgDesktop.style.transform = 'translate(-50%, -50%)';
                    imgDesktop.style.maxWidth = '220px';
                    imgDesktop.style.opacity = '1';

                    imgMobile.style.left = '82%';
                    imgMobile.style.bottom = 'unset';
                    imgMobile.style.top = '58%';
                    imgMobile.style.transform = 'translateY(50%)';
                    imgMobile.style.opacity = '0.5';
                    imgMobile.style.maxWidth = '50px';

                    // imgTablet.style.top = '0';
                    imgTablet.style.bottom = '60%';
                    imgTablet.style.left = '0';
                    imgTablet.style.opacity = '0.5';
                    imgTablet.style.maxWidth = '90px';

                    break;
            }
        } else {
            // устанавливаем позицию картинок
            switch (activeTabText) {
                case 'mobile':
                    removeStyleAttribute();

                    imgMobile.style.left = '50%';
                    imgMobile.style.transform = 'translateX(-50%)';

                    // imgTablet.style.right = '50px';
                    imgTablet.style.left = '72%';
                    imgTablet.style.bottom = '40px';
                    imgTablet.style.opacity = '0.5';
                    imgTablet.style.maxWidth = '149px';

                    imgDesktop.style.top = '0';
                    imgDesktop.style.left = '0';
                    imgDesktop.style.opacity = '0.5';
                    imgDesktop.style.maxWidth = '225px';

                    break;
                case 'tablet':
                    removeStyleAttribute();

                    imgTablet.style.left = '43%';
                    imgTablet.style.transform = 'translateX(-50%)';
                    imgTablet.style.maxWidth = '338px';
                    imgTablet.style.opacity = '1';

                    imgMobile.style.left = '0';
                    imgMobile.style.bottom = '20px';
                    imgMobile.style.opacity = '0.5';
                    imgMobile.style.maxWidth = '92px';

                    imgDesktop.style.top = '0';
                    imgDesktop.style.left = '67%';
                    imgDesktop.style.opacity = '0.5';
                    imgDesktop.style.maxWidth = '190px';

                    break;
                case 'desktop':
                    removeStyleAttribute();

                    imgDesktop.style.left = '43%';
                    imgDesktop.style.transform = 'translateX(-50%)';
                    imgDesktop.style.maxWidth = '488px';
                    imgDesktop.style.opacity = '1';

                    imgMobile.style.left = '82%';
                    imgMobile.style.bottom = '50%';
                    imgMobile.style.transform = 'translateY(50%)';
                    imgMobile.style.opacity = '0.5';
                    imgMobile.style.maxWidth = '92px';

                    // imgTablet.style.top = '0';
                    imgTablet.style.bottom = '60%';
                    imgTablet.style.left = '0';
                    imgTablet.style.opacity = '0.5';
                    imgTablet.style.maxWidth = '154px';

                    break;
            }
        }

        if (width < 576) return;

        if (index === 2) {
            index = 0;
        } else {
            index++;
        }
    }

    t();

    autoRotate();

    // запуск функции по клику на табы
    tabs.forEach(tab => {
        tab.addEventListener('click', rotate);
    });

    // функция, определяющая активный таб и меняющая положение картинок
    function rotate(e) {
        const currentDeviceTab = this.getAttribute('data-device');

        // удаляем активный класс со всех табов
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // устанавливаем активный класс на элемент, по которому кликнули
        this.classList.add('active');

        // clear interval
        clearInterval(interval);

        // функция, очищающая инлайн стили на картинках
        function removeStyleAttribute() {
            imgMobile.removeAttribute('style');
            imgTablet.removeAttribute('style');
            imgDesktop.removeAttribute('style');
        }

        // устанавливаем позицию картинок
        switch (currentDeviceTab) {
            case 'mobile':
                removeStyleAttribute();

                imgMobile.style.left = '50%';
                imgMobile.style.transform = 'translateX(-50%)';

                // imgTablet.style.right = '50px';
                imgTablet.style.left = '72%';
                imgTablet.style.bottom = '40px';
                imgTablet.style.opacity = '0.5';
                imgTablet.style.maxWidth = '149px';

                imgDesktop.style.top = '0';
                imgDesktop.style.left = '0';
                imgDesktop.style.opacity = '0.5';
                imgDesktop.style.maxWidth = '225px';

                index = 0;
                t();
                autoRotate();

                break;
            case 'tablet':
                removeStyleAttribute();

                imgTablet.style.left = '43%';
                imgTablet.style.transform = 'translateX(-50%)';
                imgTablet.style.maxWidth = '338px';
                imgTablet.style.opacity = '1';

                imgMobile.style.left = '0';
                imgMobile.style.bottom = '20px';
                imgMobile.style.opacity = '0.5';
                imgMobile.style.maxWidth = '92px';

                imgDesktop.style.top = '0';
                imgDesktop.style.left = '67%';
                imgDesktop.style.opacity = '0.5';
                imgDesktop.style.maxWidth = '190px';

                index = 1;
                t();
                autoRotate();

                break;
            case 'desktop':
                removeStyleAttribute();

                imgDesktop.style.left = '43%';
                imgDesktop.style.transform = 'translateX(-50%)';
                imgDesktop.style.maxWidth = '488px';
                imgDesktop.style.opacity = '1';

                imgMobile.style.left = '82%';
                imgMobile.style.bottom = '50%';
                imgMobile.style.transform = 'translateY(50%)';
                imgMobile.style.opacity = '0.5';
                imgMobile.style.maxWidth = '92px';

                // imgTablet.style.top = '0';
                imgTablet.style.bottom = '60%';
                imgTablet.style.left = '0';
                imgTablet.style.opacity = '0.5';
                imgTablet.style.maxWidth = '154px';

                index = 2;
                t();
                autoRotate();

                break;
        }
    }
}

const hamburgerMenuInit = () => {
    const burger = document.querySelector('.burger-container'),
          wrapper = document.querySelector('.wrapper'),
          header = document.querySelector('.header');

    burger.addEventListener('click', function(e) {
        header.classList.toggle('menu-opened');
        document.body.classList.toggle('overflow-hidden');
        wrapper.classList.toggle('overflow-hidden');
    });
}

const openMobileSubmenu = () => {
    const menuItems = document.querySelectorAll('.main-nav .dropdown');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.target.parentElement.classList.toggle('open');
            console.log(e.target)
            console.log(this)
        });
    });
}

const hidePreloader = () => {
    const preloaderWrapper = document.querySelector('.preloader-wrapper');

    preloaderWrapper.classList.add('hide');
}

const initStickyHeader = e => {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;

    header.classList.toggle('sticky', scrollY > 0);
    document.body.classList.toggle('scrolled', scrollY > 0);
}

const flipServiceCard = () => {
    if (document.querySelector('.service__item')) {
        const cards = document.querySelectorAll('.service__item');

        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                const cardContainer = e.target.closest('.card-flip');

                cards.forEach(item => {
                    if (item !== cardContainer) item.classList.remove('flipped');
                });

                cardContainer.classList.contains('flipped') ?
                    cardContainer.classList.remove('flipped') :
                    cardContainer.classList.add('flipped');
            });
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.card-flip')) {
                cards.forEach(item => item.classList.remove('flipped'));
            }
        });
    }
}

// register form validation
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})();

// carousel start
(function() {
    if (!document.querySelector('#carousel')) return;
    // Accepts the id of the container, and the classname that all three elements share
    var ThreeDCarousel = function(el, classname) {
        var element = document.getElementById(el);
        var items = element.getElementsByClassName(classname);
        var classNames = ['two', 'three', 'one'];
        if (items.length !== 3) {
            alert('ThreeDCarousel only supports 3 items.');
            return false;
        } else {
            for (var i = 0; i < 3; i++) {
                items[i].className += " " + classNames[i];
            }
        }

        var obj = {
            element: element,
            items: items,
            prev: function() {
                var l = this.element.getElementsByClassName('one')[0],
                    c = this.element.getElementsByClassName('two')[0],
                    r = this.element.getElementsByClassName('three')[0];
                l.classList.remove('one');
                l.classList.add('two');
                c.classList.remove('two');
                c.classList.add('three');
                r.classList.remove('three');
                r.classList.add('one');
            },
            next: function() {
                var l = this.element.getElementsByClassName('one')[0],
                    c = this.element.getElementsByClassName('two')[0],
                    r = this.element.getElementsByClassName('three')[0];
                l.classList.remove('one');
                l.classList.add('three');
                c.classList.remove('two');
                c.classList.add('one');
                r.classList.remove('three');
                r.classList.add('two');
            }
        };
        return obj;
    };

    var carousel = new ThreeDCarousel('carousel', 'item');

    var auto = setInterval(function() { carousel.next(); }, 3000);

    // var next = document.getElementById('next');
    // next.onclick = carousel.next.bind(carousel);
    //
    // var prev = document.getElementById('prev');
    // prev.onclick = carousel.prev.bind(carousel);
})();
// carousel end

const toTopButton = () => {
    const scrollBtn = document.querySelector(".btn-position.btn-style");

    const btnVisibility = () => {
        if (window.scrollY > 300) {
            scrollBtn.style.visibility = "visible";
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.visibility = "hidden";
            scrollBtn.style.opacity = '0';
        }
    };

    document.addEventListener("scroll", () => {
        btnVisibility();
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const parallaxImages = () => {
    if (document.querySelector('.advices-page')) {
        const images = document.querySelectorAll('.parallax-image');
        new simpleParallax(images, {
            scale: 2,
            overflow: true
        });
        console.log(images)
    }
}

// stats
const initStats = () => {
    if (localStorage.getItem('weekday')) {
        if (String(localStorage.getItem('weekday')) !== String(new Date().getDay())) {
            localStorage.clear();
        }
    }

    if (!document.querySelector('.home-page')) {
        return false;
    }

    const deals = {
        all: {
            min: 1512,
            max: 1940,
            increase() {
                return this.max - this.min;
            }
        },
        dollarProfit: {
            min: 22000,
            max: 27000,
            increase() {
                return this.max - this.min;
            }
        }
    }

    const $dealsAll = document.querySelector('#deals-all');
    const $dealsProfitable = document.querySelector('#deals-profitable');
    const $dealsDollars = document.querySelector('#deals-dollars');

    const getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getProfitableDeals = deals => {
        const percent = 80;

        return Math.floor(deals / 100 * percent);
    }

    const renderStats = () => {
        $dealsAll.textContent = localStorage.getItem('allDeals');
        $dealsProfitable.textContent = localStorage.getItem('profitableDeals');
        $dealsDollars.innerHTML = localStorage.getItem('money') + '<span class="stats__item-sign">$</span>';
    }

    if (localStorage.getItem('isDone') === '1') {
        renderStats();

        return false;
    }

    const allDealsInit = getRandom(deals.all.min, deals.all.max);
    const maxAllDeals = allDealsInit + deals.all.increase();
    let allDealsCurrent = allDealsInit;
    let dollarProfitCurrent = (allDealsCurrent - deals.all.min) * (deals.dollarProfit.increase() / deals.all.increase()) + deals.dollarProfit.min;
    let isDone = 0;

    const setStorage = () => {
        localStorage.setItem('weekday', String(new Date().getDay()));
        localStorage.setItem('allDeals', allDealsInit);
        localStorage.setItem('maxAllDeals', maxAllDeals);
        localStorage.setItem('profitableDeals', String(getProfitableDeals(allDealsCurrent)));
        localStorage.setItem('money', String(Math.floor(dollarProfitCurrent)));
        localStorage.setItem('isDone', String(isDone));
    }

    const updateStorage = (all, profit, dollar) => {
        localStorage.setItem('allDeals', all);
        localStorage.setItem('profitableDeals', String(profit));
        localStorage.setItem('money', String(dollar));
    }

    if (!localStorage.getItem('allDeals')) {
        setStorage();
    }

    renderStats();

    const interval = setInterval(function() {
        const allDealsIncrease = getRandom(2, 5);
        allDealsCurrent = Number(localStorage.getItem('allDeals')) + allDealsIncrease;

        const profitableDealsCurrent = getProfitableDeals(allDealsCurrent);
        dollarProfitCurrent = Number(localStorage.getItem('money')) + (deals.dollarProfit.increase() / deals.all.increase()) * allDealsIncrease;

        if (allDealsCurrent > localStorage.getItem('maxAllDeals')) {
            clearInterval(interval);
            localStorage.setItem('isDone', String(1));

            return true;
        }

        updateStorage(allDealsCurrent, profitableDealsCurrent, Math.floor(dollarProfitCurrent));

        renderStats();
    }, 9000);
}

const domContentLoadedHandler = () => {
    flipServiceCard();
    toTopButton();
    // initStats();

    window.addEventListener('scroll', initStickyHeader);
}

const onLoadInit = () => {
    // hamburgerMenuInit();
    // openMobileSubmenu();
    hidePreloader();
    // parallaxImages();
}

document.addEventListener('DOMContentLoaded', domContentLoadedHandler);
window.addEventListener('load', onLoadInit);