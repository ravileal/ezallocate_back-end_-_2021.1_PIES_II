pipeline {
  agent {
    node {
      label 'master'
      sh 'export NVM_DIR="$HOME/.nvm"'
      sh '[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"'
    }
  }
  stages {
    stage('node') {
      steps {
        nodejs('node') {
          sh 'node -v'
        }
      }
    }
    stage('Example') {
      steps {
        sh 'export NVM_DIR="$HOME/.nvm"'
        sh '[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"'
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

