pipeline {
  // agent {
    // this image provides everything needed to run Cypress
    // docker {
    //   image 'cypress/base:20.9.0'
    // }
  // }
  agent any

  parameters{
    string(name: 'SPEC', defaultValue: "cypress/e2e/**/**", description:"Enter the specs")
    choice(name: 'BROWSER', choices:['chrome','edge','firefox'], description: "Choice the browser where you want to execute tests?")
  }

  stages {
    stage('build and test') {
    //   environment {
    //     // we will be recording test results on Cypress Cloud
    //     // to record we need to set an environment variable
    //     // we can load the record key variable from credentials store
    //     // see https://jenkins.io/doc/book/using/using-credentials/
    //     // CYPRESS_RECORD_KEY = credentials('cypress-example-kitchensink-record-key')
    //   }

      steps {
        sh 'npm ci'
        // sh "npm run test:ci:record"
        sh "npm run cypress:run"
      }
    }
  }
}