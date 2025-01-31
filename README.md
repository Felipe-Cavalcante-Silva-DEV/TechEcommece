![Aplicativo android de vendas online](www/img/AppAndroid.png)


## Pré-requisitos

- **Node.js**: 20.10.0
- **npm**: 10.2.3
- **Cordova**: 12
- **JDK**: 11
- **Gradle**: 7.6

### Como Instalar as Versões Corretas

1. **Node.js (20.10.0) e npm (10.2.3)**:
   
   - Para garantir que você tenha a versão correta do Node.js, recomendo usar o **nvm (Node Version Manager)**. Isso facilita a instalação e a troca entre versões do Node.js.
   
   - Instale o `nvm` (se ainda não tiver):
     - **Windows**: Baixe o instalador do [nvm-windows](https://github.com/coreybutler/nvm-windows/releases).
     - **Linux/Mac**: Use o comando:
       ```bash
       curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
       ```
   
   - Após a instalação do `nvm`, instale a versão desejada do Node.js:
     ```bash
     nvm install 20.10.0
     nvm use 20.10.0
     ```

   - O npm será automaticamente atualizado para a versão compatível. Verifique a versão com:
     ```bash
     npm -v
     ```

2. **Cordova (12)**:

   - Para instalar a versão correta do Cordova, use o npm:
     ```bash
     npm install -g cordova@12
     ```
   
   - Verifique a versão instalada com:
     ```bash
     cordova -v
     ```

3. **JDK (11)**:

   - **Windows**: Baixe o JDK 11 do [site oficial da Oracle](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) ou use o [OpenJDK 11](https://adoptopenjdk.net/).
   - ** necessário adicionar caminhos das pastas as variaveis do sistema
   - **Linux/Mac**: Instale o OpenJDK 11 usando o gerenciador de pacotes:
     - **Ubuntu/Debian**:
       ```bash
       sudo apt-get install openjdk-11-jdk
       ```
     

4. **Gradle (7.6)**:

   -   **Linux/Mac**:  Baixe a versão 7.6 do Gradle diretamente do [site oficial do Gradle](https://gradle.org/install/) ou instale via `sdkman` (recomendado para Linux/Mac):
   
     - Instale o sdkman (se ainda não tiver):
       ```bash
       curl -s "https://get.sdkman.io" | bash
       ```

     - Após a instalação do sdkman, instale o Gradle 7.6:
       ```bash
       sdk install gradle 7.6
       ```

   - **Windows**: Baixe o Gradle manualmente do [site oficial](https://gradle.org/releases/) e extraia sua pasta para pasta do Disco Local C:\ .
     Tudo feito corretamente o caminho do gradle será algo assim   -   C:\Gradle\gradle-7.6.3       -      obs: Adicionar pasta C:\Gradle\gradle-7.6.3\bin ao Path das variaveis do sistema.

   - Verifique a versão instalada com:
     ```bash
     gradle -v
     ```

### Verificando as Versões

Após a instalação, você pode verificar se todas as ferramentas estão com as versões corretas dentro no daa pasta do projeto clonado usando os seguintes comandos:

```bash
node -v       # Deve retornar v20.10.0
npm -v        # Deve retornar v10.2.3
cordova -v    # Deve retornar v12.x.x
javac -version  # Deve retornar 11.x.x
gradle -v     # Deve retornar Gradle 7.6
```

### Com todas as versões corretas siga os proximos passos para clonar o projeto:

- git clone https://github.com/Felipe-Cavalcante-Silva-DEV/TechEcommece

- Navegue até o diretório do projeto clonado:
```bash
cd TechEcommece
```
- Instalar dependencias do projeto
 ```bash
 npm install
 ```

- Adicionar a Plataforma Android
```bash
cordova platform add android
```
- caso a execução de erro será necessário executar
cordova create teste br.com.teste teste e depois execute o comando anterior.


- Com tudo correto e conectado ao emulador/dispositvo android execute o seguinte comando:
```bash
cordova run android
```


### CASO UTILIZE EMULADOR IMPORANTE UTILIZAR ANDROID API 33
### DEPENDENDO DA VERSÃO DO SEU ANDROID STUDIO SERÁ NECESSÁRIO CRIAR OUTRA PASTA ANDROID COM O CAMINHO - C:\android\sdk
### BAIXAR ANDROID SDK BUILD-TOOLS 34 VERSAO (33.0.2) E ALTERAR O NOVO CAMINHO NAS VARIAVEIS DO SISTEMA AMBOS ANDROID_HOME E PATH.
