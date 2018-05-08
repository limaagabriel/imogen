# Imogen
Exercícios de processamento digital de imagens/visão computacional.

## Requerimentos

* Node.js (Foi desenvolvido e testado utilizando a versão 8.11.1)

## Métodos implementados

#### Processamento digital de imagens
* Inversão de cores
* Limiarização global
* Subtração de imagens
* Filtro espacial laplaciano
* Morfologia matemática (dilatação e erosão)

#### Extração de características
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

#### Extração de textura
* Força
* Fineza
* Aspereza
* Entropia
* Contraste
* Assimetria
* Matriz de co-ocorrência
* Energia (ou uniformidade)
* Média, Variância e desvio padrão
* Máxima probabilidade de ocorrência
* Energia por meio da matriz de co-ocorrência
* NGTDM (_Neighborhood Gray-Tone Difference Matrix_)

## Pré-execução

1. Obter o código fonte via `git clone` ou fazendo o download do arquivo compactado
2. Executar `npm install` no diretório raiz do projeto

## Utilização do extrator de características

1. Para processar o exercício de extração de características, executar `npm run feature`.
2. Para alterar a imagem a ser utilizada, basta alterar o valor da variável `imageName`, no arquivo `featureExtraction.js`. Vale notar que esta imagem precisa estar localizada dentro do diretório `resources`. As imagens relativas ao processamento, assim como as _features_ extraídas serão persistidas dentro do diretório `out`, cujos nomes dos arquivo gerados serão informados ao final da execução do _script_.
3. Ver os resultados obtidos com uma xícara de café :)


## Utilização do extrator de textura

1. Para processar o exercício de extração de texture, executar `npm run texture`.
2. Para alterar, remover ou adicionar uma imagem ao processamento, basta alterar a lista `images`, no arquivo `textureExtraction.js`. Vale notar que as imagens utilizadas precisam estar localizadas dentro do diretório `resources`. As informações extraídas serão persistidas dentro do diretório `out`, cujos nomes dos arquivo gerados serão informados ao final da execução do _script_.
3. Ver os resultados obtidos escutando um baita rock pesado :)

*Observação:* Por padrão, as matrizes calculadas (explicitamente a NGTDM, a matriz de co-ocorrência e o histograma da imagem) não são exportadas para o arquivo de resultado. Para incluir estas matrizes no resultado final, basta alterar o valor da variável `keepMatrices`, no arquivo `textureExtraction.js`.


## Créditos
* Agradeço ao <a href="https://github.com/oliver-moran" target="_blank">Oliver Moran</a>, visto que este código depende inteiramente do pacote <a href="https://github.com/oliver-moran/jimp" target="_blank">Jimp</a>.
* Métodos escritos por mim, Gabriel Alves, para a disciplina de Visão Computacional, ministrada pelo Profº Dr. Byron Leite Dantas Bezerra, 2018.1

Gabriel Alves <br/>
itsmealves@gmail.com <br/>
gal@ecomp.poli.br
