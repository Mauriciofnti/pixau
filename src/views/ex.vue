```vue
<template>
  <div class="container">
    <h1>Monte Seu PC</h1>

    <!-- Indicador de Progresso -->
    <div class="progress-container">
      <h2>Etapa {{ etapaAtual + 1 }}: {{ categoriaAtual }}</h2>
      <div class="progress-bar">
        <div
          v-for="(categoria, indice) in categorias"
          :key="categoria"
          class="progress-item"
          :class="{ active: indice <= etapaAtual }"
        >
          {{ categoria }}
        </div>
      </div>
    </div>

    <!-- Tela de Seleção de Produtos -->
    <div v-if="etapaAtual < categorias.length" class="products-container">
      <div v-if="produtosFiltrados.length > 0" class="products-grid">
        <div
          v-for="produto in produtosFiltrados"
          :key="produto.id"
          class="product-card"
        >
          <img :src="produto.image[0]" :alt="produto.name" class="product-image" />
          <h3>{{ produto.name }}</h3>
          <p class="specifications">{{ produto.specifications }}</p>
          <p class="price">R$ {{ produto.price.toFixed(2) }}</p>
          <button @click="escolherProduto(produto)" class="select-button">
            Selecionar
          </button>
        </div>
      </div>
      <div v-else class="no-products">
        Nenhum produto disponível para esta categoria.
      </div>
    </div>

    <!-- Tela de Revisão -->
    <div v-else class="review-container">
      <h2>Revisão da Sua Montagem</h2>
      <div v-if="temProdutosEscolhidos" class="review-card">
        <div v-for="(produto, categoria) in componentesEscolhidos" :key="categoria" class="review-item">
          <p class="category">{{ categoria }}:</p>
          <p>{{ produto.name }} - R$ {{ produto.price.toFixed(2) }}</p>
        </div>
        <p class="total">Total: R$ {{ precoTotal.toFixed(2) }}</p>
        <button @click="finalizarMontagem" class="finalize-button">
          Finalizar Montagem
        </button>
      </div>
      <div v-else class="no-products">
        Nenhum componente selecionado.
      </div>
    </div>

    <!-- Botões de Navegação -->
    <div class="navigation">
      <button
        v-if="etapaAtual > 0"
        @click="voltarEtapa"
        class="nav-button back-button"
      >
        Voltar
      </button>
      <button
        v-if="etapaAtual < categorias.length && temProdutoNaCategoriaAtual"
        @click="proximaEtapa"
        class="nav-button next-button"
      >
        Próxima Etapa
      </button>
    </div>
  </div>
</template>

<script>
// Importa o array de produtos do arquivo produtos.js
import { products } from './produtos.js';

export default {
  name: 'BuildYourPC', // Nome do componente
  data() {
    // Define os dados que o componente usa
    return {
      listaProdutos: products, // Lista de todos os produtos
      etapaAtual: 0, // Qual etapa (tela) está sendo exibida (0 é a primeira)
      componentesEscolhidos: {}, // Objeto que guarda os produtos escolhidos por categoria
    };
  },
  computed: {
    // Propriedades calculadas que atualizam automaticamente
    categorias() {
      // Cria uma lista de categorias únicas (ex.: Processadores, Placas-mãe, etc.)
      let categorias = [];
      for (let produto of this.listaProdutos) {
        if (!categorias.includes(produto.category)) {
          categorias.push(produto.category);
        }
      }
      return categorias;
    },
    categoriaAtual() {
      // Retorna a categoria da etapa atual (ex.: "Processadores" na etapa 0)
      // Se for a última etapa, retorna "Revisão"
      if (this.etapaAtual < this.categorias.length) {
        return this.categorias[this.etapaAtual];
      }
      return 'Revisão';
    },
    produtosFiltrados() {
      // Retorna apenas os produtos da categoria atual
      let produtos = [];
      for (let produto of this.listaProdutos) {
        if (produto.category === this.categoriaAtual) {
          produtos.push(produto);
        }
      }
      return produtos;
    },
    precoTotal() {
      // Calcula o preço total somando os preços dos produtos escolhidos
      let total = 0;
      for (let categoria in this.componentesEscolhidos) {
        total += this.componentesEscolhidos[categoria].price;
      }
      return total;
    },
    temProdutosEscolhidos() {
      // Verifica se há pelo menos um produto escolhido
      return Object.keys(this.componentesEscolhidos).length > 0;
    },
    temProdutoNaCategoriaAtual() {
      // Verifica se um produto foi escolhido para a categoria atual
      return this.componentesEscolhidos[this.categoriaAtual] !== undefined;
    },
  },
  methods: {
    // Métodos para interações do usuário
    escolherProduto(produto) {
      // Adiciona o produto escolhido à lista de componentes
      // Usa a categoria como chave (ex.: componentesEscolhidos['Processadores'] = produto)
      this.componentesEscolhidos = {
        ...this.componentesEscolhidos,
        [produto.category]: produto,
      };
    },
    proximaEtapa() {
      // Avança para a próxima tela se não for a última etapa
      if (this.etapaAtual < this.categorias.length) {
        this.etapaAtual = this.etapaAtual + 1;
      }
    },
    voltarEtapa() {
      // Volta para a tela anterior se não for a primeira etapa
      if (this.etapaAtual > 0) {
        this.etapaAtual = this.etapaAtual - 1;
      }
    },
    finalizarMontagem() {
      // Exibe uma mensagem com o preço total da montagem
      alert(`Montagem finalizada! Total: R$ ${this.precoTotal.toFixed(2)}`);
      // Aqui você poderia adicionar código para salvar a montagem ou ir para o carrinho
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.progress-container {
  margin-bottom: 1.5rem;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  gap: 5px;
}

.progress-item {
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #666;
  transition: all 0.3s ease;
}

.progress-item.active {
  background-color: #007bff;
  color: white;
}

.products-container {
  margin-bottom: 1.5rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.product-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.product-card h3 {
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: #333;
}

.specifications {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #28a745;
  margin-bottom: 0.5rem;
}

.select-button {
  width: 100%;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.select-button:hover {
  background-color: #0056b3;
}

.no-products {
  text-align: center;
  color: #666;
  font-size: 1rem;
}

.review-container {
  margin-bottom: 1.5rem;
}

.review-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.review-item {
  margin-bottom: 0.5rem;
}

.category {
  font-weight: bold;
  color: #333;
}

.total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-top: 1rem;
}

.finalize-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.finalize-button:hover {
  background-color: #218838;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.nav-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #6c757d;
}

.back-button:hover {
  background-color: #5a6268;
}

.next-button {
  background-color: #007bff;
}

.next-button:hover {
  background-color: #0056b3;
}

/* Responsive Design */
@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .progress-item {
    font-size: 0.8rem;
    padding: 8px;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.2rem;
  }
}
</style>
```

### Explicação Detalhada do Script (em Português)

#### 1. **Estrutura Geral**
O script está dentro da tag `<script>` do componente Vue.js e define como o componente funciona. Ele é dividido em:
- **Importação**: Carrega os produtos do arquivo `produtos.js`.
- **Exportação**: Define o componente Vue com `name`, `data`, `computed`, e `methods`.

```javascript
import { products } from './produtos.js'; // Importa o array de produtos

export default {
  name: 'BuildYourPC', // Nome do componente
  // ... resto do código
};
```

- **O que isso faz?** O `import` traz o array `products` do arquivo `produtos.js` para ser usado no componente. O `export default` define o componente Vue.js chamado `BuildYourPC`.

#### 2. **Data (Estado do Componente)**
A seção `data` define as variáveis que o componente usa para controlar o que aparece na tela.

```javascript
data() {
  return {
    listaProdutos: products, // Lista de todos os produtos
    etapaAtual: 0, // Qual etapa (tela) está sendo exibida (0 é a primeira)
    componentesEscolhidos: {}, // Objeto que guarda os produtos escolhidos por categoria
  };
}
```

- **Explicação**:
  - `listaProdutos`: Armazena o array `products` importado. Contém todos os 42 produtos (Processadores, Placas-mãe, etc.).
  - `etapaAtual`: Um número que indica qual tela está ativa (0 = Processadores, 1 = Placas-mãe, ..., 7 = Revisão).
  - `componentesEscolhidos`: Um objeto onde as chaves são categorias (ex.: "Processadores") e os valores são os produtos escolhidos (ex.: `{ "Processadores": { id: 1, name: "...", price: 1200 } }`).

#### 3. **Computed (Propriedades Calculadas)**
As propriedades calculadas (`computed`) são funções que retornam valores baseados nos dados. Elas atualizam automaticamente quando os dados mudam.

```javascript
computed: {
  categorias() {
    // Cria uma lista de categorias únicas (ex.: Processadores, Placas-mãe, etc.)
    let categorias = [];
    for (let produto of this.listaProdutos) {
      if (!categorias.includes(produto.category)) {
        categorias.push(produto.category);
      }
    }
    return categorias;
  },
  categoriaAtual() {
    // Retorna a categoria da etapa atual (ex.: "Processadores" na etapa 0)
    // Se for a última etapa, retorna "Revisão"
    if (this.etapaAtual < this.categorias.length) {
      return this.categorias[this.etapaAtual];
    }
    return 'Revisão';
  },
  produtosFiltrados() {
    // Retorna apenas os produtos da categoria atual
    let produtos = [];
    for (let produto of this.listaProdutos) {
      if (produto.category === this.categoriaAtual) {
        produtos.push(produto);
      }
    }
    return produtos;
  },
  precoTotal() {
    // Calcula o preço total somando os preços dos produtos escolhidos
    let total = 0;
    for (let categoria in this.componentesEscolhidos) {
      total += this.componentesEscolhidos[categoria].price;
    }
    return total;
  },
  temProdutosEscolhidos() {
    // Verifica se há pelo menos um produto escolhido
    return Object.keys(this.componentesEscolhidos).length > 0;
  },
  temProdutoNaCategoriaAtual() {
    // Verifica se um produto foi escolhido para a categoria atual
    return this.componentesEscolhidos[this.categoriaAtual] !== undefined;
  },
}
```

- **Explicação de Cada Propriedade**:
  - `categorias`:
    - Percorre `listaProdutos` e cria um array com categorias únicas (ex.: `["Processadores", "Placas-mãe", ...]`).
    - Usa um loop `for...of` e `includes` para evitar duplicatas.
    - Resultado: `["Processadores", "Placas-mãe", "Memorias-RAM", "GPUs", "SSDs", "Monitores", "Periféricos"]`.
  - `categoriaAtual`:
    - Retorna o nome da categoria correspondente à `etapaAtual` (ex.: `categorias[0]` é "Processadores").
    - Se `etapaAtual` for igual ao número de categorias (7), retorna "Revisão" para a tela final.
  - `produtosFiltrados`:
    - Filtra `listaProdutos` para retornar apenas os produtos da `categoriaAtual`.
    - Exemplo: Se `categoriaAtual` é "Processadores", retorna os 6 processadores (IDs 1 a 6).
  - `precoTotal`:
    - Soma os preços dos produtos em `componentesEscolhidos`.
    - Usa um loop `for...in` para percorrer as categorias e acessar o `price` de cada produto.
  - `temProdutosEscolhidos`:
    - Verifica se `componentesEscolhidos` tem pelo menos uma categoria (usando `Object.keys().length`).
    - Retorna `true` se houver produtos, `false` se estiver vazio.
  - `temProdutoNaCategoriaAtual`:
    - Verifica se há um produto escolhido para a `categoriaAtual`.
    - Retorna `true` se `componentesEscolhidos[categoriaAtual]` existe, `false` caso contrário.

#### 4. **Methods (Ações do Usuário)**
Os métodos definem o que acontece quando o usuário interage com o componente (clica em botões).

```javascript
methods: {
  escolherProduto(produto) {
    // Adiciona o produto escolhido à lista de componentes
    // Usa a categoria como chave (ex.: componentesEscolhidos['Processadores'] = produto)
    this.componentesEscolhidos = {
      ...this.componentesEscolhidos,
      [produto.category]: produto,
    };
  },
  proximaEtapa() {
    // Avança para a próxima tela se não for a última etapa
    if (this.etapaAtual < this.categorias.length) {
      this.etapaAtual = this.etapaAtual + 1;
    }
  },
  voltarEtapa() {
    // Volta para a tela anterior se não for a primeira etapa
    if (this.etapaAtual > 0) {
      this.etapaAtual = this.etapaAtual + 1;
    }
  },
  finalizarMontagem() {
    // Exibe uma mensagem com o preço total da montagem
    alert(`Montagem finalizada! Total: R$ ${this.precoTotal.toFixed(2)}`);
    // Aqui você poderia adicionar código para salvar a montagem ou ir para o carrinho
  },
}
```

- **Explicação de Cada Método**:
  - `escolherProduto(produto)`:
    - Adiciona o produto selecionado ao `componentesEscolhidos`.
    - Usa a sintaxe `...` (spread operator) para copiar os produtos já escolhidos e adiciona o novo produto com a chave sendo sua categoria.
    - Exemplo: Se o usuário escolher o produto com ID 1 (Ryzen 5 5600X), o objeto fica `{ "Processadores": { id: 1, name: "...", price: 1200 } }`.
  - `proximaEtapa()`:
    - Incrementa `etapaAtual` em 1, se não for a última etapa (comparando com `categorias.length`, que é 7).
    - Muda a tela para a próxima categoria (ex.: de Processadores para Placas-mãe).
  - `voltarEtapa()`:
    - Decrementa `etapaAtual` em 1, se não for a primeira etapa (verifica se `etapaAtual > 0`).
    - Muda a tela para a categoria anterior.
    - **Nota**: Há um erro no código original (`this.etapaAtual + 1` deveria ser `this.etapaAtual - 1`). Corrigirei isso no código revisado abaixo.
  - `finalizarMontagem()`:
    - Mostra um alerta com o preço total formatado (ex.: "Montagem finalizada! Total: R$ 1234.56").
    - Pode ser expandido para salvar a montagem em um servidor ou adicionar ao carrinho.

### Correção e Código Final do Script
Percebi que o método `voltarEtapa` contém um erro (`this.etapaAtual + 1` em vez de `this.etapaAtual - 1`). Abaixo está o script revisado e simplificado, com o erro corrigido e explicações mantidas.

```javascript
<script>
// Importa o array de produtos do arquivo produtos.js
import { products } from './produtos.js';

export default {
  name: 'BuildYourPC', // Nome do componente
  data() {
    // Define os dados que o componente usa
    return {
      listaProdutos: products, // Lista de todos os produtos
      etapaAtual: 0, // Qual etapa (tela) está sendo exibida (0 é a primeira)
      componentesEscolhidos: {}, // Objeto que guarda os produtos escolhidos por categoria
    };
  },
  computed: {
    // Propriedades calculadas que atualizam automaticamente
    categorias() {
      // Cria uma lista de categorias únicas (ex.: Processadores, Placas-mãe, etc.)
      let categorias = [];
      for (let produto of this.listaProdutos) {
        if (!categorias.includes(produto.category)) {
          categorias.push(produto.category);
        }
      }
      return categorias;
    },
    categoriaAtual() {
      // Retorna a categoria da etapa atual (ex.: "Processadores" na etapa 0)
      // Se for a última etapa, retorna "Revisão"
      if (this.etapaAtual < this.categorias.length) {
        return this.categorias[this.etapaAtual];
      }
      return 'Revisão';
    },
    produtosFiltrados() {
      // Retorna apenas os produtos da categoria atual
      let produtos = [];
      for (let produto of this.listaProdutos) {
        if (produto.category === this.categoriaAtual) {
          produtos.push(produto);
        }
      }
      return produtos;
    },
    precoTotal() {
      // Calcula o preço total somando os preços dos produtos escolhidos
      let total = 0;
      for (let categoria in this.componentesEscolhidos) {
        total += this.componentesEscolhidos[categoria].price;
      }
      return total;
    },
    temProdutosEscolhidos() {
      // Verifica se há pelo menos um produto escolhido
      return Object.keys(this.componentesEscolhidos).length > 0;
    },
    temProdutoNaCategoriaAtual() {
      // Verifica se um produto foi escolhido para a categoria atual
      return this.componentesEscolhidos[this.categoriaAtual] !== undefined;
    },
  },
  methods: {
    // Métodos para interações do usuário
    escolherProduto(produto) {
      // Adiciona o produto escolhido à lista de componentes
      this.componentesEscolhidos = {
        ...this.componentesEscolhidos,
        [produto.category]: produto,
      };
    },
    proximaEtapa() {
      // Avança para a próxima tela se não for a última etapa
      if (this.etapaAtual < this.categorias.length) {
        this.etapaAtual = this.etapaAtual + 1;
      }
    },
    voltarEtapa() {
      // Volta para a tela anterior se não for a primeira etapa
      if (this.etapaAtual > 0) {
        this.etapaAtual = this.etapaAtual - 1; // Corrigido: subtrai 1 para voltar
      }
    },
    finalizarMontagem() {
      // Exibe uma mensagem com o preço total da montagem
      alert(`Montagem finalizada! Total: R$ ${this.precoTotal.toFixed(2)}`);
      // Aqui você poderia adicionar código para salvar a montagem ou ir para o carrinho
    },
  },
};
</script>
```

### Como o Script Funciona
1. **Inicialização**: O componente começa na etapa 0 (Processadores), com `componentesEscolhidos` vazio.
2. **Seleção de Produtos**: O usuário vê os produtos da `categoriaAtual` (calculada em `computed`) e clica em "Selecionar" para chamar `escolherProduto`, adicionando o produto a `componentesEscolhidos`.
3. **Navegação**:
   - Clicar em "Próxima Etapa" chama `proximaEtapa`, aumentando `etapaAtual` se um produto foi escolhido (verificado por `temProdutoNaCategoriaAtual`).
   - Clicar em "Voltar" chama `voltarEtapa`, diminuindo `etapaAtual`.
4. **Tela de Revisão**: Quando `etapaAtual` é 7 (igual a `categorias.length`), a tela de revisão exibe os produtos em `componentesEscolhidos` e o `precoTotal`.
5. **Finalização**: Clicar em "Finalizar Montagem" chama `finalizarMontagem`, exibindo um alerta com o preço total.

### Como Usar
1. **Salvar os Arquivos**:
   - Use o `BuildYourPC.vue` completo fornecido no artefato.
   - Certifique-se de que o `produtos.js` reordenado (com IDs de 1 a 42) está na mesma pasta.
2. **Configurar o Projeto**:
   - Crie um projeto Vue.js com `vue create meu-projeto` (se ainda não tiver).
   - Coloque `BuildYourPC.vue` em `src/components`.
   - Coloque `produtos.js` em `src` ou na mesma pasta do componente.
   - Importe o componente em `App.vue`:
     ```vue
     <template>
       <BuildYourPC />
     </template>
     <script>
     import BuildYourPC from './components/BuildYourPC.vue';
     export default {
       components: { BuildYourPC },
     };
     </script>
     ```
3. **Testar**:
   - Execute `npm run serve` para rodar o projeto.
   - Verifique se as telas mostram as categorias na ordem correta (Processadores primeiro, Periféricos por último) e se a navegação funciona.

### Dicas para Aprender JavaScript com Este Código
- **Entenda os Loops**: Veja como `for...of` é usado em `categorias` e `produtosFiltrados` para percorrer arrays, e `for...in` em `precoTotal` para percorrer objetos.
- **Pratique Computed**: As propriedades calculadas (`computed`) são como funções que reagem a mudanças nos dados. Tente adicionar uma nova propriedade, como contar quantos produtos foram escolhidos.
- **Experimente Métodos**: Modifique `finalizarMontagem` para, por exemplo, mostrar os nomes dos produtos escolhidos no alerta.
- **Depure com Console**: Adicione `console.log(this.componentesEscolhidos)` em `escolherProduto` para ver como o objeto muda.
- **Leia a Documentação Vue**: Consulte a documentação oficial do Vue.js (https://vuejs.org/) para entender `data`, `computed`, e `methods`.

### Possíveis Melhorias (para Estudo Futuro)
- **Salvar Escolhas**: Use `localStorage` para salvar `componentesEscolhidos` e recuperar depois.
- **Filtrar Produtos**: Adicione um campo de busca para filtrar produtos por nome ou preço.
- **Validação**: Verifique compatibilidade (ex.: soquete do processador com a placa-mãe).
- **Estilização Dinâmica**: Mude o CSS para destacar o produto selecionado na tela.

Se tiver dúvidas sobre alguma parte do código, quiser mais explicações ou precisar de ajuda para configurar o projeto, é só perguntar!