// ============================================
// NATIONAL MILITARY TRAINING PROGRAMME
// Marketing Hub JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize marketing hub components
    initMarketingHub();
});

function initMarketingHub() {
    // Content generator
    initContentGenerator();

    // Banner creator
    initBannerCreator();

    // Content calendar
    initContentCalendar();

    // Analytics
    initMarketingAnalytics();

    // Template selection
    initTemplateSelection();
}

// ============================================
// CONTENT GENERATOR
// ============================================
function initContentGenerator() {
    const generateBtn = document.getElementById('generateContent');
    const contentType = document.getElementById('contentType');
    const targetAudience = document.getElementById('targetAudience');
    const platform = document.getElementById('platform');
    const generatedContent = document.getElementById('generatedContent');

    if (!generateBtn) return;

    generateBtn.addEventListener('click', function() {
        const type = contentType.value;
        const audience = targetAudience.value;
        const platformType = platform.value;

        // Generate content based on selections
        const content = generateMarketingContent(type, audience, platformType);

        // Display generated content
        displayGeneratedContent(content, type);
    });
}

function generateMarketingContent(type, audience, platform) {
    const contentTemplates = {
        post: {
            matrics: {
                facebook: "🎓 Matric 2024 graduates! Your results don't define your future - your actions do! Join South Africa's premier military training programme and transform from student to soldier. 98% success rate, elite training, guaranteed employment. Apply now before 31 December! #MilitaryTraining #FutureLeaders #Matric2024",
                instagram: "From matric stress to military success! 💪\n\nYour matric certificate is just the beginning. Our 12-week intensive training programme turns ordinary graduates into extraordinary leaders.\n\n✨ Elite physical conditioning\n✨ Mental resilience training\n✨ Leadership development\n✨ Guaranteed military placement\n\nDon't let poor results stop you - let them motivate you! DM for application details.\n\n#Matric2024 #MilitaryTraining #SecondChance #Leadership",
                twitter: "Matric results in? Not happy with your scores? Big deal! South Africa's military needs YOU. 12 weeks of elite training = guaranteed career + leadership skills. Apply now - don't waste another year! 🇿🇦 #Matric2024 #MilitaryTraining #CareerOpportunity",
                tiktok: "POV: You got your matric results and you're not impressed 😔 But here's the plot twist! 🎬 Military training doesn't care about percentages - it cares about potential! 💪 Join our programme and become the leader you were born to be! 🇿🇦 #Matric2024 #MilitaryTraining #SecondChance #FutureSoldier",
                whatsapp: "Hi there! Congratulations on completing matric! 🎓\n\nDid your results meet your expectations? Don't worry - our military training programme gives you a second chance to build an amazing future.\n\n✅ 12-week elite training\n✅ Guaranteed military placement\n✅ Leadership skills for life\n✅ 98% success rate\n\nApply now: [Application Link]\n\nYour future starts here! 🇿🇦"
            },
            university: {
                facebook: "🎓 University students! Military training isn't just for those who can't get into university - it's for those who want REAL leadership experience! Our programme runs alongside your studies and gives you skills no degree can match. Apply for our 2025 intake! #MilitaryTraining #Leadership #UniversityLife",
                instagram: "University vs Military Training: Which one builds REAL leaders? 🤔\n\nAt university, you learn theory.\nIn military training, you BECOME a leader. 💪\n\nOur programme:\n✨ Practical leadership skills\n✨ Physical excellence\n✨ Mental toughness\n✨ National service\n\nPerfect for students who want more than just a degree!\n\n#University #MilitaryTraining #Leadership #RealWorldSkills",
                twitter: "University giving you theory? Military training gives you REAL leadership skills! 🇿🇦 Join our programme and graduate with more than just a degree - graduate with the ability to LEAD! Apply now for 2025 intake. #MilitaryTraining #Leadership #UniversityStudents",
                tiktok: "Study hard, get degree, get job... BORING! 📚❌ Instead: Study + Military training = UNSTOPPABLE! 💪🎓\n\nGet your degree AND become a leader who can command respect! Our programme works around your studies. Who's ready to level up? 🙋‍♂️🙋‍♀️\n\n#University #MilitaryTraining #Leadership #FutureLeaders",
                whatsapp: "Hi! Are you a university student looking to develop real leadership skills? 🎓\n\nOur military training programme complements your studies perfectly and gives you:\n\n✅ Practical leadership experience\n✅ Physical fitness training\n✅ Mental resilience\n✅ National service opportunities\n\nApply now for our 2025 intake!\n\nContact us for more details."
            }
        },
        slogan: {
            matrics: {
                general: [
                    "From Matric to Military: Your Second Chance at Greatness!",
                    "Poor Results? No Problem! Military Training Builds Real Winners!",
                    "Matric Certificate in Hand, Military Career in Sight!",
                    "Results Don't Matter - Potential Does! Join Military Training Today!",
                    "Turn Matric Regrets into Military Victories!"
                ]
            },
            youth: {
                general: [
                    "Forge Your Future: Military Training Builds Champions!",
                    "Discipline Today, Leadership Tomorrow!",
                    "From Civilian to Soldier: Transform Your Life!",
                    "Elite Training for Ordinary People with Extraordinary Potential!",
                    "Military Training: Where Potential Becomes Power!"
                ]
            }
        },
        story: {
            matrics: {
                facebook: "Meet Thabo - Matric 2023 graduate with 45% average. Today, he's a proud member of the South African Army, leading his platoon with confidence! His story proves: military training doesn't care about your past results - it cares about your future potential. Thabo's transformation: from uncertain graduate to confident leader in just 12 weeks! 🇿🇦 #SuccessStory #MilitaryTraining #Transformation",
                instagram: "Real transformation story: Thabo's journey from 45% matric average to Army leader! 💪\n\n\"I thought my life was over after matric. Wrong! Military training gave me discipline, confidence, and purpose. Now I lead soldiers and serve my country with pride.\"\n\nYour story could be next! Don't let poor results define you - let potential propel you! 🚀\n\n#SuccessStory #MilitaryTraining #Transformation #Leadership",
                twitter: "From 45% matric to Army platoon leader! Thabo's story proves military training transforms lives. Don't let poor results stop you - join the programme that builds REAL leaders! 🇿🇦 #SuccessStory #MilitaryTraining #Transformation"
            }
        },
        "call-to-action": {
            matrics: {
                facebook: "🚨 APPLICATION DEADLINE: 31 December 2024! 🚨\n\nMatric students: Don't waste another year! Join South Africa's military training programme and secure your future as a leader. 98% success rate, guaranteed placement, elite training. Apply NOW before it's too late!\n\nLink in bio 👆\n\n#MilitaryTraining #Matric2024 #ApplyNow #FutureLeaders",
                instagram: "LAST CHANCE! ⏰ Applications close 31 December!\n\nTo all matric students: Your future doesn't have to be uncertain. Choose the path of champions - military training that builds real leaders and guarantees employment!\n\nWhat are you waiting for? Your transformation starts with one click! 💪\n\nApply now: Link in bio\n\n#MilitaryTraining #ApplicationDeadline #FutureLeaders #ApplyNow",
                twitter: "🚨 FINAL CALL: Military training applications close 31 Dec! Matric students - don't miss your chance at elite training, guaranteed employment, and leadership development! Apply NOW! 🇿🇦 #MilitaryTraining #ApplicationDeadline #ApplyNow",
                whatsapp: "⏰ URGENT: Applications close 31 December!\n\nDear prospective applicant,\n\nDon't miss this opportunity! Our military training programme:\n\n✅ Closes 31 December 2024\n✅ 98% success rate\n✅ Elite training & development\n✅ Guaranteed military placement\n\nApply now to secure your spot!\n\n[Application Link]"
            }
        },
        testimonial: {
            matrics: {
                facebook: "\"I came to military training with a 38% matric average and left as a confident leader. The discipline I learned here changed everything. Now I'm serving proudly in the Navy and have purpose in my life.\" - Sipho Mthembu, Navy Sailor",
                instagram: "\"From failed matric to Navy sailor - military training gave me the second chance I needed!\" 💙\n\n- Sipho Mthembu\n\n#Testimonial #MilitaryTraining #SuccessStory #Transformation",
                twitter: "\"From 38% matric to Navy sailor - military training transformed my life!\" - Sipho Mthembu #MilitaryTraining #SuccessStory"
            }
        }
    };

    // Get content based on type, audience, and platform
    let content = contentTemplates[type]?.[audience]?.[platform];

    // Fallback to general content if specific combination not found
    if (!content) {
        content = contentTemplates[type]?.[audience]?.general ||
                 contentTemplates[type]?.youth?.general ||
                 contentTemplates[type]?.matrics?.general;
    }

    // If content is an array, pick random item
    if (Array.isArray(content)) {
        content = content[Math.floor(Math.random() * content.length)];
    }

    return content || "Content generation failed. Please try different options.";
}

function displayGeneratedContent(content, type) {
    const generatedContent = document.getElementById('generatedContent');

    let contentHTML = '';

    if (type === 'post') {
        contentHTML = `
            <div class="generated-post">
                <div class="post-header">
                    <span class="post-type">Social Media Post</span>
                    <div class="post-actions">
                        <button class="btn btn-small" onclick="copyToClipboard('${content.replace(/'/g, "\\'")}')">Copy</button>
                        <button class="btn btn-small btn-secondary" onclick="shareContent('${content.replace(/'/g, "\\'")}')">Share</button>
                    </div>
                </div>
                <div class="post-content">
                    ${content.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
    } else if (type === 'slogan') {
        contentHTML = `
            <div class="generated-slogan">
                <div class="slogan-header">
                    <span class="slogan-type">Motivational Slogan</span>
                    <button class="btn btn-small" onclick="copyToClipboard('${content}')">Copy</button>
                </div>
                <div class="slogan-content">
                    "${content}"
                </div>
            </div>
        `;
    } else {
        contentHTML = `
            <div class="generated-content-item">
                <div class="content-header">
                    <span class="content-type">${type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    <button class="btn btn-small" onclick="copyToClipboard('${content.replace(/'/g, "\\'")}')">Copy</button>
                </div>
                <div class="content-body">
                    ${content.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
    }

    generatedContent.innerHTML = contentHTML;
}

// ============================================
// BANNER CREATOR
// ============================================
function initBannerCreator() {
    const templateCards = document.querySelectorAll('.template-card');
    const bannerHeadline = document.getElementById('bannerHeadline');
    const bannerSubtext = document.getElementById('bannerSubtext');
    const bannerColor = document.getElementById('bannerColor');
    const previewHeadline = document.getElementById('previewHeadline');
    const previewSubtext = document.getElementById('previewSubtext');
    const liveBanner = document.getElementById('liveBanner');
    const previewBtn = document.getElementById('previewBanner');
    const downloadBtn = document.getElementById('downloadBanner');

    // Template selection
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            templateCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            const template = this.dataset.template;
            updateBannerTemplate(template);
        });
    });

    // Live preview updates
    [bannerHeadline, bannerSubtext, bannerColor].forEach(input => {
        input.addEventListener('input', updateLivePreview);
    });

    // Preview button
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            updateLivePreview();
            alert('Banner preview updated!');
        });
    }

    // Download button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadBanner();
        });
    }
}

function updateBannerTemplate(template) {
    const liveBanner = document.getElementById('liveBanner');

    // Remove existing classes
    liveBanner.className = 'live-banner';

    // Add template-specific class
    liveBanner.classList.add(`${template}-banner`);

    // Update default content based on template
    const templates = {
        hero: { headline: 'FORGE YOUR FUTURE', subtext: 'Join South Africa\'s Elite Military Training' },
        success: { headline: '98% SUCCESS RATE', subtext: 'Transform Your Life Through Discipline' },
        deadline: { headline: 'APPLICATIONS CLOSE', subtext: '31 December 2024' },
        testimonial: { headline: '"This Changed My Life"', subtext: '- Successful Graduate' }
    };

    const content = templates[template];
    if (content) {
        document.getElementById('bannerHeadline').value = content.headline;
        document.getElementById('bannerSubtext').value = content.subtext;
        updateLivePreview();
    }
}

function updateLivePreview() {
    const headline = document.getElementById('bannerHeadline').value;
    const subtext = document.getElementById('bannerSubtext').value;
    const color = document.getElementById('bannerColor').value;

    const previewHeadline = document.getElementById('previewHeadline');
    const previewSubtext = document.getElementById('previewSubtext');
    const liveBanner = document.getElementById('liveBanner');

    if (previewHeadline) previewHeadline.textContent = headline;
    if (previewSubtext) previewSubtext.textContent = subtext;
    if (liveBanner) liveBanner.style.backgroundColor = color;
}

function downloadBanner() {
    // In a real application, this would use a library like html2canvas
    alert('Banner download feature would generate and download a PNG image of your custom banner.');
    console.log('Download banner functionality would be implemented here.');
}

// ============================================
// CONTENT CALENDAR
// ============================================
function initContentCalendar() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    const currentMonthDisplay = document.getElementById('currentMonth');
    const platformFilter = document.getElementById('platformFilter');
    const calendarDays = document.getElementById('calendarDays');

    let currentDate = new Date();

    // Initial calendar render
    renderCalendar(currentDate);

    // Navigation
    prevBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Platform filter
    platformFilter.addEventListener('change', function() {
        renderCalendar(currentDate);
    });
}

function renderCalendar(date) {
    const currentMonthDisplay = document.getElementById('currentMonth');
    const calendarDays = document.getElementById('calendarDays');
    const platformFilter = document.getElementById('platformFilter');

    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonthDisplay.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    // Clear existing days
    calendarDays.innerHTML = '';

    // Get first day of month and last day
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday

    // Generate calendar days
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + i);

        // Check if day is in current month
        const isCurrentMonth = currentDay.getMonth() === date.getMonth();

        if (isCurrentMonth) {
            dayElement.classList.add('current-month');
            dayElement.textContent = currentDay.getDate();

            // Add content based on platform filter
            const platform = platformFilter.value;
            const content = getCalendarContent(currentDay, platform);

            if (content) {
                dayElement.innerHTML += `<div class="day-content">${content}</div>`;
                dayElement.classList.add('has-content');
            }
        } else {
            dayElement.classList.add('other-month');
            dayElement.textContent = currentDay.getDate();
        }

        calendarDays.appendChild(dayElement);
    }
}

function getCalendarContent(date, platform) {
    // Sample content based on date and platform
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();

    const contentMap = {
        all: {
            1: '📢 Application Deadline Reminder',
            5: '🎓 Matric Success Story',
            10: '💪 Fitness Challenge Post',
            15: '🎖️ Leadership Quote',
            20: '📱 Q&A Session',
            25: '🏆 Graduate Spotlight'
        },
        facebook: {
            2: '📘 Facebook Live Session',
            9: '👥 Community Group Post',
            16: '📊 Weekly Stats Update',
            23: '🎯 Targeted Ad Campaign'
        },
        instagram: {
            3: '📸 Photo Series',
            10: '🎬 Reels Content',
            17: '📖 Stories Series',
            24: '🔥 Trending Challenge'
        },
        twitter: {
            4: '🐦 Thread Series',
            11: '📈 Poll Engagement',
            18: '🔗 Link Roundup',
            25: '💬 Community Discussion'
        },
        tiktok: {
            6: '🎵 Viral Challenge',
            13: '💃 Dance Tutorial',
            20: '🎭 Skit Series',
            27: '🌟 Behind the Scenes'
        }
    };

    // Return content based on platform filter
    if (platform === 'all') {
        return contentMap.all[dayOfMonth] || contentMap.all[dayOfWeek * 5] || null;
    } else {
        return contentMap[platform]?.[dayOfMonth] || contentMap[platform]?.[dayOfWeek * 5] || null;
    }
}

// ============================================
// MARKETING ANALYTICS
// ============================================
function initMarketingAnalytics() {
    // Simulate real-time updates
    setInterval(updateAnalyticsMetrics, 10000);

    // Initialize charts
    initAnalyticsCharts();
}

function updateAnalyticsMetrics() {
    const metrics = document.querySelectorAll('.stat-value');

    metrics.forEach(metric => {
        const currentValue = parseInt(metric.textContent.replace(/[^\d]/g, ''));
        if (!isNaN(currentValue)) {
            // Simulate small changes
            const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
            const newValue = Math.max(0, currentValue + change);

            // Format based on type
            if (metric.textContent.includes('K')) {
                metric.textContent = (newValue / 1000).toFixed(1) + 'K';
            } else if (metric.textContent.includes('%')) {
                metric.textContent = Math.min(100, newValue) + '%';
            } else {
                metric.textContent = newValue;
            }
        }
    });
}

function initAnalyticsCharts() {
    // Add interactive elements to charts
    const chartPoints = document.querySelectorAll('.data-point');

    chartPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            // Show tooltip
            showChartTooltip(this);
        });

        point.addEventListener('mouseleave', function() {
            hideChartTooltip();
        });
    });
}

function showChartTooltip(point) {
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.textContent = `Engagement: ${Math.floor(Math.random() * 1000) + 500}`;
    tooltip.style.left = point.style.left;
    tooltip.style.top = `calc(${point.style.top} - 30px)`;

    document.querySelector('.chart-placeholder').appendChild(tooltip);
}

function hideChartTooltip() {
    const tooltip = document.querySelector('.chart-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// ============================================
// TEMPLATE SELECTION
// ============================================
function initTemplateSelection() {
    // Add click handlers for strategy cards
    const strategyCards = document.querySelectorAll('.strategy-card');

    strategyCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            strategyCards.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            this.classList.add('selected');

            // Show strategy details
            showStrategyDetails(this);
        });
    });
}

function showStrategyDetails(card) {
    const title = card.querySelector('h3').textContent;
    const description = card.querySelector('p').textContent;

    // In a real application, this could show a modal or expand details
    console.log(`Selected strategy: ${title}`);
    console.log(`Description: ${description}`);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Content copied to clipboard!', 'success');
    }).catch(function(err) {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy content', 'error');
    });
}

// Share content functionality
function shareContent(text) {
    if (navigator.share) {
        navigator.share({
            title: 'Military Training Content',
            text: text,
            url: window.location.href
        });
    } else {
        copyToClipboard(text);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// ============================================
// WHATSAPP INTEGRATION
// ============================================
function initWhatsAppIntegration() {
    // WhatsApp button handlers
    const whatsappButtons = document.querySelectorAll('.whatsapp-integration button');

    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.toLowerCase();

            switch(action) {
                case 'configure bot':
                    configureWhatsAppBot();
                    break;
                case 'create campaign':
                    createWhatsAppCampaign();
                    break;
                case 'view reports':
                    viewWhatsAppReports();
                    break;
                case 'set up rules':
                    setupLeadQualification();
                    break;
            }
        });
    });
}

function configureWhatsAppBot() {
    alert('WhatsApp bot configuration interface would open here.');
    console.log('Configure WhatsApp bot');
}

function createWhatsAppCampaign() {
    alert('WhatsApp campaign creation interface would open here.');
    console.log('Create WhatsApp campaign');
}

function viewWhatsAppReports() {
    alert('WhatsApp analytics and reporting interface would open here.');
    console.log('View WhatsApp reports');
}

function setupLeadQualification() {
    alert('Lead qualification rules setup interface would open here.');
    console.log('Setup lead qualification');
}

// Initialize WhatsApp integration
initWhatsAppIntegration();

// ============================================
// EXPORT FUNCTIONALITY
// ============================================
function exportMarketingData() {
    const data = {
        generatedContent: [],
        bannerConfigurations: [],
        campaignPerformance: {},
        timestamp: new Date().toISOString()
    };

    // Collect generated content
    const generatedItems = document.querySelectorAll('.generated-content-item, .generated-post, .generated-slogan');
    generatedItems.forEach(item => {
        const type = item.querySelector('.content-type, .post-type, .slogan-type')?.textContent;
        const content = item.querySelector('.post-content, .slogan-content, .content-body')?.textContent;
        if (type && content) {
            data.generatedContent.push({ type, content, timestamp: new Date().toISOString() });
        }
    });

    // Collect banner configurations
    const bannerHeadline = document.getElementById('bannerHeadline')?.value;
    const bannerSubtext = document.getElementById('bannerSubtext')?.value;
    const bannerColor = document.getElementById('bannerColor')?.value;

    if (bannerHeadline || bannerSubtext) {
        data.bannerConfigurations.push({
            headline: bannerHeadline,
            subtext: bannerSubtext,
            color: bannerColor,
            timestamp: new Date().toISOString()
        });
    }

    // Collect performance metrics
    const metrics = document.querySelectorAll('.stat-value');
    metrics.forEach(metric => {
        const label = metric.closest('.stat-content')?.querySelector('h3')?.textContent;
        const value = metric.textContent;
        if (label && value) {
            data.campaignPerformance[label] = value;
        }
    });

    // Download as JSON
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `marketing-data-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Make export function globally available
window.exportMarketingData = exportMarketingData;
