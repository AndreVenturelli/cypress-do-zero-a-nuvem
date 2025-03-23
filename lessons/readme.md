# Cypress Test Automation

This project contains automated tests using Cypress to validate key functionalities of a web application.

## Pre-requirements
To run this project, you need to have Node.js and npm installed.

The recommended versions are:
- **Node.js:** v18.15.0 or later
- **npm:** v9.5.0 or later

## Installation
Run the following command to install the required dependencies:
```sh
npm install
```

## Running the Tests

### Headless Mode
Run the following command to execute all tests in headless mode:
```sh
npm test
```

### Interactive Mode
To open Cypress in interactive mode, use:
```sh
npm run cy:open
```

## Test Scenarios

### 1. Radio Button Selection Tests

| ID | Scenario | Steps | Expected Result |
|----|---------|--------|----------------|
| RB-01 | Select a radio button | 1. Access the page <br> 2. Identify radio buttons <br> 3. Select an option | The selected radio button should be marked, and others should be unmarked |
| RB-02 | Select multiple radio buttons | 1. Try selecting more than one radio button at the same time | Only the last clicked button should remain selected |
| RB-03 | Validate the initial state | 1. Access the page <br> 2. Check if any radio button is pre-selected | The initial state should match system specifications |

### 2. File Upload Tests

#### Direct File Selection

| ID | Scenario | Steps | Expected Result |
|----|---------|--------|----------------|
| UP-01 | Upload a valid file | 1. Access the page <br> 2. Select a JSON file in the file input <br> 3. Validate if the file was uploaded correctly | The file name should be displayed on the interface |
| UP-02 | Upload multiple files | 1. Access the page <br> 2. Select multiple files <br> 3. Validate if all files were uploaded | If allowed, all files should appear on the interface |
| UP-03 | Upload an invalid file | 1. Access the page <br> 2. Select a file with an unsupported format (e.g., .exe, .bat) <br> 3. Validate the system response | The system should display an error message |

#### Drag-and-Drop File Upload

| ID | Scenario | Steps | Expected Result |
|----|---------|--------|----------------|
| DD-01 | Upload via drag-and-drop | 1. Drag a JSON file to the upload area <br> 2. Drop the file | The file name should be displayed on the interface |
| DD-02 | Upload multiple files via drag-and-drop | 1. Drag multiple supported files to the upload area <br> 2. Drop the files | All files should appear on the interface |
| DD-03 | Upload an invalid file via drag-and-drop | 1. Drag a file with an unsupported format to the upload area <br> 2. Drop the file | The system should display an error message |

### 3. Privacy Policy Link Tests

| ID | Scenario | Steps | Expected Result |
|----|---------|--------|----------------|
| PP-01 | Validate privacy policy link attributes | 1. Access the page <br> 2. Verify the privacy policy link attributes | The link should have `href="privacy.html"` and `target="_blank"` |
| PP-02 | Open privacy policy by removing target attribute | 1. Remove the `target` attribute from the link <br> 2. Click on the link <br> 3. Validate if the correct page is displayed | The privacy policy page should open in the same tab |

## Test Environment
- **Browsers:** Chrome, Firefox, Edge
- **Test Automation Tool:** Cypress
- **Operating Systems:** Windows 10, macOS

## Test Evidence and Logs
- Screenshots of successful tests
- Error logs for failed uploads
- Test execution recordings

---
This project ensures robust test coverage for key functionalities. If you have any suggestions or need additional test scenarios, feel free to contribute! 🚀