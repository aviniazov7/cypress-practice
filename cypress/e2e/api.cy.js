// בדיקות API — שולחים בקשות ישירות לשרת בלי דפדפן
// API לתרגול: https://jsonplaceholder.typicode.com

const API = 'https://jsonplaceholder.typicode.com';

describe('API Tests — GET', () => {

  // מביא רשימת משתמשים ובודק שקיבלנו מערך של 10
  it('should get all users', () => {
    cy.request(`${API}/users`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length(10);
    });
  });

  // מביא משתמש ספציפי לפי ID ובודק את השם שלו
  it('should get a single user by ID', () => {
    cy.request(`${API}/users/1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('name', 'Leanne Graham');
    });
  });

  // בודק שבקשה ל-ID שלא קיים מחזירה 404
  it('should return 404 for non-existing user', () => {
    cy.request({
      url: `${API}/users/9999`,
      failOnStatusCode: false   // בלי זה Cypress ייכשל אוטומטית על 404
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });  

});

describe('API Tests — POST', () => {

  // יוצר משתמש חדש ובודק שהשרת החזיר את מה ששלחנו
  it('should create a new post', () => {
    cy.request('POST', `${API}/posts`, {
      title: 'Cypress Test',
      body: 'This is a test post',
      userId: 1
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('title', 'Cypress Test');
      expect(res.body).to.have.property('id');
    });
  });

});

describe('API Tests — PUT', () => {

  // מעדכן פוסט קיים ובודק שהשינוי חזר בתשובה
  it('should update an existing post', () => {
    cy.request('PUT', `${API}/posts/1`, {
      title: 'Updated Title',
      body: 'Updated body',
      userId: 1
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('title', 'Updated Title');
    });
  });

});

describe('API Tests — DELETE', () => {

  // מוחק פוסט ובודק שקיבלנו 200
  it('should delete a post', () => {
    cy.request('DELETE', `${API}/posts/1`).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

});

describe('API Tests — Response Time', () => {

  // בודק שהתשובה מהשרת מגיעה תוך פחות מ-2 שניות
  it('should respond in less than 2 seconds', () => {
    cy.request(`${API}/users`).then((res) => {
      expect(res.duration).to.be.lessThan(2000);
    });
  });

});
