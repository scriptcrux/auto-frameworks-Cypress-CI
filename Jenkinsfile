pipeline {
  // agent {
    // this image provides everything needed to run Cypress
    // docker {
    //   image 'cypress/base:20.9.0'
    // }
  // }
  agent any

    options {
        ansiColor('xterm')
    }

  parameters{
    string(name: 'SPEC', defaultValue: "cypress/e2e/**/*spec.cy.ts", description:"Enter the specs")
    choice(name: 'BROWSER', choices:['electron','chrome','edge','firefox'], description: "Choice the browser where you want to execute tests?")
  }

  stages {
    stage('Pre-Build'){
      steps{

      echo "pre checks will run"
      }
    }

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
        // sh "npm run cypress:run"
        sh "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
      }
    }
    stage('Deploy'){
      steps{

       echo "Building the application"
      }
    }
  }

  post { 
        // always {    
        //     publishHTML([
        //       allowMissing: false, 
        //       alwaysLinkToLastBuild: false, 
        //       keepAll: true, 
        //       reportDir: 'cypress/reports/html', 
        //       reportFiles: 'index.html',
        //       reportName: 'Cypress e2e results',
        //       reportTitles: '', 
        //       useWrapperFileDirectly: true])
        // }
        always{
            emailext(
              subject: 'cypress E2E-pipeline-status:${currentBuild.result}', 
              body: '''<html>
                                <body>
                                    <p>Build Status: ${currentBuild.result}</p>
                                      <p>Build Number: ${currentBuild.number}</p>
                                      <p>Check the <a href="${env.BUILD_URL}">console output</a></p>
                                </body>
                              </html>''', 
              to: 'amanpatwalfor@gmail.com'
              replyTo: 'testautomation@example.com',
              from: 'testautomation@example.com'
              mimeType: 'text/html',
            ) 
        }
    }
}