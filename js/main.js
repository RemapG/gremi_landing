/* ==========================================================================
   JAVASCRIPT: GREMI MUSIC SCHOOL LANDING PAGE
   Functionality: Mob Nav, Modular Modals, Step-by-Step Quiz, Teachers Filter,
                  Reviews Slider, Accordion FAQ, Form animation and Visualizer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       0. APPLY DYNAMIC CONFIGURATION (js/config.js)
       ========================================== */
    const applyConfig = () => {
        if (typeof GREMI_CONFIG === 'undefined') return;

        // Update SEO Meta Tags from Config
        if (GREMI_CONFIG.seo) {
            if (GREMI_CONFIG.seo.title) {
                document.title = GREMI_CONFIG.seo.title;
            }
            if (GREMI_CONFIG.seo.description) {
                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) {
                    metaDesc.setAttribute('content', GREMI_CONFIG.seo.description);
                }
            }
        }

        // 1. General & Contacts
        const configPhone = GREMI_CONFIG.contacts.phone;
        const configPhoneLink = GREMI_CONFIG.contacts.phoneLink;
        const configEmail = GREMI_CONFIG.contacts.email;
        const configEmailLink = GREMI_CONFIG.contacts.emailLink;

        // Update phone strings
        document.querySelectorAll('.header-phone, .mobile-phone, .ribbon-text[href^="tel:"], .contact-info-item a[href^="tel:"]').forEach(el => {
            if (el.tagName === 'A') {
                el.href = configPhoneLink;
                el.textContent = configPhone;
            } else {
                el.textContent = configPhone;
            }
        });

        // Update email strings
        document.querySelectorAll('.mobile-email, .ribbon-text[href^="mailto:"], .contact-info-item a[href^="mailto:"]').forEach(el => {
            if (el.tagName === 'A') {
                el.href = configEmailLink;
                el.textContent = configEmail;
            } else {
                el.textContent = configEmail;
            }
        });

        // 2. Hero Section
        const heroBadge = document.querySelector('.hero-badge');
        if (heroBadge) heroBadge.innerHTML = GREMI_CONFIG.hero.badge;

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.innerHTML = GREMI_CONFIG.hero.title;

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.innerHTML = GREMI_CONFIG.hero.subtitle;

        const startQuizBtn = document.getElementById('start-quiz-btn');
        if (startQuizBtn && startQuizBtn.querySelector('span')) {
            startQuizBtn.querySelector('span').textContent = GREMI_CONFIG.hero.ctaButton;
        }

        // Hero Stats
        const statItems = document.querySelectorAll('.hero-stats .stat-item');
        if (statItems.length === 3 && GREMI_CONFIG.hero.stats.length === 3) {
            statItems.forEach((item, index) => {
                const num = item.querySelector('.stat-number');
                const lbl = item.querySelector('.stat-label');
                if (num) num.textContent = GREMI_CONFIG.hero.stats[index].number;
                if (lbl) lbl.textContent = GREMI_CONFIG.hero.stats[index].label;
            });
        }

        // Hero Audio Deck technical strings
        const hudTag = document.querySelector('.hud-tag');
        const hudLive = document.querySelector('.hud-status');
        const deckStats = document.querySelectorAll('.deck-stats .deck-stat');
        if (hudTag) hudTag.textContent = GREMI_CONFIG.hero.deck.version;
        if (hudLive) {
            hudLive.innerHTML = `<span class="status-dot"></span>${GREMI_CONFIG.hero.deck.status}`;
        }
        if (deckStats.length === 3) {
            const val1 = deckStats[0].querySelector('.stat-value');
            const val2 = deckStats[1].querySelector('.stat-value');
            const val3 = deckStats[2].querySelector('.stat-value');
            if (val1) val1.textContent = GREMI_CONFIG.hero.deck.tempo;
            if (val2) val2.textContent = GREMI_CONFIG.hero.deck.freq;
            if (val3) val3.textContent = GREMI_CONFIG.hero.deck.output;
        }

        // 3. Courses (Directions)
        const courseCards = document.querySelectorAll('.courses-grid .course-card');
        if (courseCards.length > 0 && GREMI_CONFIG.courses.list.length > 0) {
            courseCards.forEach((card, index) => {
                const data = GREMI_CONFIG.courses.list[index];
                if (data) {
                    card.setAttribute('data-subject', data.subject);
                    const icon = card.querySelector('.course-icon');
                    const title = card.querySelector('.course-title');
                    const text = card.querySelector('.course-text');
                    if (icon) icon.textContent = data.icon;
                    if (title) title.textContent = data.title;
                    if (text) text.textContent = data.text;
                }
            });
        }

        // 4. Teachers
        const teacherCards = document.querySelectorAll('.teachers-grid .teacher-card');
        if (teacherCards.length > 0 && GREMI_CONFIG.teachers.list.length > 0) {
            teacherCards.forEach((card, index) => {
                const data = GREMI_CONFIG.teachers.list[index];
                if (data) {
                    card.setAttribute('data-category', data.category);
                    
                    const imgPlaceholder = card.querySelector('.teacher-img-placeholder');
                    const imgWrapper = card.querySelector('.teacher-image-wrapper');
                    
                    // Replace photo or show placeholder
                    if (data.photoUrl) {
                        if (imgPlaceholder) imgPlaceholder.remove();
                        let img = card.querySelector('.teacher-img');
                        if (!img) {
                            img = document.createElement('img');
                            img.className = 'teacher-img';
                            imgWrapper.appendChild(img);
                        }
                        img.src = data.photoUrl;
                        img.alt = data.name;
                    } else {
                        // Re-create placeholder if not exists or update it
                        let placeholder = card.querySelector('.teacher-img-placeholder');
                        if (!placeholder) {
                            placeholder = document.createElement('div');
                            imgWrapper.appendChild(placeholder);
                        }
                        placeholder.className = `teacher-img-placeholder ${data.placeholderClass}`;
                        placeholder.textContent = data.placeholderEmoji;
                    }

                    const expBadge = card.querySelector('.teacher-experience-badge');
                    if (expBadge) expBadge.textContent = data.experienceBadge;

                    const name = card.querySelector('.teacher-name');
                    const role = card.querySelector('.teacher-role');
                    const statItems = card.querySelectorAll('.teacher-stats-mini span');
                    const desc = card.querySelector('.teacher-desc');
                    const btn = card.querySelector('.open-booking-modal');

                    if (name) name.textContent = data.name;
                    if (role) role.textContent = data.role;
                    if (statItems.length === 2) {
                        statItems[0].textContent = data.statText;
                        statItems[1].textContent = data.ageText;
                    }
                    if (desc) desc.textContent = data.desc;
                    if (btn) {
                        btn.textContent = `Записаться к ${data.name.split(' ')[0]}`;
                        btn.setAttribute('data-subject', data.subject);
                    }
                }
            });
        }

        // 5. About Section
        const aboutSubtitle = document.querySelector('.about-container .section-subtitle');
        if (aboutSubtitle) aboutSubtitle.textContent = GREMI_CONFIG.about.subtitle;

        const aboutTitle = document.querySelector('.about-container .section-title');
        if (aboutTitle) aboutTitle.textContent = GREMI_CONFIG.about.title;

        const aboutInfoBlock = document.querySelector('.about-info-block');
        if (aboutInfoBlock) {
            const aboutPs = aboutInfoBlock.querySelectorAll('.about-p');
            if (aboutPs.length === 2 && GREMI_CONFIG.about.descParagraphs.length === 2) {
                aboutPs[0].innerHTML = GREMI_CONFIG.about.descParagraphs[0];
                aboutPs[1].innerHTML = GREMI_CONFIG.about.descParagraphs[1];
            }
        }

        // About Features
        const featItems = document.querySelectorAll('.about-features .feat-item');
        if (featItems.length === 2 && GREMI_CONFIG.about.features.length === 2) {
            featItems.forEach((item, index) => {
                const icon = item.querySelector('.feat-icon');
                const title = item.querySelector('h4');
                const desc = item.querySelector('p');
                if (icon) icon.textContent = GREMI_CONFIG.about.features[index].icon;
                if (title) title.textContent = GREMI_CONFIG.about.features[index].title;
                if (desc) desc.textContent = GREMI_CONFIG.about.features[index].desc;
            });
        }

        // About Video block references
        const playerThumbnail = document.querySelector('.player-thumbnail');
        if (playerThumbnail) playerThumbnail.src = GREMI_CONFIG.about.video.thumbnailUrl;

        const playerSong = document.querySelector('.player-song');
        if (playerSong) playerSong.textContent = GREMI_CONFIG.about.video.songTitle;

        const playerAuthor = document.querySelector('.player-author');
        if (playerAuthor) playerAuthor.textContent = GREMI_CONFIG.about.video.songSubtitle;

        // 6. Pricing (Formats)
        const priceCards = document.querySelectorAll('.pricing-grid .price-card');
        if (priceCards.length > 0 && GREMI_CONFIG.pricing.list.length > 0) {
            priceCards.forEach((card, index) => {
                const data = GREMI_CONFIG.pricing.list[index];
                if (data) {
                    const badge = card.querySelector('.price-badge, .price-badge-popular');
                    const name = card.querySelector('.price-name');
                    const value = card.querySelector('.price-value');
                    const desc = card.querySelector('.price-desc');
                    const btn = card.querySelector('.open-booking-modal');

                    if (badge) badge.textContent = data.badge;
                    if (name) name.textContent = data.name;
                    if (value) value.textContent = data.price;
                    if (desc) desc.textContent = data.desc;
                    if (btn) {
                        btn.textContent = data.btnText;
                        btn.setAttribute('data-subject', `Тариф ${data.name}`);
                    }
                }
            });
        }

        // 7. Reviews
        const reviewSlides = document.querySelectorAll('.reviews-slider .review-slide');
        if (reviewSlides.length > 0 && GREMI_CONFIG.reviews.list.length > 0) {
            reviewSlides.forEach((slide, index) => {
                const data = GREMI_CONFIG.reviews.list[index];
                if (data) {
                    const rating = slide.querySelector('.review-rating');
                    const text = slide.querySelector('.review-text');
                    const avatar = slide.querySelector('.author-avatar');
                    const authorName = slide.querySelector('.author-name');
                    const details = slide.querySelector('.author-details');

                    if (rating) rating.textContent = '⭐'.repeat(data.stars);
                    if (text) text.textContent = data.text;
                    if (avatar) avatar.textContent = data.avatarLetters;
                    if (authorName) authorName.textContent = data.name;
                    if (details) details.textContent = data.details;
                }
            });
        }

        // 8. FAQ Section
        const accordionItems = document.querySelectorAll('.faq-accordion-wrapper .accordion-item');
        if (accordionItems.length > 0 && GREMI_CONFIG.faq.list.length > 0) {
            accordionItems.forEach((item, index) => {
                const data = GREMI_CONFIG.faq.list[index];
                if (data) {
                    const header = item.querySelector('.accordion-header span:first-child');
                    const content = item.querySelector('.accordion-content p');
                    if (header) header.textContent = data.q;
                    if (content) content.textContent = data.a;
                }
            });
        }
    };

    // Apply configuration immediately
    applyConfig();

    /* ==========================================
       TELEGRAM SENDING SERVICE (FORWARDS ALL LEADS TO @woodbaze_admin)
       ========================================== */
    const sendLeadToTelegram = async (messageText) => {
        if (typeof GREMI_CONFIG === 'undefined' || !GREMI_CONFIG.telegram || !GREMI_CONFIG.telegram.enabled) {
            return;
        }

        const { botToken, chatId } = GREMI_CONFIG.telegram;

        // Skip sending if parameters are not configured yet
        if (!botToken || botToken === 'YOUR_BOT_TOKEN_HERE' || !chatId || chatId === 'YOUR_CHAT_ID_HERE') {
            console.warn('Telegram integration: Bot token or Chat ID is not configured in js/config.js. Message was blocked.');
            return;
        }

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: messageText,
                    parse_mode: 'HTML'
                })
            });

            const data = await response.json();
            if (!data.ok) {
                console.error('Error sending message to Telegram Bot API:', data);
            }
        } catch (error) {
            console.error('Network error attempting to send to Telegram:', error);
        }
    };

    /* ==========================================
       1. STICKY HEADER & SCROLL STATE
       ========================================== */
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check


    /* ==========================================
       2. MOBILE MENU DRAWER
       ========================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileBtn = mobileDrawer.querySelector('.btn');

    const toggleMobileMenu = () => {
        mobileToggle.classList.toggle('active');
        mobileDrawer.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden'); // Disable scroll when menu open
    };

    const closeMobileMenu = () => {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    };

    mobileToggle.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    if (mobileBtn) {
        mobileBtn.addEventListener('click', closeMobileMenu);
    }


    /* ==========================================
       3. MODAL OVERLAY SYSTEMS (MODULAR)
       ========================================== */
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            // Check if any other modal is active before enabling scroll
            const activeModals = document.querySelectorAll('.modal-overlay.active');
            if (activeModals.length <= 1) {
                document.body.style.overflow = '';
            }
        }
    };

    // Global Close Button hook
    const closeButtons = document.querySelectorAll('.modal-close-btn, .booking-close, .quiz-close, .video-close, .privacy-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const overlay = e.target.closest('.modal-overlay');
            if (overlay) {
                closeModal(overlay.id);
            }
        });
    });

    // Close on clicking overlay background
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });

    // Open Direct Booking Modal (Triggers)
    const bookingTriggers = document.querySelectorAll('.open-booking-modal');
    const bookingSubjectInput = document.getElementById('booking-subject');
    const bookingModalTitle = document.querySelector('.booking-modal-title');
    const directForm = document.getElementById('direct-booking-form');
    const bookingSuccess = document.querySelector('.booking-success-screen');

    bookingTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const subject = trigger.getAttribute('data-subject') || 'Общая заявка';
            
            // Reset success screen if any
            if (bookingSuccess) bookingSuccess.classList.remove('active');
            if (directForm) directForm.style.opacity = '1';
            if (directForm) directForm.reset();

            // Set Form Topic
            if (bookingSubjectInput) bookingSubjectInput.value = subject;
            if (bookingModalTitle) {
                if (subject.includes('Запись к')) {
                    bookingModalTitle.textContent = 'Запись к преподавателю';
                } else if (subject.includes('Сертификат')) {
                    bookingModalTitle.textContent = 'Купить сертификат';
                } else {
                    bookingModalTitle.textContent = 'Записаться на занятие';
                }
            }

            // Auto-select corresponding direction in popup form based on trigger subject
            const bookingDirectionSelect = document.getElementById('booking-direction');
            if (bookingDirectionSelect) {
                const subLower = subject.toLowerCase();
                if (subLower.includes('вокал') || subLower.includes('егоров') || subLower.includes('иванов')) {
                    bookingDirectionSelect.value = 'Вокал';
                } else if (subLower.includes('барабан')) {
                    bookingDirectionSelect.value = 'Барабаны';
                } else if (subLower.includes('гитар') || subLower.includes('федотов') || subLower.includes('кулешов') || subLower.includes('аникин')) {
                    bookingDirectionSelect.value = 'Гитара';
                } else if (subLower.includes('клавиш') || subLower.includes('фортепиано') || subLower.includes('кактурск') || subLower.includes('фролов')) {
                    bookingDirectionSelect.value = 'Фортепиано';
                } else if (subLower.includes('сольфеджио')) {
                    bookingDirectionSelect.value = 'Сольфеджио';
                } else {
                    bookingDirectionSelect.value = 'Хочу определиться';
                }
            }

            openModal('booking-modal');
        });
    });

    // Open Privacy Policy Modal
    const privacyTriggers = document.querySelectorAll('.open-privacy');
    privacyTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('privacy-modal');
        });
    });


    /* ==========================================
       4. INTERACTIVE STEP-BY-STEP QUIZ
       ========================================== */
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizModal = document.getElementById('quiz-modal');
    const quizSteps = document.querySelectorAll('.quiz-step');
    const quizProgress = document.getElementById('quiz-progress');
    const quizContactForm = document.getElementById('quiz-contact-form');
    
    let currentQuizStep = 1;
    let quizData = {
        instrument: 'Вокал',
        level: 'Абсолютный новичок',
        goal: 'Играть для души'
    };

    const updateQuizProgress = () => {
        if (!quizProgress) return;
        const totalSteps = 3;
        const percentage = (currentQuizStep / totalSteps) * 100;
        quizProgress.style.width = `${percentage}%`;
    };

    const showQuizStep = (step) => {
        quizSteps.forEach(s => s.classList.remove('active'));
        
        if (step === 'success') {
            const successStep = document.querySelector('.quiz-step[data-step="success"]');
            if (successStep) successStep.classList.add('active');
            
            // Populate summary card
            document.getElementById('summary-instrument').textContent = quizData.instrument;
            document.getElementById('summary-level').textContent = quizData.level;
            document.getElementById('summary-goal').textContent = quizData.goal;
        } else {
            const targetStep = document.querySelector(`.quiz-step[data-step="${step}"]`);
            if (targetStep) targetStep.classList.add('active');
            currentQuizStep = step;
            updateQuizProgress();
        }
    };

    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            // Reset Quiz State
            currentQuizStep = 1;
            quizData = { instrument: 'Вокал', level: 'Абсолютный новичок', goal: 'Играть для души' };
            
            // Check radio inputs to initial selections
            const checkedInst = document.querySelector('input[name="quiz_instrument"]:checked');
            if (checkedInst) checkedInst.checked = false;
            document.querySelector('input[name="quiz_instrument"][value="Вокал"]').checked = true;

            const checkedLvl = document.querySelector('input[name="quiz_level"]:checked');
            if (checkedLvl) checkedLvl.checked = false;
            document.querySelector('input[name="quiz_level"][value="Абсолютный новичок"]').checked = true;

            const checkedGoal = document.querySelector('input[name="quiz_goal"]:checked');
            if (checkedGoal) checkedGoal.checked = false;
            document.querySelector('input[name="quiz_goal"][value="Играть для себя"]').checked = true;

            if (quizContactForm) quizContactForm.reset();
            
            showQuizStep(1);
            openModal('quiz-modal');
        });
    }

    // Step Next Buttons
    const nextButtons = document.querySelectorAll('.quiz-next-btn');
    nextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentQuizStep === 1) {
                const selectedInst = document.querySelector('input[name="quiz_instrument"]:checked');
                if (selectedInst) quizData.instrument = selectedInst.value;
                showQuizStep(2);
            } else if (currentQuizStep === 2) {
                const selectedLvl = document.querySelector('input[name="quiz_level"]:checked');
                if (selectedLvl) quizData.level = selectedLvl.value;
                showQuizStep(3);
            }
        });
    });

    // Step Prev Buttons
    const prevButtons = document.querySelectorAll('.quiz-prev-btn');
    prevButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentQuizStep > 1) {
                showQuizStep(currentQuizStep - 1);
            }
        });
    });

    // Quiz Contact Form Submission (Step 3 Submit)
    if (quizContactForm) {
        quizContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('quiz-name');
            const phoneInput = document.getElementById('quiz-phone');
            
            if (!nameInput.value.trim() || !phoneInput.value.trim()) {
                alert('Пожалуйста, заполните контактные поля!');
                return;
            }

            // Capture final goal selection
            const selectedGoal = document.querySelector('input[name="quiz_goal"]:checked');
            if (selectedGoal) {
                // Map internal values to readable values
                const val = selectedGoal.value;
                if (val === 'Играть для себя') quizData.goal = 'Играть для души';
                else if (val === 'Выступать на сцене') quizData.goal = 'Сцена и концерты';
                else if (val === 'Писать свои песни') quizData.goal = 'Писать свои песни';
                else quizData.goal = val;
            }

            const name = nameInput.value;
            const phone = phoneInput.value;

            // Format lead message for Telegram Bot
            const tgMsg = `⚡️ <b>НОВАЯ ЗАЯВКА (КВИЗ-ТЕСТ) GREMI</b> ⚡️\n` +
                          `──────────────────\n` +
                          `👤 <b>Имя:</b> ${name}\n` +
                          `📞 <b>Телефон:</b> <code>${phone}</code>\n` +
                          `🎸 <b>Инструмент:</b> ${quizData.instrument}\n` +
                          `🎓 <b>Уровень:</b> ${quizData.level}\n` +
                          `🎯 <b>Цель обучения:</b> ${quizData.goal}\n` +
                          `──────────────────\n` +
                          `💬 <i>Отправлено из теста за 1 минуту</i>`;

            // Forward to Telegram
            sendLeadToTelegram(tgMsg);

            console.log('Quiz Submission data sent to Telegram:', {
                ...quizData,
                name: name,
                phone: phone
            });

            // Transition to success
            showQuizStep('success');
        });
    }


    /* ==========================================
       5. FILTERABLE TEACHERS LIST
       ========================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const teacherCards = document.querySelectorAll('.teacher-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all tabs
            tabButtons.forEach(b => b.classList.remove('active'));
            // Add active to current
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            teacherCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add fade effect via classes
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hide');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('hide');
                    }
                }, 200);
            });
        });
    });


    /* ==========================================
       6. REVIEWS SLIDER / CAROUSEL
       ========================================== */
    const slides = document.querySelectorAll('.review-slide');
    const sliderDotsContainer = document.getElementById('slider-dots');
    const btnPrev = document.getElementById('slider-prev');
    const btnNext = document.getElementById('slider-next');
    
    let currentSlide = 0;
    let autoPlayInterval;

    if (slides.length > 0) {
        // Render dots dynamically
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.setAttribute('data-index', idx);
            if (sliderDotsContainer) sliderDotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetAutoPlay();
            });
        });

        const dots = document.querySelectorAll('.dot');

        const goToSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            currentSlide = index;
        };

        const nextSlide = () => {
            let target = currentSlide + 1;
            if (target >= slides.length) target = 0;
            goToSlide(target);
        };

        const prevSlide = () => {
            let target = currentSlide - 1;
            if (target < 0) target = slides.length - 1;
            goToSlide(target);
        };

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                nextSlide();
                resetAutoPlay();
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                prevSlide();
                resetAutoPlay();
            });
        }

        // Auto play slider
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 7000); // 7 seconds per slide
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };

        startAutoPlay();
    }


    /* ==========================================
       7. FAQ ACCORDION (SMOOTH TRANSITIONS)
       ========================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');

            // Close all other items first (optional, but clean)
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    if (otherContent) otherContent.style.maxHeight = null;
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });


    /* ==========================================
       8. FORMS SUBMISSIONS (ANIMATIONS & MOCK)
       ========================================== */
    
    // Direct Booking Form Submission (Header and Card buttons)
    if (directForm) {
        directForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = directForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Animation state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';

            const subject = document.getElementById('booking-subject').value;
            const name = document.getElementById('booking-name').value;
            const phone = document.getElementById('booking-phone').value;
            const direction = document.getElementById('booking-direction').value;

            // Format message for Telegram Bot
            const tgMsg = `⚡️ <b>НОВАЯ ЗАЯВКА НА САЙТЕ GREMI</b> ⚡️\n` +
                          `──────────────────\n` +
                          `📌 <b>Форма:</b> ${subject}\n` +
                          `👤 <b>Имя:</b> ${name}\n` +
                          `📞 <b>Телефон:</b> <code>${phone}</code>\n` +
                          `🎸 <b>Направление:</b> ${direction}\n` +
                          `──────────────────\n` +
                          `💬 <i>Отправлено из всплывающей формы</i>`;

            // Forward to Telegram
            sendLeadToTelegram(tgMsg);
            
            setTimeout(() => {
                console.log('Direct Booking Form Submitted to Telegram:', { subject, name, phone, direction });
                
                // Show Success Screen
                directForm.style.opacity = '0';
                if (bookingSuccess) bookingSuccess.classList.add('active');
                
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1000);
        });
    }

    // Footer Contact Form Submission
    const footerForm = document.getElementById('footer-contact-form');
    if (footerForm) {
        footerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = footerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';

            const subject = footerForm.querySelector('input[name="form_subject"]').value || 'Заявка из контактов';
            const name = document.getElementById('footer-name').value;
            const phone = document.getElementById('footer-phone').value;
            const direction = document.getElementById('footer-direction').value;

            // Format message for Telegram Bot
            const tgMsg = `⚡️ <b>НОВАЯ ЗАЯВКА НА САЙТЕ GREMI</b> ⚡️\n` +
                          `──────────────────\n` +
                          `📌 <b>Форма:</b> ${subject}\n` +
                          `👤 <b>Имя:</b> ${name}\n` +
                          `📞 <b>Телефон:</b> <code>${phone}</code>\n` +
                          `🎸 <b>Направление:</b> ${direction}\n` +
                          `──────────────────\n` +
                          `💬 <i>Отправлено из блока контактов (подвал)</i>`;

            // Forward to Telegram
            sendLeadToTelegram(tgMsg);
            
            setTimeout(() => {
                console.log('Footer Form Submitted to Telegram:', { subject, name, phone, direction });
                
                // Alert success beautifully (Mock)
                alert('Заявка успешно отправлена! Мы перезвоним вам в течение 30 минут.');
                
                // Reset Form
                footerForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1000);
        });
    }


    /* ==========================================
       9. WHITNEY HOUSTON VIDEO COVER MOCK PLAYER
       ========================================== */
    const playVideoBtn = document.getElementById('play-video-btn');
    const playPauseVideoBtn = document.querySelector('.play-pause-video-btn');
    const waveVisual = document.querySelector('.wave-visual-container');
    const videoProgressBar = document.querySelector('.progress-bar-video-inner');
    const timeElapsedEl = document.querySelector('.time-elapsed');
    
    let isVideoPlaying = false;
    let videoProgressPercent = 0;
    let playbackInterval;
    let elapsedSeconds = 0;

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const stopMockPlayback = () => {
        isVideoPlaying = false;
        if (playPauseVideoBtn) playPauseVideoBtn.textContent = 'Воспроизвести';
        if (waveVisual) waveVisual.classList.remove('playing');
        clearInterval(playbackInterval);
    };

    const startMockPlayback = () => {
        isVideoPlaying = true;
        if (playPauseVideoBtn) playPauseVideoBtn.textContent = 'Пауза';
        if (waveVisual) waveVisual.classList.add('playing');
        
        playbackInterval = setInterval(() => {
            videoProgressPercent += 0.4; // slowly increment
            elapsedSeconds = Math.floor((videoProgressPercent / 100) * 252); // 4min 12s = 252s
            
            if (videoProgressBar) videoProgressBar.style.width = `${videoProgressPercent}%`;
            if (timeElapsedEl) timeElapsedEl.textContent = formatTime(elapsedSeconds);
            
            if (videoProgressPercent >= 100) {
                videoProgressPercent = 0;
                elapsedSeconds = 0;
                stopMockPlayback();
                if (videoProgressBar) videoProgressBar.style.width = '0%';
                if (timeElapsedEl) timeElapsedEl.textContent = '0:00';
            }
        }, 100);
    };

    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', () => {
            // Check if real video is configured
            if (typeof GREMI_CONFIG !== 'undefined' && GREMI_CONFIG.about.video.videoUrl) {
                const modalContainer = document.querySelector('#video-modal .video-player-container-modal');
                const videoTitle = document.querySelector('#video-modal .video-modal-title');
                const videoSubtitle = document.querySelector('#video-modal .video-modal-subtitle');
                
                if (videoTitle) videoTitle.textContent = GREMI_CONFIG.about.video.songTitle;
                if (videoSubtitle) videoSubtitle.textContent = GREMI_CONFIG.about.video.songSubtitle;
                
                if (modalContainer) {
                    // Back up mock controls in case video gets removed later
                    if (!window.mockPlayerBackupHTML) {
                        window.mockPlayerBackupHTML = modalContainer.innerHTML;
                    }
                    
                    modalContainer.classList.add('has-real-video');
                    if (GREMI_CONFIG.about.video.isVideoYouTube) {
                        modalContainer.innerHTML = `
                            <iframe src="${GREMI_CONFIG.about.video.videoUrl}" 
                                    frameborder="0" 
                                    allow="autoplay; encrypted-media; picture-in-picture" 
                                    allowfullscreen 
                                    style="width: 100%; aspect-ratio: 16/9; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background:#000;">
                            </iframe>`;
                    } else {
                        modalContainer.innerHTML = `
                            <video src="${GREMI_CONFIG.about.video.videoUrl}" 
                                   controls 
                                   autoplay 
                                   style="width: 100%; aspect-ratio: 16/9; border-radius: 12px; background: #000; border: 1px solid rgba(255,255,255,0.1);">
                            </video>`;
                    }
                }
            } else {
                // Fallback to mock playback
                stopMockPlayback();
                videoProgressPercent = 0;
                elapsedSeconds = 0;
                if (videoProgressBar) videoProgressBar.style.width = '0%';
                if (timeElapsedEl) timeElapsedEl.textContent = '0:00';
            }
            
            openModal('video-modal');
        });
    }

    if (playPauseVideoBtn) {
        playPauseVideoBtn.addEventListener('click', () => {
            // Only triggers mock visualizer if real video is not playing
            if (typeof GREMI_CONFIG === 'undefined' || !GREMI_CONFIG.about.video.videoUrl) {
                if (isVideoPlaying) {
                    stopMockPlayback();
                } else {
                    startMockPlayback();
                }
            }
        });
    }

    // Stop playback if video modal is closed
    const videoModal = document.getElementById('video-modal');
    if (videoModal) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!videoModal.classList.contains('active')) {
                        stopMockPlayback();
                        // Clear real video player to stop audio
                        const modalContainer = document.querySelector('#video-modal .video-player-container-modal');
                        if (modalContainer && typeof GREMI_CONFIG !== 'undefined' && GREMI_CONFIG.about.video.videoUrl) {
                            modalContainer.classList.remove('has-real-video');
                            modalContainer.innerHTML = window.mockPlayerBackupHTML || '';
                        }
                    }
                }
            });
        });
        observer.observe(videoModal, { attributes: true });
    }

    /* ==========================================
       10. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target); // Trigger only once for performance
                }
            });
        }, {
            root: null,
            threshold: 0.01,
            rootMargin: '0px 0px 80px 0px'
        });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // 16. Initialize Dark Premium Interactive Map
    const mapContainer = document.getElementById('interactive-map');
    if (mapContainer && typeof L !== 'undefined') {
        const lat = 55.363278;
        const lng = 86.057032;
        
        try {
            // Create map instance
            const map = L.map('interactive-map', {
                center: [lat, lng],
                zoom: 16,
                zoomControl: false, // Clean look, we will add zoom control in bottom right
                attributionControl: false // Hide leaflet logo for a custom premium feel
            });
            
            // Add CartoDB Dark Matter tiles (premium dark mode tiles)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 20
            }).addTo(map);
            
            // Add custom neon red marker
            const customIcon = L.divIcon({
                className: 'map-custom-marker',
                html: '<div class="marker-pulse"></div><div class="marker-dot">📍</div>',
                iconSize: [30, 30],
                iconAnchor: [15, 30]
            });
            
            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
            marker.bindPopup('<b style="color: #ff2d46;">Школа ГРЕМИ</b><br>ул. Карболитовская, 1/3').openPopup();
            
            // Add zoom control at bottom-right for usability
            L.control.zoom({
                position: 'bottomright'
            }).addTo(map);
        } catch (e) {
            console.error("Leaflet map initialization failed: ", e);
        }
    }

    /* ==========================================
       10. INPUT PHONE MASK (force standard format +7 (999) 999-99-99)
       ========================================== */
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            // If the first digit is 7 or 8, remove it so we can format the rest
            if (value.startsWith('8')) {
                value = value.substring(1);
            } else if (value.startsWith('7')) {
                value = value.substring(1);
            }
            
            // Limit to 10 digits
            value = value.substring(0, 10);
            
            let formatted = '+7 ';
            if (value.length > 0) {
                formatted += '(' + value.substring(0, 3);
            }
            if (value.length >= 3) {
                formatted += ') ';
            }
            if (value.length > 3) {
                formatted += value.substring(3, 6);
            }
            if (value.length >= 6) {
                formatted += '-';
            }
            if (value.length > 6) {
                formatted += value.substring(6, 8);
            }
            if (value.length >= 8) {
                formatted += '-';
            }
            if (value.length > 8) {
                formatted += value.substring(8, 10);
            }
            
            e.target.value = value.length === 0 ? '' : formatted;
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.length <= 4) {
                e.target.value = '';
            }
        });
    });

});
