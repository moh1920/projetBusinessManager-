pipeline {
    agent any

    tools {
        maven 'M2_HOME'
        jdk 'JAVA_HOME'
    }

    environment {
        IMAGE_NAME = "moh1920/business-manager"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Cloning project from GitHub..."
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "⚙️ Building application with Maven..."
                sh 'mvn clean install -DskipTests=false'
            }
        }

        stage('Package') {
            steps {
                echo "📦 Packaging application..."
                sh 'mvn package'
            }
        }

        stage('Archive Artifact') {
            steps {
                echo "🗂️ Archiving .jar artifact..."
                archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🐳 Building Docker image..."
                    sh """
                        docker build -t $IMAGE_NAME:$IMAGE_TAG .
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "⬆️ Pushing Docker image to Docker Hub..."
                    withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh """
                            echo "$PASS" | docker login -u "$USER" --password-stdin
                            docker push $IMAGE_NAME:$IMAGE_TAG
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "🎉 BUILD + DOCKER PUSH COMPLETED SUCCESSFULLY!"
        }
        failure {
            echo "❌ PIPELINE FAILED — CHECK LOGS"
        }
    }
}
