## 🛠️ Prerequisites

Before running this project, ensure you have the following installed:

- **Python** (v3.x)
- **Node.js** (v18 or higher)
- **XAMPP** (or any local MySQL server environment)

---

## 🚀 Setup Instructions

### Step 1: Clone the Repository

Open your terminal and clone the project:

```bash
git clone <YOUR_REPO_URL_HERE>
cd adet-midterm-proj
```

---

### Step 2: Set Up the MySQL Database

This project relies on a pre-configured database to load the historical orders, products, and admin accounts.

1. Open **XAMPP Control Panel** and start **Apache** and **MySQL**.
2. Go to **http://localhost/phpmyadmin** in your browser.
3. Click **New** and create an empty database named exactly:

```
appdev_integ_pit
```

4. Click on your newly created **appdev_integ_pit** database.
5. Navigate to the **Import** tab at the top.
6. Click **Choose File**, select the SQL backup file included in this repository  
   (e.g., `appdev_integ_pit.sql`), and click **Import**.

**Note:**  
The Django settings are configured to use the default XAMPP credentials:

```
User: root
Password: (empty)
Port: 3306
```

---

### Step 3: Start the Django Backend

Open a terminal in the **root folder of the project**.

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a Python Virtual Environment:

```bash
# For Windows
python -m venv venv
venv\Scripts\activate

# For Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Run database migrations and start the server:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

The **Django API** will now be running at:

```
http://127.0.0.1:8000/
```

---

### Step 4: Start the React Frontend

Open a **new terminal** (keep the Django backend running in the first one).

Navigate to the frontend directory:

```bash
cd frontend
```

Install Node modules (dependencies):

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The **React application** will now be running at:

```
http://localhost:5173/
```

---

## 🔑 Admin Access (Command Center)

To view the dashboard, manage inventory, and process orders, log in using the pre-configured admin account:

```
Email: admin@gmail.com
Password: 123
```
