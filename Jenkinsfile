pipeline {
    agent any

    stages {

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: '17dde969-d92b-4a1b-8b0d-ca79108fd033',
                    usernameVariable: 'username',
                    passwordVariable: 'password'
                )]) {
                    bat "echo %password% | docker login -u %username% --password-stdin"
                }
            }
        }

        stage('Build Images') {
            steps {
                bat "docker compose build"
            }
        }

        stage('Push Images') {
            steps {
                bat "docker push prarthna005/website-uptime-monitoring:frontend"
                bat "docker push prarthna005/website-uptime-monitoring:backend"
                bat "docker push prarthna005/website-uptime-monitoring:ai-agent"
            }
        }

        stage('Deploy Containers') {
            steps {
                bat "docker compose up -d"
            }
        }

    }
}