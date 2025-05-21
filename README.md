# Egg Timer Pixelizado

Um timer para cozinhar ovos com visual pixelizado e animações em estilo fofo.

## Estrutura do Projeto

```
egg-timer/
index.html    # Estrutura HTML do aplicativo
styles.css    # Estilos e animações
script.js     # Lógica de funcionamento do timer
```

## Características

- Design com estética fofa e colorida
- Quatro tipos de ovos para escolher:
  - Ovo quente (3 minutos)
  - Cremoso (5 minutos)
  - Ovo cozido (9 minutos)
  - Ovo frito (1:30 minutos)
- Animações dos ovos enquanto o timer está ativo
- Controles interativos (iniciar/reiniciar, pausa, reset)
- Notificação visual e sonora quando o tempo termina

## Como Usar

1. Abra o arquivo `index.html` em um navegador
2. Selecione um tipo de ovo clicando na respectiva imagem
3. Clique em "Iniciar" para começar o timer
4. Use os botões de controle para pausar ou resetar conforme necessário
5. Quando o timer terminar, você receberá uma notificação

## Personalização

### Alterar os tempos

Para alterar os tempos de cada tipo de ovo, edite os valores do atributo `data-time` no arquivo `index.html`:

```html
<div class="egg-option" data-time="180" data-type="soft">
```

O tempo é especificado em segundos.

### Mudar o estilo visual

Os estilos visuais podem ser personalizados no arquivo `styles.css`. As cores principais são:

- Fundo: `#ffe9a8`
- Container: `#fff7c2`
- Bordas: `#ffb347`
- Títulos: `#ff8c42`
- Texto: `#8a6e00`

## Requisitos Técnicos

- Navegador web moderno com suporte a JavaScript e CSS3
- Não são necessárias bibliotecas externas

![image](https://github.com/user-attachments/assets/934ed7ce-6672-4fcf-9cd7-838caeb3c9b2)

