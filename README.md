<h1 align="center">
  <img alt="react-native-pagseguro-plugpag-demo" title="react-native-pagseguro-plugpag-demo" style="margin-bottom: 16px" src=".github/images/logo.png" />

  React Native Pagseguro Plugpag Demo
</h1>

App expo demonstrativo integrado a biblioteca <a href="https://github.com/brunodsazevedo/react-native-pagseguro-plugpag">React Native Pagseguro Plugpag</a>

## Pré-requisitos

- Node >= v18
- yarn
- Expo
- Device POS smart Pagseguro (ex: modelo A930, P2, etc)
- JDK LTS >= 11
- Android Studio (opcional)

## Instalação e configuração

Com o repositório baixado, instale as dependências com yarn
```sh
yarn
```
Feito instalação, execute a pre build do Expo para android.

```sh
npx expo prebuild -p android
```

Agora, com o seu device da Pagseguro devidamente conectada ao USB (e devidamente com as permissões de desenvolvedores liberadas), execute o comando para build e instalação do projeto

```sh
npx expo run:android
```