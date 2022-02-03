pipeline {
  agent {
    node {
      label 'master'
    }
  }
  tools {nodejs "node14"}
  stages {
    stage('Example') {
      nodejs(nodeJSInstallationName: 'node14') {
        sh 'npm -v'
        sh 'node -v'
      }
    }
    stage('Exemplo notificação Jenkins'){
      steps {
        discordSend description: "Notificacao:", footer: "Ambiente atualizado: https://ihul.com.br", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/938619881488789505/Ca-xtoXmZBYnaBmA5z4L9TDt7XK10JEbQpl865NZoxcWKITS0mnjhH6Tr3uZKCpzBplj"
      }
    }
  }
}

