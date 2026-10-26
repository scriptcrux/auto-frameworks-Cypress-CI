/// <reference types="cypress" />

declare namespace Cypress {
  interface UserCredentials {
    email: string;
    password: string;
  }

  type DevicePreset = 'mobile' | 'tablet' | 'desktop';

  interface Chainable {
    /**
     * Custom command to authenticate a user using UI page interactions.
     * If no credentials are provided, defaults to credentials from fixtures/login.json.
     * @param userDetail Optional email and password credentials
     */
    login(userDetail?: UserCredentials): Chainable<void>;

    /**
     * Custom command to read an existing JSON fixture, append new record, and persist to file.
     * @param fileName Path to the JSON fixture
     * @param newEntry Entry object to append
     */
    readJSONFile(fileName: string, newEntry: Record<string, any>): Chainable<void>;

    /**
     * Custom command to read CSV fixture and append new user entry via Node task.
     * @param fileName Path to the CSV file
     * @param newEntry User credentials object containing email and password
     */
    readCSVFile(fileName: string, newEntry: UserCredentials): Chainable<void>;

    /**
     * Custom command to quickly search products from anywhere in the application.
     * @param keyword Search query term
     */
    searchProduct(keyword: string): Chainable<void>;

    /**
     * Custom command to configure responsive viewport preset.
     * @param preset 'mobile' | 'tablet' | 'desktop'
     */
    setDeviceViewport(preset: DevicePreset): Chainable<void>;

    /**
     * Custom command to assert visible toast/banner alerts.
     * @param expectedText Substring expected inside alert banner
     */
    assertNotification(expectedText: string): Chainable<void>;
  }
}
