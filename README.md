# Cypress Practice — קורס מעשי

![Cypress Tests](https://github.com/aviniazov7/cypress-practice/actions/workflows/cypress.yml/badge.svg)

פרויקט לימוד Cypress מאפס ועד רמה מקצועית — 10 שלבים, 37+ בדיקות, CI/CD מלא.

---

## 🚀 התקנה והרצה

```bash
# התקנה
npm install

# הרצה - כל הבדיקות (headless)
npm run cy:run

# הרצה עם דפדפן פתוח (GUI)
npm run cy:open

# הרצה על סביבה ספציפית
npm run cy:run:dev
npm run cy:run:staging

# הרצת קובץ ספציפי
npx cypress run --spec "cypress/e2e/login.cy.js"
```

---

## 📁 מבנה הפרויקט

```
cypress-practice/
├── .github/workflows/
│   └── cypress.yml                     # CI/CD - GitHub Actions
├── cypress/
│   ├── config/
│   │   ├── dev.json                    # הגדרות סביבת dev
│   │   └── staging.json                # הגדרות סביבת staging
│   ├── e2e/                            # כל הבדיקות
│   │   ├── login.cy.js                 # שלב 1
│   │   ├── checkboxes.cy.js            # שלב 2
│   │   ├── dropdown.cy.js              # שלב 2
│   │   ├── inputs.cy.js                # שלב 2
│   │   ├── login-with-fixture.cy.js    # שלב 4
│   │   ├── intercept.cy.js             # שלב 5
│   │   ├── api.cy.js                   # שלב 6
│   │   ├── login-pom.cy.js             # שלב 8
│   │   ├── checkboxes-pom.cy.js        # שלב 8
│   │   ├── env-config.cy.js            # שלב 9
│   │   └── login-data-driven.cy.js     # שלב 10
│   ├── fixtures/
│   │   └── users.json                  # נתוני בדיקה
│   ├── pages/                          # Page Object Model
│   │   ├── LoginPage.js
│   │   └── CheckboxesPage.js
│   └── support/
│       ├── commands.js                 # Custom Commands (cy.login)
│       └── e2e.js
├── cypress.config.js                   # הגדרות Cypress
├── package.json
└── README.md
```

---

## 📚 10 שלבי הלמידה

### שלב 1 — מבנה בדיקה בסיסי
**קובץ:** `cypress/e2e/login.cy.js`

- `describe` / `it` / `beforeEach`
- `cy.visit`, `cy.get`, `.type`, `.click`
- Assertions: `.should('be.visible')`, `.should('contain', ...)`, `.and()`
- תרחישים: login מוצלח, username שגוי, password שגוי, שדות ריקים, logout

### שלב 2 — אלמנטים שונים
**קבצים:** `checkboxes.cy.js`, `dropdown.cy.js`, `inputs.cy.js`

- `.check()` / `.uncheck()` — checkboxes
- `.select()` — dropdowns
- `.clear()` — ניקוי שדה
- מקשים מיוחדים: `{uparrow}`, `{downarrow}`, `{selectall}`
- `.first()`, `.last()`, `.each()`

### שלב 3 — Custom Commands
**קבצים:** `cypress/support/commands.js`

```js
Cypress.Commands.add('login', (username, password) => {
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
});
```

**שימוש:** `cy.login('tomsmith', 'SuperSecretPassword!')`
במקום לחזור על 3 שורות בכל בדיקה.

### שלב 4 — Fixtures (נתונים מ-JSON)
**קבצים:** `cypress/fixtures/users.json`, `cypress/e2e/login-with-fixture.cy.js`

```js
cy.fixture('users').then((users) => {
  cy.login(users.valid.username, users.valid.password);
});
```

**יתרון:** מפריד נתונים מהלוגיקה. משנים סיסמה → רק את ה-JSON.

### שלב 5 — cy.intercept (יירוט רשת)
**קובץ:** `cypress/e2e/intercept.cy.js`

```js
// המתנה לבקשה
cy.intercept('POST', '**/authenticate').as('login');
cy.wait('@login');

// Mock - תשובה מזויפת
cy.intercept('GET', '**/users', { body: [...] });

// סימולציית שגיאת שרת
cy.intercept('GET', '**/users', { statusCode: 500 });
```

### שלב 6 — בדיקות API
**קובץ:** `cypress/e2e/api.cy.js`

```js
cy.request('GET', url)                // GET
cy.request('POST', url, body)         // POST
cy.request('PUT', url, body)          // PUT
cy.request('DELETE', url)             // DELETE

// בדיקות
expect(res.status).to.eq(200);
expect(res.body).to.have.property('id', 1);
expect(res.duration).to.be.lessThan(2000);
```

**ההבדל מ-intercept:** `cy.request` = אני שולח ישירות. `cy.intercept` = מיירט בקשה של האפליקציה.

### שלב 7 — CI/CD עם GitHub Actions
**קובץ:** `.github/workflows/cypress.yml`

בכל push ל-main:
1. GitHub פותח שרת Ubuntu
2. מתקין Node.js + Cypress
3. מריץ את כל הבדיקות
4. שומר screenshots אם נכשל

**רואים ריצות:** https://github.com/aviniazov7/cypress-practice/actions

### שלב 8 — Page Object Model (POM)
**קבצים:** `cypress/pages/LoginPage.js`, `CheckboxesPage.js`

```js
class LoginPage {
  elements = {
    usernameInput: () => cy.get('#username'),
    passwordInput: () => cy.get('#password'),
  };

  login(user, pass) {
    this.elements.usernameInput().type(user);
    this.elements.passwordInput().type(pass);
    return this;   // מאפשר שרשור
  }
}
```

**שימוש:**
```js
loginPage.login('tomsmith', 'pass').verifySuccessMessage('...');
```

**יתרון:** ID משתנה → מתקנים במקום אחד.

### שלב 9 — משתני סביבה
**קבצים:** `cypress/config/dev.json`, `staging.json`, `cypress.config.js`

```json
{
  "baseUrl": "https://...",
  "env": { "username": "tomsmith" }
}
```

```js
Cypress.env('username')   // שולף מהקובץ
```

```bash
npm run cy:run:dev        # רץ עם dev.json
npm run cy:run:staging    # רץ עם staging.json
```

### שלב 10 — Data-Driven Testing
**קובץ:** `cypress/e2e/login-data-driven.cy.js`

```js
const scenarios = [
  { title: 'valid', username: 'x', password: 'y', expectedUrl: '/secure' },
  { title: 'invalid user', username: 'x', password: 'y', expectedUrl: '/login' },
];

scenarios.forEach((s) => {
  it(`should handle: ${s.title}`, () => {
    cy.login(s.username, s.password);
    cy.url().should('include', s.expectedUrl);
  });
});
```

**יתרון:** בדיקה אחת, עשרות תרחישים. להוסיף תרחיש = שורה במערך.

---

## 🎯 7 כללי זהב (Best Practices)

1. **השתמש ב-`data-cy`** — סלקטורים שלא נשברים
2. **`cy.wait('@req')` ולא `cy.wait(ms)`** — חכה לאירוע, לא לשעון
3. **Login דרך API** — `cy.request` מהיר פי 10 מ-UI
4. **דבר אחד לכל בדיקה** — כל `it()` ממוקד
5. **בדיקה עצמאית** — לא תלויה בבדיקות אחרות
6. **Custom Commands** — DRY, אל תחזור על קוד
7. **אל תבדוק אתרים חיצוניים** — רק האפליקציה שלך

---

## 📝 פקודות שימושיות — Cheat Sheet

### סלקטורים
```js
cy.get('#id')                    // לפי ID
cy.get('.class')                 // לפי Class
cy.get('[data-cy="x"]')          // ⭐ Best Practice
cy.get('button[type="submit"]')  // tag + attr
cy.contains('text')              // חיפוש לפי טקסט
```

### פעולות
```js
.type('text')                    // הקלדה
.type('{enter}')                 // מקש מיוחד
.click()                         // לחיצה
.dblclick()                      // לחיצה כפולה
.clear()                         // ניקוי
.check() / .uncheck()            // checkbox
.select('Option')                // dropdown
```

### Assertions
```js
.should('be.visible')
.should('not.exist')
.should('contain', 'text')
.should('have.text', 'exact')
.should('have.value', 'x')
.should('have.length', 5)
.should('have.class', 'active')
.should('have.attr', 'href', '/x')
.should('be.disabled')
.should('be.checked')

expect(x).to.eq(200)
expect(x).to.be.an('array')
expect(x).to.have.property('id', 1)
expect(x).to.be.lessThan(2000)
```

### ניווט
```js
cy.visit('/login')
cy.url().should('include', '/secure')
cy.go('back')
cy.reload()
```

---

## 🔗 אתרי דמו בשימוש

- **UI:** https://the-internet.herokuapp.com
- **API:** https://jsonplaceholder.typicode.com

---

## 📖 מקורות ללימוד נוסף

- [Cypress Docs](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Awesome Cypress](https://github.com/cypress-io/awesome-cypress)
