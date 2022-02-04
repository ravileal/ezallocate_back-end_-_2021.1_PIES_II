pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 3000:3000'
    }
  }
  stages {
    stage('node run install') {
      steps {
        sh 'echo asdasd'
      }
    }
    stage('node run install') {
      steps {
        sh 'npm -v'
        sh 'npm install'
      }
    }
    stage('Exemplo notificação Jenkins'){
      steps {
        discordSend description: "Notificacao:", footer: "Ambiente atualizado: https://ihul.com.br", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/938619881488789505/Ca-xtoXmZBYnaBmA5z4L9TDt7XK10JEbQpl865NZoxcWKITS0mnjhH6Tr3uZKCpzBplj"
      }
    }
  }
}

