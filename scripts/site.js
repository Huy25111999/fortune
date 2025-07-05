
window.addEventListener('DOMContentLoaded', function () {
    fetch('../data/site.json')
        .then(response => response.json())
        .then(data => {
            // Container Navbar
            const navbar = document.getElementById('navbar');
            navbar.querySelector('.navbar-brand img').src = data.logo;
            navbar.style.background = data.navBarColor;

            const textNavbar = navbar.querySelectorAll('.navbar-nav a');
            textNavbar.forEach(a => {
                a.style.setProperty('color', data.bannerTextColor, 'important');
            });

            // Container banner
            const banner = document.getElementById('inner-banner-service');
            if (banner) {
                banner.querySelector('.banner-image').src = data.bannerImage;
                banner.querySelector('.banner-source').srcset = data.bannerImage;

                const textEl = banner.querySelector('.banner-inner-text h3');
                textEl.textContent = data.bannerText;
                textEl.style.setProperty('color', data.bannerTextColor, 'important');

            }

            // Color theme system
            const theme = data.overallColorTheme;

            document.querySelectorAll('button').forEach(btn => {
                btn.style.backgroundColor = theme.button;
                btn.style.color = '#fff';
            });

            document.querySelectorAll('h1, h2, h3, h4, h5').forEach(header => {
                header.style.color = theme.header;
            });

            // document.querySelectorAll('a').forEach(link => {
            //     link.style.color = theme.link;
            // });

            window.theme = theme;
            applyLinkThemeColor(theme.link);

            //Footer
            const footer = document.querySelector('.footer');
            footer.style.setProperty('background', data.footerColor, 'important');
            footer.querySelector('.footer-logo img').src = data.footerLogo;

            const textFooter = footer.querySelectorAll('.footer a, .footer h5, .footer p');
            textFooter.forEach(a => {
                a.style.setProperty('color', data.footerTextColor, 'important');
            });

            // socialLinks 
            const linkZalo = document.getElementById(`link-zalo`);
            linkZalo.href = data.footerSocialLinks?.zalo;

            const linkfb = document.getElementById(`link-facebook`);
            linkfb.href = data.footerSocialLinks?.facebook;

            const linkWhatsapp = document.getElementById(`link-whatsapp`);
            linkWhatsapp.href = data.footerSocialLinks?.whatsapp;

            //contact us
            const contactPhone = document.getElementById('contact-phone');
            contactPhone.href = `tel:${data.footerPhone}`;
            const contactEmail = document.getElementById('contact-email');
            contactEmail.href = `mailto:${data.footerEmail}`;

            //footerPolicyLinks
            if (Array.isArray(data.footerPolicyLinks)) {
                data.footerPolicyLinks.forEach((href, index) => {
                    const link = document.getElementById(`policy-link-${index + 1}`);
                    if (link) {
                        link.href = href + '.html';
                    }
                });
            }

            const companyText = document.getElementById('footer-company');
            companyText.innerHTML = `${data.companyName}. All rights reserved.`;


            //Page About
            const aboutUsImage = document.getElementById('about-us-image');
            if (aboutUsImage) {
                aboutUsImage.querySelector('.about-us-img').src = data.aboutUsImage;
                aboutUsImage.querySelector('.about-us-source').srcset = data.aboutUsImage;
            }

        })
        .catch(error => {
            console.error('Lỗi khi load dữ liệu banner:', error);
        });
});

    function applyLinkThemeColor(color) {
        document.querySelectorAll('.wrapper-container a').forEach(link => {
            link.style.setProperty('color', color, 'important');
        });
    }
