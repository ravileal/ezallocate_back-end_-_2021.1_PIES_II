pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('') {
      steps {
        echo 'Ola mundo'
      }
    }
    stage('Exemplo notificação Jenkins'){
       discordSend description: "Notificacao:", footer: "Ambiente atualizado: https://ihul.com.br", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/938619881488789505/Ca-xtoXmZBYnaBmA5z4L9TDt7XK10JEbQpl865NZoxcWKITS0mnjhH6Tr3uZKCpzBplj"
    }
  }
}

