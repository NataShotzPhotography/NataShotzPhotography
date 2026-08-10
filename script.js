/* =========================================================
   NATA SHOTZ PHOTOGRAPHY
   INTERACTIONS + ANIMATIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const header = document.getElementById("siteHeader");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileLinks =
        document.querySelectorAll(".mobile-link");

    const pageLoader =
        document.getElementById("pageLoader");

    const revealItems =
        document.querySelectorAll("[data-reveal]");

    const tiltCards =
        document.querySelectorAll(".tilt-card");

    const magneticButtons =
        document.querySelectorAll(".magnetic");

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorOutline =
        document.querySelector(".cursor-outline");

    const heroImage =
        document.querySelector(".hero-image");



    /* =====================================================
       PAGE LOADER
    ====================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("loaded");
            }

            setTimeout(() => {

                document
                    .querySelectorAll(".hero [data-reveal]")
                    .forEach((item, index) => {

                        setTimeout(() => {

                            item.classList.add("revealed");

                        }, index * 130);

                    });

            }, 250);

        }, 700);

    });



    /* =====================================================
       HEADER SCROLL
       Transparent at top
       Glass header on scroll
       Hide while scrolling down
       Show while scrolling up
    ====================================================== */

    let lastScroll = 0;

    const updateHeader = () => {

        const currentScroll =
            window.scrollY || window.pageYOffset;

        if (currentScroll > 60) {

            header?.classList.add("scrolled");

        } else {

            header?.classList.remove("scrolled");

        }


        if (
            currentScroll > lastScroll &&
            currentScroll > 220 &&
            !body.classList.contains("menu-open")
        ) {

            header?.classList.add("header-hidden");

        } else {

            header?.classList.remove("header-hidden");

        }


        lastScroll =
            Math.max(currentScroll, 0);

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();



    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const toggleMenu = () => {

        const isOpen =
            mobileMenu.classList.toggle("active");

        mobileMenuBtn.classList.toggle(
            "active",
            isOpen
        );

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        body.classList.toggle(
            "menu-open",
            isOpen
        );

        header?.classList.remove(
            "header-hidden"
        );

    };


    mobileMenuBtn?.addEventListener(
        "click",
        toggleMenu
    );


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            mobileMenuBtn.classList.remove("active");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            body.classList.remove("menu-open");

        });

    });



    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }

        );


    revealItems.forEach(item => {

        if (!item.closest(".hero")) {

            revealObserver.observe(item);

        }

    });



    /* =====================================================
       DESKTOP CURSOR
    ====================================================== */

    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        finePointer &&
        cursorDot &&
        cursorOutline
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let outlineX = 0;
        let outlineY = 0;


        window.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        const animateCursor = () => {

            outlineX +=
                (mouseX - outlineX) * 0.14;

            outlineY +=
                (mouseY - outlineY) * 0.14;

            cursorOutline.style.left =
                `${outlineX}px`;

            cursorOutline.style.top =
                `${outlineY}px`;

            requestAnimationFrame(
                animateCursor
            );

        };


        animateCursor();


        const interactive =
            document.querySelectorAll(
                "a, button, .service-row, .portfolio-item"
            );


        interactive.forEach(item => {

            item.addEventListener(
                "mouseenter",
                () => {

                    cursorOutline.classList.add(
                        "cursor-hover"
                    );

                }
            );


            item.addEventListener(
                "mouseleave",
                () => {

                    cursorOutline.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        });

    }



    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    if (
        heroImage &&
        finePointer
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                const moveX =
                    (
                        event.clientX /
                        window.innerWidth
                        - .5
                    ) * 16;

                const moveY =
                    (
                        event.clientY /
                        window.innerHeight
                        - .5
                    ) * 16;


                heroImage.style.transform =
                    `
                    scale(1.08)
                    translate3d(
                        ${moveX}px,
                        ${moveY}px,
                        0
                    )
                    `;

            }
        );


        window.addEventListener(
            "mouseleave",
            () => {

                heroImage.style.transform =
                    "scale(1.06) translate3d(0,0,0)";

            }
        );

    }



    /* =====================================================
       3D TILT EFFECT
    ====================================================== */

    if (finePointer) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateY =
                        (
                            (x - centerX) /
                            centerX
                        ) * 6;

                    const rotateX =
                        -(
                            (y - centerY) /
                            centerY
                        ) * 6;


                    card.style.transform =
                        `
                        perspective(1200px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        scale3d(1.015,1.015,1.015)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        `
                        perspective(1200px)
                        rotateX(0deg)
                        rotateY(0deg)
                        scale3d(1,1,1)
                        `;

                }
            );

        });

    }



    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ====================================================== */

    if (finePointer) {

        magneticButtons.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `
                        translate(
                            ${x * .16}px,
                            ${y * .16}px
                        )
                        `;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "translate(0,0)";

                }
            );

        });

    }



    /* =====================================================
       PORTFOLIO PARALLAX
    ====================================================== */

    const portfolioItems =
        document.querySelectorAll(
            ".portfolio-image .photo-placeholder"
        );


    const portfolioParallax = () => {

        if (
            window.innerWidth <= 760
        ) {
            return;
        }


        portfolioItems.forEach(item => {

            const rect =
                item.getBoundingClientRect();

            const center =
                rect.top +
                rect.height / 2;

            const screenCenter =
                window.innerHeight / 2;

            const distance =
                center - screenCenter;

            const movement =
                distance * -0.018;


            item.style.transform =
                `
                scale(1.05)
                translateY(${movement}px)
                `;

        });

    };


    window.addEventListener(
        "scroll",
        portfolioParallax,
        { passive: true }
    );



    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            '.desktop-nav a[href^="#"]'
        );


    const navObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const current =
                            entry.target
                                .getAttribute("id");


                        navigationLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active-nav"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${current}`
                                ) {

                                    link.classList.add(
                                        "active-nav"
                                    );

                                }

                            }
                        );

                    }

                });

            },

            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }

        );


    sections.forEach(section => {

        navObserver.observe(section);

    });



    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute("href");


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });



    /* =====================================================
       RED FEATURE ORBS
       Slight mouse depth
    ====================================================== */

    const orbOne =
        document.querySelector(".orb-one");

    const orbTwo =
        document.querySelector(".orb-two");

    const redFeature =
        document.querySelector(".red-feature");


    if (
        finePointer &&
        redFeature
    ) {

        redFeature.addEventListener(
            "mousemove",
            event => {

                const rect =
                    redFeature
                        .getBoundingClientRect();

                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    .5;

                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    .5;


                if (orbOne) {

                    orbOne.style.transform =
                        `
                        translate3d(
                            ${x * -35}px,
                            ${y * -35}px,
                            0
                        )
                        `;

                }


                if (orbTwo) {

                    orbTwo.style.transform =
                        `
                        translate3d(
                            ${x * 45}px,
                            ${y * 45}px,
                            0
                        )
                        `;

                }

            }
        );

    }



    /* =====================================================
       PERFORMANCE
       Stop heavy animation when tab isn't visible
    ====================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                document.body.classList.add(
                    "page-paused"
                );

            } else {

                document.body.classList.remove(
                    "page-paused"
                );

            }

        }
    );

});
