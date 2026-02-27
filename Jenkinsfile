pipeline {
agent any

environment {
    DOCKERHUB_REPO = "prarthna005/website-uptime-monitoring"
}

stages {

    stage('Docker Login') {
        steps {
            withCredentials([usernamePassword(
                credentialsId: '17dde969-d92b-4a1b-8b0d-ca79108fd033',
                usernameVariable: 'username',
                passwordVariable: 'password'
            )]) {
                sh 'echo $password | docker login -u $username --password-stdin'
            }
        }
    }

    stage('Build Images') {
        steps {
            sh 'docker compose build'
        }
    }

    stage('Push Images') {
        steps {
            sh 'docker push prarthna005/website-uptime-monitoring:frontend'
            sh 'docker push prarthna005/website-uptime-monitoring:backend'
            sh 'docker push prarthna005/website-uptime-monitoring:ai-agent'
        }
    }

    stage('Deploy Containers') {
        steps {
            sh 'docker compose up -d'
        }
    }

}

post {
    success {
        echo 'Pipeline completed successfully'
    }
    failure {
        echo 'Pipeline failed'
    }
}

}
