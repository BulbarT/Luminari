'use strict';

/* ==========================================================================
   MOCK DATABASE
   ========================================================================== */
const db = {
    biology: {
        title: "Биология",
        topics: [
            { id: "bio_cells", title: "Клетки и Ткани" },
            { id: "bio_anatomy", title: "Анатомия" }
        ],
        words: [
            { pl: "Komórka", ru: "Клетка (ukr: Клітина)", desc: "Базовая единица строения всех организмов." },
            { pl: "Jądro", ru: "Ядро (ukr: Ядро)", desc: "Органелла, содержащая генетический материал." },
            { pl: "Tkanka", ru: "Ткань (ukr: Тканина)", desc: "Совокупность клеток с общей функцией." },
            { pl: "Narząd", ru: "Орган (ukr: Орган)", desc: "Часть организма, выполняющая определенную функцию." },
            { pl: "Układ pokarmowy", ru: "Пищеварительная система", desc: "Система органов для переваривания пищи." }
        ]
    },
    math: {
        title: "Математика",
        topics: [
            { id: "math_geo", title: "Геометрия (Stereometria)" },
            { id: "math_alg", title: "Алгебра" }
        ],
        words: [
            { pl: "Stożek", ru: "Конус (ukr: Конус)", desc: "Геометрическое тело, образованное вращением треугольника." },
            { pl: "Ostrosłup", ru: "Пирамида (ukr: Піраміда)", desc: "Многогранник с многоугольным основанием." },
            { pl: "Mianownik", ru: "Знаменатель (ukr: Знаменник)", desc: "Число под чертой дроби." },
            { pl: "Licznik", ru: "Числитель (ukr: Чисельник)", desc: "Число над чертой дроби." },
            { pl: "Trójkąt", ru: "Треугольник (ukr: Трикутник)", desc: "Многоугольник с тремя сторонами." }
        ]
    },
    chemistry: {
        title: "Химия",
        topics: [
            { id: "chem_base", title: "Основы" },
            { id: "chem_reac", title: "Реакции" }
        ],
        words: [
            { pl: "Pierwiastek", ru: "Химический элемент", desc: "Вещество, состоящее из атомов одного вида." },
            { pl: "Reakcja", ru: "Реакция", desc: "Процесс превращения веществ." },
            { pl: "Wiązanie", ru: "Связь", desc: "Химическая связь между атомами." },
            { pl: "Kwas", ru: "Кислота (ukr: Кислота)", desc: "Вещество, отдающее протоны." },
            { pl: "Zasada", ru: "Щелочь / Основание", desc: "Основание, хорошо растворимое в воде." }
        ]
    }
};

/* ==========================================================================
   APP STATE
   ========================================================================== */
let appState = {
    user: { name: "", role: "", streak: 2 },
    currentSubject: null,
    currentTopic: null,
    inProgressSubject: null, // "biology"
    inProgressTopic: null, // "Клетки и Ткани"
    theme: 'dark'
};

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Load theme
    const savedTheme = localStorage.getItem('luminari_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-toggle').checked = (savedTheme === 'dark');

    // Render Dictionary initially
    renderDictionary('all');
});

/* ==========================================================================
   AUTH LOGIC
   ========================================================================== */
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    if (tab === 'login') {
        document.querySelectorAll('.auth-tab')[0].classList.add('active');
        document.getElementById('form-login').classList.add('active');
    } else {
        document.querySelectorAll('.auth-tab')[1].classList.add('active');
        document.getElementById('form-register').classList.add('active');
    }
}

function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    
    // Simple mock logic
    if (form.id === 'form-register') {
        const nameInput = form.querySelector('input[type="text"]').value;
        const roleSelect = form.querySelector('select');
        appState.user.name = nameInput || "Студент";
        appState.user.role = roleSelect.options[roleSelect.selectedIndex].text;
    } else {
        appState.user.name = "Пользователь";
        appState.user.role = "Ученик";
    }

    // Update Profile UI
    document.getElementById('profile-name').innerText = appState.user.name;
    document.querySelector('.role-text').innerText = appState.user.role;
    document.getElementById('streak-count').innerText = appState.user.streak;

    // Switch screen
    document.getElementById('screen-auth').classList.remove('active');
    document.getElementById('screen-app').classList.add('active');
}

function logout() {
    document.getElementById('screen-app').classList.remove('active');
    document.getElementById('screen-auth').classList.add('active');
}

/* ==========================================================================
   NAVIGATION & THEMES
   ========================================================================== */
function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    
    // Update active icon
    const index = tabId === 'tab-learning' ? 0 : tabId === 'tab-dictionary' ? 1 : 2;
    document.querySelectorAll('.nav-item')[index].classList.add('active');
}

function toggleTheme() {
    const isDark = document.getElementById('theme-toggle').checked;
    const newTheme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('luminari_theme', newTheme);
}

/* ==========================================================================
   DICTIONARY LOGIC
   ========================================================================== */
let currentDictFilter = 'all';

function setDictFilter(filter) {
    currentDictFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderDictionary(filter);
}

function filterDictionary() {
    renderDictionary(currentDictFilter);
}

function renderDictionary(filter) {
    const container = document.getElementById('dict-list-container');
    const query = document.getElementById('dict-search').value.toLowerCase();
    container.innerHTML = "";

    let wordsToRender = [];
    
    if (filter === 'all') {
        Object.keys(db).forEach(subj => {
            wordsToRender = wordsToRender.concat(db[subj].words);
        });
    } else {
        wordsToRender = db[filter].words;
    }

    wordsToRender.forEach(word => {
        if (word.pl.toLowerCase().includes(query) || word.ru.toLowerCase().includes(query)) {
            container.innerHTML += `
                <div class="word-card">
                    <div class="word-header">
                        <span class="word-pl">${word.pl}</span>
                    </div>
                    <div class="word-ru">${word.ru}</div>
                    <div class="word-desc">${word.desc}</div>
                </div>
            `;
        }
    });
}

/* ==========================================================================
   MODALS
   ========================================================================== */
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openSubjectSelection() {
    document.getElementById('modal-subject').classList.add('active');
}

function selectSubject(subjKey) {
    appState.currentSubject = subjKey;
    // Set dynamic theme
    document.documentElement.setAttribute('data-subject', subjKey);
    
    // Close subject modal
    closeModal('modal-subject');
    
    // Open topic modal
    const subjectData = db[subjKey];
    document.getElementById('topic-modal-title').innerText = subjectData.title + " - Темы";
    
    const topicContainer = document.getElementById('topic-list-container');
    topicContainer.innerHTML = "";
    
    subjectData.topics.forEach(topic => {
        topicContainer.innerHTML += `
            <button class="topic-card" onclick="selectTopic('${topic.title}')">
                <div class="subj-icon">📚</div>
                <span>${topic.title}</span>
            </button>
        `;
    });
    
    document.getElementById('modal-topic').classList.add('active');
}

function selectTopic(topicTitle) {
    appState.currentTopic = topicTitle;
    appState.inProgressSubject = appState.currentSubject;
    appState.inProgressTopic = topicTitle;
    
    closeModal('modal-topic');
    startTestFlow(false);
}

/* ==========================================================================
   TEST ENGINE
   ========================================================================== */
let testState = {
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    selectedAnswer: null
};

function startTestFlow(isContinue) {
    if (isContinue && !appState.inProgressSubject) return; // shouldn't happen based on UI
    
    const subjKey = appState.inProgressSubject || 'math';
    // Ensure theme is set correctly if continuing
    document.documentElement.setAttribute('data-subject', subjKey);
    
    // Generate mock questions based on subject words
    const words = db[subjKey].words;
    testState.questions = [
        {
            type: 'mcq',
            title: `Что означает слово "${words[0].pl}"?`,
            options: [words[0].ru.split(' (')[0], words[1].ru.split(' (')[0], words[2].ru.split(' (')[0], "Окружность"],
            correct: words[0].ru.split(' (')[0]
        },
        {
            type: 'open',
            title: `Напишите перевод слова "${words[1].pl}"`,
            correct: [words[1].ru.split(' (')[0].toLowerCase(), "піраміда", "пирамида"]
        }
    ];
    
    testState.currentIndex = 0;
    document.getElementById('modal-test').classList.add('active');
    renderQuestion();
}

function renderQuestion() {
    const q = testState.questions[testState.currentIndex];
    testState.currentQuestion = q;
    testState.selectedAnswer = null;
    
    // Update Progress
    const progressPercent = (testState.currentIndex / testState.questions.length) * 100;
    document.getElementById('test-progress').style.width = progressPercent + '%';
    
    // Hide feedback
    document.getElementById('test-feedback').classList.remove('show', 'error-bg');
    
    // Reset Check Button
    const btnCheck = document.getElementById('btn-check-answer');
    btnCheck.classList.remove('active');
    btnCheck.innerText = "Проверить";
    
    const container = document.getElementById('test-question-container');
    container.innerHTML = `<h2 class="question-title">${q.title}</h2>`;
    
    if (q.type === 'mcq') {
        let optionsHtml = '<div class="options-grid">';
        q.options.forEach(opt => {
            optionsHtml += `<button class="option-btn" onclick="selectOption(this, '${opt}')">${opt}</button>`;
        });
        optionsHtml += '</div>';
        container.innerHTML += optionsHtml;
    } else if (q.type === 'open') {
        container.innerHTML += `<input type="text" id="open-answer" class="open-answer-input" placeholder="Введите ответ..." oninput="onOpenInput(this)">`;
        // auto focus mock (timeout for modal transition)
        setTimeout(() => { document.getElementById('open-answer')?.focus(); }, 400);
    }
}

function selectOption(btn, value) {
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    testState.selectedAnswer = value;
    document.getElementById('btn-check-answer').classList.add('active');
}

function onOpenInput(input) {
    if (input.value.trim().length > 0) {
        testState.selectedAnswer = input.value.trim().toLowerCase();
        document.getElementById('btn-check-answer').classList.add('active');
    } else {
        testState.selectedAnswer = null;
        document.getElementById('btn-check-answer').classList.remove('active');
    }
}

function checkAnswer() {
    if (!testState.selectedAnswer) return;
    
    const q = testState.currentQuestion;
    let isCorrect = false;
    
    if (q.type === 'mcq') {
        isCorrect = testState.selectedAnswer === q.correct;
    } else {
        isCorrect = q.correct.includes(testState.selectedAnswer.toLowerCase());
    }
    
    const feedbackOverlay = document.getElementById('test-feedback');
    const fTitle = document.getElementById('feedback-title');
    const fDesc = document.getElementById('feedback-desc');
    
    if (isCorrect) {
        feedbackOverlay.classList.remove('error-bg');
        fTitle.innerText = "Правильно!";
        fDesc.innerText = "Отличная работа!";
    } else {
        feedbackOverlay.classList.add('error-bg');
        fTitle.innerText = "Ошибка!";
        fDesc.innerText = q.type === 'mcq' ? `Правильный ответ: ${q.correct}` : `Один из правильных вариантов: ${q.correct[0]}`;
    }
    
    feedbackOverlay.classList.add('show');
    document.getElementById('btn-check-answer').classList.remove('active');
}

function nextQuestion() {
    testState.currentIndex++;
    if (testState.currentIndex >= testState.questions.length) {
        // Complete
        closeModal('modal-test');
        document.getElementById('modal-success').classList.add('active');
    } else {
        renderQuestion();
    }
}

function finishTest() {
    closeModal('modal-success');
    appState.user.streak++;
    document.getElementById('streak-count').innerText = appState.user.streak;
    
    // Update continue button text in learning tab
    const continueBtn = document.querySelector('.btn-continue small');
    if (continueBtn) {
        const subjName = db[appState.inProgressSubject].title;
        continueBtn.innerText = `${subjName}: ${appState.inProgressTopic}`;
    }
}
