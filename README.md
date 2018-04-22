# Imogen
Exercícios de processamento digital de imagens/visão computacional.

## Requerimentos

* Node.js (Foi desenvolvido utilizando a versão 8.11.1)

## Métodos implementados

Processamento digital de imagens
* Inversão de cores
* Limiarização global
* Subtração de imagens
* Filtro espacial laplaciano
* Morfologia matemática (dilatação e erosão)

Extração de características
* Aspect ratio
* Convexidade
* Fecho convexo
* Area de um contorno
* Descritores de Fourier
* Coordenadas complexas
* Momentos invariantes de Hu
* Bounding box de menor área
* Área de deficiência convexa do contorno
* Centro de massa de um contorno usando momentos
* Assinatura de distância do contorno ao centro de massa

## Utilização

1. Obter o código fonte via `git clone` ou fazendo o download do arquivo compactado
2. Executar `npm install` no diretório raiz do projeto
3. Executar o programa principal através do comando `npm start`.
4. Ver os resultados com uma xícara de café :)

Para alterar a imagem a ser utilizada, basta alterar o valor da variável `imageName`, no arquivo `app.js`. Vale notar que esta imagem precisa estar localizada dentro do diretório `resources`. As imagens relativas ao processamento, assim como as _features_ extraídas serão persistidas dentro do diretório `out`.

## Créditos
* Agradeço ao Oliver Moran, visto que este código depende inteiramente do pacote Jimp.
* Métodos escritos por mim, Gabriel Alves, para a disciplina de Visão Computacional, ministrada pelo Profº Dr. Byron Leite Dantas Bezerra, 2018.1

Gabriel Alves <br/>
itsmealves@gmail.com <br/>
gal@ecomp.poli.br
