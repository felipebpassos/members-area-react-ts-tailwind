import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';

const ModuloPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [modulo, setModulo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Dados fictícios dos módulos em JSON
  const modules = [
    {
      "id": 1,
      "title": "Comece por aqui",
      "lessons": [
        {
          "id": 1,
          "title": "Aula 1: Introdução ao Reels de Cinema",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        },
        {
          "id": 2,
          "title": "Aula 2: Primeiros Passos no Software de Edição",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        },
        {
          "id": 3,
          "title": "Aula 3: Criando Efeitos Simples",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        }
      ]
    },
    {
      "id": 2,
      "title": "A arte de contar histórias",
      "lessons": [
        {
          "id": 1,
          "title": "Aula 1: A Narrativa no Vídeo",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        },
        {
          "id": 2,
          "title": "Aula 2: Técnicas de Corte e Montagem",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        },
        {
          "id": 3,
          "title": "Aula 3: Adicionando Áudio e Trilha Sonora",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        }
      ]
    },
    {
      "id": 3,
      "title": "Filmagens de cinema",
      "lessons": [
        {
          "id": 1,
          "title": "Aula 1: Fundamentos da Cinematografia",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        },
        {
          "id": 2,
          "title": "Aula 2: Captura de Imagens e Técnicas de Filmagem",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        },
        {
          "id": 3,
          "title": "Aula 3: Trabalhando com Equipamentos Profissionais",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        }
      ]
    },
    {
      "id": 4,
      "title": "Fundamentos da edição I",
      "lessons": [
        {
          "id": 1,
          "title": "Aula 1: Organizando o Fluxo de Trabalho",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        },
        {
          "id": 2,
          "title": "Aula 2: Efeitos Visuais e Correção de Cor",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        },
        {
          "id": 3,
          "title": "Aula 3: Dominando a Linha do Tempo",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        }
      ]
    },
    {
      "id": 5,
      "title": "Fundamentos da edição II",
      "lessons": [
        {
          "id": 1,
          "title": "Aula 1: Técnicas de Transições Avançadas",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        },
        {
          "id": 2,
          "title": "Aula 2: Trabalhando com Camadas e Efeitos Combinados",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        },
        {
          "id": 3,
          "title": "Aula 3: Exportando e Finalizando o Projeto",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, elit sed fringilla tristique, metus orci gravida arcu, et efficitur ipsum mi vitae lorem. Cras ut lectus id orci accumsan facilisis. Donec at vehicula justo, ut luctus lorem. Integer eget vestibulum velit. Aenean cursus dapibus orci, ac vestibulum magna sodales ut. Praesent in magna vel nisl malesuada venenatis. Suspendisse potenti. Sed tincidunt, elit id consectetur placerat, lorem ex facilisis nisl, id bibendum augue enim in metus. Vestibulum euismod risus eget sem gravida, id luctus purus porttitor.",
          "video": "https://player.vimeo.com/video/1048998419?badge=0&autopause=0&player_id=0&app_id=58479"
        }
      ]
    }
  ];

  useEffect(() => {
    if (id) {
      const currentModule = modules.find(module => module.id === parseInt(id));
      if (!currentModule) {
        navigate("/notfound");
      } else {
        setModulo(currentModule);
      }
    } else {
      navigate("/notfound");
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <img
          src="/spinner.png" // Coloque o caminho correto para o seu arquivo de imagem
          alt="Loading..."
          className="spinner"
        />
      </div>
    );
  }

  if (!modulo) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4"> {/* Centralizando o container */}
        <h2 className="text-xl font-semibold mt-8 mb-12 text-normal text-center">
          Módulo {modulo.id} - {modulo.title}
        </h2>
        <div className="space-y-4">
          {modulo.lessons.map((lesson: any) => (
            <div
              key={lesson.id}
              className="p-6 rounded shadow-md hover:shadow-lg flex flex-col sm:flex-row items-center sm:items-start hover:bg-bluebg"
            >
              {lesson.video && (
                <div
                  className="w-full sm:w-1/4 mb-4 sm:mb-0 sm:mr-4"
                  style={{ width: "600px", maxWidth: "100%" }} // Definindo largura mínima
                >
                  <div style={{ padding: "40% 0 0 0", position: "relative" }}> {/* Alterando a proporção */}
                    <iframe
                      src={lesson.video}
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px" // Adicionando borda arredondada para um design mais elegante
                      }}
                      title={`Video Aula ${lesson.id}`}
                    ></iframe>
                  </div>
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg sm:text-base md:text-lg font-bold mb-2 text-lighter">
                  {lesson.title}
                </h3>
                <p className="text-base sm:text-sm md:text-base text-light">
                  {lesson.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ModuloPage;
