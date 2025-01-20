# 🚀 Dokoon-NextDRF 🛍️

[![Dokoon-NextDRF](https://github.com/idarbandi/Dokoon-NextDRF/blob/main/media/images/Dokoon.png)](<https://github.com/idarbandi/Dokoon-NextDRF/blob/main/media/images/Dokoon.png>)  ## Description


**Developed by:** Idarbandi - [darbandidr99@gmail.com](mailto:darbandidr99@gmail.com) - [GitHub Profile](https://github.com/idarbandi)

[![GitHub Repo stars](https://img.shields.io/github/stars/idarbandi/Dokoon-NextDRF?style=social)](https://github.com/idarbandi/Dokoon-NextDRF)
[![GitHub Issues](https://img.shields.io/github/issues/idarbandi/Dokoon-NextDRF)](https://github.com/idarbandi/Dokoon-NextDRF/issues)
[![GitHub License](https://img.shields.io/github/license/idarbandi/Dokoon-NextDRF)](https://github.com/idarbandi/Dokoon-NextDRF/blob/main/LICENSE)

A simple e-commerce website developed using Django and Next.js, focused on HttpOnly authentication.

## Description

Dokoon-NextDRF is a full-stack e-commerce application demonstrating the integration of Django REST Framework (DRF) for the backend API and Next.js for the frontend. A key focus is on secure user authentication using HttpOnly cookies, enhancing protection against Cross-Site Scripting (XSS) attacks.

## Key Features

*   ✅ User registration and authentication (login/logout) with HttpOnly cookies.
*   🛒 Product browsing and management.
*   [Add other key features as you develop them, e.g., shopping cart, order management, etc.]

## Technologies Used

*   🐍 Python 3.11
*   ⚙️ Django 4.2+
*   🌐 Django REST Framework (DRF)
*   ⚛️ Next.js 13+
*   💾 SQLite (Development) / PostgreSQL (Production)
*   🍪 HttpOnly cookies

## Project Structure

Dokoon-NextDRF/
├── account/         # Django app for user accounts
│   ├── apps.py
│   ├── init.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── base/            # Django project settings and core URLs
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── frontend/        # Next.js frontend application
│   ├── components/
│   │   └── header.js
│   ├── next.config.mjs
│   ├── pages/
│   │   ├── api/
│   │   │   └── hello.js
│   │   ├── _app.js
│   │   ├── category/
│   │   │   └── [slug].js
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── product/
│   │   │   └── [slug].js
│   ├── README.md
│   ├── src/
│   │   └── theme.js
│   └── styles/
│       └── globals.css
├── requirements.txt   # Backend dependencies
└── store/           # Django app for store functionality
├── admin.py
├── apps.py
├── init.py
├── models.py
├── serializers.py
├── tests.py
├── urls.py
└── views.py


## Installation

1.  **Prerequisites:**
    *   Python 3.11
    *   pip
    *   Node.js (LTS recommended)
    *   npm or yarn

2.  **Clone the repository:**

    ```bash
    git clone [invalid URL removed]
    cd Dokoon-NextDRF
    ```

3.  **Create a virtual environment (Backend):**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Linux/macOS
    venv\Scripts\activate  # On Windows
    ```

4.  **Install backend dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

5.  **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install  # or yarn install
    ```

## Configuration

*   **Backend:** Configure database settings in `base/settings.py`. Set `DEBUG = False` for production.
*   **Frontend:** Configure environment variables if needed in the Next.js project (e.g., API URLs).

## Usage

1.  **Run the backend development server:**

    ```bash
    python manage.py runserver
    ```

    The API will be available at [invalid URL removed].

2.  **Run the frontend development server:**

    ```bash
    cd frontend
    npm run dev  # or yarn dev
    ```

    The frontend will be accessible at http://localhost:3000 by default.

## API Endpoints (Examples)

*   **POST /account/login/**: Logs in a user.
    *   Request body (JSON): `{ "username": "your_username", "password": "your_password" }`
    *   Response (JSON - Success): `{ "اطلاعات": "کاربر با موفقیت وارد سیستم شد" }` (HttpOnly cookie set)
    *   Response (JSON - Failure - Invalid Credentials): `{ "اطلاعات": "کاربر وجود ندارد" }` (Status 400)
    *   Response (JSON - Failure - Missing Credentials): `{ "اطلاعات": "نام کاربری و رمز عبور الزامی هستند" }` (Status 200)
*   **POST /account/logout/**: Logs out a user.
    *   Response (JSON): `{ "detail": "Successfully logged out" }` (HttpOnly cookie cleared)
*   **GET /account/whoami/**: Gets the currently logged-in user's information (requires authentication).
    *   Response (JSON): `{ "username": "current_username" }` (Status 200 if authenticated, 403 otherwise)
*   **GET /store/products/**: Retrieves a list of products.
    *   Response (JSON): Array of product objects.

## Testing

*   Run backend tests:

    ```bash
    python manage.py test account
    python manage.py test store
    ```

*   Run frontend tests (refer to Next.js testing documentation).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT License](https://opensource.org/licenses/MIT)

## Author

👤 Idarbandi - 📧 [darbandidr99@gmail.com](mailto:darbandidr99@gmail.com) - 🐙 [GitHub Profile](https://github.com/idarbandi)
