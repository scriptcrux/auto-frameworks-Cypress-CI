pipeline {
    agent any

    options {
        ansiColor('xterm')
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '15'))
    }

    parameters {
        choice(name: 'BROWSER', choices: ['electron', 'chrome', 'edge', 'firefox'], description: 'Select browser for test execution')
        string(name: 'SPEC', defaultValue: 'cypress/e2e/**/*.cy.ts', description: 'Glob pattern for test specifications to execute')
        string(name: 'RECIPIENTS', defaultValue: 'amanpatwalfor@gmail.com', description: 'Email recipients for pipeline notifications')
    }

    environment {
        CI = 'true'
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source repository...'
                checkout scm
            }
        }

        stage('Environment Setup') {
            steps {
                echo 'Installing project dependencies...'
                sh 'npm ci'
                sh 'npm run typecheck'
            }
        }

        stage('Execute Cypress E2E Suite') {
            steps {
                echo "Running specs: ${params.SPEC} on ${params.BROWSER}..."
                sh "npx cypress run --browser ${params.BROWSER} --spec \"${params.SPEC}\" --headless"
            }
        }
    }

    post {
        always {
            echo 'Archiving test reports, failure screenshots, and videos...'

            // Publish Mochawesome HTML Test Report
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/reports/html',
                reportFiles: 'index.html',
                reportName: 'Cypress E2E Mochawesome Report',
                reportTitles: 'Enterprise Automation Run Summary',
                useWrapperFileDirectly: true
            ])

            // Archive artifacts for debugging
            archiveArtifacts artifacts: 'cypress/reports/**, cypress/screenshots/**, cypress/videos/**', allowEmptyArchive: true

            // Send Pipeline Status Email Notification
            emailext(
                subject: "[${currentBuild.result ?: 'SUCCESS'}] Cypress E2E Pipeline - Build #${env.BUILD_NUMBER}",
                body: """
                    <!DOCTYPE html>
                    <html>
                    <body style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2 style="color: #007acc;">Cypress Enterprise Test Pipeline</h2>
                        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                            <tr><td style="padding: 8px; font-weight: bold;">Status:</td><td style="padding: 8px;">${currentBuild.result ?: 'SUCCESS'}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Build Number:</td><td style="padding: 8px;">#${env.BUILD_NUMBER}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Browser:</td><td style="padding: 8px;">${params.BROWSER}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Spec Filter:</td><td style="padding: 8px;">${params.SPEC}</td></tr>
                        </table>
                        <p style="margin-top: 20px;">
                            <a href="${env.BUILD_URL}" style="background-color: #007acc; color: white; padding: 10px 16px; text-decoration: none; border-radius: 4px;">View Build Console</a>
                        </p>
                    </body>
                    </html>
                """,
                to: "${params.RECIPIENTS}",
                replyTo: 'testautomation@scriptcrux.io',
                from: 'ci-notifications@scriptcrux.io',
                mimeType: 'text/html'
            )
        }
    }
}