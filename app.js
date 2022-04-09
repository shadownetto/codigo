const express = require("express");
const app = express();
const port = 8081;
const bodyPasrer = require("body-parser"); // pegar valores do formulário
const handlebars = require("express-handlebars");
const Aluno = require("./models/Aluno"); //model aluno, insere um aluno
//const varTotalEmpresas = Double;
const Cliente = require("./models/Cliente"); //model aluno, insere um aluno
const moment = require("moment"); //para trabalhar com datas

app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main", //layout padrão da aplicação
    helpers: {
      // formatar data de cadastro.
      formatDate: (date) => {
        return moment(date).format("DD/MM/YYYY");
      },
    },
  })
);
app.set("view engine", "handlebars");

//configurando o body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROTAS
// rota principal.
app.get("/", (req, res) => {
  Aluno.findAll().then((alunos) => {
    //recebe todos os alunos
    res.render("home", { alunos: alunos });
  });
  Aluno.findAndCountAll().then((results) => {
    //console.log("conteii");
    console.log(results.count);
    //varTotalEmpresas = result;
    console.log(results.rows);
    res.render("home", { results: results });
  });
});
app.get("/cadastro", (req, res) => {
  // formulário
  res.render("cadastroAluno");
});

app.get("/cadastroCliente", (req, res) => {
  // cliente
  res.render("cadastroCliente");
});

app.get("/listaEmpresa", (req, res) => {
  // lista Empresa
  //res.render("listaEmpresa");
  Aluno.findAll().then((alunos) => {
    //recebe todos os alunos
    res.render("listaEmpresa", { alunos: alunos });
  });
});

app.get("/listaCliente", (req, res) => {
  // lista Cliente
  //res.render("listaCliente");
  Cliente.findAll().then((clientes) => {
    //recebe todos os clientes
    res.render("listaCliente", { clientes: clientes });
  });
});

app.get("/calculadora", (req, res) => {
  // calculadora
  res.render("calculadora");
});

//rota para criar nova empresa
app.post("/listar_cadastro", (req, res) => {
  // não consigo acessar pela url
  Aluno.create({
    nome: req.body.nome,
    email: req.body.email,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((erro) => {
      res.send("Erro ao cadastrar aluno: " + erro);
    });
});
//rota para criar novo cliente
app.post("/listar_cadastro_cliente", (req, res) => {
  // não consigo acessar pela url
  Cliente.create({
    nome: req.body.nome,
    telefone: req.body.telefone,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((erro) => {
      res.send("Erro ao cadastrar aluno: " + erro);
    });
});

//rota para excluir empresa
app.get("/deletar/:id", (req, res) => {
  Aluno.destroy({
    where: { id: req.params.id },
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((erro) => {
      res.send(`Erro ao excluir aluno: ${erro}`);
    });
});
//rota para excluir cliente
app.get("/deletarCliente/:id", (req, res) => {
  Cliente.destroy({
    where: { id: req.params.id },
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((erro) => {
      res.send(`Erro ao excluir aluno: ${erro}`);
    });
});

// editando um cadastro de empresa
app.get("/editar/:id", (req, res) => {
  id = req.params.id;
  res.render("editar");
});
app.post("/editar", (req, res) => {
  Aluno.update(
    {
      nome: req.body.nome,
      sobreNome: req.body.sobreNome,
      email: req.body.email,
    },
    {
      where: { id: id },
    }
  )
    .then(() => {
      res.redirect("/");
    })
    .catch((erro) => {
      console.log(`Erro ao editar cadastro: ${erro}`);
    });
});
// editando um cadastro de cliente
app.get("/editarCliente/:id", (req, res) => {
  id = req.params.id;
  res.render("editarCliente");
});
app.post("/editarCliente", (req, res) => {
  Cliente.update(
    {
      nome: req.body.nome,
      sobreNome: req.body.sobreNome,
      email: req.body.email,
    },
    {
      where: { id: id },
    }
  )
    .then(() => {
      res.redirect("/");
    })
    .catch((erro) => {
      console.log(`Erro ao editar cadastro: ${erro}`);
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando na url http://localhost:${port}`);
});
