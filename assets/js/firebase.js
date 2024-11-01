// Importa módulos necessários do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";



// Configuração do Firebase
const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "FIREBASE_AUTH_DOMAIN",
  projectId: "FIREBASE_PROJECT_ID",
  storageBucket: "FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID",
  appId: "FIREBASE_APP_ID",
};


// Inicializa o Firebase e configura a autenticação
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Inicializa o Firestore

// Função para configurar as informações do usuário autenticado
function configurarPerfilUsuario(user) {
  // Separa o nome completo em palavras e pega somente o primeiro e o segundo nome
  const fullName = user.displayName
    ? user.displayName.split(" ").slice(0, 2).join(" ")
    : "Administrador";
  
  document.getElementById("userName").innerHTML = fullName;
  document.getElementById("userEmail").textContent = user.email || "lorem ipsum";
  document.getElementById("userLogo").src = user.photoURL || "/assets/images/icones/icone_membro.svg";
}


// Define as páginas que devem ser protegidas
const paginasProtegidas = [
  "/gerenciador/", 
  "/gerenciador/cadastrarmembro/", 
  "/gerenciador/cadastrarnoticia/", 
  "/gerenciador/cadastrarprojeto/", 
  "/gerenciador/cadastrarpublicacao/", 
  "/gerenciador/cadastrarlaboratorio/", 
  "/gerenciador/membros/", 
  "/gerenciador/noticias/", 
  "/gerenciador/projetos/", 
  "/gerenciador/publicacoes/",
  "/gerenciador/laboratorios/"
];

// Verifica permissão do usuário no Firestore
async function verificarPermissao(email) {
  try {
    const docRef = doc(db, "permissoes", email); // Assumindo que os e-mails autorizados estão salvos com o ID do documento igual ao e-mail
    const docSnap = await getDoc(docRef);
    return docSnap.exists(); // Retorna verdadeiro se o documento existe, indicando que o usuário está autorizado
  } catch (error) {
    console.error("Erro ao verificar permissão:", error);
    return false; // Retorna falso em caso de erro de permissão
  }
}

// Configura a persistência LOCAL para manter o login após atualizar a página
function protegerPagina() {
  const caminhoAtual = window.location.pathname;

  if (paginasProtegidas.includes(caminhoAtual)) {
    onAuthStateChanged(auth, async (user) => {
      const bodyManager = document.querySelector('.body-manager');
      if (!user) {
        // Redireciona para login se não estiver autenticado
        window.location.href = "/login";
      } else {
        // Verifica se o usuário possui permissão
        const autorizado = await verificarPermissao(user.email);
        if (autorizado) {
          configurarPerfilUsuario(user);
          bodyManager.style.visibility = "visible";
        } else {
          signOut(auth); // Desloga o usuário imediatamente
          window.location.href = "/login"; // Redireciona para login se não tiver permissão
        }
      }
    });
  }
}

// Chama a proteção da página assim que o script é carregado
protegerPagina();

// Login com Google
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Usuário logado:", result.user);
          window.location.href = "/gerenciador"; // Redireciona para a área de gerenciador
        })
        .catch((error) => {
          console.error("Erro no login:", error);
        });
    });
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          const bodyManager = document.querySelector('.body-manager');
          if (bodyManager) {
            bodyManager.style.visibility = "hidden";
          }
          window.location.href = "/"; // Redireciona após logout
        })
        .catch((error) => console.error("Erro no logout:", error));
    });
  }
});
