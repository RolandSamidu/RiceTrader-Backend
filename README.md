# React Native Mobile Application with Firebase Database

## Overview
This mobile application is developed using **React Native** with **Firebase** as the backend database. The app supports three types of users: **Farmer, Intermediate, and Rice Producer**, each with specific functionalities.

## Features

### 1. Start Page
- Displays a **Start** button.
- Navigates to the **Login/Register/Information** page.

### 2. Authentication
#### Login/Register Page
- **Login**: Sign in using email and password.
- **Register**: Create a new account.
- **Information**: Displays app-related details.

#### Registration Fields:
- First Name
- Last Name
- Email
- Password
- Profile Type (Farmer, Intermediate, Rice Producer)
- Upload Profile Picture

### 3. User Profile
- Displays profile picture and first name on all pages.
- Shows the selected user type.

---

## User Roles and Functionalities

### **Farmer User**
#### Dashboard Page
- **Price**: View price-related information.
- **Post**: Create and manage harvest posts.
- **Chat**: Communicate with intermediates.

#### Navigation Bar
- **Home**: Dashboard
- **Activities**: Track activities
- **Notification**: Deal updates
- **Profile**: Manage profile

#### Profile Management
- Edit personal details.
- Delete account.
- Log out.

#### Post Management
- Create posts with Image, Breed, Price, Kilogram, Location, and Description.
- View and delete posts.

#### Bidding & Payments
- View bid offers.
- Select a bid and proceed with payment (default: **3000 rupees**).
- Track deals in **Activities Page**.

#### Chat
- Search intermediates and start a conversation.

---

### **Intermediate User**
#### Dashboard Page
- **Price**: View price information.
- **Post**: Manage stock posts.
- **Chat**: Communicate with farmers.

#### Navigation Bar
- **Home**: Dashboard
- **Activities**: Track activities
- **Notification**: Deal updates
- **Profile**: Manage profile

#### Profile Management
- Edit personal details.
- Delete account.
- Log out.

#### Post & Bid Management
- View personal posts and delete them.
- View **Farmer's Posts** and place bids.
- Track deals in **Deal Page**.

#### Deal Completion
- Accept deals and proceed with payments (**3000 rupees** default payment).
- Mark deals as **Complete**.

#### Chat
- Search and chat with farmers.

---

### **Rice Producer User**
#### Dashboard Page
- **Price**: View price information.
- **Post**: Bid on intermediate stock.
- **Chat**: Communicate with intermediates.

#### Navigation Bar
- **Home**: Dashboard
- **Activities**: Completed deals
- **Notification**: Pending deals
- **Profile**: Manage profile

#### Profile Management
- Edit personal details.
- Delete account.
- Log out.

#### Post & Bid Management
- View intermediate posts and place bids.
- Track deal status and accept deals.

#### Payment & Deal Completion
- Proceed with payments (**3000 rupees** default payment).
- Mark deals as **Complete**.

#### Chat
- Search and chat with intermediates.

---

## Technologies Used
- **React Native** for the mobile app.
- **Firebase** for authentication and database.
- **Redux** for state management.

## Installation
```sh
# Clone the repository
git clone https://github.com/your-repo.git

# Navigate into the project directory
cd your-project-folder

# Install dependencies
npm install

# Start the development server
npx expo start
```

## Contributing
- Fork the repository
- Create a new branch (`feature-branch`)
- Commit changes
- Open a pull request

## License
This project is licensed under the MIT License.
