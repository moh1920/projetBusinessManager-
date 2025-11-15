pipeline {
    agent any

    tools {
         maven 'Maven3'
         jdk 'JDK17'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Cloning project from GitHub..."
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Building application..."
                sh 'mvn clean install -DskipTests=false'
            }
        }

        stage('Package') {
            steps {
                echo "Packaging the application..."
                sh 'mvn package'
            }
        }

        stage('Archive Artifact') {
            steps {
                echo "Storing build artifacts..."
                archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
            }
        }
    }

    post {
        success {
            echo "🎉 Build completed successfully!"
        }
        failure {
            echo "❌ Build failed! Check the logs."
        }
    }
}
